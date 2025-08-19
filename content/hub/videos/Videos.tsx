import { Box, SimpleGrid } from '@mantine/core';

export const Videos = () => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 5 }} spacing="md" verticalSpacing="md">
      <Box h={300} className="box">
        1
      </Box>
      <Box h={300} className="box">
        2
      </Box>
      <Box h={300} className="box">
        3
      </Box>
      <Box h={300} className="box">
        4
      </Box>
      <Box h={300} className="box">
        2
      </Box>
      <Box h={300} className="box">
        3
      </Box>
      <Box h={300} className="box">
        4
      </Box>
    </SimpleGrid>
  );
};
