import Link from 'next/link';
import { Button, Flex, Group, Text, Title } from '@mantine/core';
import { Logo } from '../../../components/logo/Logo';
import { Browser } from '../browser/Browser';
import styles from './Welcome.module.css';

export const Welcome = () => {
  return (
    <section className={styles.welcome}>
      <Flex
        className="box w"
        p={{ base: '32px', md: '64px' }}
        direction="column"
        align="center"
        justify="center"
        gap="xl"
      >
        <Logo size={96} />
        <Title order={1} ta="center">
          Interactive Video Experience
        </Title>
        <Text size="lg" ta="center" maw="80%">
          Control your haptic devices directly from your browser and sync with your favorite videos
          on any site!
        </Text>
        <Group align="center" justify="center">
          <Button radius="lg" size="lg" component={Link} href="/#download" fw={500}>
            Download Now
          </Button>
          <Button radius="lg" size="lg" component={Link} href="/#features" fw={500}>
            Learn More
          </Button>
        </Group>
      </Flex>
      <Browser />
    </section>
  );
};
