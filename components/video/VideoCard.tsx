import { ReactNode, useState } from 'react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import clsx from 'clsx';
import {
  ActionIcon,
  Anchor,
  Flex,
  Image,
  Loader,
  Pill,
  PillGroup,
  Stack,
  Title,
} from '@mantine/core';
import { formatTime } from '@/utils/formatTime';
import { ActionMenu } from '../action-menu/ActionMenu';
import { ScriptSelector } from '../selectors/ScriptSelector';
import { VideoSourceSelector } from '../selectors/VideoSourceSelector';
import styles from './VideoCard.module.css';

// Shared types that work for both local and API
export type VideoEntry = {
  id: string;
  title: string;
  duration?: number;
  thumbnail?: string;
  tags?: string[];
  defaultScriptId?: string;
  source?: string;
};

export type VideoSourceData = {
  id: string;
  url: string;
  status?: 'working' | 'broken' | 'unknown';
};

export type ScriptData = {
  id: string;
  url: string;
  name: string;
  creator: string;
  supportUrl?: string;
  avgSpeed?: number;
  maxSpeed?: number;
  actionCount?: number;
};

type VideoCardProps = {
  entry: VideoEntry;
  videoSources: VideoSourceData[];
  scripts: ScriptData[];
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onPlay?: (videoUrl: string, scriptId: string) => void;
  onScriptSelect?: (scriptId: string) => void;
  actionMenuItems?: ReactNode[];
  isLoading?: boolean;
};

export const VideoCard = ({
  entry,
  videoSources,
  scripts,
  isFavorite = false,
  onToggleFavorite,
  onPlay,
  onScriptSelect,
  actionMenuItems,
  isLoading = false,
}: VideoCardProps) => {
  const { title, thumbnail, duration, tags, source } = entry;
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(videoSources[0]?.url);
  const [selectedScriptId, setSelectedScriptId] = useState(scripts[0]?.id);

  const handleScriptSelect = (scriptId: string) => {
    setSelectedScriptId(scriptId);
    onScriptSelect?.(scriptId);
  };

  return (
    <div className={styles.videoContainer}>
      <div className={styles.imageContainer}>
        {onToggleFavorite && (
          <ActionIcon
            variant="filled"
            radius="xl"
            color="dark"
            aria-label="Toggle favorite"
            size={40}
            data-favorite={isFavorite}
            onClick={onToggleFavorite}
            className={styles.favoriteButton}
            bg={isFavorite ? 'var(--mantine-primary-color-6)' : 'rgba(41, 11, 29, 0.85)'}
          >
            {isFavorite ? <IconHeartFilled /> : <IconHeart />}
          </ActionIcon>
        )}

        <ActionMenu menuItems={actionMenuItems} />

        <Image
          src={thumbnail}
          alt={title}
          radius="lg"
          fallbackSrc={`https://placehold.co/400/DDD/333?font=roboto&text=${encodeURIComponent(title.slice(0, 25))}`}
        />

        <Stack className={styles.pillStack} gap={4}>
          {duration && (
            <Pill size="sm" aria-label="Video duration" w="fit-content">
              {formatTime(duration)}
            </Pill>
          )}
          {source && (
            <Flex gap={4}>
              <Pill size="sm" w="fit-content" style={{ textTransform: 'capitalize' }}>
                {source?.split('scraper:')[1] || 'Unknown Source'}
              </Pill>
              {source === 'scraper:ivdb' && (
                <Pill size="sm" w="fit-content">
                  The handy ONLY!
                </Pill>
              )}
            </Flex>
          )}
        </Stack>

        {onPlay && selectedVideoUrl && selectedScriptId && (
          <div className={styles.playButtonContainer}>
            {isLoading ? (
              <Loader className={styles.playButton} size="sm" color="white" />
            ) : (
              <Anchor
                href={selectedVideoUrl}
                c="white"
                className={styles.playButton}
                underline="never"
                target="_blank"
                onClick={(e) => {
                  e.preventDefault();
                  onPlay(selectedVideoUrl, selectedScriptId);
                }}
              >
                V
              </Anchor>
            )}
          </div>
        )}
      </div>

      <div className={clsx('box', styles.videoInfo)}>
        {!!onPlay && (
          <>
            <VideoSourceSelector videoSources={videoSources} onSelect={setSelectedVideoUrl} />
            <ScriptSelector scripts={scripts} entry={entry} onSelect={handleScriptSelect} />
          </>
        )}

        <Title size="lg" lineClamp={2} h={48} m={4} title={title}>
          {title}
        </Title>
        {tags && tags.length > 0 && (
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
