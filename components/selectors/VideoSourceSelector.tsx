import { useState } from 'react';
import { IconVideo } from '@tabler/icons-react';
import { Flex, Text } from '@mantine/core';
import { VideoSourceData } from '../video/VideoCard';
import { OptionSelector } from './OptionSelector';

type VideoSourceSelectorProps = {
  videoSources: VideoSourceData[];
  onSelect?: (url: string) => void;
};

export const VideoSourceSelector = ({ videoSources, onSelect }: VideoSourceSelectorProps) => {
  const [sourceId, setSourceId] = useState<string>(videoSources[0]?.id);

  return (
    <OptionSelector
      items={videoSources}
      selectedItemId={sourceId}
      onSelect={(source) => {
        setSourceId(source.id);
        if (onSelect) {
          onSelect(source.url);
        }
      }}
      getItemId={(item) => item.id}
      getItemTitle={(item) => item.url}
      renderOption={(item) => <VideoSourceOption {...item} />}
      singleItemConfig={{
        component: 'a',
        href: videoSources[0]?.url,
        target: '_blank',
      }}
    />
  );
};

type VideoSourceOptionProps = VideoSourceData;

const VideoSourceOption = ({ url }: VideoSourceOptionProps) => {
  if (!url) {
    return;
  }

  const displayUrl = url.replace(/^https?:\/\//, '').replace(/^www\./, '');
  const domain = displayUrl.split('/')[0];
  const domainWithoutTld = domain.replace(/\.[^.]+$/, '');
  const path = displayUrl.substring(domain.length);

  return (
    <Flex justify="space-between" gap={8}>
      <Text
        size="sm"
        fw={500}
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          direction: 'rtl',
          textAlign: 'left',
        }}
      >
        {path || '/'}
      </Text>
      <Flex gap={4} align="center" c="gray" flex="0 0 auto">
        <IconVideo size={12} />
        <Text size="xs" truncate maw={150}>
          {domainWithoutTld}
        </Text>
      </Flex>
    </Flex>
  );
};
