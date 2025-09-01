export interface IveEntry {
  id: string;
  title: string;
  duration?: number;
  thumbnail?: string;
  tags?: string[];
  videoSourceIds: string[];
  scriptIds: string[];
  createdAt: number;
  updatedAt: number;
}

export interface VideoSource {
  id: string;
  url: string;
  status?: 'working' | 'broken' | 'unknown';
  createdAt: number;
  updatedAt: number;
}

export interface ScriptMetadata {
  id: string;
  url: string;
  creator: string;
  supportUrl?: string;
  avgSpeed?: number;
  maxSpeed?: number;
  actionCount?: number;
  createdAt: number;
  updatedAt: number;
}

export interface IveDbState {
  entries: Record<string, IveEntry>;
  videoSources: Record<string, VideoSource>;
  scripts: Record<string, ScriptMetadata>;
}

export interface CreateIveEntryData {
  title: string;
  duration?: number;
  thumbnail?: string;
  tags?: string[];
  videoSources: Omit<VideoSource, 'id' | 'createdAt' | 'updatedAt'>[];
  scripts: Omit<ScriptMetadata, 'id' | 'createdAt' | 'updatedAt'>[];
}

class IveBridge {
  private messageId = 0;
  private pendingMessages = new Map<
    number,
    { resolve: (value: any) => void; reject: (reason?: any) => void }
  >();
  private initialized = false;

  constructor() {
    // Only initialize in browser environment
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  private initialize() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;

    // Listen for responses from extension
    window.addEventListener('message', (event) => {
      if (event.data?.from === 'ive-extension') {
        const { id, data, error } = event.data;
        const pending = this.pendingMessages.get(id);
        if (pending) {
          this.pendingMessages.delete(id);
          if (error) {
            pending.reject(new Error(error));
          } else {
            pending.resolve(data);
          }
        }
      }
    });
  }

  private sendMessage<T>(type: string, payload?: any): Promise<T> {
    // Ensure we're in browser environment
    if (typeof window === 'undefined') {
      return Promise.reject(new Error('Not in browser environment'));
    }

    // Initialize if needed
    if (!this.initialized) {
      this.initialize();
    }

    return new Promise((resolve, reject) => {
      const id = ++this.messageId;
      this.pendingMessages.set(id, { resolve, reject });

      window.postMessage(
        {
          from: 'iveplay-page',
          id,
          type,
          ...payload,
        },
        '*'
      );

      // Timeout after 5 seconds
      setTimeout(() => {
        if (this.pendingMessages.has(id)) {
          this.pendingMessages.delete(id);
          reject(new Error('Extension not responding'));
        }
      }, 5000);
    });
  }

  // API Methods
  getAllEntries() {
    return this.sendMessage<IveEntry[]>('IVEDB_GET_ALL_ENTRIES');
  }

  getEntry(entryId: string) {
    return this.sendMessage<IveEntry | null>('IVEDB_GET_ENTRY', { entryId });
  }

  createEntry(data: CreateIveEntryData) {
    return this.sendMessage<string>('IVEDB_CREATE_ENTRY', { data });
  }

  updateEntry(entryId: string, updates: Partial<Omit<IveEntry, 'id' | 'createdAt'>>) {
    return this.sendMessage<void>('IVEDB_UPDATE_ENTRY', { entryId, updates });
  }

  deleteEntry(entryId: string) {
    return this.sendMessage<void>('IVEDB_DELETE_ENTRY', { entryId });
  }

  addFavorite(entryId: string) {
    return this.sendMessage<void>('IVEDB_ADD_FAVORITE', { entryId });
  }

  removeFavorite(entryId: string) {
    return this.sendMessage<void>('IVEDB_REMOVE_FAVORITE', { entryId });
  }

  getFavorites() {
    return this.sendMessage<IveEntry[]>('IVEDB_GET_FAVORITES');
  }

  isFavorited(entryId: string) {
    return this.sendMessage<boolean>('IVEDB_IS_FAVORITED', { entryId });
  }
}

export const iveBridge = new IveBridge();
