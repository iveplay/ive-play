import {
  IconActivityHeartbeat,
  IconBrandSpeedtest,
  IconDotsVertical,
  IconGauge,
  IconHeart,
  IconHeartFilled,
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import clsx from 'clsx';
import { ActionIcon, Anchor, Flex, Image, Menu, Pill, PillGroup, Title } from '@mantine/core';
import { formatTime } from '@/utils/formatTime';
import styles from './Video.module.css';

type VideoProps = {
  href: string;
  title: string;
  imageUrl?: string;
  duration?: number;
  actions?: number;
  averageSpeed?: number;
  maxSpeed?: number;
  creator?: string;
  creatorUrl?: string;
  tags?: string[];
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  onDelete?: () => void;
};

export const Video = ({
  href,
  title,
  imageUrl,
  duration,
  actions,
  averageSpeed,
  maxSpeed,
  creator,
  creatorUrl,
  tags,
  isFavorite,
  onFavoriteToggle,
  onDelete,
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
          onClick={onFavoriteToggle}
          className={styles.favoriteButton}
          bg={isFavorite ? 'var(--mantine-primary-color-6)' : 'gray'}
        >
          {isFavorite ? <IconHeartFilled /> : <IconHeart />}
        </ActionIcon>
        <ActionMenu onDelete={onDelete} />
        <Image
          src={imageUrl}
          alt={title}
          radius="lg"
          fallbackSrc={`https://placehold.co/400/DDD/333?font=roboto&text=${title}`}
        />
        <PillGroup className={styles.stats}>
          {duration && (
            <Pill size="sm" aria-label="Video duration">
              {formatTime(duration ?? 0)}
            </Pill>
          )}
          <div>
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
            {averageSpeed && (
              <Pill
                size="sm"
                aria-label="Average speed"
                style={{
                  paddingLeft: 6,
                }}
              >
                <IconBrandSpeedtest size="14" />
                {averageSpeed}
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
          </div>
        </PillGroup>
        <div className={styles.playButtonContainer}>
          <Anchor
            href={href}
            c="white"
            className={styles.playButton}
            underline="never"
            target="_blank"
          >
            V
          </Anchor>
        </div>
      </div>
      <div className={clsx('box', styles.videoInfo)}>
        <Flex justify="space-between" align="center" h={16}>
          {(creator && creatorUrl && (
            <Anchor href={creatorUrl} c="gray" size="xs" className={styles.creator} target="_blank">
              <IconUser size={12} />
              {creator}
            </Anchor>
          )) ?? <div />}
          {domain && (
            <Anchor href={href} c="gray" size="xs" className={styles.domain} target="_blank">
              {domain}
            </Anchor>
          )}
        </Flex>
        <Title size="lg" lineClamp={2} h={48} title={title}>
          {title}
        </Title>
        {tags && (
          <PillGroup className={styles.tags} h={18}>
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

type ActionMenuProps = {
  onDelete?: () => void;
};

const ActionMenu = ({ onDelete }: ActionMenuProps) => {
  return (
    <Menu
      position="bottom-end"
      offset={4}
      classNames={{ dropdown: styles.menuDropdown, item: styles.menuItem }}
    >
      <Menu.Target>
        <ActionIcon
          variant="filled"
          radius="xl"
          color="rgba(41, 11, 29, 0.85)"
          aria-label="Toggle menu"
          size={40}
          className={styles.menuButton}
        >
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconTrash size={14} />} onClick={onDelete}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
