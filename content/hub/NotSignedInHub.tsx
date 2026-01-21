import Link from 'next/link';
import {
  IconBrandPatreon,
  IconCheck,
  IconCloud,
  IconDatabase,
  IconLock,
} from '@tabler/icons-react';
import { Badge, Box, Button, Card, Center, Grid, Group, Stack, Text, Title } from '@mantine/core';
import { useAuthStore } from '@/store/useAuthStore';

const features = [
  {
    icon: <IconCloud size={64} />,
    title: 'Global Script Database',
    description: 'Access and play thousands of scripts directly from the cloud database',
    requiresPatreon: true,
  },
  {
    icon: <IconDatabase size={64} />,
    title: 'Local Storage',
    description: 'Store and manage scripts locally without an account',
    requiresPatreon: false,
  },
];

const patreonBenefits = [
  'Full access to the global script database',
  'Priority support on Discord',
  'Early access to new features',
  'Support ongoing development',
];

export const NotSignedInHub = () => {
  const openAuthModal = useAuthStore((state) => state.openAuthModal);

  return (
    <Center h="100%" flex={1}>
      <Stack align="center" maw={1000} w="100%" px="md">
        {/* Hero Section */}
        <div>
          <Title order={1} fw={300} ff="var(--font-frankfurter)" ta="center" mt="lg" size={64}>
            IVE Hub
          </Title>
          <Text ta="center" size="lg" c="dimmed" maw={600}>
            Your central hub for interactive video scripts. Access the global database or use local
            storage without an account.
          </Text>
        </div>

        {/* Features Grid */}
        <Grid gutter="md" w="100%" mt="md">
          {features.map((feature) => (
            <Grid.Col key={feature.title} span={{ base: 12, sm: 6 }}>
              <Card className="box" h="100%" p="xl" pos="relative">
                {feature.requiresPatreon && (
                  <Badge
                    pos="absolute"
                    h={24}
                    top={12}
                    right={12}
                    leftSection={<IconLock size={12} />}
                  >
                    Patreon Required
                  </Badge>
                )}
                <Stack align="center" gap="0">
                  <Box c="var(--mantine-color-text)">{feature.icon}</Box>
                  <Title order={4} fw={500} ta="center">
                    {feature.title}
                  </Title>
                  <Text ta="center" mt="sm" size="sm" c="dimmed">
                    {feature.description}
                  </Text>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {/* Patreon Upsell Section */}
        <Card className="box" w="100%" p="xl">
          <Stack gap="lg">
            <Stack align="center" gap="0">
              <IconBrandPatreon size={64} />
              <Title order={2} fw={500} ta="center">
                Unlock premium features
              </Title>
              <Text ta="center" c="dimmed" mt="sm">
                Get full access to the cloud database by becoming an <strong>IVE Enjoyer</strong> on
                Patreon
              </Text>
            </Stack>

            <Stack align="center" gap="xs">
              {patreonBenefits.map((benefit) => (
                <Group key={benefit} gap="sm" wrap="nowrap">
                  <IconCheck size={20} style={{ flexShrink: 0 }} />
                  <Text size="sm">{benefit}</Text>
                </Group>
              ))}
            </Stack>
            <Center mt="md">
              <Button
                component={Link}
                w="fit-content"
                radius="lg"
                size="lg"
                leftSection={<IconBrandPatreon size={18} />}
                href="https://www.patreon.com/iveplay"
                target="_blank"
                rel="noopener noreferrer"
              >
                Become Patreon
              </Button>
            </Center>
          </Stack>
        </Card>

        {/* Auth Section */}
        <Stack align="center" gap="md" mt="md">
          <Text size="sm" c="dimmed">
            Already a patron? Sign in to connect your account
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

        {/* Local Access Note */}
        <Text size="xs" c="dimmed" ta="center" maw={500}>
          You can still use the local database features without an account by visiting the Local
          section
        </Text>
      </Stack>
    </Center>
  );
};
