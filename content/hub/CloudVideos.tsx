import { Center, Loader, SimpleGrid, Text } from '@mantine/core';
import { CloudVideo } from '@/content/hub/CloudVideo';
import { EntryWithDetails } from '@/utils/api/entries';
import { PatreonRequired } from './PatreonRequired';

interface CloudVideosProps {
  entries: EntryWithDetails[];
  isLoading: boolean;
  error: Error | null;
}

export const CloudVideos = ({ entries, isLoading, error }: CloudVideosProps) => {
  if (isLoading) {
    return (
      <Center flex={1}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to load entries';
    const isPatreonError = errorMessage.includes('Patreon subscription required');

    if (isPatreonError) {
      return <PatreonRequired />;
    }

    return (
      <Center flex={1} className="box">
        <Text c="red">{errorMessage}</Text>
      </Center>
    );
  }

  if (entries.length === 0) {
    return (
      <Center flex={1} className="box">
        <Text c="dimmed">No entries found</Text>
      </Center>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing="md" verticalSpacing="md">
      {entries.map(({ entry, videoSources, scripts }) => (
        <CloudVideo key={entry.id} entry={entry} videoSources={videoSources} scripts={scripts} />
      ))}
    </SimpleGrid>
  );
};
