import { useState } from 'react';
import { IconDownload } from '@tabler/icons-react';
import { Menu } from '@mantine/core';
import { ScriptData, VideoCard, VideoEntry, VideoSourceData } from '@/components/video/VideoCard';
import { iveBridge } from '@/utils/iveBridge';

type CloudVideoProps = {
  entry: VideoEntry;
  videoSources: VideoSourceData[];
  scripts: ScriptData[];
};

export const CloudVideo = ({ entry, videoSources, scripts }: CloudVideoProps) => {
  const [selectedScriptId, setSelectedScriptId] = useState(scripts[0]?.id);
  const selectedScript = scripts.find((s) => s.id === selectedScriptId) || scripts[0];

  const handlePlay = async (videoUrl: string, scriptId: string) => {
    // Save to local IveDB via bridge and select script for playback
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

    // Open the video page
    window.open(videoUrl, '_blank');
  };

  return (
    <VideoCard
      entry={entry}
      videoSources={videoSources}
      scripts={scripts}
      onPlay={handlePlay}
      onScriptSelect={setSelectedScriptId}
      actionMenuItems={
        selectedScript
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
