import {
  IconBell,
  IconBulb,
  IconDeviceMobile,
  IconPlayerPlay,
  IconRotateClockwise2,
} from '@tabler/icons-react';
import { Box, Flex, Grid, Text, Title } from '@mantine/core';

export const Features = () => {
  return (
    <Box component="section" id="features" mb="md">
      <Flex className="box w" p={{ base: '64px', md: '96px' }} direction="column" align="center">
        <IconBulb size={48} />
        <Title order={1} ta="center" my="md" fw={300} ff="var(--font-frankfurter)">
          Features
        </Title>
        <Text size="lg" ta="center">
          Get the IVE extension for your favorite browser and start controlling your haptic devices
          today!
          <br />
          We already support a wide range of features, but there is much more to come.
          <br />
          <Text component="span" fw={700}>
            Stay tuned for updates!
          </Text>
        </Text>
      </Flex>
      <Grid mt="md" gutter="md" overflow="hidden">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Flex className="box w" h="100%" p={{ base: '32px', md: '64px' }} align="center" gap="xl">
            <IconRotateClockwise2 size={64} style={{ flexShrink: 0 }} />
            <Flex direction="column">
              <Title order={2} fw={500} mb="md">
                Auto Video Synchronization
              </Title>
              <Text>
                Automatically finds and syncs with video playback across{' '}
                <Text component="span" fw={700}>
                  all sites
                </Text>
                . No more need to download your favorite videos!
              </Text>
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Flex className="box w" h="100%" p={{ base: '32px', md: '64px' }} align="center" gap="xl">
            <IconPlayerPlay size={64} style={{ flexShrink: 0 }} />
            <Flex direction="column">
              <Title order={2} fw={500} mb="md">
                Script Website Integration
              </Title>
              <Text>
                Enhanced experience on popular sites like{' '}
                <Text component="span" fw={700}>
                  IDVB, FapTap and EroScripts
                </Text>{' '}
                with easy script loading.
              </Text>
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Flex className="box w" h="100%" p={{ base: '32px', md: '64px' }} align="center" gap="xl">
            <IconDeviceMobile size={64} style={{ flexShrink: 0 }} />
            <Flex direction="column">
              <Title order={2} fw={500} mb="md">
                Universal Device Support
              </Title>
              <Text>
                Works with{' '}
                <Text component="span" fw={700}>
                  The Handy
                </Text>{' '}
                and all{' '}
                <Text component="span" fw={700}>
                  Buttplug.io
                </Text>{' '}
                compatible devices including{' '}
                <Text component="span" fw={700}>
                  Lovense, Satisfyer, Autoblow
                </Text>
                , and many more. One extension to control everything.
              </Text>
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Flex className="box w" h="100%" p={{ base: '32px', md: '64px' }} align="center" gap="xl">
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
                  <a
                    href="https://www.patreon.com/iveplay"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Patreon
                  </a>
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
