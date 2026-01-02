import { ReactNode, useEffect } from 'react';
import { ClerkProvider, useAuth } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useShallow } from 'zustand/shallow';
import { useAuthStore } from '@/store/useAuthStore';
import { apiClient } from '@/utils/api/client';
import { AuthModal } from './AuthModal';

const CLERK_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;

/** Syncs Clerk auth with our API client and auth store */
const AuthSync = ({ children }: { children: React.ReactNode }) => {
  const { getToken, isSignedIn, isLoaded } = useAuth();
  const { fetchUser, clearUser } = useAuthStore(
    useShallow((state) => ({
      fetchUser: state.fetchUser,
      clearUser: state.clearUser,
    }))
  );

  useEffect(() => {
    // Set up the token getter for API client
    apiClient.setTokenGetter(async () => {
      return getToken();
    });
  }, [getToken]);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (isSignedIn) {
      // Fetch user info from our API
      fetchUser();
    } else {
      clearUser();
    }
  }, [isSignedIn, isLoaded, fetchUser, clearUser]);

  return <>{children}</>;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#b22a8c',
          colorBackground: '#1a1b1e',
        },
      }}
    >
      <AuthSync>
        {children}
        <AuthModal />
      </AuthSync>
    </ClerkProvider>
  );
};
