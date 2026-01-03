import { create } from 'zustand';
import { entriesApi, EntryWithDetails } from '@/utils/api/entries';

interface CloudStore {
  // State
  entries: EntryWithDetails[];
  loading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  total: number;

  // Pagination
  offset: number;
  limit: number;
  hasMore: boolean;

  // Actions
  loadEntries: (reset?: boolean) => Promise<void>;
  loadMoreEntries: () => Promise<void>;
  reset: () => void;
}

export const useCloudStore = create<CloudStore>((set, get) => ({
  entries: [],
  loading: false,
  isLoadingMore: false,
  error: null,
  total: 0,

  offset: 0,
  limit: 20,
  hasMore: true,

  loadEntries: async (reset = false) => {
    const { limit } = get();

    if (reset) {
      set({ offset: 0, hasMore: true, entries: [] });
    }

    set({ loading: true, error: null });

    try {
      const currentOffset = reset ? 0 : get().offset;
      const response = await entriesApi.list(limit, currentOffset);

      set((state) => ({
        entries: reset ? response.entries : [...state.entries, ...response.entries],
        total: response.total,
        offset: currentOffset + response.entries.length,
        hasMore: currentOffset + response.entries.length < response.total,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load entries',
      });
    } finally {
      set({ loading: false });
    }
  },

  loadMoreEntries: async () => {
    const { hasMore, loading, isLoadingMore } = get();
    if (!hasMore || loading || isLoadingMore) {
      return;
    }

    set({ isLoadingMore: true });
    await get().loadEntries(false);
    set({ isLoadingMore: false });
  },

  reset: () => {
    set({
      entries: [],
      loading: false,
      isLoadingMore: false,
      error: null,
      total: 0,
      offset: 0,
      hasMore: true,
    });
  },
}));
