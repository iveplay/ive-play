import {
  IconActivityHeartbeat,
  IconGauge,
  IconHeart,
  IconHeartFilled,
  IconUser,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { ActionIcon, Anchor, Button, Flex, Image, Pill, PillGroup, Title } from '@mantine/core';
import { formatTime } from '@/utils/formatTime';
import styles from './Video.module.css';

type VideoProps = {
  href: string;
  title: string;
  imageUrl: string;
  duration?: number;
  actions?: number;
  maxSpeed?: number;
  creator?: string;
  creatorUrl?: string;
  tags?: string[];
  isFavorite?: boolean;
};

export const Video = ({
  href,
  title,
  imageUrl,
  duration,
  actions,
  maxSpeed,
  creator,
  creatorUrl,
  tags,
  isFavorite,
}: VideoProps) => {
  const domain = (() => {
    try {
      return new URL(href)?.hostname.replace('www.', '');
    } catch {
      return undefined;
    }
  })();

  return (
    <div className={styles.videoContainer}>
      <div className={styles.imageContainer}>
        <ActionIcon
          variant="filled"
          radius="xl"
          color="dark"
          aria-label="Toggle favorite"
          size={40}
          data-favorite={isFavorite}
          className={styles.favoriteButton}
          bg={isFavorite ? 'var(--mantine-primary-color-6)' : 'gray'}
        >
          {isFavorite ? <IconHeartFilled /> : <IconHeart />}
        </ActionIcon>
        <Image src={imageUrl} alt={title} radius="lg" />
        <PillGroup className={styles.stats}>
          <Pill size="sm" aria-label="Duration">
            {formatTime(duration ?? 0)}
          </Pill>
          {actions && (
            <Pill
              size="sm"
              aria-label="Number of actions"
              style={{
                paddingLeft: 6,
              }}
            >
              <IconActivityHeartbeat size="14" />
              {actions}
            </Pill>
          )}
          {maxSpeed && (
            <Pill
              size="sm"
              aria-label="Max speed"
              style={{
                paddingLeft: 6,
              }}
            >
              <IconGauge size="14" />
              {maxSpeed}
            </Pill>
          )}
        </PillGroup>
        <div className={styles.playButtonContainer}>
          <Button c="white" className={styles.playButton}>
            V
          </Button>
        </div>
      </div>
      <div className={clsx('box', styles.videoInfo)}>
        <Flex justify="space-between" align="center">
          {(creator && creatorUrl && (
            <Anchor href={creatorUrl} c="gray" size="xs" className={styles.creator}>
              <IconUser size={12} />
              {creator}
            </Anchor>
          )) ?? <div />}
          {domain && (
            <Anchor href={href} c="gray" size="xs" className={styles.domain}>
              {domain}
            </Anchor>
          )}
        </Flex>
        <Title size="lg" lineClamp={2}>
          {title}
        </Title>
        {tags && (
          <PillGroup className={styles.tags}>
            {tags.map((tag) => (
              <Pill size="xs" key={tag}>
                {tag}
              </Pill>
            ))}
          </PillGroup>
        )}
      </div>
    </div>
  );
};
