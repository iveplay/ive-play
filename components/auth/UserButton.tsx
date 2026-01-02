import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import { IconUser } from '@tabler/icons-react';
import { clsx } from 'clsx';
import { Avatar, Box, Flex, Group, Loader, Text, UnstyledButton } from '@mantine/core';
import { useAuthStore } from '@/store/useAuthStore';

export const UserButton = () => {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const { pathname } = useRouter();
  const openAuthModal = useAuthStore((state) => state.openAuthModal);

  if (!isLoaded) {
    return (
      <Flex w={64} h={64} className="box menuItem" align="center" justify="center">
        <Loader size="sm" />
      </Flex>
    );
  }

  if (!isSignedIn) {
    return (
      <UnstyledButton className="box menuItem" p="md" onClick={() => openAuthModal('sign-in')}>
        <Group gap="xs">
          <IconUser size={20} />
          <Text size="sm">Sign In</Text>
        </Group>
      </UnstyledButton>
    );
  }

  return (
    <Box
      className={clsx('box menuItem', { active: pathname === '/hub/me/settings' })}
      component={Link}
      href="/hub/me/settings"
      p={0}
      w={64}
      h={64}
    >
      <Flex
        direction="column"
        align="center"
        c="var(--mantine-color-text)"
        justify="center"
        h="64"
        gap="2"
      >
        <Avatar
          src={clerkUser?.imageUrl}
          alt={clerkUser?.username || 'User'}
          radius="xl"
          size="sm"
        />
        <Text size="xs" className="hoverText">
          {clerkUser?.username || 'Profile'}
        </Text>
      </Flex>
    </Box>
  );
};
