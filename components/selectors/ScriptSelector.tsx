import { useEffect, useState } from 'react';
import { IconUser } from '@tabler/icons-react';
import { Flex, Text } from '@mantine/core';
import { ScriptData, VideoEntry } from '../video/VideoCard';
import { OptionSelector } from './OptionSelector';

type ScriptSelectorProps = {
  scripts: ScriptData[];
  entry?: VideoEntry;
  onSelect?: (scriptId: string) => void;
};

export const ScriptSelector = ({ scripts, entry, onSelect }: ScriptSelectorProps) => {
  // Initialize with default script or first script
  const defaultScriptId = entry?.defaultScriptId
    ? scripts.find((s) => s.url === entry.defaultScriptId)?.id
    : scripts[0]?.id;

  useEffect(() => {
    if (defaultScriptId && onSelect) {
      onSelect(defaultScriptId);
    }
  }, [defaultScriptId, onSelect]);

  const [entryId, setEntryId] = useState<string | undefined>(defaultScriptId);

  return (
    <OptionSelector
      items={scripts}
      selectedItemId={entryId}
      onSelect={(script) => {
        setEntryId(script.id);
        if (onSelect) {
          onSelect(script.id);
        }
      }}
      getItemId={(item) => item.id}
      getItemTitle={(item) => item.name}
      renderOption={(item) => (
        <ScriptOption {...item} isDefault={entry?.defaultScriptId === item.url} />
      )}
      singleItemConfig={{ component: 'div' }}
    />
  );
};

type SelectOptionProps = ScriptData & { isDefault?: boolean };

const ScriptOption = ({ name, creator, isDefault }: SelectOptionProps) => {
  return (
    <Flex justify="space-between" gap={4}>
      <Text size="sm" fw={500} truncate>
        {isDefault && '★ '}
        {name}
      </Text>
      <Flex gap={4} align="center" c="gray" flex="0 0 auto">
        <IconUser size={12} />
        <Text size="xs">{creator}</Text>
      </Flex>
    </Flex>
  );
};
