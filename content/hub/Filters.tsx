import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { useShallow } from 'zustand/shallow';
import { Button, Flex } from '@mantine/core';
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
      onClick={() => setFilters({ ...filters, favorites: !filters.favorites })}
    >
      <Flex gap="xs" align="center">
        {filters.favorites ? <IconHeartFilled /> : <IconHeart />}
        Favorites
      </Flex>
    </Button>
  );
};
