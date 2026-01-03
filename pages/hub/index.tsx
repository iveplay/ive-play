import { useUser } from '@clerk/nextjs';
import { IconLock } from '@tabler/icons-react';
import { Button, Center, Group, Loader, Stack, Text, Title } from '@mantine/core';
import { HubLayout } from '@/components/layout/HubLayout';
import { CloudVideos } from '@/content/hub/CloudVideos';
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
            <Text ta="center" maw={400}>
              Access the global script database, sync your library across devices, and discover new
              content.
            </Text>
            <Text ta="center" maw={450}>
              All current features are locked behind patreon <strong>IVE Enjoyer</strong> tier. Make
              sure to connect your account after signing up!
            </Text>
            <Group>
              <Button radius="lg" size="lg" fw={500} onClick={() => openAuthModal('sign-in')}>
                Sign In
              </Button>
              <Button
                radius="lg"
                size="lg"
                variant="outline"
                fw={500}
                onClick={() => openAuthModal('sign-up')}
              >
                Sign Up
              </Button>
            </Group>
          </Stack>
        </Center>
      </HubLayout>
    );
  }

  return (
    <HubLayout>
      <CloudVideos />
    </HubLayout>
  );
};

export default HubPage;
