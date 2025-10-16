import { IconDotsVertical, IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useShallow } from 'zustand/shallow';
import { ActionIcon, Menu } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useIveStore } from '@/store/useIveStore';
import { IveEntry, ScriptMetadata, VideoSource } from '@/utils/iveBridge';
import { AddScript } from './AddScript';
import { EditEntry } from './EditEntry';
import styles from './ActionMenu.module.css';

type ActionMenuProps = {
  entryId: string;
  entry: IveEntry;
  videoSources: VideoSource[];
  scripts: ScriptMetadata[];
};

export const ActionMenu = ({ entryId, entry, videoSources, scripts }: ActionMenuProps) => {
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [addScriptOpened, { open: openAddScript, close: closeAddScript }] = useDisclosure(false);
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
          <Menu.Item leftSection={<IconEdit size={14} />} onClick={openEdit}>
            Edit
          </Menu.Item>
          <Menu.Item leftSection={<IconPlus size={14} />} onClick={openAddScript}>
            Add Script
          </Menu.Item>
          <Menu.Item leftSection={<IconTrash size={14} />} onClick={() => deleteEntry(entryId)}>
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <EditEntry
        opened={editOpened}
        onClose={closeEdit}
        entry={entry}
        videoSources={videoSources}
        scripts={scripts}
      />

      <AddScript
        opened={addScriptOpened}
        onClose={closeAddScript}
        entry={entry}
        videoSources={videoSources}
        existingScripts={scripts}
      />
    </>
  );
};
