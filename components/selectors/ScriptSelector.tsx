import { useEffect, useState } from 'react';
import { IconUser } from '@tabler/icons-react';
import { Combobox, Flex, InputBase, Text, useCombobox } from '@mantine/core';
import { ScriptData, VideoEntry } from '../video/VideoCard';
import styles from './ScriptSelector.module.css';

type ScriptSelectorProps = {
  scripts: ScriptData[];
  entry?: VideoEntry;
  onSelect?: (scriptId: string) => void;
};

export const ScriptSelector = ({ scripts, entry, onSelect }: ScriptSelectorProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

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

  if (scripts.length <= 1) {
    return (
      <InputBase
        classNames={{ input: styles.optionSelector }}
        component="div"
        radius="lg"
        onClick={() => combobox.toggleDropdown()}
        rightSectionPointerEvents="none"
        multiline
        title={scripts[0]?.name}
      >
        <ScriptOption {...scripts[0]} isDefault={entry?.defaultScriptId === scripts[0]?.url} />
      </InputBase>
    );
  }

  const selectedOption = scripts.find((item) => item.id === entryId) || scripts[0];

  const options = scripts.map((item) => (
    <Combobox.Option value={item.id} key={item.id} className={styles.optionItem}>
      <ScriptOption {...item} isDefault={entry?.defaultScriptId === item.url} />
    </Combobox.Option>
  ));

  return (
    <Combobox
      radius="lg"
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setEntryId(val);
        if (onSelect) {
          onSelect(val);
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
          title={selectedOption.name}
        >
          <ScriptOption
            {...selectedOption}
            isDefault={entry?.defaultScriptId === selectedOption.url}
          />
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown className={styles.optionDropdown}>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
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
