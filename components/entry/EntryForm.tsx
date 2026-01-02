import { IconPlus, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Button,
  Grid,
  Group,
  NumberInput,
  ScrollArea,
  Stack,
  TagsInput,
  Text,
  TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { ScriptInput, ScriptInputValue } from './ScriptInput';

export type EntryFormValues = {
  title: string;
  thumbnailUrl: string;
  duration: number | undefined;
  tags: string[];
  videoSources: { url: string }[];
  scripts: ScriptInputValue[];
  defaultScriptId: string | undefined;
};

type EntryFormProps = {
  form: UseFormReturnType<EntryFormValues>;
  showLocalScripts?: boolean;
};

export const EntryForm = ({ form, showLocalScripts = false }: EntryFormProps) => {
  const handleFileChange = (index: number, file: File) => {
    form.setFieldValue(`scripts.${index}.file`, file);
    if (!form.values.scripts[index].name) {
      form.setFieldValue(`scripts.${index}.name`, file.name.replace('.funscript', ''));
    }
  };

  return (
    <Grid gutter="lg">
      {/* Left Column - Video Details */}
      <Grid.Col span={6}>
        <Stack gap="md">
          <Text fw={600} size="lg">
            Video Details
          </Text>

          <TextInput
            label="Video Title"
            placeholder="Enter video title"
            required
            radius="md"
            {...form.getInputProps('title')}
          />

          <TextInput
            label="Thumbnail URL"
            placeholder="https://..."
            radius="md"
            {...form.getInputProps('thumbnailUrl')}
          />

          <NumberInput
            label="Duration (seconds)"
            placeholder="Video duration in seconds"
            min={0}
            radius="md"
            {...form.getInputProps('duration')}
          />

          <TagsInput
            label="Tags"
            placeholder="Add tags (press Enter)"
            radius="md"
            {...form.getInputProps('tags')}
          />

          <Stack gap="xs">
            <Group justify="space-between">
              <Text size="sm" fw={500}>
                Video Sources
              </Text>
              <Button
                size="xs"
                variant="light"
                leftSection={<IconPlus size={14} />}
                onClick={() => form.insertListItem('videoSources', { url: '' })}
                radius="md"
              >
                Add Source
              </Button>
            </Group>

            {form.values.videoSources.map((_, index) => (
              <Group key={index} wrap="nowrap">
                <TextInput
                  placeholder="https://..."
                  required
                  radius="md"
                  flex={1}
                  {...form.getInputProps(`videoSources.${index}.url`)}
                />
                {form.values.videoSources.length > 1 && (
                  <ActionIcon
                    color="red"
                    variant="subtle"
                    onClick={() => form.removeListItem('videoSources', index)}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                )}
              </Group>
            ))}
          </Stack>
        </Stack>
      </Grid.Col>

      {/* Right Column - Scripts */}
      <Grid.Col span={6}>
        <Stack gap="md" h="100%">
          <Group justify="space-between">
            <Text fw={600} size="lg">
              Scripts
            </Text>
            <Button
              size="xs"
              variant="light"
              leftSection={<IconPlus size={16} />}
              onClick={() =>
                form.insertListItem('scripts', {
                  url: '',
                  name: '',
                  creator: '',
                  isLocal: false,
                  file: null,
                })
              }
              radius="md"
            >
              Add Script
            </Button>
          </Group>

          <ScrollArea h={400} type="auto" offsetScrollbars>
            <Stack gap="md" pr="xs">
              {form.values.scripts.map((script, index) => (
                <ScriptInput
                  key={index}
                  index={index}
                  value={script}
                  canRemove={form.values.scripts.length > 1}
                  isDefault={form.values.defaultScriptId === script.url}
                  showLocalOption={showLocalScripts}
                  getInputProps={form.getInputProps}
                  onRemove={() => form.removeListItem('scripts', index)}
                  onSetDefault={() => form.setFieldValue('defaultScriptId', script.url)}
                  onLocalToggle={(isLocal) => form.setFieldValue(`scripts.${index}.isLocal`, isLocal)}
                  onFileChange={(file) => handleFileChange(index, file)}
                />
              ))}
            </Stack>
          </ScrollArea>
        </Stack>
      </Grid.Col>
    </Grid>
  );
};

// Helper to create empty script
export const createEmptyScript = (): ScriptInputValue => ({
  url: '',
  name: '',
  creator: '',
  isLocal: false,
  file: null,
});

// Form validation rules
export const entryFormValidation = {
  title: (value: string) => (!value ? 'Title is required' : null),
  thumbnailUrl: (value: string) =>
    value && !value.startsWith('http') ? 'Must be a valid URL' : null,
  videoSources: {
    url: (value: string) =>
      !value ? 'Video URL is required' : !value.startsWith('http') ? 'Must be a valid URL' : null,
  },
  scripts: {
    url: (value: string, values: EntryFormValues, path: string) => {
      const index = Number(path.split('.')[1]);
      const script = values.scripts[index];
      if (script.isLocal && !script.file && !value.startsWith('file://')) {
        return 'Please select a .funscript file';
      }
      if (!script.isLocal && !value) {
        return 'Script URL is required';
      }
      if (!script.isLocal && value && !value.startsWith('http') && !value.startsWith('file://')) {
        return 'Must be a valid URL';
      }
      return null;
    },
    name: (value: string) => (!value ? 'Script name is required' : null),
  },
};
