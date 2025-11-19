import { useState } from 'react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import clsx from 'clsx';
import { useShallow } from 'zustand/shallow';
import { ActionIcon, Anchor, Image, Pill, PillGroup, Title } from '@mantine/core';
import { useIveStore } from '@/store/useIveStore';
import { formatTime } from '@/utils/formatTime';
import { iveBridge, IveEntry, ScriptMetadata, VideoSource } from '@/utils/iveBridge';
import { ActionMenu } from './ActionMenu';
import { ScriptSelector } from './ScriptSelector';
import { VideoSourceSelector } from './VideoSourceSelector';
import styles from './Video.module.css';

type VideoProps = {
  entry: IveEntry;
  videoSources: VideoSource[];
  scripts: ScriptMetadata[];
};

export const Video = ({ entry, videoSources, scripts }: VideoProps) => {
  const { id, title, thumbnail, duration, tags } = entry;
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(videoSources[0]?.url);
  const [selectedScriptId, setSelectedScriptId] = useState(scripts[0]?.id);

  const { favoriteIds, toggleFavorite } = useIveStore(
    useShallow((state) => ({
      favoriteIds: state.favoriteIds,
      toggleFavorite: state.toggleFavorite,
    }))
  );

  const isFavorite = favoriteIds.has(entry.id);

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
          onClick={() => toggleFavorite(entry.id)}
          className={styles.favoriteButton}
          bg={isFavorite ? 'var(--mantine-primary-color-6)' : 'rgba(41, 11, 29, 0.85)'}
        >
          {isFavorite ? <IconHeartFilled /> : <IconHeart />}
        </ActionIcon>
        <ActionMenu entryId={id} entry={entry} videoSources={videoSources} scripts={scripts} />
        <Image
          src={thumbnail}
          alt={title}
          radius="lg"
          fallbackSrc={`https://placehold.co/400/DDD/333?font=roboto&text=${title.slice(0, 25)}`}
        />
        {duration && (
          <Pill size="sm" aria-label="Video duration" className={styles.duration}>
            {formatTime(duration ?? 0)}
          </Pill>
        )}
        <div className={styles.playButtonContainer}>
          <Anchor
            href={selectedVideoUrl}
            c="white"
            className={styles.playButton}
            underline="never"
            target="_blank"
            onClick={async () => {
              await iveBridge.selectScript(selectedScriptId!, Date.now());
              window.open(selectedVideoUrl, '_blank');
            }}
          >
            V
          </Anchor>
        </div>
      </div>
      <VideoSourceSelector videoSources={videoSources} onSelect={setSelectedVideoUrl} />
      <ScriptSelector scripts={scripts} entry={entry} onSelect={setSelectedScriptId} />
      <div className={clsx('box', styles.videoInfo)}>
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
