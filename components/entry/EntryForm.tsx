import { IconLink, IconMovie, IconPlus, IconScript, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Button,
  Grid,
  NumberInput,
  Stack,
  TagsInput,
  TextInput,
} from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { ScriptInput, ScriptInputValue, ThumbnailPreview } from './ScriptInput';
import styles from './EntryFormModal.module.css';

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
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleFileChange = (index: number, file: File) => {
    form.setFieldValue(`scripts.${index}.file`, file);
    if (!form.values.scripts[index].name) {
      form.setFieldValue(`scripts.${index}.name`, file.name.replace('.funscript', ''));
    }
  };

  const VideoDetailsSection = (
    <Box className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <IconMovie size={16} />
          <span>Video Details</span>
        </div>
      </div>

      <Stack gap="md">
        <TextInput
          label="Title"
          placeholder="Video title"
          required
          size="sm"
          radius="lg"
          {...form.getInputProps('title')}
        />

        <TextInput
          label="Thumbnail URL"
          placeholder="https://..."
          size="sm"
          radius="lg"
          {...form.getInputProps('thumbnailUrl')}
        />
        <NumberInput
          label="Duration (sec)"
          placeholder="Optional"
          min={0}
          size="sm"
          radius="lg"
          {...form.getInputProps('duration')}
        />

        {form.values.thumbnailUrl && <ThumbnailPreview url={form.values.thumbnailUrl} />}

        <TagsInput
          label="Tags"
          placeholder="Press Enter to add"
          size="sm"
          radius="lg"
          {...form.getInputProps('tags')}
        />
      </Stack>
    </Box>
  );

  const VideoSourcesSection = (
    <Box className={styles.section} style={{ borderTop: '1px solid var(--mantine-color-dark-5)' }}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <IconLink size={16} />
          <span>Video Sources</span>
        </div>
        <Button
          size="compact-xs"
          variant="subtle"
          leftSection={<IconPlus size={14} />}
          onClick={() => form.insertListItem('videoSources', { url: '' })}
        >
          Add
        </Button>
      </div>

      <Stack gap="xs">
        {form.values.videoSources.map((_, index) => (
          <div key={index} className={styles.sourceRow}>
            <TextInput
              placeholder="https://example.com/video"
              size="sm"
              radius="lg"
              flex={1}
              {...form.getInputProps(`videoSources.${index}.url`)}
            />
            {form.values.videoSources.length > 1 && (
              <ActionIcon
                size="sm"
                variant="subtle"
                color="red"
                className={styles.deleteButton}
                onClick={() => form.removeListItem('videoSources', index)}
              >
                <IconTrash size={14} />
              </ActionIcon>
            )}
          </div>
        ))}
      </Stack>
    </Box>
  );

  const ScriptsSection = (
    <Box
      className={styles.section}
      h="100%"
      style={{ borderTop: '1px solid var(--mantine-color-dark-5)' }}
    >
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <IconScript size={16} />
          <span>Scripts</span>
        </div>
        <Button
          size="compact-xs"
          variant="subtle"
          leftSection={<IconPlus size={14} />}
          onClick={() =>
            form.insertListItem('scripts', {
              url: '',
              name: '',
              creator: '',
              isLocal: false,
              file: null,
            })
          }
        >
          Add
        </Button>
      </div>
      <Stack gap="sm">
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
    </Box>
  );

  if (isMobile) {
    return (
      <Stack gap={0}>
        {VideoDetailsSection}
        {VideoSourcesSection}
        {ScriptsSection}
      </Stack>
    );
  }

  return (
    <Grid gutter={0}>
      <Grid.Col span={6} style={{ borderRight: '1px solid var(--mantine-color-dark-5)' }}>
        {VideoDetailsSection}
        {VideoSourcesSection}
      </Grid.Col>
      <Grid.Col span={6}>{ScriptsSection}</Grid.Col>
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
