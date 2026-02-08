import { IconSearch } from '@tabler/icons-react';
import { Box, Flex, Text } from '@mantine/core';
import { useDisclosure, useHotkeys } from '@mantine/hooks';
import { SearchModal } from './SearchModal';

export const HubSearch = () => {
  const [isOpen, { open, close }] = useDisclosure(false);

  useHotkeys([['mod + K', open]]);

  return (
    <>
      <Box className="box menuItem" component="button" onClick={open} p={0} w={64} h={64}>
        <Flex
          direction="column"
          align="center"
          c="var(--mantine-color-text)"
          justify="center"
          h="64"
          gap="2"
        >
          <IconSearch />
          <Text size="xs" className="hoverText">
            Search
          </Text>
        </Flex>
      </Box>
      <SearchModal isOpen={isOpen} onClose={close} />
    </>
  );
};
