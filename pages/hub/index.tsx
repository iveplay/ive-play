import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IconHome, IconLogout2 } from '@tabler/icons-react';
import clsx from 'clsx';
import { AppShell, Box, Burger, Flex } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { Logo } from '@/components/logo/Logo';
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
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar ref={setNavbar} withBorder={false}>
        <Flex direction="column" px="md" pb="md" gap="md" h="100%">
          <Box
            className={clsx('box menuItem', { active: pathname === '/hub' })}
            component={Link}
            href="/hub"
            p="lg"
            w={64}
            h={64}
          >
            <IconHome color="var(--mantine-color-text)" />
          </Box>
          <div className="box h" />
          <Box className="box menuItem" component={Link} href="/" p="lg" w={64} h={64}>
            <IconLogout2 color="var(--mantine-color-text)" />
          </Box>
        </Flex>
      </AppShell.Navbar>
      <AppShell.Main
        mr="md"
        mb="md"
        ml={{ base: opened ? '96px' : 'md', sm: 0 }}
        style={{
          transition: 'all 200ms ease',
        }}
      >
        <Videos />
      </AppShell.Main>
    </AppShell>
  );
};

export default HubPage;
