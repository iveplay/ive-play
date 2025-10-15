import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react';
import { useShallow } from 'zustand/shallow';
import { ActionIcon, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useIveStore } from '@/store/useIveStore';
import { IveEntry, ScriptMetadata, VideoSource } from '@/utils/iveBridge';
import { EditEntry } from './EditEntry';
import styles from './ActionMenu.module.css';

type ActionMenuProps = {
  entryId: string;
  entry: IveEntry;
  videoSources: VideoSource[];
  scripts: ScriptMetadata[];
};

export const ActionMenu = ({ entryId, entry, videoSources, scripts }: ActionMenuProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { deleteEntry } = useIveStore(
    useShallow((state) => ({
      deleteEntry: state.deleteEntry,
    }))
  );

  return (
    <>
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
          <Menu.Item leftSection={<IconEdit size={14} />} onClick={open}>
            Edit
          </Menu.Item>
          <Menu.Item leftSection={<IconTrash size={14} />} onClick={() => deleteEntry(entryId)}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <EditEntry
        opened={opened}
        onClose={close}
        entry={entry}
        videoSources={videoSources}
        scripts={scripts}
      />
    </>
  );
};
