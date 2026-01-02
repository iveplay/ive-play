import { IconPlus } from '@tabler/icons-react';
import { Button, Flex, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { EntryFormModal } from '@/components/entry/EntryFormModal';
import { useIveStore } from '@/store/useIveStore';
import { iveBridge } from '@/utils/iveBridge';

export const NewEntry = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const createEntry = useIveStore((state) => state.createEntry);

  const processLocalScript = async (file: File): Promise<string> => {
    const fileContent = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });

    const content = JSON.parse(fileContent);
    const scriptId = await iveBridge.saveLocalScript(file.name, content, file.size);
    return `file://${scriptId}`;
  };

  const handleSubmit = async (values: {
    title: string;
    duration?: number;
    thumbnail?: string;
    tags: string[];
    videoSources: { url: string }[];
    scripts: { url: string; name: string; creator: string }[];
    defaultScriptId?: string;
  }) => {
    await createEntry({
      title: values.title,
      duration: values.duration,
      thumbnail: values.thumbnail,
      tags: values.tags.length > 0 ? ['manual', ...values.tags] : ['manual'],
      videoSources: values.videoSources,
      scripts: values.scripts,
      defaultScriptId: values.defaultScriptId,
    });
  };

  return (
    <>
      <Button className="box h menuItem" miw={64} onClick={open}>
        <Flex gap="xs" align="center">
          <IconPlus />
          <Text display={{ base: 'none', sm: 'block' }}>New</Text>
        </Flex>
      </Button>

      <EntryFormModal
        opened={opened}
        onClose={close}
        mode="create"
        showLocalScripts
        onSubmit={handleSubmit}
        processLocalScript={processLocalScript}
      />
    </>
  );
};
