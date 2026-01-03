import { useState } from 'react';
import { IconDownload } from '@tabler/icons-react';
import { Menu } from '@mantine/core';
import { ScriptData, VideoCard, VideoEntry, VideoSourceData } from '@/components/video/VideoCard';

type CloudVideoProps = {
  entry: VideoEntry;
  videoSources: VideoSourceData[];
  scripts: ScriptData[];
};

// Event to tell extension to save script
const SAVE_SCRIPT_EVENT = 'ive:events:save_script';

export const CloudVideo = ({ entry, videoSources, scripts }: CloudVideoProps) => {
  const [selectedScriptId, setSelectedScriptId] = useState(scripts[0]?.id);
  const selectedScript = scripts.find((s) => s.id === selectedScriptId) || scripts[0];

  const handlePlay = (videoUrl: string, scriptId: string) => {
    const script = scripts.find((s) => s.id === scriptId);

    if (script?.url) {
      // Dispatch event for extension to save/select script
      document.dispatchEvent(
        new CustomEvent(SAVE_SCRIPT_EVENT, {
          detail: {
            videoUrl,
            scriptUrl: script.url,
            scriptInfo: {
              name: script.name,
              creator: script.creator,
            },
          },
        })
      );
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
