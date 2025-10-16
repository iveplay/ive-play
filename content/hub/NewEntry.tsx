import { useState } from 'react';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Flex,
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
      scripts: [{ url: '', name: '', creator: '' }],
      duration: undefined as number | undefined,
      tags: [] as string[],
    },
    validate: {
      title: (value) => (!value ? 'Title is required' : null),
      videoUrl: (value) => (value && !value.startsWith('http') ? 'Must be a valid URL' : null),
      thumbnailUrl: (value) => (value && !value.startsWith('http') ? 'Must be a valid URL' : null),
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

  const handleSubmit = form.onSubmit(async (values) => {
    setLoading(true);
    try {
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

      await createEntry({
        title: values.title,
        duration: values.duration ? values.duration * 1000 : undefined,
        tags: values.tags.length > 0 ? ['manual', ...values.tags] : ['manual'],
        videoSources: [{ url: values.videoUrl }],
        scripts: validScripts.map((script) => ({
          url: script.url,
          name: script.name,
          creator: script.creator || 'Unknown',
        })),
      });

      notifications.show({
        title: 'Success',
        message: 'Entry added successfully',
        color: 'green',
      });

      form.reset();
      close();
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to add entry',
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
        title="Add new entry"
        radius="lg"
        size="xl"
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
                      form.insertListItem('scripts', { url: '', name: '', creator: '' })
                    }
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
                            placeholder="Script creator (optional)"
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
              Add entry
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};
