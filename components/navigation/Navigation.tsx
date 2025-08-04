import { Logo } from '../logo/Logo';
import styles from './Navigation.module.css';

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <a href="/" className="box">
        <Logo />
      </a>
      <div className="box w" />
      <ul className="box">
        <li>
          <a href="#download">Download</a>
        </li>
        <li>
          <a href="#features">Features</a>
        </li>
        <li>
          <a href="#support">Support</a>
        </li>
      </ul>
    </nav>
  );
};
