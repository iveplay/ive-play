import { useEffect, useState } from 'react';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Modal,
  NumberInput,
  Radio,
  ScrollArea,
  Stack,
  TagsInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useIveStore } from '@/store/useIveStore';
import { iveBridge, IveEntry, ScriptMetadata, VideoSource } from '@/utils/iveBridge';
import styles from './ModalEntry.module.css';

type EditEntryProps = {
  opened: boolean;
  onClose: () => void;
  entry: IveEntry;
  videoSources: VideoSource[];
  scripts: ScriptMetadata[];
};

export const EditEntry = ({ opened, onClose, entry, videoSources, scripts }: EditEntryProps) => {
  const [loading, setLoading] = useState(false);
  const updateEntry = useIveStore((state) => state.updateEntry);

  const form = useForm({
    initialValues: {
      title: entry.title,
      videoSources:
        videoSources.length > 0
          ? videoSources.map((source) => ({ url: source.url }))
          : [{ url: '' }],
      thumbnailUrl: entry.thumbnail || '',
      scripts:
        scripts.length > 0
          ? scripts.map((script) => ({
              url: script.url,
              name: script.name,
              creator: script.creator || '',
              isLocal: script.url.startsWith('file://'),
              file: null as File | null,
            }))
          : [{ url: '', name: '', creator: '', isLocal: false, file: null }],
      defaultScriptId: entry.defaultScriptId || (scripts.length > 0 ? scripts[0].url : undefined),
      duration: entry.duration ? entry.duration / 1000 : undefined,
      tags: entry.tags?.filter((tag) => tag !== 'manual') || [],
    },
    validate: {
      title: (value) => (!value ? 'Title is required' : null),
      thumbnailUrl: (value) => (value && !value.startsWith('http') ? 'Must be a valid URL' : null),
      videoSources: {
        url: (value) =>
          !value
            ? 'Video URL is required'
            : !value.startsWith('http')
              ? 'Must be a valid URL'
              : null,
      },
      scripts: {
        url: (value, values, path) => {
          const index = Number(path.split('.')[1]);
          const script = values.scripts[index];
          if (script.isLocal && !script.file && !value.startsWith('file://')) {
            return 'Please select a .funscript file';
          }
          if (!script.isLocal && !value) {
            return 'Script URL is required';
          }
          if (
            !script.isLocal &&
            value &&
            !value.startsWith('http') &&
            !value.startsWith('file://')
          ) {
            return 'Must be a valid URL';
          }
          return null;
        },
        name: (value) => (!value ? 'Script name is required' : null),
      },
    },
  });

  // Fetch fresh data when modal opens
  useEffect(() => {
    if (opened) {
      const fetchLatestData = async () => {
        try {
          const latestData = await iveBridge.getEntryWithDetails(entry.id);
          if (latestData) {
            form.setValues({
              title: latestData.entry.title,
              videoSources:
                latestData.videoSources.length > 0
                  ? latestData.videoSources.map((source) => ({ url: source.url }))
                  : [{ url: '' }],
              thumbnailUrl: latestData.entry.thumbnail || '',
              scripts:
                latestData.scripts.length > 0
                  ? latestData.scripts.map((script) => ({
                      url: script.url,
                      name: script.name,
                      creator: script.creator || '',
                      isLocal: script.url.startsWith('file://'),
                      file: null,
                    }))
                  : [{ url: '', name: '', creator: '', isLocal: false, file: null }],
              defaultScriptId:
                latestData.entry.defaultScriptId ||
                (latestData.scripts.length > 0 ? latestData.scripts[0].url : undefined),
              duration: latestData.entry.duration ? latestData.entry.duration / 1000 : undefined,
              tags: latestData.entry.tags?.filter((tag) => tag !== 'manual') || [],
            });
          }
        } catch (error) {
          // If fetch fails, just use the existing props (silently fail)
        }
      };
      fetchLatestData();
    }
  }, [opened, entry.id]);

  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
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

      form.setFieldValue(`scripts.${index}.file`, file);
      if (!form.values.scripts[index].name) {
        form.setFieldValue(`scripts.${index}.name`, file.name.replace('.funscript', ''));
      }
    }
  };

  const handleSubmit = form.onSubmit(async (values) => {
    setLoading(true);
    try {
      // Filter out empty video sources
      const validVideoSources = values.videoSources.filter((source) => source.url);

      if (validVideoSources.length === 0) {
        notifications.show({
          title: 'Error',
          message: 'At least one video source is required',
          color: 'red',
        });
        setLoading(false);
        return;
      }

      // Process scripts - upload local files if needed
      const processedScripts = await Promise.all(
        values.scripts
          .filter(
            (script) =>
              (script.isLocal && script.file) ||
              (!script.isLocal && script.url) ||
              script.url.startsWith('file://')
          )
          .map(async (script) => {
            let scriptUrl = script.url;

            // Upload new local file
            if (script.isLocal && script.file && !script.url.startsWith('file://')) {
              const fileContent = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsText(script.file!);
              });

              const content = JSON.parse(fileContent);
              const scriptId = await iveBridge.saveLocalScript(
                script.file.name,
                content,
                script.file.size
              );

              scriptUrl = `file://${scriptId}`;
            }

            return {
              url: scriptUrl,
              name: script.name,
              creator: script.creator || 'Unknown',
            };
          })
      );

      if (processedScripts.length === 0) {
        notifications.show({
          title: 'Error',
          message: 'At least one script is required',
          color: 'red',
        });
        setLoading(false);
        return;
      }

      await updateEntry(entry.id, {
        title: values.title,
        duration: values.duration ? values.duration * 1000 : undefined,
        thumbnail: values.thumbnailUrl || undefined,
        tags: values.tags.length > 0 ? ['manual', ...values.tags] : ['manual'],
        videoSources: validVideoSources,
        scripts: processedScripts,
        defaultScriptId: values.defaultScriptId,
      });

      notifications.show({
        title: 'Success',
        message: 'Entry updated successfully',
        color: 'green',
      });

      onClose();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update entry',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  });

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Edit entry"
      radius="lg"
      size="xl"
      classNames={{
        title: styles.modalTitle,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid gutter="lg">
          {/* Left Column - Video Details */}
          <Grid.Col span={6}>
            <Stack gap="md">
              <Text fw={600} size="lg">
                Video Details
              </Text>

              <TextInput
                key={form.key('title')}
                label="Video Title"
                placeholder="Enter video title"
                required
                radius="md"
                {...form.getInputProps('title')}
              />

              <TextInput
                key={form.key('thumbnailUrl')}
                label="Thumbnail URL"
                placeholder="https://..."
                radius="md"
                {...form.getInputProps('thumbnailUrl')}
              />

              <NumberInput
                key={form.key('duration')}
                label="Duration (seconds)"
                placeholder="Video duration in seconds (optional)"
                min={0}
                radius="md"
                {...form.getInputProps('duration')}
              />

              <TagsInput
                key={form.key('tags')}
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
                    <Box
                      key={index}
                      p="md"
                      style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}
                    >
                      <Group justify="space-between" mb="xs">
                        <Text size="sm" fw={500}>
                          Script {index + 1}
                        </Text>
                        {form.values.scripts.length > 1 && (
                          <ActionIcon
                            color="red"
                            variant="subtle"
                            onClick={() => form.removeListItem('scripts', index)}
                          >
                            <IconTrash size={16} />
                          </ActionIcon>
                        )}
                      </Group>

                      <Stack gap="xs">
                        {/* Only show URL/Local toggle for new scripts (no existing URL or new local without file://) */}
                        {!script.url.startsWith('file://') && !script.url.startsWith('http') && (
                          <Group>
                            <Button
                              size="xs"
                              variant={!script.isLocal ? 'filled' : 'default'}
                              onClick={() => form.setFieldValue(`scripts.${index}.isLocal`, false)}
                              radius="md"
                            >
                              URL
                            </Button>
                            <Button
                              size="xs"
                              variant={script.isLocal ? 'filled' : 'default'}
                              onClick={() => form.setFieldValue(`scripts.${index}.isLocal`, true)}
                              radius="md"
                            >
                              Local File
                            </Button>
                          </Group>
                        )}

                        {script.url.startsWith('file://') ? (
                          <Text size="sm" c="dimmed">
                            Local script: {script.name}
                          </Text>
                        ) : script.isLocal ? (
                          <>
                            <TextInput
                              type="file"
                              label="Script File"
                              accept=".funscript"
                              required
                              radius="md"
                              onChange={(e) => handleFileChange(index, e)}
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
                            {...form.getInputProps(`scripts.${index}.url`)}
                          />
                        )}

                        <TextInput
                          label="Script Name"
                          placeholder="Enter script name"
                          required
                          radius="md"
                          {...form.getInputProps(`scripts.${index}.name`)}
                        />

                        <TextInput
                          label="Creator"
                          placeholder="Script creator"
                          radius="md"
                          {...form.getInputProps(`scripts.${index}.creator`)}
                        />

                        <Radio
                          label="Set as default"
                          checked={form.values.defaultScriptId === form.values.scripts[index].url}
                          onChange={() =>
                            form.setFieldValue('defaultScriptId', form.values.scripts[index].url)
                          }
                        />
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </ScrollArea>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="lg" />

        <Group justify="flex-end">
          <Button variant="default" onClick={handleClose} radius="md">
            Cancel
          </Button>
          <Button type="submit" loading={loading} radius="md">
            Update entry
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
