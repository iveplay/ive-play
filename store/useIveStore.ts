import { create } from 'zustand';
import { CreateIveEntryData, iveBridge, IveEntry } from '@/utils/iveBridge';

interface IveStore {
  // State
  entries: IveEntry[];
  favorites: IveEntry[];
  loading: boolean;
  error: string | null;
  extensionAvailable: boolean;

  // Actions
  loadEntries: () => Promise<void>;
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

  loadEntries: async () => {
    set({ loading: true, error: null });
    try {
      const entries = await iveBridge.getAllEntries();
      set({ entries, extensionAvailable: true });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to load entries',
        extensionAvailable: false,
      });
    } finally {
      set({ loading: false });
    }
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
      await get().loadEntries(); // Reload entries
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
      await get().loadEntries(); // Reload entries
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
        entries: state.entries.filter((e) => e.id !== entryId),
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
      await get().loadFavorites(); // Reload favorites
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to toggle favorite' });
      throw error;
    }
  },

  checkExtension: async () => {
    try {
      await iveBridge.getAllEntries();
      set({ extensionAvailable: true });
    } catch {
      set({ extensionAvailable: false });
    }
  },
}));
