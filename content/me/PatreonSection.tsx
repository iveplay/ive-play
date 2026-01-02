import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { IconBrandPatreon, IconUnlink } from '@tabler/icons-react';
import { useShallow } from 'zustand/shallow';
import { Button, Card, Center, Group, Loader, Stack, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useAuthStore } from '@/store/useAuthStore';
import { authApi } from '@/utils/api/auth';

export const PatreonSection = () => {
  const router = useRouter();
  const [patreonLoading, setPatreonLoading] = useState(false);

  const { user, isLoading, fetchUser } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      isLoading: state.isLoading,
      fetchUser: state.fetchUser,
    }))
  );

  useEffect(() => {
    const { patreon, tier, reason } = router.query;

    if (patreon === 'success') {
      notifications.show({
        title: 'Patreon Connected!',
        message: tier ? `Welcome, ${tier} tier patron!` : 'Your account is now linked.',
        color: 'green',
      });
      fetchUser();
      router.replace('/hub/me/settings', undefined, { shallow: true });
    } else if (patreon === 'error') {
      notifications.show({
        title: 'Patreon Connection Failed',
        message: reason?.toString() || 'Something went wrong. Please try again.',
        color: 'red',
      });
      router.replace('/hub/me/settings', undefined, { shallow: true });
    }
  }, [router.query, fetchUser, router]);

  const handlePatreonConnect = async () => {
    if (!user) {
      return;
    }

    setPatreonLoading(true);
    try {
      const { url } = await authApi.getPatreonConnectUrl();
      router.push(url);
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: 'Failed to start Patreon connection',
        color: 'red',
      });
      setPatreonLoading(false);
    }
  };

  const handlePatreonDisconnect = async () => {
    setPatreonLoading(true);
    try {
      await authApi.disconnectPatreon();
      await fetchUser();
      notifications.show({
        title: 'Patreon Disconnected',
        message: 'Your Patreon account has been unlinked.',
        color: 'blue',
      });
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: 'Failed to disconnect Patreon',
        color: 'red',
      });
    } finally {
      setPatreonLoading(false);
    }
  };

  return (
    <Card className="box" p="md">
      <Stack gap="md">
        <Title order={4}>Patreon</Title>
        {isLoading && (
          <Center>
            <Loader />
          </Center>
        )}
        {!isLoading && user?.patreonLinked && (
          <Group justify="space-between">
            <div>
              <Text fw={500} c="green">
                Connected
              </Text>
              <Text fw={700}>{user.patreonTier || 'None'}</Text>
            </div>
            <Button
              variant="subtle"
              color="red"
              radius="lg"
              leftSection={<IconUnlink size={16} />}
              loading={patreonLoading}
              onClick={handlePatreonDisconnect}
            >
              Disconnect
            </Button>
          </Group>
        )}
        {!isLoading && !user?.patreonLinked && (
          <>
            <Text>Connect your Patreon account to unlock all premium features.</Text>
            <Button
              w="fit-content"
              radius="lg"
              size="md"
              leftSection={<IconBrandPatreon size={18} />}
              loading={patreonLoading}
              onClick={handlePatreonConnect}
            >
              Connect Patreon
            </Button>
          </>
        )}
      </Stack>
    </Card>
  );
};
