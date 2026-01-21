import { useState } from 'react';
import { useRouter } from 'next/router';
import { IconBrandPatreon } from '@tabler/icons-react';
import { useShallow } from 'zustand/shallow';
import { Button, ButtonProps } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useAuthStore } from '@/store/useAuthStore';
import { authApi } from '@/utils/api/auth';

export const PatreonConnectButton = ({ size }: { size?: ButtonProps['size'] }) => {
  const router = useRouter();
  const [patreonLoading, setPatreonLoading] = useState(false);

  const { user } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      isLoading: state.isLoading,
      fetchUser: state.fetchUser,
    }))
  );

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

  return (
    <Button
      w="fit-content"
      radius="lg"
      size={size ?? 'md'}
      leftSection={<IconBrandPatreon size={18} />}
      loading={patreonLoading}
      onClick={handlePatreonConnect}
    >
      Connect Patreon
    </Button>
  );
};
