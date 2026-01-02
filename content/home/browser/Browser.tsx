import { useState } from 'react';
import { IconPlayerPauseFilled, IconPlayerPlayFilled } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { Logo } from '@/components/logo/Logo';
import styles from './Browser.module.css';

export const Browser = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [count, setCount] = useState(0);

  switch (count) {
    case 5:
      notifications.show({
        title: 'Welcome to IVE play!',
        message: (
          <>
            Thank you for using our browser extension!
            <br />
            We hope you enjoy your experience.
          </>
        ),
        autoClose: false,
        radius: 16,
      });
      break;
    case 10:
      notifications.show({
        title: 'Enjoying IVE?',
        message: (
          <>
            You do know there are more sites to have fun with, right? You can always share them with
            us on our <a href="https://discord.gg/KsYCE4jRHE">Discord</a>?
          </>
        ),
        autoClose: false,
        radius: 16,
      });
      break;
    case 20:
      notifications.show({
        title: 'You must really like IVE!',
        message: (
          <>
            Have you considered supporting the project on our{' '}
            <a href="https://patreon.com/iveplay">Patreon</a>?
          </>
        ),
        autoClose: false,
        radius: 16,
      });
      break;
    case 50:
      notifications.show({
        title: 'You are a true IVE fan!',
        message: (
          <>
            Their will be no more notifications after this one, we promise! But if you want to
            support the project, you can always do so on our{' '}
            <a href="https://patreon.com/iveplay">Patreon</a>.
          </>
        ),
        autoClose: false,
        radius: 16,
      });
      break;
    default:
      break;
  }

  return (
    <div className={styles.browser}>
      <div className={styles.browserBar}>
        <div className={styles.browserIcon}>
          <div className={styles.dot} />
          <div className={styles.dot} />
          <div className={styles.dot} />
        </div>
        <div className={styles.browserTitle}>https://iveplay.io</div>
        <div className={styles.browserActions}>
          <Logo />
        </div>
      </div>
      <div className={styles.browserContent}>
        <div className={styles.player}>
          <button
            type="button"
            className={styles.playButton}
            onClick={() => {
              setIsPlaying(!isPlaying);
              setCount(count + 1);
            }}
          >
            {isPlaying ? (
              <IconPlayerPauseFilled size={48} color="var(--mantine-color-dark-3)" />
            ) : (
              <IconPlayerPlayFilled size={48} color="var(--mantine-color-dark-3)" />
            )}
          </button>
        </div>
        <div className={styles.extension}>
          <div className={styles.extensionInfo}>
            <div>
              Connected: <span>Handy</span>
            </div>
            <div>
              Status: <span>{isPlaying ? 'Playing' : 'Paused'}</span>
            </div>
          </div>
          <div className={styles.extensionConnect}>
            <button type="button">Handy</button>
            <button type="button">Intiface</button>
          </div>
        </div>
      </div>
    </div>
  );
};
