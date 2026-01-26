import { IconPhoto, IconTrash, IconX } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Checkbox,
  Flex,
  Group,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import styles from './EntryFormModal.module.css';

export type ScriptInputValue = {
  url: string;
  name: string;
  creator: string;
  isLocal: boolean;
  file: File | null;
};

type ScriptInputProps = {
  index: number;
  value: ScriptInputValue;
  canRemove: boolean;
  isDefault: boolean;
  showLocalOption: boolean;
  getInputProps: (path: string) => object;
  onRemove: () => void;
  onSetDefault: () => void;
  onLocalToggle: (isLocal: boolean) => void;
  onFileChange: (file: File) => void;
};

export const ScriptInput = ({
  index,
  value,
  canRemove,
  isDefault,
  showLocalOption,
  getInputProps,
  onRemove,
  onSetDefault,
  onLocalToggle,
  onFileChange,
}: ScriptInputProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.name.endsWith('.funscript')) {
      notifications.show({
        title: 'Invalid file',
        message: 'Please select a .funscript file',
        color: 'red',
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      notifications.show({
        title: 'File too large',
        message: 'Maximum file size is 2MB',
        color: 'red',
      });
      return;
    }

    onFileChange(file);
  };

  const isExistingLocal = value.url.startsWith('file://');
  const isExistingRemote = value.url.startsWith('http');
  const showToggle = showLocalOption && !isExistingLocal && !isExistingRemote;

  return (
    <Box className={`${styles.scriptCard} ${isDefault ? styles.scriptCardDefault : ''}`}>
      <Stack gap="sm">
        <Flex align="center" gap="sm">
          {showToggle && (
            <SegmentedControl
              flex="1"
              size="xs"
              radius="lg"
              data={[
                { label: 'URL', value: 'url' },
                { label: 'Local File', value: 'local' },
              ]}
              value={value.isLocal ? 'local' : 'url'}
              onChange={(val) => onLocalToggle(val === 'local')}
            />
          )}
          {canRemove && (
            <ActionIcon
              radius="lg"
              variant="subtle"
              color="red"
              className={styles.deleteButton}
              onClick={onRemove}
            >
              <IconTrash size={14} />
            </ActionIcon>
          )}
        </Flex>

        <Group grow>
          <TextInput
            size="sm"
            placeholder="Script name"
            radius="lg"
            {...getInputProps(`scripts.${index}.name`)}
          />
          <TextInput
            size="sm"
            placeholder="Creator (optional)"
            radius="lg"
            {...getInputProps(`scripts.${index}.creator`)}
          />
        </Group>

        {isExistingLocal ? (
          <Box p="sm" bg="dark.7" style={{ borderRadius: 'var(--mantine-radius-md)' }}>
            <Text size="sm" c="dimmed">
              📁 {value.name}
            </Text>
          </Box>
        ) : value.isLocal && showLocalOption ? (
          <Stack gap="xs">
            <TextInput
              type="file"
              size="sm"
              accept=".funscript"
              radius="lg"
              onChange={handleFileChange}
              placeholder="Select .funscript file"
              rightSection={
                value.file && (
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    onClick={() => onFileChange(null as unknown as File)}
                  >
                    <IconX size={14} />
                  </ActionIcon>
                )
              }
            />
            {value.file && (
              <Text size="xs" c="dimmed">
                {value.file.name} ({(value.file.size / 1024).toFixed(1)} KB)
              </Text>
            )}
          </Stack>
        ) : (
          <TextInput
            size="sm"
            placeholder="https://example.com/script.funscript"
            radius="lg"
            {...getInputProps(`scripts.${index}.url`)}
          />
        )}

        <Checkbox
          size="sm"
          label="Use as default"
          checked={isDefault}
          onChange={onSetDefault}
          styles={{
            input: { cursor: 'pointer' },
            label: { cursor: 'pointer' },
          }}
        />
      </Stack>
    </Box>
  );
};

// Thumbnail preview component
type ThumbnailPreviewProps = {
  url: string;
};

export const ThumbnailPreview = ({ url }: ThumbnailPreviewProps) => {
  if (!url) {
    return (
      <div className={styles.thumbnailPreview}>
        <div className={styles.thumbnailPlaceholder}>
          <IconPhoto size={24} />
          <span>No thumbnail</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.thumbnailPreview}>
      <img
        src={url}
        alt="Thumbnail preview"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
    </div>
  );
};
