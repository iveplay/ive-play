import { ReactNode } from 'react';
import { IconDotsVertical } from '@tabler/icons-react';
import { ActionIcon, Menu } from '@mantine/core';
import styles from './ActionMenu.module.css';

type ActionMenuProps = {
  menuItems?: ReactNode[];
};

export const ActionMenu = ({ menuItems }: ActionMenuProps) => {
  if (!menuItems || menuItems.length === 0) {
    return null;
  }

  return (
    <Menu
      radius="lg"
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
      <Menu.Dropdown>{menuItems}</Menu.Dropdown>
    </Menu>
  );
};
