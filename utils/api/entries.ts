import { apiClient } from './client';

// Types matching the API response
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

export interface IveEntry {
  id: string;
  title: string;
  duration?: number;
  thumbnail?: string;
  tags?: string[];
  videoSourceIds: string[];
  scriptIds: string[];
  defaultScriptId?: string;
  source: string;
  createdAt: number;
  updatedAt: number;
}

export interface EntryWithDetails {
  entry: IveEntry;
  videoSources: VideoSource[];
  scripts: ScriptMetadata[];
}

export interface ListEntriesResponse {
  entries: EntryWithDetails[];
  total: number;
  limit: number;
  offset: number;
}

export const entriesApi = {
  /** List entries with pagination */
  list(limit = 20, offset = 0): Promise<ListEntriesResponse> {
    return apiClient.get(`/v1/entries?limit=${limit}&offset=${offset}`);
  },

  /** Get a single entry by ID */
  get(id: string): Promise<EntryWithDetails> {
    return apiClient.get(`/v1/entries/${id}`);
  },
};
