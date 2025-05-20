import { Box, Text } from '@mantine/core';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <Box component="footer" className="box w">
      <Text size="sm" c="dimmed" ta="center" className={styles.footerCopyRight}>
        <span>
          <span>IVE</span>
          <span>Interactive Video Extension</span>
        </span>
        <span>
          <span>© 2025 iveplay</span>
          <span>All rights reserved</span>
        </span>
      </Text>
    </Box>
  );
};
