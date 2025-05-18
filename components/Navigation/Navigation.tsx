import { Box } from '../Box/Box';
import { Logo } from '../Logo/Logo';
import styles from './Navigation.module.css';

export const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <Box p="all">
        <Logo />
      </Box>
      <Box w="full" m="x" />
      <Box>
        <ul className={styles.menu}>
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
      </Box>
    </nav>
  );
};
