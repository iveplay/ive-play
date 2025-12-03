import Link from 'next/link';
import { Box, Burger, Button, Menu } from '@mantine/core';
import { Logo } from '../logo/Logo';
import styles from './Navigation.module.css';

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <Link href="/" className="box menuItem">
        <Logo />
      </Link>
      <div className="box h" />
      <Box component="ul" className="box" visibleFrom="md">
        <li>
          <Link href="/#download" className="menuItem">
            Download
          </Link>
        </li>
        <li>
          <Link href="/#features" className="menuItem">
            Features
          </Link>
        </li>
        <li>
          <Link href="/how-it-works" className="menuItem">
            How it works
          </Link>
        </li>
        <li>
          <Link href="/how-it-works" className="menuItem">
            FAQ / Support
          </Link>
        </li>
      </Box>
      <Menu shadow="lg" radius="lg" position="bottom-end">
        <Menu.Target>
          <Burger
            opened={false}
            onClick={undefined}
            size="md"
            className="box h"
            p="lg"
            w={64}
            hiddenFrom="md"
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item component={Link} href="/#download" className={styles.menuItem}>
            Download
          </Menu.Item>
          <Menu.Item component={Link} href="/#features" className={styles.menuItem}>
            Features
          </Menu.Item>
          <Menu.Item component={Link} href="/how-it-works" className={styles.menuItem}>
            How it works
          </Menu.Item>
          <Menu.Item component={Link} href="/how-it-works" className={styles.menuItem}>
            FAQ / Support
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <Button component={Link} href="/hub" radius="lg" size="lg" h="100%" fw={500}>
        Hub
      </Button>
    </nav>
  );
};
