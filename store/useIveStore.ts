import { create } from 'zustand';
import {
  CreateIveEntryData,
  iveBridge,
  IveEntryWithDetails,
  IveSearchOptions,
} from '@/utils/iveBridge';
import { REQUIRED_VERSION } from '@/utils/versions';

interface IveStore {
  // State
  entries: IveEntryWithDetails[];
  favoriteIds: Set<string>;
  loading: boolean;
  isLoadingMore: boolean;
  error: string | null;
  extensionAvailable: boolean;
  extensionVersion: string | null;
  isVersionCompatible: boolean;

  // Filters
  filters: IveSearchOptions;

  // Pagination
  entriesPage: number;
  entriesHasMore: boolean;
  entriesPerPage: number;

  // Actions
  setFilters: (filters: IveSearchOptions) => void;
  loadEntries: (reset?: boolean) => Promise<void>;
  loadMoreEntries: () => Promise<void>;
  loadFavorites: () => Promise<void>;
  createEntry: (data: CreateIveEntryData) => Promise<string>;
  updateEntry: (entryId: string, data: CreateIveEntryData) => Promise<void>;
  deleteEntry: (entryId: string) => Promise<void>;
  toggleFavorite: (entryId: string) => Promise<void>;
  checkExtension: () => Promise<boolean>;
  checkForNewEntries: () => Promise<void>;
}

export const useIveStore = create<IveStore>((set, get) => ({
  entries: [],
  favoriteIds: new Set<string>(),
  loading: false,
  isLoadingMore: false,
  error: null,
  extensionAvailable: false,
  extensionVersion: null,
  isVersionCompatible: false,

  filters: {
    favorites: false,
  },

  entriesPage: 0,
  entriesHasMore: true,
  entriesPerPage: 20,

  setFilters: (filters) => {
    set({ filters });
    get().loadEntries(true); // Reset entries when filters change
  },

  loadEntries: async (reset = false) => {
    set({ loading: true, error: null });

    if (reset) {
      set({ entriesPage: 0, entriesHasMore: true });
    }

    try {
      const { entriesPage, entriesPerPage, filters } = get();
      const offset = reset ? 0 : entriesPage * entriesPerPage;

      const basicEntries = await iveBridge.getEntriesPaginated(offset, entriesPerPage, filters);

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

    set({ isLoadingMore: true });
    await get().loadEntries(false);
    set({ isLoadingMore: false });
  },

  loadFavorites: async () => {
    try {
      const favorites = await iveBridge.getFavorites();
      set({ favoriteIds: new Set(favorites.map((fav) => fav.id)) });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load favorites',
      });
    }
  },

  createEntry: async (data) => {
    set({ loading: true, error: null });
    try {
      const entryId = await iveBridge.createEntry(data);
      await get().loadEntries(true); // Reload all entries
      return entryId;
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to create entry' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateEntry: async (entryId, data) => {
    set({ loading: true, error: null });
    try {
      await iveBridge.updateEntry(entryId, data);
      await get().loadEntries(true); // Reload all entries
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
      iveBridge.deleteEntry(entryId);
      // Update local state immediately
      set((state) => ({
        entries: state.entries.filter((e) => e.entry.id !== entryId),
        favoriteIds: new Set(Array.from(state.favoriteIds).filter((id) => id !== entryId)),
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
      const { favoriteIds } = get();
      const isFavorited = favoriteIds.has(entryId);

      if (isFavorited) {
        await iveBridge.removeFavorite(entryId);
        // Remove from Set immediately
        set((state) => {
          const newFavoriteIds = new Set(state.favoriteIds);
          newFavoriteIds.delete(entryId);
          return { favoriteIds: newFavoriteIds };
        });
      } else {
        await iveBridge.addFavorite(entryId);
        // Add to Set immediately
        set((state) => {
          const newFavoriteIds = new Set(state.favoriteIds);
          newFavoriteIds.add(entryId);
          return { favoriteIds: newFavoriteIds };
        });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to toggle favorite' });
      throw error;
    }
  },

  checkExtension: async () => {
    try {
      const result = await iveBridge.ping();
      const versionMatch = result.version === REQUIRED_VERSION;

      set({
        extensionAvailable: result.available,
        extensionVersion: result.version,
        isVersionCompatible: versionMatch,
      });

      return result.available && versionMatch;
    } catch {
      set({
        extensionAvailable: false,
        extensionVersion: null,
        isVersionCompatible: false,
      });
      return false;
    }
  },

  checkForNewEntries: async () => {
    try {
      const { entries, entriesPerPage, filters } = get();
      const existingIds = new Set(entries.map((e) => e.entry.id));

      // Get latest entries from start with current filters
      const newBasicEntries = await iveBridge.getEntriesPaginated(0, entriesPerPage, filters);
      const newEntries = newBasicEntries.filter((entry) => !existingIds.has(entry.id));

      if (newEntries.length > 0) {
        // Fetch details for new entries
        const newEntriesWithDetails = await Promise.all(
          newEntries.map(async (entry) => {
            const details = await iveBridge.getEntryWithDetails(entry.id);
            return details || { entry, videoSources: [], scripts: [] };
          })
        );

        // Add new entries to the top
        set((state) => ({
          entries: [...newEntriesWithDetails, ...state.entries],
        }));
      }
    } catch (error) {
      // Silent fail for background checks
    }
  },
}));
