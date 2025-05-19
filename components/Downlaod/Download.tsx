import { IconBrandChrome, IconBrandFirefox } from '@tabler/icons-react';
import { Box, Button, Flex, Group, Text, Title } from '@mantine/core';

export const Download = () => {
  return (
    <section id="download">
      <Box className="box w" p="xl">
        <Title order={2} ta="center" fw={500}>
          Download the Extension
        </Title>
        <Text size="lg" ta="center">
          Get the IVE extension for your favorite browser and start controlling your haptic devices
          today!
        </Text>
      </Box>
      <Group mt="md" grow>
        <Flex className="box w" p="xl" mx="auto" direction="column" align="center">
          <Text ta="center" size="lg">
            Works with Chrome, Edge, Brave and most Chromium browsers
          </Text>
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
        <Flex className="box w" p="xl" mx="auto" direction="column" align="center">
          <Text ta="center" size="lg">
            Works with Firefox and Firefox for Android
          </Text>
          <Text ta="center" fw={500}>
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
          </Text>
        </Flex>
      </Group>
    </section>
  );
};
