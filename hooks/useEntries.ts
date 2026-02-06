import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import {
  entriesApi,
  EntriesSearchParams,
  EntryWithDetails,
  ListEntriesResponse,
  ListTagsResponse,
} from '@/utils/api/entries';

// Query keys for cache management
export const entriesKeys = {
  all: ['entries'] as const,
  lists: () => [...entriesKeys.all, 'list'] as const,
  list: (limit: number, search?: EntriesSearchParams) =>
    [...entriesKeys.lists(), { limit, ...search }] as const,
  details: () => [...entriesKeys.all, 'detail'] as const,
  detail: (id: string) => [...entriesKeys.details(), id] as const,
  tags: () => [...entriesKeys.all, 'tags'] as const,
};

/**
 * Hook for page-based pagination of entries with search/filter
 */
export const usePaginatedEntries = (page = 1, limit = 20, search?: EntriesSearchParams) => {
  const offset = (page - 1) * limit;
  return useQuery<ListEntriesResponse, Error>({
    queryKey: [...entriesKeys.list(limit, search), { page }],
    queryFn: () => entriesApi.list(limit, offset, search),
  });
};

/**
 * Hook for fetching a single entry by ID
 */
export const useEntry = (
  id: string,
  options?: Omit<UseQueryOptions<EntryWithDetails, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery<EntryWithDetails, Error>({
    queryKey: entriesKeys.detail(id),
    queryFn: () => entriesApi.get(id),
    enabled: !!id,
    ...options,
  });
};

/**
 * Hook for fetching popular tags
 */
export const useTags = (limit = 100) => {
  return useQuery<ListTagsResponse, Error>({
    queryKey: entriesKeys.tags(),
    queryFn: () => entriesApi.getTags(limit),
    staleTime: 15 * 60 * 1000, // Cache for  15 minutes
  });
};
