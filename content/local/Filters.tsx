import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useShallow } from 'zustand/shallow';
import { Button, Flex, Text } from '@mantine/core';
import { useIveStore } from '@/store/useIveStore';

export const Filters = () => {
  const { filters, setFilters } = useIveStore(
    useShallow((state) => ({
      filters: state.filters,
      setFilters: state.setFilters,
    }))
  );

  return (
    <Button
      className="box menuItem"
      miw={64}
      onClick={() => setFilters({ ...filters, favorites: !filters.favorites })}
      p={{ base: '0', md: '16' }}
    >
      <Flex
        gap={{ base: '2', md: 'xs' }}
        align="center"
        justify="center"
        direction={{ base: 'column', md: 'row' }}
        h={{ base: '64', md: 'auto' }}
      >
        {filters.favorites ? <IconHeartFilled /> : <IconHeart />}
        <Text size="xs" hiddenFrom="md">
          Favorites
        </Text>
        <Text visibleFrom="md">Favorites</Text>
      </Flex>
    </Button>
  );
};
