import { IconDotsVertical, IconTrash } from '@tabler/icons-react';
import { useShallow } from 'zustand/shallow';
import { ActionIcon, Menu } from '@mantine/core';
import { useIveStore } from '@/store/useIveStore';
import styles from './ActionMenu.module.css';

type ActionMenuProps = {
  entryId: string;
};

export const ActionMenu = ({ entryId }: ActionMenuProps) => {
  const { deleteEntry } = useIveStore(
    useShallow((state) => ({
      deleteEntry: state.deleteEntry,
    }))
  );

  return (
    <Menu
      position="bottom-end"
      offset={4}
      classNames={{ dropdown: styles.menuDropdown, item: styles.menuItem }}
    >
      <Menu.Target>
        <ActionIcon
          variant="filled"
          radius="xl"
          color="rgba(41, 11, 29, 0.85)"
          aria-label="Toggle menu"
          size={40}
          className={styles.menuButton}
        >
          <IconDotsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item leftSection={<IconTrash size={14} />} onClick={() => deleteEntry(entryId)}>
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
