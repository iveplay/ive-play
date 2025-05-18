import clsx from 'clsx';
import styles from './Logo.module.css';

type LogoProps = {
  className?: string;
};

export const Logo = ({ className }: LogoProps) => (
  <span className={clsx(styles.logo, className)}>IVE</span>
);
