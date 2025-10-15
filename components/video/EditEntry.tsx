import { useState } from 'react';
import { Button, Group, Modal, NumberInput, Stack, TagsInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useIveStore } from '@/store/useIveStore';
import { IveEntry, ScriptMetadata, VideoSource } from '@/utils/iveBridge';

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
      videoUrl: videoSources[0]?.url || '',
      thumbnailUrl: entry.thumbnail || '',
      scriptUrl: scripts[0]?.url || '',
      scriptName: scripts[0]?.name || '',
      creator: scripts[0]?.creator || '',
      duration: entry.duration ? entry.duration / 1000 : undefined,
      tags: entry.tags?.filter((tag) => tag !== 'manual') || [],
    },
    validate: {
      title: (value) => (!value ? 'Title is required' : null),
      videoUrl: (value) =>
        !value ? 'Video URL is required' : !value.startsWith('http') ? 'Must be a valid URL' : null,
      thumbnailUrl: (value) => (value && !value.startsWith('http') ? 'Must be a valid URL' : null),
      scriptUrl: (value) =>
        !value
          ? 'Script URL is required'
          : !value.startsWith('http')
            ? 'Must be a valid URL'
            : null,
      scriptName: (value) => (!value ? 'Script name is required' : null),
      creator: (value) => (!value ? 'Creator is required' : null),
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    setLoading(true);
    try {
      await updateEntry(entry.id, {
        title: values.title,
        duration: values.duration ? values.duration * 1000 : undefined,
        thumbnail: values.thumbnailUrl || undefined,
        tags: values.tags.length > 0 ? ['manual', ...values.tags] : ['manual'],
        videoSources: [{ url: values.videoUrl }],
        scripts: [
          {
            url: values.scriptUrl,
            name: values.scriptName,
            creator: values.creator || 'Unknown',
          },
        ],
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
    <Modal opened={opened} onClose={handleClose} title="Edit entry" radius="lg">
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            key={form.key('title')}
            label="Video Title"
            placeholder="Enter video title"
            required
            radius="md"
            {...form.getInputProps('title')}
          />

          <TextInput
            key={form.key('videoUrl')}
            label="Video URL"
            placeholder="https://..."
            required
            radius="md"
            {...form.getInputProps('videoUrl')}
          />

          <TextInput
            key={form.key('thumbnailUrl')}
            label="Thumbnail URL"
            placeholder="https://..."
            radius="md"
            {...form.getInputProps('thumbnailUrl')}
          />

          <TextInput
            key={form.key('scriptUrl')}
            label="Script URL"
            placeholder="https://..."
            required
            radius="md"
            {...form.getInputProps('scriptUrl')}
          />

          <TextInput
            key={form.key('scriptName')}
            label="Script Name"
            placeholder="Enter script name"
            required
            radius="md"
            {...form.getInputProps('scriptName')}
          />

          <TextInput
            key={form.key('creator')}
            label="Creator"
            placeholder="Script creator"
            required
            radius="md"
            {...form.getInputProps('creator')}
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

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={handleClose} radius="md">
              Cancel
            </Button>
            <Button type="submit" loading={loading} radius="md">
              Update entry
            </Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
};
