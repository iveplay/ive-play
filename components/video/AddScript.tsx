import { useState } from 'react';
import { Button, Checkbox, Divider, Group, Modal, Stack, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useIveStore } from '@/store/useIveStore';
import { iveBridge, IveEntry, ScriptMetadata, VideoSource } from '@/utils/iveBridge';
import styles from './ModalEntry.module.css';

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
  const [isLocalFile, setIsLocalFile] = useState(false);
  const updateEntry = useIveStore((state) => state.updateEntry);

  const form = useForm({
    initialValues: {
      url: '',
      name: '',
      creator: '',
      setAsDefault: false,
      file: null as File | null,
    },
    validate: {
      url: (value) =>
        !isLocalFile && !value
          ? 'Script URL is required'
          : !isLocalFile && !value.startsWith('http')
            ? 'Must be a valid URL'
            : null,
      name: (value) => (!value ? 'Script name is required' : null),
      file: (value) => (isLocalFile && !value ? 'Please select a .funscript file' : null),
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      form.setFieldValue('file', file);
      if (!form.values.name) {
        form.setFieldValue('name', file.name.replace('.funscript', ''));
      }
    }
  };

  const handleSubmit = form.onSubmit(async (values) => {
    setLoading(true);
    try {
      let scriptUrl = values.url;

      // Handle local file upload
      if (isLocalFile && values.file) {
        const fileContent = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsText(values.file!);
        });

        const content = JSON.parse(fileContent);
        const scriptId = await iveBridge.saveLocalScript(
          values.file.name,
          content,
          values.file.size
        );

        scriptUrl = `file://${scriptId}`;
      } else {
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
      }

      // Add the new script to existing scripts
      const updatedScripts = [
        ...existingScripts.map((script) => ({
          url: script.url,
          name: script.name,
          creator: script.creator || 'Unknown',
        })),
        {
          url: scriptUrl,
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
        defaultScriptId: values.setAsDefault ? scriptUrl : entry.defaultScriptId,
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
        message: `Failed to add script: ${error instanceof Error ? error.message : String(error)}`,
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  });

  const handleClose = () => {
    form.reset();
    setIsLocalFile(false);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Add script"
      radius="lg"
      size="md"
      classNames={{
        title: styles.modalTitle,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Add a new script to &quot;{entry.title}&quot;
          </Text>

          <Group>
            <Button
              variant={!isLocalFile ? 'filled' : 'default'}
              onClick={() => setIsLocalFile(false)}
              radius="md"
            >
              URL
            </Button>
            <Button
              variant={isLocalFile ? 'filled' : 'default'}
              onClick={() => setIsLocalFile(true)}
              radius="md"
            >
              Local File
            </Button>
          </Group>

          {isLocalFile ? (
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
              key={form.key('url')}
              label="Script URL"
              placeholder="https://..."
              required
              radius="md"
              {...form.getInputProps('url')}
            />
          )}

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

          <Checkbox
            label="Set as default script"
            {...form.getInputProps('setAsDefault', { type: 'checkbox' })}
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
