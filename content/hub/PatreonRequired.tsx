import { IconLock } from '@tabler/icons-react';
import { Center, Stack, Text, Title } from '@mantine/core';
import { PatreonConnectButton } from '@/components/patreon/PatreonConnectButton';

export const PatreonRequired = () => {
  return (
    <Center flex={1}>
      <Stack align="center" gap="lg" maw={500}>
        <IconLock size={64} />
        <Title order={2} fw={500} ta="center">
          Patreon subscription required!
        </Title>
        <Text ta="center" c="dimmed">
          Access to the cloud database requires an active Patreon subscription at the{' '}
          <strong>IVE Enjoyer</strong> tier or higher.
        </Text>
        <Text ta="center" size="sm" c="dimmed">
          Make sure to connect your Patreon account!
        </Text>
        <PatreonConnectButton size="lg" />
      </Stack>
    </Center>
  );
};
