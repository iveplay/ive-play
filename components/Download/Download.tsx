import { IconBrandChrome, IconBrandFirefox, IconDownload } from '@tabler/icons-react';
import { Box, Button, Flex, Grid, Text, Title } from '@mantine/core';

export const Download = () => {
  return (
    <Box component="section" id="download" mb="md">
      <Flex className="box w" p={{ base: '64px', md: '96px' }} direction="column" align="center">
        <IconDownload size={48} />
        <Title order={1} ta="center" my="md">
          Download the Extension
        </Title>
        <Text size="lg" ta="center">
          Get the IVE extension for your favorite browser and start controlling your haptic devices
          today!
        </Text>
      </Flex>
      <Grid mt="md" gutter="md">
        <Grid.Col span={{ base: 0, md: 2 }} display={{ base: 'none', md: 'block' }}>
          <div className="box w" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Flex
            className="box w"
            h="100%"
            p={{ base: '32px', md: '64px' }}
            direction="column"
            align="center"
            justify="center"
          >
            <Title order={2} ta="center" fw={500}>
              Works with Chrome, Edge, Brave and most Chromium browsers
            </Title>
            <Button
              component="a"
              href="https://chromewebstore.google.com/detail/eaoceppbmjlcdfcampmnaaogckfkmjbo?utm_source=item-share-cb"
              target="_blank"
              rel="noopener noreferrer"
              radius="lg"
              size="lg"
              mt="lg"
              fw={500}
            >
              <IconBrandChrome size={20} style={{ marginRight: 8 }} />
              Download for Chrome
            </Button>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Flex
            className="box w"
            h="100%"
            p={{ base: '32px', md: '64px' }}
            direction="column"
            align="center"
            justify="center"
          >
            <Title order={2} ta="center" fw={500}>
              Works with Firefox and Firefox for Android
            </Title>
            <Button
              component="a"
              href="https://addons.mozilla.org/en-US/firefox/addon/ive/"
              target="_blank"
              rel="noopener noreferrer"
              radius="lg"
              size="lg"
              mt="lg"
              fw={500}
            >
              <IconBrandFirefox size={20} style={{ marginRight: 8 }} />
              Download for Firefox
            </Button>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 0, md: 2 }} display={{ base: 'none', md: 'block' }}>
          <div className="box w" />
        </Grid.Col>
      </Grid>
    </Box>
  );
};
