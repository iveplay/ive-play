export interface IveEntry {
  id: string;
  title: string;
  duration?: number;
  thumbnail?: string;
  tags?: string[];
  videoSourceIds: string[];
  scriptIds: string[];
  defaultScriptId?: string;
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
  name: string;
  creator: string;
  supportUrl?: string;
  avgSpeed?: number;
  maxSpeed?: number;
  actionCount?: number;
  createdAt: number;
  updatedAt: number;
}

export interface IveEntryWithDetails {
  entry: IveEntry;
  videoSources: VideoSource[];
  scripts: ScriptMetadata[];
}

export interface CreateIveEntryData {
  title: string;
  duration?: number;
  thumbnail?: string;
  tags?: string[];
  videoSources: Omit<VideoSource, 'id' | 'createdAt' | 'updatedAt'>[];
  scripts: Omit<ScriptMetadata, 'id' | 'createdAt' | 'updatedAt'>[];
  defaultScriptId?: string;
}

export interface IveSearchOptions {
  query?: string;
  tags?: string[];
  creator?: string;
  minDuration?: number;
  maxDuration?: number;
  status?: VideoSource['status'];
  favorites?: boolean;
}

export interface LocalScriptInfo {
  id: string;
  name: string;
  size: number;
  createdAt: number;
}

const MESSAGES = {
  IVEDB_PING: 'ive:ivedb:ping',
  IVEDB_CREATE_ENTRY: 'ive:ivedb:create_entry',
  IVEDB_GET_ENTRY: 'ive:ivedb:get_entry',
  IVEDB_GET_ENTRY_WITH_DETAILS: 'ive:ivedb:get_entry_with_details',
  IVEDB_GET_ALL_ENTRIES: 'ive:ivedb:get_all_entries',
  IVEDB_GET_ENTRIES_PAGINATED: 'ive:ivedb:get_entries_paginated',
  IVEDB_SEARCH_ENTRIES: 'ive:ivedb:search_entries',
  IVEDB_UPDATE_ENTRY: 'ive:ivedb:update_entry',
  IVEDB_DELETE_ENTRY: 'ive:ivedb:delete_entry',
  IVEDB_ADD_FAVORITE: 'ive:ivedb:add_favorite',
  IVEDB_REMOVE_FAVORITE: 'ive:ivedb:remove_favorite',
  IVEDB_GET_FAVORITES: 'ive:ivedb:get_favorites',
  IVEDB_IS_FAVORITED: 'ive:ivedb:is_favorited',
  // Utils
  IVE_SELECT_SCRIPT: 'ive:select_script',
  IVE_SAVE_AND_PLAY: 'ive:save_and_play',
  // Local script
  LOCAL_SCRIPT_SAVE: 'ive:local_script:save',
  LOCAL_SCRIPT_GET: 'ive:local_script:get',
  LOCAL_SCRIPT_DELETE: 'ive:local_script:delete',
  LOCAL_SCRIPT_LIST: 'ive:local_script:list',
  LOCAL_SCRIPT_INFO: 'ive:local_script:info',
};

class IveBridge {
  private messageId = 0;
  private pendingMessages = new Map<
    number,
    { resolve: (value: any) => void; reject: (reason?: any) => void }
  >();
  private initialized = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  private initialize() {
    if (this.initialized) {
      return;
    }
    this.initialized = true;

    window.addEventListener('message', (event) => {
      if (event.data?.from === 'ive-extension') {
        const { id, data, error } = event.data;
        const pending = this.pendingMessages.get(id);
        if (pending) {
          this.pendingMessages.delete(id);
          if (error) {
            pending.reject(error);
          } else {
            pending.resolve(data);
          }
        }
      }
    });
  }

  private sendMessage<T>(type: string, payload?: any): Promise<T> {
    if (typeof window === 'undefined') {
      return Promise.reject(new Error('Not in browser environment'));
    }

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

      setTimeout(() => {
        if (this.pendingMessages.has(id)) {
          this.pendingMessages.delete(id);
          reject(new Error('Extension not responding'));
        }
      }, 5000);
    });
  }

  ping() {
    return this.sendMessage<{ available: boolean; version: string }>(MESSAGES.IVEDB_PING);
  }

  getAllEntries() {
    return this.sendMessage<IveEntry[]>(MESSAGES.IVEDB_GET_ALL_ENTRIES);
  }

  getEntriesPaginated(offset: number = 0, limit: number = 20, options?: IveSearchOptions) {
    return this.sendMessage<IveEntry[]>(MESSAGES.IVEDB_GET_ENTRIES_PAGINATED, {
      offset,
      limit,
      options,
    });
  }

  searchEntries(options: IveSearchOptions) {
    return this.sendMessage<IveEntry[]>(MESSAGES.IVEDB_SEARCH_ENTRIES, { options });
  }

  getEntry(entryId: string) {
    return this.sendMessage<IveEntry | null>(MESSAGES.IVEDB_GET_ENTRY, { entryId });
  }

  getEntryWithDetails(entryId: string) {
    return this.sendMessage<IveEntryWithDetails | null>(MESSAGES.IVEDB_GET_ENTRY_WITH_DETAILS, {
      entryId,
    });
  }

  createEntry(data: CreateIveEntryData) {
    return this.sendMessage<string>(MESSAGES.IVEDB_CREATE_ENTRY, { data });
  }

  updateEntry(entryId: string, data: CreateIveEntryData) {
    return this.sendMessage<void>(MESSAGES.IVEDB_UPDATE_ENTRY, { entryId, data });
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

  selectScript(scriptId: string, timestamp: number) {
    return this.sendMessage<void>(MESSAGES.IVE_SELECT_SCRIPT, { scriptId, timestamp });
  }

  // Local script methods
  saveLocalScript(name: string, content: Record<string, unknown>, size: number) {
    return this.sendMessage<string>(MESSAGES.LOCAL_SCRIPT_SAVE, {
      name,
      content,
      size,
    });
  }

  getLocalScript(scriptId: string) {
    return this.sendMessage<Record<string, unknown> | null>(MESSAGES.LOCAL_SCRIPT_GET, {
      scriptId,
    });
  }

  deleteLocalScript(scriptId: string) {
    return this.sendMessage<void>(MESSAGES.LOCAL_SCRIPT_DELETE, { scriptId });
  }

  getLocalScriptsList() {
    return this.sendMessage<Record<string, LocalScriptInfo>>(MESSAGES.LOCAL_SCRIPT_LIST);
  }

  getLocalScriptInfo(scriptId: string) {
    return this.sendMessage<LocalScriptInfo | null>(MESSAGES.LOCAL_SCRIPT_INFO, {
      scriptId,
    });
  }

  /**
   * Save entry to IveDB and select script for playback.
   * Opens the video URL after saving.
   */
  saveAndPlay(data: {
    entry: CreateIveEntryData;
    videoUrl: string;
    scriptId?: string; // Which script to auto-select (index or id)
  }) {
    return this.sendMessage<{ entryId: string; scriptId: string }>(
      MESSAGES.IVE_SAVE_AND_PLAY,
      data
    );
  }
}

export const iveBridge = new IveBridge();
