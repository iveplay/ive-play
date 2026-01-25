import { useState } from 'react';
import { IconDownload } from '@tabler/icons-react';
import { Menu } from '@mantine/core';
import { ScriptData, VideoCard, VideoEntry, VideoSourceData } from '@/components/video/VideoCard';
import { useIveStore } from '@/store/useIveStore';
import { iveBridge } from '@/utils/iveBridge';

type CloudVideoProps = {
  entry: VideoEntry;
  videoSources: VideoSourceData[];
  scripts: ScriptData[];
};

export const CloudVideo = ({ entry, videoSources, scripts }: CloudVideoProps) => {
  const extensionAvailable = useIveStore((state) => state.extensionAvailable);

  const [selectedScriptId, setSelectedScriptId] = useState(scripts[0]?.id);
  const [isPlayLoading, setIsPlayLoading] = useState(false);
  const selectedScript = scripts.find((s) => s.id === selectedScriptId) || scripts[0];

  const handlePlay = async (videoUrl: string, scriptId: string) => {
    // Save to local IveDB via bridge and select script for playback
    if (!extensionAvailable) {
      window.open(videoUrl, '_blank');
      return;
    }

    setIsPlayLoading(true);
    try {
      await iveBridge.saveAndPlay({
        entry: {
          title: entry.title,
          duration: entry.duration,
          thumbnail: entry.thumbnail,
          tags: entry.tags,
          videoSources: videoSources.map((vs) => ({
            url: vs.url,
            status: vs.status,
          })),
          scripts: scripts.map((s) => ({
            url: s.url,
            name: s.name,
            creator: s.creator,
            supportUrl: s.supportUrl,
            avgSpeed: s.avgSpeed,
            maxSpeed: s.maxSpeed,
            actionCount: s.actionCount,
          })),
        },
        videoUrl,
        scriptId,
      });
    } catch (error) {
      console.error('Failed to save to extension:', error);
    }

    setIsPlayLoading(false);

    // Open the video page
    window.open(videoUrl, '_blank');
  };

  return (
    <VideoCard
      entry={entry}
      videoSources={videoSources}
      scripts={scripts}
      onPlay={handlePlay}
      isLoading={isPlayLoading}
      onScriptSelect={setSelectedScriptId}
      actionMenuItems={
        selectedScript && entry.source !== 'scraper:ivdb'
          ? [
              <Menu.Item
                key="download"
                leftSection={<IconDownload size={14} />}
                onClick={() => window.open(selectedScript.url, '_blank')}
              >
                Download Script
              </Menu.Item>,
            ]
          : []
      }
    />
  );
};
