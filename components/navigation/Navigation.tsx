import Link from 'next/link';
import clsx from 'clsx';
import { Button } from '@mantine/core';
import { Logo } from '../logo/Logo';
import styles from './Navigation.module.css';

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <Link href="/" className={clsx('box', styles.menuItem)}>
        <Logo />
      </Link>
      <div className="box" />
      <ul className="box">
        <li>
          <Link href="/#download" className={styles.menuItem}>
            Download
          </Link>
        </li>
        <li>
          <Link href="/#features" className={styles.menuItem}>
            Features
          </Link>
        </li>
        <li>
          <Link href="/#support" className={styles.menuItem}>
            Support
          </Link>
        </li>
      </ul>
      {process.env.NODE_ENV === 'development' && (
        <Button component={Link} href="/hub" radius="lg" size="lg" h="100%" fw={500}>
          Hub
        </Button>
      )}
    </nav>
  );
};
