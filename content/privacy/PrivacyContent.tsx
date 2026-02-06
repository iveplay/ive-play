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
          February 5, 2026
        </Text>

        {/* Our commitment */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Our commitment to your privacy
          </Title>
          <Text mb="md">
            At IVEplay, we believe privacy is a fundamental right. This Privacy Policy explains how
            we handle information when you use the IVE browser extension and our web services at
            iveplay.io.
          </Text>
          <Text mb="md">
            IVE works on two levels: the{' '}
            <Text component="span" fw={600}>
              browser extension
            </Text>
            , which operates entirely locally on your device, and the{' '}
            <Text component="span" fw={600}>
              IVE Hub
            </Text>
            , an optional online account you can create to sync your library and access additional
            features. This policy covers both.
          </Text>
          <Text fw={600}>
            The extension itself does not collect or transmit your personal data. If you choose to
            create an account and use the Hub, we store only what is necessary to provide those
            features.
          </Text>
        </Box>

        {/* What we don't do */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            What we never do
          </Title>
          <Text mb="sm">Regardless of whether you use the extension or the Hub:</Text>
          <List spacing="sm" mb="md">
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
              We will never sell or share your information with third parties
            </List.Item>
          </List>
        </Box>

        {/* Extension — what stays local */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Browser extension (local only)
          </Title>
          <Text mb="sm">
            The IVE browser extension stores all data{' '}
            <Text component="span" fw={600}>
              locally on your device
            </Text>
            . None of the following ever leaves your browser:
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
            You can use the extension without ever creating an account. In that case, no data is
            transmitted to our servers.
          </Text>
        </Box>

        {/* Hub — what we store when you create an account */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            IVE Hub (when you create an account)
          </Title>
          <Text mb="md">
            If you choose to sign up for an IVE Hub account, we collect and store the following data
            on our servers to provide Hub features. This only applies if you create an account — it
            is entirely optional.
          </Text>

          <Title order={3} size="h4" mb="sm" fw={500}>
            Account information
          </Title>
          <List spacing="sm" mb="md">
            <List.Item>
              <Text component="span" fw={600}>
                Email address:
              </Text>{' '}
              Provided through our authentication provider (Clerk) when you sign up. Used for
              account identification and communication.
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                User ID:
              </Text>{' '}
              A unique identifier created when your account is set up
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                Account role:
              </Text>{' '}
              Your role (e.g. user, creator) used to determine what features you can access
            </List.Item>
          </List>

          {/* We do not use this for now */}
          {/* <Title order={3} size="h4" mb="sm" fw={500}>
            Library data
          </Title>
          <Text mb="sm">When you use the Hub to manage your library, we store:</Text>
          <List spacing="sm" mb="md">
            <List.Item>
              <Text component="span" fw={600}>
                Saved entries:
              </Text>{' '}
              Video titles, durations, and thumbnails for entries you add to your library
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                Video and script URLs:
              </Text>{' '}
              Links to videos and scripts you associate with your library entries
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                Favorites and tags:
              </Text>{' '}
              Entries you mark as favorites and tags you use for organization
            </List.Item>
          </List> */}

          {/* <Title order={3} size="h4" mb="sm" fw={500}>
            Contributor data
          </Title>
          <Text mb="sm">
            If you contribute entries to the public database, your user ID is recorded as the source
            of those contributions.
          </Text> */}

          {/* We do not use this for now */}
          <Title order={3} size="h4" mb="sm" fw={500}>
            Patreon integration
          </Title>
          <Text mb="sm">When you link your Patreon account, we store:</Text>
          <List spacing="sm" mb="md">
            <List.Item>
              <Text component="span" fw={600}>
                Patreon ID and tier:
              </Text>{' '}
              Used to verify your supporter status and unlock corresponding features
            </List.Item>
          </List>
          <Text>
            We do not store your full Patreon profile (name, image, etc.) — only the ID and tier
            needed to verify your support.
          </Text>
        </Box>

        {/* Authentication */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Authentication
          </Title>
          <Text mb="md">
            Account authentication is handled by{' '}
            <Anchor href="https://clerk.com" target="_blank" fw={600}>
              Clerk
            </Anchor>
            , a third-party authentication provider. When you sign up or log in, Clerk manages the
            session and provides us with your email address and user ID. Please review{' '}
            <Anchor href="https://clerk.com/legal/privacy" target="_blank" fw={600}>
              Clerk's privacy policy
            </Anchor>{' '}
            for details on how they handle your authentication data.
          </Text>
        </Box>

        {/* Account deletion */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Account deletion
          </Title>
          <Text mb="md">
            You can delete your IVE Hub account at any time from your account settings. When you
            delete your account:
          </Text>
          <List spacing="sm" mb="md">
            <List.Item>Your user record and email are permanently removed</List.Item>
            <List.Item>
              All your library data (entries, videos, scripts, favorites) is deleted
            </List.Item>
            <List.Item>Your Patreon link (if any) is removed</List.Item>
            <List.Item>Your contributor record is removed</List.Item>
            <List.Item>Your Clerk account is deleted</List.Item>
          </List>
          <Text>
            If you have contributed entries to the public database as a creator, you can choose
            whether to also remove those contributions during deletion.
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
            </List.Item>{' '}
            <List.Item>
              <Text component="span" fw={600}>
                Autoblow:
              </Text>{' '}
              Your device token is stored locally. Video titles may be visible to Autoblow's API
              during script playback due to how their service functions. Please review{' '}
              <Anchor href="https://autoblow.com/" target="_blank" fw={600}>
                Autoblow's privacy policy
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
            <List.Item>
              <Text component="span" fw={600}>
                Authentication cookies:
              </Text>{' '}
              If you sign in, Clerk sets session cookies to keep you logged in
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
            Your local data is protected by your browser's built-in security features. Hub data is
            stored on encrypted servers. We recommend:
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

        {/* Your rights (GDPR) */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Your rights
          </Title>
          <Text mb="md">
            IVEplay is operated from within the EEA and we process personal data in accordance with
            the General Data Protection Regulation (GDPR).
          </Text>
          <Text mb="md">
            When you create an account, the legal basis for processing your data is the performance
            of our contract with you (the{' '}
            <Anchor href="/terms" fw={600}>
              Terms of Service
            </Anchor>
            ). For optional features like Patreon linking, the legal basis is your consent.
          </Text>
          <Text mb="sm">You have the right to:</Text>
          <List spacing="sm" mb="md">
            <List.Item>
              <Text component="span" fw={600}>
                Access
              </Text>{' '}
              your data — see what we store about you
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                Correct
              </Text>{' '}
              your data — update inaccurate information
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                Delete
              </Text>{' '}
              your data — remove your account and all associated data
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                Export
              </Text>{' '}
              your data — request a copy of your data
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                Withdraw consent
              </Text>{' '}
              for optional processing (e.g. unlinking Patreon)
            </List.Item>
          </List>
          <Text>
            To exercise any of these rights, contact us at{' '}
            <Anchor href="mailto:privacy@iveplay.io" fw={600}>
              privacy@iveplay.io
            </Anchor>
            .
          </Text>
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
            Thank you for trusting IVEplay. The extension works fully offline with no data
            collection. The Hub is optional — and if you use it, we only store what's needed to
            power the library.
          </Text>
        </Box>
      </Flex>
      <div className={clsx(styles.sideBoxes, 'box')} />
    </Flex>
  );
};
