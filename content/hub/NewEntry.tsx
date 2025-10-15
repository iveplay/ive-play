import { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import {
  Button,
  Flex,
  Group,
  Modal,
  NumberInput,
  Stack,
  TagsInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useIveStore } from '@/store/useIveStore';

export const NewEntry = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const createEntry = useIveStore((state) => state.createEntry);

  const form = useForm({
    initialValues: {
      title: '',
      videoUrl: '',
      thumbnailUrl: '',
      scriptUrl: '',
      scriptName: '',
      creator: '',
      duration: undefined as number | undefined,
      tags: [] as string[],
    },
    validate: {
      title: (value) => (!value ? 'Title is required' : null),
      videoUrl: (value) => (value && !value.startsWith('http') ? 'Must be a valid URL' : null),
      thumbnailUrl: (value) => (value && !value.startsWith('http') ? 'Must be a valid URL' : null),
      scriptUrl: (value) => (value && !value.startsWith('http') ? 'Must be a valid URL' : null),
      scriptName: (value) => (!value ? 'Script name is required' : null),
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    setLoading(true);
    try {
      await createEntry({
        title: values.title,
        duration: values.duration ? values.duration * 1000 : undefined,
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
        message: 'Script added successfully',
        color: 'green',
      });

      form.reset();
      close();
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

  return (
    <>
      <Button className="box menuItem" miw={64} onClick={open}>
        <Flex gap="xs" align="center">
          <IconPlus />
          <Text display={{ base: 'none', sm: 'block' }}>New</Text>
        </Flex>
      </Button>

      <Modal
        opened={opened}
        onClose={() => {
          form.reset();
          close();
        }}
        title="Add new script"
        radius="lg"
      >
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
              placeholder="Script creator (optional)"
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
              <Button
                variant="default"
                onClick={() => {
                  form.reset();
                  close();
                }}
                radius="md"
              >
                Cancel
              </Button>
              <Button type="submit" loading={loading} radius="md">
                Add script
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
};
