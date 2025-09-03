import { create } from 'zustand';
import { CreateIveEntryData, iveBridge, IveEntry, IveEntryWithDetails } from '@/utils/iveBridge';

interface IveStore {
  // State
  entries: IveEntryWithDetails[];
  favorites: IveEntry[];
  loading: boolean;
  error: string | null;
  extensionAvailable: boolean;

  // Pagination
  entriesPage: number;
  entriesHasMore: boolean;
  entriesPerPage: number;

  // Actions
  loadEntries: (reset?: boolean) => Promise<void>;
  loadMoreEntries: () => Promise<void>;
  loadFavorites: () => Promise<void>;
  createEntry: (data: CreateIveEntryData) => Promise<string>;
  updateEntry: (
    entryId: string,
    updates: Partial<Omit<IveEntry, 'id' | 'createdAt'>>
  ) => Promise<void>;
  deleteEntry: (entryId: string) => Promise<void>;
  toggleFavorite: (entryId: string) => Promise<void>;
  checkExtension: () => Promise<void>;
}

export const useIveStore = create<IveStore>((set, get) => ({
  entries: [],
  favorites: [],
  loading: false,
  error: null,
  extensionAvailable: false,

  entriesPage: 0,
  entriesHasMore: true,
  entriesPerPage: 20,

  loadEntries: async (reset = false) => {
    set({ loading: true, error: null });

    if (reset) {
      set({ entries: [], entriesPage: 0, entriesHasMore: true });
    }

    try {
      const { entriesPage, entriesPerPage } = get();
      const offset = reset ? 0 : entriesPage * entriesPerPage;

      // Get paginated basic entries
      const basicEntries = await iveBridge.getEntriesPaginated(offset, entriesPerPage);

      // Fetch details for each entry in parallel
      const entriesWithDetails = await Promise.all(
        basicEntries.map(async (entry) => {
          const details = await iveBridge.getEntryWithDetails(entry.id);
          return details || { entry, videoSources: [], scripts: [] };
        })
      );

      set((state) => ({
        entries: reset ? entriesWithDetails : [...state.entries, ...entriesWithDetails],
        entriesPage: reset ? 1 : state.entriesPage + 1,
        entriesHasMore: basicEntries.length === entriesPerPage,
        extensionAvailable: true,
      }));
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load entries',
        extensionAvailable: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  loadMoreEntries: async () => {
    const { entriesHasMore, loading } = get();
    if (!entriesHasMore || loading) {
      return;
    }

    await get().loadEntries(false);
  },

  loadFavorites: async () => {
    set({ loading: true, error: null });
    try {
      const favorites = await iveBridge.getFavorites();

      set({ favorites, extensionAvailable: true });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load favorites',
        extensionAvailable: false,
      });
    } finally {
      set({ loading: false });
    }
  },

  createEntry: async (data) => {
    set({ loading: true, error: null });
    try {
      const entryId = await iveBridge.createEntry(data);
      await get().loadEntries(); // Reload all entries
      return entryId;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create entry' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateEntry: async (entryId, updates) => {
    set({ loading: true, error: null });
    try {
      await iveBridge.updateEntry(entryId, updates);
      await get().loadEntries(); // Reload all entries
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to update entry' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteEntry: async (entryId) => {
    set({ loading: true, error: null });
    try {
      await iveBridge.deleteEntry(entryId);
      // Update local state immediately
      set((state) => ({
        entries: state.entries.filter((e) => e.entry.id !== entryId),
        favorites: state.favorites.filter((e) => e.id !== entryId),
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to delete entry' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  toggleFavorite: async (entryId) => {
    try {
      const isFavorited = await iveBridge.isFavorited(entryId);
      if (isFavorited) {
        await iveBridge.removeFavorite(entryId);
      } else {
        await iveBridge.addFavorite(entryId);
      }
      await get().loadFavorites();
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to toggle favorite' });
      throw error;
    }
  },

  checkExtension: async () => {
    try {
      await iveBridge.ping();
      set({ extensionAvailable: true });
    } catch {
      set({ extensionAvailable: false });
    }
  },
}));
