import { IconEdit, IconTrash } from '@tabler/icons-react';
import { useShallow } from 'zustand/shallow';
import { Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { VideoCard } from '@/components/video/VideoCard';
import { EditEntry } from '@/content/local/videos/EditEntry';
import { useIveStore } from '@/store/useIveStore';
import { iveBridge, IveEntry, ScriptMetadata, VideoSource } from '@/utils/iveBridge';

type VideoProps = {
  entry: IveEntry;
  videoSources: VideoSource[];
  scripts: ScriptMetadata[];
};

export const Video = ({ entry, videoSources, scripts }: VideoProps) => {
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);

  const { favoriteIds, toggleFavorite, deleteEntry } = useIveStore(
    useShallow((state) => ({
      favoriteIds: state.favoriteIds,
      toggleFavorite: state.toggleFavorite,
      deleteEntry: state.deleteEntry,
    }))
  );

  const isFavorite = favoriteIds.has(entry.id);

  const handlePlay = async (videoUrl: string, scriptId: string) => {
    await iveBridge.selectScript(scriptId, Date.now());
    window.open(videoUrl, '_blank');
  };

  return (
    <>
      <VideoCard
        entry={entry}
        videoSources={videoSources}
        scripts={scripts}
        isFavorite={isFavorite}
        onToggleFavorite={() => toggleFavorite(entry.id)}
        onPlay={handlePlay}
        actionMenuItems={[
          <Menu.Item leftSection={<IconEdit size={14} />} onClick={openEdit}>
            Edit
          </Menu.Item>,
          <Menu.Item leftSection={<IconTrash size={14} />} onClick={() => deleteEntry(entry.id)}>
            Delete
          </Menu.Item>,
        ]}
      />
      <EditEntry
        opened={editOpened}
        onClose={closeEdit}
        entry={entry}
        videoSources={videoSources}
        scripts={scripts}
      />
    </>
  );
};
