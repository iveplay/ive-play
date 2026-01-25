import { ReactNode, useEffect } from 'react';
import { Combobox, InputBase, useCombobox } from '@mantine/core';
import styles from './ScriptSelector.module.css';

export type OptionSelectorProps<T> = {
  items: T[];
  selectedItemId?: string;
  onSelect?: (item: T) => void;
  getItemId: (item: T) => string;
  getItemTitle: (item: T) => string;
  renderOption: (item: T) => ReactNode;
  singleItemConfig?: {
    component: 'a' | 'div' | 'button';
    href?: string;
    target?: string;
  };
};

export function OptionSelector<T>({
  items,
  selectedItemId,
  onSelect,
  getItemId,
  getItemTitle,
  renderOption,
  singleItemConfig,
}: OptionSelectorProps<T>) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  useEffect(() => {
    const isSelectedItemValid = items.some((item) => getItemId(item) === selectedItemId);

    if (!isSelectedItemValid && items.length > 0 && onSelect) {
      onSelect(items[0]);
    }
  }, [items, selectedItemId, getItemId, onSelect]);

  const selectedOption = items.find((item) => getItemId(item) === selectedItemId) || items[0];

  if (items.length <= 1) {
    const singleItem = items[0];
    if (!singleItem) {
      return null;
    }

    return (
      <InputBase
        classNames={{ input: styles.optionSelector }}
        component={singleItemConfig?.component || 'div'}
        href={singleItemConfig?.href}
        target={singleItemConfig?.target}
        radius="lg"
        mih={0}
        multiline
        title={getItemTitle(singleItem)}
      >
        {renderOption(singleItem)}
      </InputBase>
    );
  }

  const options = items.map((item) => (
    <Combobox.Option value={getItemId(item)} key={getItemId(item)} className={styles.optionItem}>
      {renderOption(item)}
    </Combobox.Option>
  ));

  return (
    <Combobox
      radius="lg"
      offset={4}
      store={combobox}
      withinPortal={false}
      onOptionSubmit={(val) => {
        const item = items.find((i) => getItemId(i) === val);
        if (item && onSelect) {
          onSelect(item);
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
          mih={0}
          rightSection={<Combobox.Chevron color="lightgray" />}
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
          multiline
          title={getItemTitle(selectedOption)}
        >
          {renderOption(selectedOption)}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown className={styles.optionDropdown}>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
