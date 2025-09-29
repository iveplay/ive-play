import Link from 'next/link';
import { useShallow } from 'zustand/shallow';
import { Box, Button, Center, Flex, Loader, SimpleGrid, Text, Title } from '@mantine/core';
import { Video } from '@/components/video/Video';
import { useExtensionCheck } from '@/hooks/useExtensionCheck';
import { useNewVideosCheck } from '@/hooks/useNewVideosCheck';
import { useIveStore } from '@/store/useIveStore';
import { EmptyVideos } from './EmptyVideos';

export const Videos = () => {
  const { entries, loading, isLoadingMore, entriesHasMore, extensionAvailable, loadMoreEntries } =
    useIveStore(
      useShallow((state) => ({
        entries: state.entries,
        loading: state.loading,
        isLoadingMore: state.isLoadingMore,
        entriesHasMore: state.entriesHasMore,
        extensionAvailable: state.extensionAvailable,
        loadMoreEntries: state.loadMoreEntries,
      }))
    );

  const { isLoading } = useExtensionCheck();
  useNewVideosCheck(10000);

  if (isLoading) {
    return (
      <Center flex={1}>
        <Loader size="lg" />
      </Center>
    );
  }

  if (!extensionAvailable) {
    return (
      <Flex flex={1} direction="column" align="center" justify="center" className="box">
        <Title order={1} my="md" fw={300} ff="var(--font-frankfurter)">
          IVE not detected
        </Title>
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
    return <EmptyVideos />;
  }

  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 3, lg: 4, xl: 5 }} spacing="md" verticalSpacing="md">
        {entries.map((entryWithDetails) => {
          const { entry, videoSources, scripts } = entryWithDetails;

          return (
            <Video key={entry.id} entry={entry} videoSources={videoSources} scripts={scripts} />
          );
        })}
      </SimpleGrid>

      {entriesHasMore && !loading && (
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
