import { create } from 'zustand';
import { authApi, UserInfo } from '@/utils/api/auth';

interface AuthState {
  // User state
  user: UserInfo | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;

  // Modal state
  authModalOpen: boolean;
  authModalView: 'sign-in' | 'sign-up';

  // Actions
  setUser: (user: UserInfo | null) => void;
  fetchUser: () => Promise<void>;
  clearUser: () => void;
  openAuthModal: (view?: 'sign-in' | 'sign-up') => void;
  closeAuthModal: () => void;
  setAuthModalView: (view: 'sign-in' | 'sign-up') => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,

  authModalOpen: false,
  authModalView: 'sign-in',

  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user,
      error: null,
    });
  },

  fetchUser: async () => {
    set({ isLoading: true, error: null, authModalOpen: false });
    try {
      const user = await authApi.getMe();
      set({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (err) {
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: err instanceof Error ? err.message : 'Failed to fetch user',
      });
    }
  },

  clearUser: () => {
    set({
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  openAuthModal: (view = 'sign-in') => {
    set({ authModalOpen: true, authModalView: view });
  },

  closeAuthModal: () => {
    set({ authModalOpen: false });
  },

  setAuthModalView: (view) => {
    set({ authModalView: view });
  },
}));
