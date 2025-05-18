import { CSSProperties, ReactNode } from 'react';
import styles from './Box.module.css';

type BoxProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  m?: 't' | 'b' | 'l' | 'r' | 'x' | 'y' | 'all';
  p?: 'all';
  w?: 'full';
};

export const Box = ({ children, m, p, w, className, style }: BoxProps) => {
  return (
    <div
      className={`${styles.box} ${styles[`margin-${m}`]} ${styles[`padding-${p}`]} ${styles[`width-${w}`]} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};
