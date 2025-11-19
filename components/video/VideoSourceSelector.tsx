import { useState } from 'react';
import { IconVideo } from '@tabler/icons-react';
import { Combobox, Flex, InputBase, Text, useCombobox } from '@mantine/core';
import { VideoSource } from '@/utils/iveBridge';
import styles from './ScriptSelector.module.css';

type VideoSourceSelectorProps = {
  videoSources: VideoSource[];
  onSelect?: (url: string) => void;
};

export const VideoSourceSelector = ({ videoSources, onSelect }: VideoSourceSelectorProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [sourceId, setSourceId] = useState<string>(videoSources[0]?.id);

  if (videoSources.length <= 1) {
    return (
      <InputBase
        classNames={{ input: styles.optionSelector }}
        component="a"
        href={videoSources[0]?.url}
        target="_blank"
        radius="lg"
        multiline
        title={videoSources[0]?.url}
      >
        <VideoSourceOption {...videoSources[0]} />
      </InputBase>
    );
  }

  const selectedOption = videoSources.find((item) => item.id === sourceId) || videoSources[0];

  const options = videoSources.map((item) => (
    <Combobox.Option value={item.id} key={item.id} className={styles.optionItem}>
      <VideoSourceOption {...item} />
    </Combobox.Option>
  ));

  return (
    <Combobox
      radius="md"
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setSourceId(val);
        const source = videoSources.find((s) => s.id === val);
        if (source && onSelect) {
          onSelect(source.url);
        }
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          classNames={{ input: styles.optionSelector }}
          component="button"
          type="button"
          pointer
          radius="lg"
          rightSection={<Combobox.Chevron color="lightgray" />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          multiline
          title={selectedOption.url}
        >
          <VideoSourceOption {...selectedOption} />
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown className={styles.optionDropdown}>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

type VideoSourceOptionProps = VideoSource;

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
