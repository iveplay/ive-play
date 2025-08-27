import {
  IconBell,
  IconBrowserShare,
  IconBulb,
  IconChartHistogram,
  IconLayoutSidebarRightExpandFilled,
} from '@tabler/icons-react';
import { Anchor, Box, Flex, Grid, Text, Title } from '@mantine/core';

export const FeaturesExplained = () => {
  return (
    <Box component="section" id="features" mb="md">
      <Flex className="box w" p={{ base: '48px', md: '96px' }} direction="column" align="center">
        <IconBulb size={48} />
        <Title order={2} size={32} ta="center" my="md" fw={300} ff="var(--font-frankfurter)">
          Features
        </Title>
        <Text size="lg" ta="center">
          IVE has a lot more features to offer than just playing funscripts.
          <br />
          Here is an overview of the main features you can use to enhance your experience.
          <br />
          <Text component="span" fw={700}>
            Stay tuned for updates!
          </Text>
        </Text>
      </Flex>
      <Grid mt="md" gutter="md" overflow="hidden">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Flex className="box w" h="100%" p={{ base: '32px', md: '48px' }} align="center" gap="xl">
            <IconLayoutSidebarRightExpandFilled size={64} style={{ flexShrink: 0 }} />
            <Flex direction="column">
              <Title order={2} fw={500} mb="md">
                Side panel
              </Title>
              <Text>
                The side panel is shown on all sites that you have a script for. On the side panel
                you can resync the script to your device if the sync was lost or didn't start.
              </Text>
              <Text mt="md">
                You can also enable the custom video player from here. You will find more info about
                the script creator.
              </Text>
              <Text mt="md">If you like to reverse the script you can also do it here.</Text>
              <Text mt="md">
                The side panel can also always be enabled on sites you list in the settings.
              </Text>
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Flex className="box w" h="100%" p={{ base: '32px', md: '48px' }} align="center" gap="xl">
            <IconBrowserShare size={64} style={{ flexShrink: 0 }} />
            <Flex direction="column">
              <Title order={2} fw={500} mb="md">
                Custom video player
              </Title>
              <Text>
                IVE comes with its own video player. Not all sites offer the best experience making
                it not enjoyable to watch online.
              </Text>
              <Text>The player supports fullscreen, theater mode, resizing, moving and more.</Text>
              <Text mt="md">
                To activate the player open the IVE side panel on the side and click the Float
                button. Or you can also right click the IVE extension and select "Float player".
              </Text>
              <Text component="span" fw={700} mt="md">
                The video player can also perfectly be used without playing scripts or connecting
                your haptic device.
              </Text>
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Flex className="box w" h="100%" p={{ base: '32px', md: '48px' }} align="center" gap="xl">
            <IconChartHistogram size={64} style={{ flexShrink: 0 }} />
            <Flex direction="column">
              <Title order={2} fw={500} mb="md">
                Heatmap
              </Title>
              <Text>
                The heatmap visualizes the script interactions with a heatmap overlay. This gives
                you a better understanding of how the script is performing and where the most
                intense interactions are happening.
              </Text>
              <Text mt="md">
                You can activate the heatmap by enabling it in the settings of the IVE popup or by
                right-clicking the IVE extension and selecting "Enable heatmap".
              </Text>
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Flex className="box w" h="100%" p={{ base: '32px', md: '48px' }} align="center" gap="xl">
            <IconBell size={64} style={{ flexShrink: 0 }} />
            <Flex direction="column">
              <Title order={2} fw={500} mb="md">
                Much more coming soon...
              </Title>
              <Text>
                Are you excited? We are too! IVE is just{' '}
                <Text component="span" fw={700}>
                  getting started
                </Text>{' '}
                with much more to come. Stay tuned for updates and new features. Checkout our{' '}
                <Text component="span" fw={700}>
                  <Anchor href="https://www.patreon.com/iveplay" target="_blank" fw={700}>
                    Patreon
                  </Anchor>
                </Text>{' '}
                for the latest news and developments.
              </Text>
            </Flex>
          </Flex>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
