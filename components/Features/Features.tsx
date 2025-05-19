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
        <Title order={1} ta="center" my="md">
          Features
        </Title>
        <Text size="lg" ta="center">
          Get the IVE extension for your favorite browser and start controlling your haptic devices
          today!
        </Text>
      </Flex>
      <Grid mt="md" gutter="md">
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Flex className="box w" h="100%" p={{ base: '32px', md: '64px' }} align="center" gap="xl">
            <IconRotateClockwise2 size={64} style={{ flexShrink: 0 }} />
            <Flex direction="column">
              <Title order={2} fw={500} mb="md">
                Auto Video Synchronization
              </Title>
              <Text>
                Automatically finds and syncs with video playback across all sites. No more need to
                download your favorite videos!
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
                Enhanced experience on popular sites like IDVB, FapTap and EroScripts with easy
                script loading.
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
                Works with the Handy and all Buttplug.io compatible devices including Lovense,
                Satisfyer, Autoblow, and many more. One extension to control everything.
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
                Are you excited? We are too! IVE is just getting started with much more to come.
                Stay tuned for updates and new features. Checkout our{' '}
                <a href="https://www.patreon.com/iveplay" target="_blank" rel="noopener noreferrer">
                  Patreon
                </a>{' '}
                for the latest news and developments.
              </Text>
            </Flex>
          </Flex>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
