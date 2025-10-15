import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconBrandDiscord, IconBrandPatreon, IconHome, IconLogout2 } from '@tabler/icons-react';
import clsx from 'clsx';
import { AppShell, Box, Burger, Flex, Text } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { Logo } from '@/components/logo/Logo';
import { Filters } from '@/content/hub/Filters';
import { NewEntry } from '@/content/hub/NewEntry';
import { Videos } from '@/content/hub/videos/Videos';

const HubPage = () => {
  const { pathname } = useRouter();

  const [opened, { toggle }] = useDisclosure();

  const [header, setHeader] = useState<HTMLElement | null>(null);
  const [navbar, setNavbar] = useState<HTMLElement | null>(null);

  useClickOutside(
    () => {
      if (opened) {
        toggle();
      }
    },
    null,
    [header, navbar]
  );

  return (
    <AppShell
      className="hub-navbar"
      header={{ height: 96 }}
      navbar={{ width: 96, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      data-navbar-expanded={opened || undefined}
    >
      <AppShell.Header ref={setHeader} withBorder={false}>
        <Flex h={64} m="md" gap="md">
          <Burger
            opened={opened}
            onClick={toggle}
            size="md"
            className="box"
            p="lg"
            w={64}
            hiddenFrom="sm"
          />
          <Flex className="box menuItem" component={Link} href="/hub" justify="center">
            <Logo />
          </Flex>
          <Box className="box" flex={1} />
          <Filters />
          <Box className="box" w={64} />
          <NewEntry />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar ref={setNavbar} withBorder={false}>
        <Flex direction="column" px="md" pb="md" gap="md" h="100%">
          <Box
            className={clsx('box menuItem', { active: pathname === '/hub' })}
            component={Link}
            href="/hub"
            p={0}
            w={64}
            h={64}
          >
            <Flex direction="column" align="center" justify="center" h="64" gap="2">
              <IconHome color="var(--mantine-color-text)" className="menuItemIcon" />
              <Text size="xs" c="var(--mantine-color-text)" className="hoverText">
                Home
              </Text>
            </Flex>
          </Box>
          <div className="box h" />
          <Box
            className="box menuItem"
            component={Link}
            href="https://discord.gg/KsYCE4jRHE"
            p={0}
            w={64}
            h={64}
          >
            <Flex direction="column" align="center" justify="center" h="64" gap="2">
              <IconBrandDiscord color="var(--mantine-color-text)" className="menuItemIcon" />
              <Text size="xs" c="var(--mantine-color-text)" className="hoverText">
                Discord
              </Text>
            </Flex>
          </Box>
          <Box
            className="box menuItem"
            component={Link}
            href="https://patreon.com/iveplay"
            p={0}
            w={64}
            h={64}
          >
            <Flex direction="column" align="center" justify="center" h="64" gap="2">
              <IconBrandPatreon color="var(--mantine-color-text)" className="menuItemIcon" />
              <Text size="xs" c="var(--mantine-color-text)" className="hoverText">
                Patreon
              </Text>
            </Flex>
          </Box>
          <Box className="box menuItem" component={Link} href="/" p={0} w={64} h={64}>
            <Flex direction="column" align="center" justify="center" h="64" gap="2">
              <IconLogout2 color="var(--mantine-color-text)" className="menuItemIcon" />
              <Text size="xs" c="var(--mantine-color-text)" className="hoverText">
                Exit
              </Text>
            </Flex>
          </Box>
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main
        display="flex"
        mr="md"
        ml={{ base: opened ? '96px' : 'md', sm: 0 }}
        pb="md"
        style={{
          flexDirection: 'column',
          transition: 'all 200ms ease',
        }}
      >
        <Videos />
      </AppShell.Main>
    </AppShell>
  );
};

export default HubPage;
