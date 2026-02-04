import { useEffect } from 'react';
import Link from 'next/link';
import { useShallow } from 'zustand/shallow';
import { Box, Button, Center, Flex, Loader, SimpleGrid, Text, Title } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { Video } from '@/content/local/videos/Video';
import { useExtensionCheck } from '@/hooks/useExtensionCheck';
import { useNewVideosCheck } from '@/hooks/useNewVideosCheck';
import { useIveStore } from '@/store/useIveStore';
import { REQUIRED_VERSION } from '@/utils/versions';
import { EmptyFavorites } from './EmptyFavorites';
import { EmptyVideos } from './EmptyVideos';

export const Videos = () => {
  const {
    entries,
    loading,
    filters,
    isLoadingMore,
    entriesHasMore,
    extensionAvailable,
    extensionVersion,
    isVersionCompatible,
    loadMoreEntries,
  } = useIveStore(
    useShallow((state) => ({
      entries: state.entries,
      loading: state.loading,
      filters: state.filters,
      isLoadingMore: state.isLoadingMore,
      entriesHasMore: state.entriesHasMore,
      extensionAvailable: state.extensionAvailable,
      extensionVersion: state.extensionVersion,
      isVersionCompatible: state.isVersionCompatible,
      loadMoreEntries: state.loadMoreEntries,
    }))
  );

  const { ref: sentinelRef, entry } = useIntersection({ rootMargin: '200px' });

  useEffect(() => {
    if (entry?.isIntersecting) {
      loadMoreEntries();
    }
  }, [entry?.isIntersecting, loadMoreEntries]);

  const { isLoading } = useExtensionCheck();
  useNewVideosCheck(10000);

  if (isLoading) {
    return (
      <Center flex={1}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (!extensionAvailable || !isVersionCompatible) {
    return (
      <Flex flex={1} direction="column" align="center" justify="center" className="box">
        <Title order={1} my="md" fw={300} ff="var(--font-frankfurter)">
          {extensionAvailable && !isVersionCompatible ? `IVE version mismatch` : 'IVE not detected'}
        </Title>
        {extensionAvailable && !isVersionCompatible && (
          <Text fw={500}>
            {`IVE version ${extensionVersion} detected, expected ${REQUIRED_VERSION}`}
          </Text>
        )}
        <Text mb="lg" fw={500}>
          Make sure you have the latest IVE browser extension installed and running.
        </Text>
        <Button component={Link} href="/#download" radius="lg" size="lg" fw={500}>
          Get the extension
        </Button>
      </Flex>
    );
  }

  if (entries.length === 0 && !loading) {
    if (filters.favorites) {
      return <EmptyFavorites />;
    }

    return <EmptyVideos />;
  }

  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }} spacing="md" verticalSpacing="md">
        {entries.map((entryWithDetails) => {
          const { entry, videoSources, scripts } = entryWithDetails;

          return (
            <Video key={entry.id} entry={entry} videoSources={videoSources} scripts={scripts} />
          );
        })}
      </SimpleGrid>

      {((entriesHasMore && !loading) || isLoadingMore) && (
        <Flex mt="md" gap="md" justify="center" align="center" ref={sentinelRef}>
          <Box className="box w" h="50" />
          {isLoadingMore ? (
            <Loader size="md" />
          ) : (
            <Button
              onClick={loadMoreEntries}
              loading={isLoadingMore}
              size="lg"
              radius="lg"
              flex="0 0 auto"
            >
              Load more
            </Button>
          )}
          <Box className="box w" h="50" />
        </Flex>
      )}
    </>
  );
};
