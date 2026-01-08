import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useShallow } from 'zustand/shallow';
import { Box, Button, Center, Flex, Loader, SimpleGrid, Text } from '@mantine/core';
import { CloudVideo } from '@/content/hub/CloudVideo';
import { useCloudStore } from '@/store/useCloudStore';
import { apiClient } from '@/utils/api/client';

export const CloudVideos = () => {
  const { getToken } = useAuth();
  const { entries, loading, isLoadingMore, hasMore, error, loadEntries, loadMoreEntries } =
    useCloudStore(
      useShallow((state) => ({
        entries: state.entries,
        loading: state.loading,
        isLoadingMore: state.isLoadingMore,
        hasMore: state.hasMore,
        error: state.error,
        loadEntries: state.loadEntries,
        loadMoreEntries: state.loadMoreEntries,
      }))
    );

  // Set up token getter and load entries on mount
  useEffect(() => {
    apiClient.setTokenGetter(getToken);
    loadEntries(true);
  }, [getToken, loadEntries]);

  if (loading && entries.length === 0) {
    return (
      <Center flex={1}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center flex={1} className="box">
        <Text c="red">{error}</Text>
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
    <>
      <SimpleGrid cols={{ base: 1, sm: 3, lg: 4, xl: 5 }} spacing="md" verticalSpacing="md">
        {entries.map(({ entry, videoSources, scripts }) => (
          <CloudVideo key={entry.id} entry={entry} videoSources={videoSources} scripts={scripts} />
        ))}
      </SimpleGrid>
      {((hasMore && !loading) || isLoadingMore) && (
        <Flex mt="md" gap="md" justify="center" align="center">
          <Box className="box w" h="50" />
          <Button
            onClick={loadMoreEntries}
            loading={isLoadingMore}
            size="lg"
            radius="lg"
            flex="0 0 auto"
          >
            {isLoadingMore ? 'Loading...' : 'Load more'}
          </Button>
          <Box className="box w" h="50" />
        </Flex>
      )}
    </>
  );
};
