import { Box, Flex, Text, Title } from '@mantine/core';

export const HelpIntro = () => {
  return (
    <Box component="section" id="help-intro" mb="md">
      <Flex
        className="box w"
        p={{ base: '32px', md: '64px' }}
        direction="column"
        align="center"
        mb="md"
      >
        <Title order={1} size={48} ta="center" my="md" fw={300} ff="var(--font-frankfurter)">
          How it works
        </Title>
        <Text size="lg" ta="center" maw={720}>
          IVE is a browser extension that connects to your haptic devices and syncs funscripts with
          video players on any website. Instead of downloading videos and scripts, IVE syncs with
          the site's own player, letting you enjoy interactive scripts directly. Next to that IVE
          also offers some other features to enhance your experience.
        </Text>
      </Flex>
    </Box>
  );
};
