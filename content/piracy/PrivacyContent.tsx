import clsx from 'clsx';
import { Anchor, Box, Flex, List, Text, Title } from '@mantine/core';
import styles from './PrivacyContent.module.css';

export const PrivacyContent = () => {
  return (
    <Flex component="section" mb="md" gap="md">
      <div className={clsx(styles.sideBoxes, 'box')} />
      <Flex
        className="box h"
        flex="0 1 auto"
        p={{ base: '32px', md: '64px' }}
        direction="column"
        maw={960}
        mx="auto"
      >
        <Title order={1} size={48} ta="center" mb="xs" fw={300} ff="var(--font-frankfurter)">
          Privacy Policy
        </Title>
        <Text size="sm" c="dimmed" ta="center" mb="xl">
          December 3, 2025
        </Text>

        {/* Our commitment */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Our commitment to your privacy
          </Title>
          <Text mb="md">
            At IVEplay, we believe privacy is a fundamental right. This Privacy Policy explains how
            we handle information when you use our IVE (Interactive Video Experience) browser
            extension and web services at iveplay.io.
          </Text>
          <Text fw={600}>
            The bottom line: IVE is designed with privacy at its core. We don't collect, analyze, or
            transmit your personal data. Everything happens locally on your device.
          </Text>
        </Box>

        {/* What we don't do */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            What we don't do
          </Title>
          <Text mb="sm">Let's start with what matters most:</Text>
          <List spacing="sm" mb="md">
            <List.Item>
              <Text component="span" fw={600}>
                No data Collection:
              </Text>{' '}
              We do not collect any personally identifiable information
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                No tracking:
              </Text>{' '}
              We do not track your browsing history or video viewing habits
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                No analytics:
              </Text>{' '}
              We do not use analytics tools to monitor your usage
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                No activity logging:
              </Text>{' '}
              We do not log your interactions with videos or scripts
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                No data selling:
              </Text>{' '}
              We will never sell your information to third parties
            </List.Item>
          </List>
        </Box>

        {/* What happens locally */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            What happens locally
          </Title>
          <Text mb="sm">
            IVE stores certain information{' '}
            <Text component="span" fw={600}>
              locally on your device only
            </Text>{' '}
            to provide core functionality:
          </Text>
          <List spacing="sm" mb="md">
            <List.Item>
              <Text component="span" fw={600}>
                Script files:
              </Text>{' '}
              Interactive scripts (.funscript files) you use are cached locally for performance
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                Video metadata:
              </Text>{' '}
              Basic information about videos (title, duration, thumbnail) is stored to help you
              manage your library
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                Connection settings:
              </Text>{' '}
              Your device connection preferences (like connection keys) are saved locally for
              convenience
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                User preferences:
              </Text>{' '}
              Settings like heatmap display, stroke ranges, and custom URLs are stored on your
              device
            </List.Item>
          </List>
          <Text fw={600}>
            Important: This data never leaves your browser or device. It is not transmitted to our
            servers or any third party.
          </Text>
        </Box>

        {/* Device connections */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Device connections and third-party APIs
          </Title>
          <Text mb="md">When you connect haptic devices through IVE:</Text>
          <List spacing="md" mb="md">
            <List.Item>
              <Text component="span" fw={600}>
                The Handy:
              </Text>{' '}
              Your connection key is stored locally. Video titles may be visible to The Handy's API
              during script playback due to how their service functions. Please review{' '}
              <Anchor
                href="https://www.thehandy.com/?ref=otjlmgq&utm_source=otjlmgq&utm_medium=affiliate&utm_campaign=The+Handy+Affiliate+program"
                target="_blank"
                fw={600}
              >
                The Handy's privacy policy
              </Anchor>{' '}
              for details.
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                Intiface/Buttplug.io:
              </Text>{' '}
              Connection occurs through a local server you run on your computer. IVE does not
              transmit data to Intiface servers. Please review{' '}
              <Anchor href="https://intiface.com" target="_blank" fw={600}>
                Intiface's privacy policy
              </Anchor>{' '}
              for their practices.
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                Script databases (IVDB, FapTap, EroScripts, FunScriptHub):
              </Text>{' '}
              When loading scripts from these services, you interact directly with their APIs. IVE
              does not intercept or log this communication. Please review each service's privacy
              policy.
            </List.Item>
          </List>
        </Box>

        {/* Browser permissions */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Browser extension permissions
          </Title>
          <Text mb="sm">IVE requires certain browser permissions to function:</Text>
          <List spacing="sm" mb="md">
            <List.Item>
              <Text component="span" fw={600}>
                "Access your data for all websites":
              </Text>{' '}
              Needed to detect video players and synchronize with them. You can restrict this
              permission to specific sites only through your browser's extension settings if you
              prefer.
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                Storage:
              </Text>{' '}
              Used to save your local preferences and script library on your device.
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                Context menus:
              </Text>{' '}
              Allows right-click shortcuts for enhanced functionality.
            </List.Item>
          </List>
          <Text>
            These permissions are used exclusively for core features. We do not use them to collect
            data about your browsing.
          </Text>
        </Box>

        {/* Cookies */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Cookies and web storage
          </Title>
          <Text mb="sm">The IVEplay website (iveplay.io) uses:</Text>
          <List spacing="sm" mb="md">
            <List.Item>
              <Text component="span" fw={600}>
                Essential cookies:
              </Text>{' '}
              Required for basic site functionality (age verification, session management)
            </List.Item>
          </List>
          <Text>We do not use tracking cookies or third-party advertising cookies.</Text>
        </Box>

        {/* Data security */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Data security
          </Title>
          <Text mb="sm">
            Your local data is protected by your browser's built-in security features. We recommend:
          </Text>
          <List spacing="sm" mb="md">
            <List.Item>
              Using a dedicated browser profile for adult content to keep your data separate and
              private
            </List.Item>
            <List.Item>Keeping your browser updated</List.Item>
            <List.Item>Using strong passwords for your device</List.Item>
            <List.Item>Being cautious when using IVE on shared computers</List.Item>
          </List>
        </Box>

        {/* Age requirement */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Age requirement
          </Title>
          <Text>
            IVE is intended for adults 18+ only. We do not knowingly collect information from
            minors.
          </Text>
        </Box>

        {/* Open source */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Open source transparency
          </Title>
          <Text>
            Portions of IVE's code are open source and available for review, demonstrating our
            commitment to transparency in how we handle your data.
          </Text>
        </Box>

        {/* Contact */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Contact us
          </Title>
          <Text mb="sm">For privacy questions or concerns, reach out:</Text>
          <List spacing="sm" mb="md">
            <List.Item>
              <Text component="span" fw={600}>
                Email:
              </Text>{' '}
              <Anchor href="mailto:privacy@iveplay.io" fw={600}>
                privacy@iveplay.io
              </Anchor>
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                Discord:
              </Text>{' '}
              <Anchor href="https://discord.gg/KsYCE4jRHE" target="_blank" fw={600}>
                Join our community
              </Anchor>
            </List.Item>
          </List>
        </Box>

        {/* Closing */}
        <Box>
          <Text fw={600} ta="center">
            Thank you for trusting IVEplay with your interactive experiences. Your privacy is never
            compromised—because we simply don't have access to your data.
          </Text>
        </Box>
      </Flex>
      <div className={clsx(styles.sideBoxes, 'box')} />
    </Flex>
  );
};
