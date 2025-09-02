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

const MESSAGES = {
  IVEDB_CREATE_ENTRY: 'ive:ivedb:create_entry',
  IVEDB_GET_ENTRY: 'ive:ivedb:get_entry',
  IVEDB_GET_ALL_ENTRIES: 'ive:ivedb:get_all_entries',
  IVEDB_SEARCH_ENTRIES: 'ive:ivedb:search_entries',
  IVEDB_UPDATE_ENTRY: 'ive:ivedb:update_entry',
  IVEDB_DELETE_ENTRY: 'ive:ivedb:delete_entry',
  IVEDB_ADD_FAVORITE: 'ive:ivedb:add_favorite',
  IVEDB_REMOVE_FAVORITE: 'ive:ivedb:remove_favorite',
  IVEDB_GET_FAVORITES: 'ive:ivedb:get_favorites',
  IVEDB_IS_FAVORITED: 'ive:ivedb:is_favorited',
};

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
          from: 'iveplay',
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
    return this.sendMessage<IveEntry[]>(MESSAGES.IVEDB_GET_ALL_ENTRIES);
  }

  getEntry(entryId: string) {
    return this.sendMessage<IveEntry | null>(MESSAGES.IVEDB_GET_ENTRY, { entryId });
  }

  createEntry(data: CreateIveEntryData) {
    return this.sendMessage<string>(MESSAGES.IVEDB_CREATE_ENTRY, { data });
  }

  updateEntry(entryId: string, updates: Partial<Omit<IveEntry, 'id' | 'createdAt'>>) {
    return this.sendMessage<void>(MESSAGES.IVEDB_UPDATE_ENTRY, { entryId, updates });
  }

  deleteEntry(entryId: string) {
    return this.sendMessage<void>(MESSAGES.IVEDB_DELETE_ENTRY, { entryId });
  }

  addFavorite(entryId: string) {
    return this.sendMessage<void>(MESSAGES.IVEDB_ADD_FAVORITE, { entryId });
  }

  removeFavorite(entryId: string) {
    return this.sendMessage<void>(MESSAGES.IVEDB_REMOVE_FAVORITE, { entryId });
  }

  getFavorites() {
    return this.sendMessage<IveEntry[]>(MESSAGES.IVEDB_GET_FAVORITES);
  }

  isFavorited(entryId: string) {
    return this.sendMessage<boolean>(MESSAGES.IVEDB_IS_FAVORITED, { entryId });
  }
}

export const iveBridge = new IveBridge();
