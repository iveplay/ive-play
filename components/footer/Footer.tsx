import Link from 'next/link';
import { Box, Text } from '@mantine/core';
import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <Box component="footer" className="box w">
      <Text size="sm" c="dimmed" ta="center" className={styles.footerCopyRight}>
        <span>
          <span>© 2025 iveplay</span>
          <span>All rights reserved</span>
        </span>
        <span>
          <Text
            component="a"
            href="mailto:contact@iveplay.io"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Contact
          </Text>
          <Text
            component={Link}
            href="/privacy"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Privacy Policy
          </Text>
          <Text
            component="a"
            href="mailto:dmca@iveplay.io"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            DMCA
          </Text>
        </span>
      </Text>
    </Box>
  );
};
