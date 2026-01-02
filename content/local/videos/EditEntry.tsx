import { useEffect, useState } from 'react';
import { EntryFormModal } from '@/components/entry/EntryFormModal';
import { useIveStore } from '@/store/useIveStore';
import { iveBridge } from '@/utils/iveBridge';
import { ScriptData, VideoEntry, VideoSourceData } from '../../../components/video/VideoCard';

type EditEntryProps = {
  opened: boolean;
  onClose: () => void;
  entry: VideoEntry;
  videoSources: VideoSourceData[];
  scripts: ScriptData[];
};

export const EditEntry = ({ opened, onClose, entry, videoSources, scripts }: EditEntryProps) => {
  const updateEntry = useIveStore((state) => state.updateEntry);
  const [currentData, setCurrentData] = useState({ entry, videoSources, scripts });

  useEffect(() => {
    if (opened) {
      iveBridge.getEntryWithDetails(entry.id).then((data) => {
        if (data) {
          setCurrentData(data);
        }
      });
    }
  }, [opened, entry.id]);

  const processLocalScript = async (file: File): Promise<string> => {
    const content = JSON.parse(await file.text());
    const scriptId = await iveBridge.saveLocalScript(file.name, content, file.size);
    return `file://${scriptId}`;
  };

  const handleSubmit = async (values: {
    title: string;
    duration?: number;
    thumbnail?: string;
    tags: string[];
    videoSources: { url: string }[];
    scripts: { url: string; name: string; creator: string }[];
    defaultScriptId?: string;
  }) => {
    await updateEntry(entry.id, {
      ...values,
      tags: values.tags.length > 0 ? ['manual', ...values.tags] : ['manual'],
    });
  };

  return (
    <EntryFormModal
      opened={opened}
      onClose={onClose}
      mode="edit"
      showLocalScripts
      initialData={{
        id: currentData.entry.id,
        title: currentData.entry.title,
        thumbnail: currentData.entry.thumbnail,
        duration: currentData.entry.duration,
        tags: currentData.entry.tags,
        defaultScriptId: currentData.entry.defaultScriptId,
        videoSources: currentData.videoSources.map((v) => ({ url: v.url })),
        scripts: currentData.scripts.map((s) => ({ url: s.url, name: s.name, creator: s.creator })),
      }}
      onSubmit={handleSubmit}
      processLocalScript={processLocalScript}
    />
  );
};
