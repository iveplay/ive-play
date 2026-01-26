import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useClerk, useUser } from '@clerk/nextjs';
import {
  IconBrandDiscord,
  IconBrandPatreon,
  IconDatabase,
  IconDotsVertical,
  IconHome,
  IconLogout2,
  IconX,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { AppShell, Box, Burger, Button, Flex, Text, UnstyledButton } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { UserButton } from '@/components/auth/UserButton';
import { Logo } from '@/components/logo/Logo';
import styles from './HubLayout.module.css';

type NavItem = {
  href: string;
  icon: ReactNode;
  label: string;
  external?: boolean;
};

type HubLayoutProps = {
  children: ReactNode;
  headerContent?: ReactNode;
  headerCenter?: ReactNode;
};

const navItems: NavItem[] = [
  { href: '/hub', icon: <IconHome />, label: 'Hub' },
  { href: '/hub/local', icon: <IconDatabase />, label: 'Local' },
];

const bottomNavItems: NavItem[] = [
  {
    href: 'https://discord.gg/KsYCE4jRHE',
    icon: <IconBrandDiscord />,
    label: 'Discord',
    external: true,
  },
  {
    href: 'https://patreon.com/iveplay',
    icon: <IconBrandPatreon />,
    label: 'Patreon',
    external: true,
  },
];

const ASIDE_BREAKPOINT = 'md';

export const HubLayout = ({ children, headerContent, headerCenter }: HubLayoutProps) => {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure();
  const [asideOpened, { toggle: toggleAside }] = useDisclosure();
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [header, setHeader] = useState<HTMLElement | null>(null);
  const [navbar, setNavbar] = useState<HTMLElement | null>(null);
  const [aside, setAside] = useState<HTMLElement | null>(null);

  useClickOutside(
    (e) => {
      if (opened) {
        toggle();
        e.stopPropagation();
      }
    },
    null,
    [header, navbar]
  );

  useClickOutside(
    (e) => {
      if (asideOpened) {
        toggleAside();
        e.stopPropagation();
      }
    },
    null,
    [header, aside]
  );

  return (
    <AppShell
      className="hub-navbar"
      header={{ height: 96 }}
      navbar={{ width: 96, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      aside={{ width: 96, breakpoint: ASIDE_BREAKPOINT, collapsed: { mobile: !asideOpened } }}
      data-navbar-expanded={opened || undefined}
      data-aside-expanded={asideOpened || undefined}
    >
      <AppShell.Header ref={setHeader} withBorder={false} className="hub-navbar-header">
        <Flex h={64} m="md" gap="md" align="center">
          <Burger
            opened={opened}
            onClick={() => {
              toggle();
              asideOpened && toggleAside();
            }}
            size="md"
            className="box h"
            p="lg"
            w={64}
            hiddenFrom="sm"
          />
          <Flex className="box menuItem" flex="0 1 0" component={Link} href="/hub" justify="center">
            <Logo />
          </Flex>
          <Box className="box h" flex={1} visibleFrom="sm">
            {headerCenter}
          </Box>
          <Box className="box h" flex={1} hiddenFrom="sm" />
          <Flex gap="md" visibleFrom={headerContent ? ASIDE_BREAKPOINT : undefined}>
            {headerContent}
            <UserButton />
          </Flex>
          {headerContent && (
            <Button
              onClick={() => {
                toggleAside();
                opened && toggle();
              }}
              size="md"
              className="box h"
              p="lg"
              w={64}
              hiddenFrom={ASIDE_BREAKPOINT}
            >
              {asideOpened ? (
                <IconX style={{ transform: 'scale(1.5)' }} stroke={1.5} />
              ) : (
                <IconDotsVertical size={24} />
              )}
            </Button>
          )}
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar ref={setNavbar} withBorder={false} className={styles.navbar}>
        <Flex direction="column" px="md" pb="md" gap="md" h="100%">
          {navItems.map((item) => (
            <MenuItem key={item.href} item={item} />
          ))}
          <div className="box h" />
          {bottomNavItems.map((item) => (
            <MenuItem key={item.href} item={item} />
          ))}
          <UnstyledButton
            className="box menuItem"
            p={0}
            w={64}
            h={64}
            onClick={() => (isSignedIn ? signOut({ redirectUrl: '/' }) : router.push('/'))}
          >
            <Flex
              direction="column"
              align="center"
              c="var(--mantine-color-text)"
              justify="center"
              h="64"
              gap="2"
            >
              <IconLogout2 />
              <Text size="xs" className="hoverText">
                Sign Out
              </Text>
            </Flex>
          </UnstyledButton>
        </Flex>
      </AppShell.Navbar>

      {headerContent && (
        <AppShell.Aside
          ref={setAside}
          withBorder={false}
          hiddenFrom={ASIDE_BREAKPOINT}
          w="96"
          className={styles.aside}
        >
          <Flex direction="column" px="md" pb="md" gap="md" h="100%">
            <UserButton />
            {headerContent}
            <div className="box h" />
          </Flex>
        </AppShell.Aside>
      )}

      <AppShell.Main
        display="flex"
        mr="md"
        ml={{ base: 'md', sm: 0 }}
        pb="md"
        style={{
          flexDirection: 'column',
          transition: 'all 200ms ease',
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

const MenuItem = ({ item }: { item: NavItem }) => {
  const { pathname } = useRouter();

  return (
    <Box
      key={item.href}
      className={clsx('box menuItem', { active: pathname === item.href })}
      component={Link}
      href={item.href}
      target={item.external ? '_blank' : undefined}
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
        {item.icon}
        <Text size="xs" className="hoverText">
          {item.label}
        </Text>
      </Flex>
    </Box>
  );
};
