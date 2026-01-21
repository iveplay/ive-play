import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Box, Button, Center, Flex, Loader, SimpleGrid, Text } from '@mantine/core';
import { CloudVideo } from '@/content/hub/CloudVideo';
import { useInfiniteEntries } from '@/hooks/useEntries';
import { useExtensionCheck } from '@/hooks/useExtensionCheck';
import { apiClient } from '@/utils/api/client';

export const CloudVideos = () => {
  const { getToken } = useAuth();

  // Set up token getter on mount
  useEffect(() => {
    apiClient.setTokenGetter(getToken);
  }, [getToken]);

  // Use React Query for data fetching with automatic caching
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, isLoading } =
    useInfiniteEntries(20);

  // lets just always check
  useExtensionCheck();

  // Flatten all pages into a single array of entries
  const entries = data?.pages.flatMap((page) => page.entries) ?? [];

  if (isLoading) {
    return (
      <Center flex={1}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center flex={1} className="box">
        <Text c="red">{error instanceof Error ? error.message : 'Failed to load entries'}</Text>
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
      {((hasNextPage && !isFetching) || isFetchingNextPage) && (
        <Flex mt="md" gap="md" justify="center" align="center">
          <Box className="box w" h="50" />
          <Button
            onClick={() => fetchNextPage()}
            loading={isFetchingNextPage}
            size="lg"
            radius="lg"
            flex="0 0 auto"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load more'}
          </Button>
          <Box className="box w" h="50" />
        </Flex>
      )}
    </>
  );
};
