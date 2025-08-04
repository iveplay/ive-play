import { IconBrandDiscord, IconBrandPatreon, IconHeartHandshake } from '@tabler/icons-react';
import { Box, Button, Flex, Grid, Group, Text, Title } from '@mantine/core';

export const Support = () => {
  return (
    <Box component="section" id="support" mb="md">
      <Grid gutter="md">
        <Grid.Col span={{ base: 0, md: 2 }} display={{ base: 'none', md: 'block' }}>
          <div className="box w" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Flex
            className="box w"
            p={{ base: '64px', md: '96px' }}
            direction="column"
            align="center"
          >
            <IconHeartHandshake size={48} />
            <Title order={1} ta="center" my="md" fw={300} ff="var(--font-frankfurter)">
              Support Us
            </Title>
            <Text size="lg" ta="center">
              IVE is developed by a single developer passionate about creating the best interactive
              experience. Your support helps us continue improving and adding new features like
              additional device support and platform integrations.
            </Text>
            <Group align="center" justify="center" mt="lg">
              <Button
                component="a"
                href="https://patreon.com/iveplay"
                target="_blank"
                rel="noopener noreferrer"
                radius="lg"
                size="lg"
                fw={500}
                color="#FF424D"
              >
                <IconBrandPatreon size={20} style={{ marginRight: 8 }} />
                Support on Patreon
              </Button>
              <Button
                component="a"
                href="https://discord.gg/KsYCE4jRHE"
                target="_blank"
                rel="noopener noreferrer"
                radius="lg"
                size="lg"
                fw={500}
                color="#5865F2"
              >
                <IconBrandDiscord size={20} style={{ marginRight: 8 }} />
                Join our Discord
              </Button>
            </Group>
          </Flex>
        </Grid.Col>
        <Grid.Col span={{ base: 0, md: 2 }} display={{ base: 'none', md: 'block' }}>
          <div className="box w" />
        </Grid.Col>
      </Grid>
    </Box>
  );
};
