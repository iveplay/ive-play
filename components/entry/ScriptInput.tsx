import { IconTrash } from '@tabler/icons-react';
import { ActionIcon, Box, Button, Group, Radio, Stack, Text, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';

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
        title: 'Error',
        message: 'Please select a .funscript file',
        color: 'red',
      });
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      notifications.show({
        title: 'Error',
        message: 'File size exceeds 2MB limit',
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
    <Box
      p="md"
      style={{ border: '1px solid var(--mantine-color-default-border)', borderRadius: 8 }}
    >
      <Group justify="space-between" mb="xs">
        <Text size="sm" fw={500}>
          Script {index + 1}
        </Text>
        {canRemove && (
          <ActionIcon color="red" variant="subtle" onClick={onRemove}>
            <IconTrash size={16} />
          </ActionIcon>
        )}
      </Group>

      <Stack gap="xs">
        {showToggle && (
          <Group>
            <Button
              size="xs"
              variant={!value.isLocal ? 'filled' : 'default'}
              onClick={() => onLocalToggle(false)}
              radius="md"
            >
              URL
            </Button>
            <Button
              size="xs"
              variant={value.isLocal ? 'filled' : 'default'}
              onClick={() => onLocalToggle(true)}
              radius="md"
            >
              Local File
            </Button>
          </Group>
        )}

        {isExistingLocal ? (
          <Text size="sm" c="dimmed">
            Local script: {value.name}
          </Text>
        ) : value.isLocal && showLocalOption ? (
          <>
            <TextInput
              type="file"
              label="Script File"
              accept=".funscript"
              required
              radius="md"
              onChange={handleFileChange}
            />
            <Text size="xs" c="dimmed">
              Maximum file size: 2MB
            </Text>
          </>
        ) : (
          <TextInput
            label="Script URL"
            placeholder="https://..."
            required
            radius="md"
            {...getInputProps(`scripts.${index}.url`)}
          />
        )}

        <TextInput
          label="Script Name"
          placeholder="Enter script name"
          required
          radius="md"
          {...getInputProps(`scripts.${index}.name`)}
        />

        <TextInput
          label="Creator"
          placeholder="Script creator"
          radius="md"
          {...getInputProps(`scripts.${index}.creator`)}
        />

        <Radio label="Set as default" checked={isDefault} onChange={onSetDefault} />
      </Stack>
    </Box>
  );
};
