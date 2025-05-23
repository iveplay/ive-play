import { IconBrandChrome, IconBrandFirefox, IconDownload } from '@tabler/icons-react';
import { Box, Button, Flex, Grid, Text, Title, Tooltip } from '@mantine/core';

const CHROME_VERSION = '0.4.6';
const FIREFOX_VERSION = '0.4.6';

export const Download = () => {
  return (
    <Box component="section" id="download" mb="md">
      <Flex className="box w" p={{ base: '64px', md: '96px' }} direction="column" align="center">
        <IconDownload size={48} />
        <Title order={1} ta="center" my="md" fw={300} ff="var(--font-frankfurter)">
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
            direction="column"
            align="center"
            justify="center"
            p={{ base: '32px', md: '64px' }}
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
              Install from Chrome Store
            </Button>
            <Tooltip
              label={
                <>
                  Go to chrome://extensions/.
                  <br />
                  Enable developer mode and reload.
                  <br />
                  Then drag and drop the crx file to install the extension.
                </>
              }
              withArrow
              position="bottom"
              radius="md"
            >
              <Button
                component="a"
                href={`/extension/ive-${CHROME_VERSION}.crx`}
                radius="lg"
                size="md"
                variant="default"
                mt="sm"
                download
              >
                Direct download
              </Button>
            </Tooltip>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Flex
            className="box w"
            direction="column"
            align="center"
            justify="center"
            p={{ base: '32px', md: '64px' }}
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
              Install from Firefox Store
            </Button>

            <Button
              component="a"
              href={`/extension/ive-${FIREFOX_VERSION}.xpi`}
              radius="lg"
              size="md"
              variant="default"
              mt="sm"
            >
              Direct download
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
