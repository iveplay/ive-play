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
            }))
          : [{ url: '', name: '', creator: '' }],
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
        url: (value) =>
          !value
            ? 'Script URL is required'
            : !value.startsWith('http')
              ? 'Must be a valid URL'
              : null,
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
                    }))
                  : [{ url: '', name: '', creator: '' }],
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

      // Filter out empty scripts
      const validScripts = values.scripts.filter((script) => script.url && script.name);

      if (validScripts.length === 0) {
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
        scripts: validScripts.map((script) => ({
          url: script.url,
          name: script.name,
          creator: script.creator || 'Unknown',
        })),
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
                  onClick={() => form.insertListItem('scripts', { url: '', name: '', creator: '' })}
                  radius="md"
                >
                  Add Script
                </Button>
              </Group>

              <ScrollArea h={400} type="auto" offsetScrollbars>
                <Stack gap="md" pr="xs">
                  {form.values.scripts.map((_, index) => (
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
                        <TextInput
                          label="Script URL"
                          placeholder="https://..."
                          required
                          radius="md"
                          {...form.getInputProps(`scripts.${index}.url`)}
                        />

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
