import { useState } from 'react';
import { Button, Divider, Group, Modal, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useIveStore } from '@/store/useIveStore';
import { IveEntry, ScriptMetadata, VideoSource } from '@/utils/iveBridge';

type AddScriptProps = {
  opened: boolean;
  onClose: () => void;
  entry: IveEntry;
  videoSources: VideoSource[];
  existingScripts: ScriptMetadata[];
};

export const AddScript = ({
  opened,
  onClose,
  entry,
  videoSources,
  existingScripts,
}: AddScriptProps) => {
  const [loading, setLoading] = useState(false);
  const updateEntry = useIveStore((state) => state.updateEntry);

  const form = useForm({
    initialValues: {
      url: '',
      name: '',
      creator: '',
    },
    validate: {
      url: (value) =>
        !value
          ? 'Script URL is required'
          : !value.startsWith('http')
            ? 'Must be a valid URL'
            : null,
      name: (value) => (!value ? 'Script name is required' : null),
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    setLoading(true);
    try {
      // Check if script URL already exists
      const isDuplicate = existingScripts.some((script) => script.url === values.url);
      if (isDuplicate) {
        notifications.show({
          title: 'Error',
          message: 'This script URL already exists for this entry',
          color: 'red',
        });
        setLoading(false);
        return;
      }

      // Add the new script to existing scripts
      const updatedScripts = [
        ...existingScripts.map((script) => ({
          url: script.url,
          name: script.name,
          creator: script.creator || 'Unknown',
        })),
        {
          url: values.url,
          name: values.name,
          creator: values.creator || 'Unknown',
        },
      ];

      await updateEntry(entry.id, {
        title: entry.title,
        duration: entry.duration,
        thumbnail: entry.thumbnail,
        tags: entry.tags || ['manual'],
        videoSources: videoSources.map((source) => ({ url: source.url })),
        scripts: updatedScripts,
      });

      notifications.show({
        title: 'Success',
        message: 'Script added successfully',
        color: 'green',
      });

      form.reset();
      onClose();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to add script',
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
    <Modal opened={opened} onClose={handleClose} title="Add script" radius="lg" size="md">
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Add a new script to &quot;{entry.title}&quot;
          </Text>

          <TextInput
            key={form.key('url')}
            label="Script URL"
            placeholder="https://..."
            required
            radius="md"
            {...form.getInputProps('url')}
          />

          <TextInput
            key={form.key('name')}
            label="Script Name"
            placeholder="Enter script name"
            required
            radius="md"
            {...form.getInputProps('name')}
          />

          <TextInput
            key={form.key('creator')}
            label="Creator"
            placeholder="Script creator (optional)"
            radius="md"
            {...form.getInputProps('creator')}
          />
        </Stack>

        <Divider my="lg" />

        <Group justify="flex-end">
          <Button variant="default" onClick={handleClose} radius="md">
            Cancel
          </Button>
          <Button type="submit" loading={loading} radius="md">
            Add script
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
