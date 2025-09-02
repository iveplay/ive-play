import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { SimpleGrid } from '@mantine/core';
import { Video } from '@/components/video/Video';
import { useIveStore } from '@/store/useIveStore';

export const Videos = () => {
  const { entries, favorites, toggleFavorite, loadEntries, loadFavorites, extensionAvailable } =
    useIveStore(
      useShallow((state) => ({
        entries: state.entries,
        loading: state.loading,
        error: state.error,
        favorites: state.favorites,
        toggleFavorite: state.toggleFavorite,
        loadEntries: state.loadEntries,
        loadFavorites: state.loadFavorites,
        extensionAvailable: state.extensionAvailable,
      }))
    );

  useEffect(() => {
    setTimeout(() => {
      loadEntries();
      loadFavorites();
    }, 1000);
  }, []);

  if (!extensionAvailable) {
    return <div>IVE Extension not detected. Please install it first.</div>;
  }

  return (
    <SimpleGrid cols={{ base: 1, sm: 3, lg: 4, xl: 5 }} spacing="md" verticalSpacing="md">
      {entries.map((entry) => (
        <Video
          key={entry.id}
          href="https://iveplay.io/"
          title={entry.title}
          imageUrl={entry.thumbnail || 'https://placehold.co/400'}
          duration={entry.duration}
          tags={entry.tags}
          isFavorite={favorites.some((fav) => fav.id === entry.id)}
          onFavoriteToggle={() => toggleFavorite(entry.id)}
        />
      ))}
    </SimpleGrid>
  );
};
