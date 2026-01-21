import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';
import { entriesApi, EntryWithDetails, ListEntriesResponse } from '@/utils/api/entries';

// Query keys for cache management
export const entriesKeys = {
  all: ['entries'] as const,
  lists: () => [...entriesKeys.all, 'list'] as const,
  list: (limit: number) => [...entriesKeys.lists(), { limit }] as const,
  details: () => [...entriesKeys.all, 'detail'] as const,
  detail: (id: string) => [...entriesKeys.details(), id] as const,
};

/**
 * Hook for infinite scroll pagination of entries
 * Automatically handles loading more entries as you scroll
 */
export const useInfiniteEntries = (
  limit = 20,
  options?: Omit<
    UseInfiniteQueryOptions<ListEntriesResponse, Error, ListEntriesResponse>,
    'queryKey' | 'queryFn' | 'getNextPageParam' | 'initialPageParam' | 'select'
  >
) => {
  return useInfiniteQuery<ListEntriesResponse, Error>({
    queryKey: entriesKeys.list(limit),
    queryFn: ({ pageParam = 0 }) => entriesApi.list(limit, pageParam as number),
    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.entries.length;
      return nextOffset < lastPage.total ? nextOffset : undefined;
    },
    initialPageParam: 0,
    ...options,
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
