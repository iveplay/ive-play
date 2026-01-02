import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useClerk, useUser } from '@clerk/nextjs';
import {
  IconBrandDiscord,
  IconBrandPatreon,
  IconDatabase,
  IconHome,
  IconLogout2,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { AppShell, Box, Burger, Flex, Text, UnstyledButton } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { UserButton } from '@/components/auth/UserButton';
import { Logo } from '@/components/logo/Logo';

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

export const HubLayout = ({ children, headerContent, headerCenter }: HubLayoutProps) => {
  const router = useRouter();
  const [opened, { toggle }] = useDisclosure();
  const { isSignedIn } = useUser();
  const { signOut } = useClerk();
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
      <AppShell.Header ref={setHeader} withBorder={false} className="hub-navbar-header">
        <Flex h={64} m="md" gap="md" wrap="wrap">
          <Burger
            opened={opened}
            onClick={toggle}
            size="md"
            className="box h"
            p="lg"
            w={64}
            hiddenFrom="sm"
          />
          <Flex className="box menuItem" component={Link} href="/hub" justify="center">
            <Logo />
          </Flex>
          <Box className="box h" flex={1}>
            {headerCenter}
          </Box>
          {headerContent}
          <UserButton />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar ref={setNavbar} withBorder={false}>
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
