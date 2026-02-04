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

export interface TagWithCount {
  tag: string;
  count: number;
}

export interface ListTagsResponse {
  tags: TagWithCount[];
}

// Search/filter parameters
export interface EntriesSearchParams {
  q?: string; // Title search (LIKE)
  source?: string[]; // Source filter (comma-separated in API)
  tags?: string[]; // Tags filter (any match)
  creator?: string; // Creator search (LIKE)
  domain?: string; // Video domain filter (LIKE)
}

export const entriesApi = {
  /** List entries with pagination and optional search/filter */
  list(limit = 20, offset = 0, search?: EntriesSearchParams): Promise<ListEntriesResponse> {
    const params = new URLSearchParams();
    params.set('limit', String(limit));
    params.set('offset', String(offset));

    if (search?.q) {
      params.set('q', search.q);
    }
    if (search?.source?.length) {
      params.set('source', search.source.join(','));
    }
    if (search?.tags?.length) {
      params.set('tags', search.tags.join(','));
    }
    if (search?.creator) {
      params.set('creator', search.creator);
    }
    if (search?.domain) {
      params.set('domain', search.domain);
    }

    return apiClient.get(`/v1/entries?${params.toString()}`);
  },

  /** Get a single entry by ID */
  get(id: string): Promise<EntryWithDetails> {
    return apiClient.get(`/v1/entries/${id}`);
  },

  /** Get popular tags */
  getTags(limit = 100): Promise<ListTagsResponse> {
    return apiClient.get(`/v1/entries/tags?limit=${limit}`);
  },
};
