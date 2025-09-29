import { useState } from 'react';
import { IconUser } from '@tabler/icons-react';
import { Combobox, Flex, InputBase, Text, useCombobox } from '@mantine/core';
import { ScriptMetadata } from '@/utils/iveBridge';
import styles from './ScriptSelector.module.css';

type ScriptSelectorProps = {
  scripts: ScriptMetadata[];
};

export const ScriptSelector = ({ scripts }: ScriptSelectorProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [entryId, setEntryId] = useState<string>();

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
        <ScriptOption {...scripts[0]} />
      </InputBase>
    );
  }

  const selectedOption = scripts.find((item) => item.id === entryId) || scripts[0];

  const options = scripts.map((item) => (
    <Combobox.Option value={item.id} key={item.id} className={styles.optionItem}>
      <ScriptOption {...item} />
    </Combobox.Option>
  ));

  return (
    <Combobox
      radius="md"
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        setEntryId(val);
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
          <ScriptOption {...selectedOption} />
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown className={styles.optionDropdown}>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

type SelectOptionProps = ScriptMetadata;

const ScriptOption = ({ name, creator }: SelectOptionProps) => {
  return (
    <Flex justify="space-between" gap={4}>
      <Text size="sm" fw={500} truncate>
        {name}
      </Text>
      <Flex gap={4} align="center" c="gray" flex="0 0 auto">
        <IconUser size={12} />
        <Text size="xs">{creator}</Text>
      </Flex>
      {/* Maybe later we can show more info about the script here, or in details */}
      {/* <Flex justify="space-between" align="center" h={16}>
        <Flex align="center" justify="flex-end" gap={8}>
          {actionCount !== undefined && (
            <Flex align="center" c="gray">
              <IconActivityHeartbeat size="14" />
              <Text size="xs">{actionCount}</Text>
            </Flex>
          )}
          {avgSpeed !== undefined && (
            <Flex align="center" c="gray">
              <IconBrandSpeedtest size="14" />
              <Text size="xs">{avgSpeed}</Text>
            </Flex>
          )}
          {maxSpeed !== undefined && (
            <Flex align="center" c="gray">
              <IconGauge size="14" />
              <Text size="xs">{maxSpeed}</Text>
            </Flex>
          )}
        </Flex>
        {creator ? (
          <Flex gap={4} align="center" c="gray">
            <IconUser size={12} />
            <Text size="xs">{creator}</Text>
          </Flex>
        ) : (
          <div />
        )}
      </Flex> */}
    </Flex>
  );
};
