import { useUser } from '@clerk/nextjs';
import { IconLock } from '@tabler/icons-react';
import { Button, Center, Loader, Stack, Text, Title, UnstyledButton } from '@mantine/core';
import { HubLayout } from '@/components/layout/HubLayout';
import { useAuthStore } from '@/store/useAuthStore';

const HubPage = () => {
  const { isLoaded, isSignedIn } = useUser();
  const openAuthModal = useAuthStore((state) => state.openAuthModal);

  if (!isLoaded) {
    return (
      <HubLayout>
        <Center h="100%" flex={1}>
          <Loader size="lg" />
        </Center>
      </HubLayout>
    );
  }

  if (!isSignedIn) {
    return (
      <HubLayout>
        <Center h="100%" className="box" flex={1}>
          <Stack align="center" gap="lg">
            <IconLock size={64} />
            <Title order={1} fw={300} ff="var(--font-frankfurter)">
              Sign in to access all Scripts!
            </Title>
            <Text c="dimmed" ta="center" maw={400}>
              Access the global script database, sync your library across devices, and discover new
              content.
            </Text>
            <Button radius="lg" size="lg" fw={500} onClick={() => openAuthModal('sign-in')}>
              Sign In
            </Button>
            <Text size="sm" c="dimmed">
              Don't have an account?{' '}
              <UnstyledButton onClick={() => openAuthModal('sign-up')}>
                <Text component="span" c="brand">
                  Sign up
                </Text>
              </UnstyledButton>
            </Text>
          </Stack>
        </Center>
      </HubLayout>
    );
  }

  // TODO: Phase 3 - Show cloud entries
  return (
    <HubLayout>
      <Center h="100%" className="box" flex={1}>
        <Text c="dimmed">Coming soon - browse the global script database</Text>
      </Center>
    </HubLayout>
  );
};

export default HubPage;
