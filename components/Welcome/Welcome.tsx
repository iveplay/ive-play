import clsx from 'clsx';
import { Button, Group, Text, Title } from '@mantine/core';
import { Browser } from '../Browser/Browser';
import { Logo } from '../Logo/Logo';
import styles from './Welcome.module.css';

export const Welcome = () => {
  return (
    <section className={clsx(styles.welcome)}>
      <div className={clsx(styles.welcomeContent, 'box w')}>
        <Logo size={96} />
        <Title order={1} ta="center" fw={500}>
          Interactive Video Extension
        </Title>
        <Text size="lg" ta="center" maw="80%">
          Control your haptic devices directly from your browser and sync with your favorite videos
          on any site!
        </Text>
        <Group align="center" justify="center">
          <Button radius="lg" size="lg" component="a" href="#download" fw={500}>
            Download Now
          </Button>
          <Button radius="lg" size="lg" component="a" href="#features" fw={500}>
            Learn More
          </Button>
        </Group>
      </div>
      <Browser />
    </section>
  );
};
