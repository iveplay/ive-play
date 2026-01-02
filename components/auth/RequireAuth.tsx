import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import { Center, Loader } from '@mantine/core';

interface RequireAuthProps {
  children: ReactNode;
  fallbackUrl?: string;
}

export const RequireAuth = ({ children, fallbackUrl = '/hub' }: RequireAuthProps) => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push(fallbackUrl);
    }
  }, [isLoaded, isSignedIn, router, fallbackUrl]);

  if (!isLoaded) {
    return (
      <Center h="100%" flex={1}>
        <Loader size="lg" />
      </Center>
    );
  }

  return isSignedIn ? children : null;
};
