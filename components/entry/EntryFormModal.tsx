import { useState } from 'react';
import { Button, Group, Modal } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { createEmptyScript, EntryForm, entryFormValidation, EntryFormValues } from './EntryForm';
import styles from './EntryFormModal.module.css';

type EntryData = {
  id: string;
  title: string;
  thumbnail?: string;
  duration?: number;
  tags?: string[];
  defaultScriptId?: string;
  videoSources: { url: string }[];
  scripts: { url: string; name: string; creator: string }[];
};

type EntryFormModalProps = {
  opened: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  initialData?: EntryData;
  showLocalScripts?: boolean;
  onSubmit: (values: {
    title: string;
    duration?: number;
    thumbnail?: string;
    tags: string[];
    videoSources: { url: string }[];
    scripts: { url: string; name: string; creator: string }[];
    defaultScriptId?: string;
  }) => Promise<void>;
  processLocalScript?: (file: File) => Promise<string>;
};

export const EntryFormModal = ({
  opened,
  onClose,
  mode,
  initialData,
  showLocalScripts = false,
  onSubmit,
  processLocalScript,
}: EntryFormModalProps) => {
  const [loading, setLoading] = useState(false);

  const getInitialValues = (): EntryFormValues => {
    if (mode === 'edit' && initialData) {
      return {
        title: initialData.title,
        thumbnailUrl: initialData.thumbnail || '',
        duration: initialData.duration ? initialData.duration / 1000 : undefined,
        tags: initialData.tags?.filter((t) => t !== 'manual') || [],
        videoSources:
          initialData.videoSources.length > 0
            ? initialData.videoSources.map((v) => ({ url: v.url }))
            : [{ url: '' }],
        scripts:
          initialData.scripts.length > 0
            ? initialData.scripts.map((s) => ({
                url: s.url,
                name: s.name,
                creator: s.creator || '',
                isLocal: s.url.startsWith('file://'),
                file: null,
              }))
            : [createEmptyScript()],
        defaultScriptId:
          initialData.defaultScriptId ||
          (initialData.scripts.length > 0 ? initialData.scripts[0].url : undefined),
      };
    }

    return {
      title: '',
      thumbnailUrl: '',
      duration: undefined,
      tags: [],
      videoSources: [{ url: '' }],
      scripts: [createEmptyScript()],
      defaultScriptId: undefined,
    };
  };

  const form = useForm<EntryFormValues>({
    initialValues: getInitialValues(),
    validate: entryFormValidation,
  });

  const handleSubmit = form.onSubmit(async (values) => {
    setLoading(true);
    try {
      const validVideoSources = values.videoSources.filter((s) => s.url);
      if (validVideoSources.length === 0) {
        notifications.show({
          title: 'Error',
          message: 'At least one video source is required',
          color: 'red',
        });
        setLoading(false);
        return;
      }

      // Process scripts
      const processedScripts = await Promise.all(
        values.scripts
          .filter(
            (s) =>
              (s.isLocal && s.file) ||
              (!s.isLocal && s.url) ||
              s.url.startsWith('file://') ||
              s.url.startsWith('http')
          )
          .map(async (script) => {
            let scriptUrl = script.url;

            // Handle local file upload
            if (script.isLocal && script.file && processLocalScript) {
              scriptUrl = await processLocalScript(script.file);
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

      await onSubmit({
        title: values.title,
        duration: values.duration ? values.duration * 1000 : undefined,
        thumbnail: values.thumbnailUrl || undefined,
        tags: values.tags,
        videoSources: validVideoSources,
        scripts: processedScripts,
        defaultScriptId: values.defaultScriptId,
      });

      notifications.show({
        title: 'Success',
        message: mode === 'create' ? 'Entry created' : 'Entry updated',
        color: 'green',
      });

      form.reset();
      onClose();
    } catch {
      notifications.show({
        title: 'Error',
        message: mode === 'create' ? 'Failed to create entry' : 'Failed to update entry',
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
      title={mode === 'create' ? 'New Entry' : 'Edit Entry'}
      size="xl"
      radius="xl"
      padding={0}
      centered
      classNames={{
        header: styles.modalHeader,
        body: styles.modalBody,
        content: styles.modalContent,
      }}
    >
      <form onSubmit={handleSubmit}>
        <EntryForm form={form} showLocalScripts={showLocalScripts} />

        <div className={styles.footer}>
          <Group gap="sm" className={styles.footerActions}>
            <Button variant="default" onClick={handleClose} radius="lg">
              Cancel
            </Button>
            <Button type="submit" loading={loading} radius="lg">
              {mode === 'create' ? 'Create' : 'Save'}
            </Button>
          </Group>
        </div>
      </form>
    </Modal>
  );
};
