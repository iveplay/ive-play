import Link from 'next/link';
import { useShallow } from 'zustand/shallow';
import { Button, Center, Flex, Loader, SimpleGrid, Text, Title } from '@mantine/core';
import { Video } from '@/components/video/Video';
import { useExtensionCheck } from '@/hooks/useExtensionCheck';
import { useIveStore } from '@/store/useIveStore';

export const Videos = () => {
  const {
    entries,
    favorites,
    loading,
    entriesHasMore,
    extensionAvailable,
    toggleFavorite,
    loadMoreEntries,
  } = useIveStore(
    useShallow((state) => ({
      entries: state.entries,
      favorites: state.favorites,
      loading: state.loading,
      entriesHasMore: state.entriesHasMore,
      extensionAvailable: state.extensionAvailable,
      toggleFavorite: state.toggleFavorite,
      loadMoreEntries: state.loadMoreEntries,
    }))
  );

  const { isLoading } = useExtensionCheck();

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
          Make sure you have the IVE browser extension installed and running.
        </Text>
        <Button component={Link} href="/#download" radius="lg" size="lg" fw={500}>
          Get the Extension
        </Button>
      </Flex>
    );
  }

  return (
    <>
      <SimpleGrid cols={{ base: 1, sm: 3, lg: 4, xl: 5 }} spacing="md" verticalSpacing="md">
        {entries.map((entryWithDetails) => {
          const { entry, videoSources, scripts } = entryWithDetails;
          const videoSource = videoSources[0];
          const script = scripts[0];

          return (
            <Video
              key={entry.id}
              href={videoSource?.url}
              title={entry.title}
              imageUrl={
                entry.thumbnail ||
                `https://placehold.co/400/DDD/333?font=roboto&text=${script?.creator}`
              }
              duration={entry.duration}
              actions={script?.actionCount}
              averageSpeed={script?.avgSpeed}
              maxSpeed={script?.maxSpeed}
              creator={script?.creator}
              creatorUrl={script?.supportUrl}
              tags={entry.tags}
              isFavorite={favorites.some((fav) => fav.id === entry.id)}
              onFavoriteToggle={() => toggleFavorite(entry.id)}
            />
          );
        })}
      </SimpleGrid>

      {entriesHasMore && (
        <Center mt="md">
          <Button onClick={loadMoreEntries} loading={loading} size="lg" radius="lg">
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        </Center>
      )}
    </>
  );
};
