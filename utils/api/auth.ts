import { apiClient } from './client';

export type UserRole = 'user' | 'patreon' | 'creator' | 'admin';
export type PatreonTier =
  | '★ life enjoyer ★'
  | '★ toy enjoyer ★'
  | '★ ive enjoyer ★'
  | '★ extension enjoyer ★';

export interface UserInfo {
  userId: string;
  email: string | null;
  role: UserRole;
  patreonLinked: boolean;
  patreonTier: PatreonTier | null;
}

export interface DeleteAccountParams {
  deleteScripts?: boolean;
  confirmEmail?: string;
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
  deleteAccount({
    deleteScripts = false,
    confirmEmail = '',
  }: DeleteAccountParams): Promise<{ success: boolean }> {
    return apiClient.delete('/v1/auth/me', {
      deleteScripts,
      confirmEmail,
    });
  },
};
