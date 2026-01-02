import { apiClient } from './client';

export type UserRole = 'user' | 'patreon' | 'creator' | 'admin';

export interface UserInfo {
  userId: string;
  email: string | null;
  role: UserRole;
  patreonLinked: boolean;
  patreonTier: string | null;
}

export interface PatreonConnectResponse {
  url: string;
}

export const authApi = {
  /** Get current user info */
  getMe(): Promise<UserInfo> {
    return apiClient.get('/v1/auth/me');
  },

  /** Get Patreon OAuth URL (requires auth) */
  getPatreonConnectUrl(): Promise<PatreonConnectResponse> {
    return apiClient.get('/v1/auth/patreon/connect');
  },

  /** Disconnect Patreon account */
  disconnectPatreon(): Promise<{ success: boolean }> {
    return apiClient.post('/v1/auth/patreon/disconnect');
  },

  /** Delete user account */
  deleteAccount(): Promise<{ success: boolean }> {
    return apiClient.delete('/v1/auth/me');
  },
};
