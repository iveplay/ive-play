import clsx from 'clsx';
import { Anchor, Box, Flex, List, Text, Title } from '@mantine/core';
import styles from './TermsContent.module.css';

export const TermsContent = () => {
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
          Terms of Service
        </Title>
        <Text size="sm" c="dimmed" ta="center" mb="xl">
          February 5, 2026
        </Text>

        {/* Intro */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Welcome to IVEplay
          </Title>
          <Text mb="md">
            IVEplay provides a browser extension and web platform (the "Service") for synchronizing
            interactive scripts with video content and controlling compatible haptic devices. These
            Terms of Service ("Terms") govern your use of the IVE browser extension, the IVE Hub at
            iveplay.io, and our API.
          </Text>
          <Text fw={600}>
            By using any part of the Service you agree to these Terms. If you do not agree, do not
            use the Service.
          </Text>
        </Box>

        {/* Age requirement */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Age requirement
          </Title>
          <Text>
            You must be at least 18 years old (or the age of majority in your jurisdiction,
            whichever is higher) to use the Service. By using IVEplay you confirm that you meet this
            requirement. We do not knowingly provide the Service to minors.
          </Text>
        </Box>

        {/* What the service is */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            What the Service provides
          </Title>
          <Text mb="sm">IVEplay consists of:</Text>
          <List spacing="sm" mb="md">
            <List.Item>
              <Text component="span" fw={600}>
                IVE browser extension:
              </Text>{' '}
              Detects video players in your browser, loads interactive scripts, and communicates
              with haptic devices. Everything operates locally on your device.
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                IVE Hub (iveplay.io):
              </Text>{' '}
              An optional web platform where you can browse a database of scripts, manage your
              library, and access additional features when signed in.
            </List.Item>
            <List.Item>
              <Text component="span" fw={600}>
                IVE API:
              </Text>{' '}
              The backend that powers the Hub, serving script metadata and managing user accounts.
            </List.Item>
          </List>
          <Text>
            IVEplay is a tool and search engine. We do not host, stream, or distribute video
            content. The scripts and metadata in our database link to external sources.
          </Text>
        </Box>

        {/* Accounts */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Accounts
          </Title>
          <Text mb="md">
            You can use the browser extension without an account. To access Hub features, you need
            to create an account through our authentication provider,{' '}
            <Anchor href="https://clerk.com" target="_blank" fw={600}>
              Clerk
            </Anchor>
            .
          </Text>
          <Text mb="md">
            You are responsible for keeping your account credentials secure. You are responsible for
            all activity under your account.
          </Text>
          <Text>
            You can delete your account at any time from your account settings. Deletion is
            permanent and removes your user data, library, and linked integrations. See our{' '}
            <Anchor href="/privacy" fw={600}>
              Privacy Policy
            </Anchor>{' '}
            for full details on what is deleted.
          </Text>
        </Box>

        {/* Acceptable use */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Acceptable use
          </Title>
          <Text mb="sm">When using the Service you agree not to:</Text>
          <List spacing="sm" mb="md">
            <List.Item>
              Use the Service for any purpose that is illegal in your jurisdiction
            </List.Item>
            <List.Item>
              Attempt to gain unauthorized access to our systems, other user accounts, or data you
              are not permitted to access
            </List.Item>
            <List.Item>
              Reverse-engineer, decompile, or attempt to extract the source code of non-open-source
              parts of the Service
            </List.Item>
            <List.Item>
              Use automated tools (bots, scrapers) to bulk-access the API or Hub beyond normal use,
              unless you have been given an API key
            </List.Item>
            <List.Item>
              Interfere with or disrupt the Service, its infrastructure, or other users' experience
            </List.Item>
            <List.Item>Misrepresent your identity or impersonate another person</List.Item>
          </List>
          <Text>
            We reserve the right to suspend or terminate accounts that violate these rules.
          </Text>
        </Box>

        {/* Content and IP */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Content and intellectual property
          </Title>
          <Text mb="md">
            IVEplay aggregates script metadata from publicly available sources (such as IVDB,
            EroScripts). We do not claim ownership of third-party scripts or video content. All
            rights remain with their respective creators and rights holders.
          </Text>
          <Text mb="md">
            If you are a creator and contribute entries to the Hub database, you retain ownership of
            your work. By submitting content you grant IVEplay a non-exclusive, royalty-free license
            to display and distribute that metadata through the Service. You can remove your
            contributions at any time by deleting them or by deleting your account.
          </Text>
          <Text>
            The IVEplay name, logo, extension code, and website design are owned by IVEplay. You may
            not use them without permission except as needed to link to or credit the Service.
          </Text>
        </Box>

        {/* DMCA */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Copyright and DMCA
          </Title>
          <Text mb="md">
            We respect intellectual property rights. If you believe content accessible through
            IVEplay infringes your copyright, please contact us at{' '}
            <Anchor href="mailto:dmca@iveplay.io" fw={600}>
              dmca@iveplay.io
            </Anchor>{' '}
            with the following information:
          </Text>
          <List spacing="sm" mb="md">
            <List.Item>A description of the copyrighted work</List.Item>
            <List.Item>The URL or identifier of the infringing content on our platform</List.Item>
            <List.Item>Your contact information</List.Item>
            <List.Item>
              A statement that you believe in good faith that the use is not authorized
            </List.Item>
          </List>
          <Text>
            We will review valid claims promptly and remove or disable access to infringing content
            where appropriate.
          </Text>
        </Box>

        {/* Third party services */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Third-party services and devices
          </Title>
          <Text mb="md">
            The Service integrates with third-party hardware and platforms including The Handy,
            Autoblow, Intiface/Buttplug.io, Clerk (authentication), and Patreon. These services have
            their own terms and privacy policies.
          </Text>
          <Text mb="md">
            IVEplay is not responsible for the operation, availability, or security of third-party
            services or devices. Use of connected hardware is at your own risk.
          </Text>
          <Text>
            When you link a Patreon account, we verify your supporter status to unlock features. We
            store only your Patreon ID and tier — not your full profile.
          </Text>
        </Box>

        {/* Patreon and paid features */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Patreon and premium features
          </Title>
          <Text mb="md">
            Some Hub features are available only to users who support IVEplay through Patreon. Your
            Patreon tier determines which features you can access. These features may change over
            time.
          </Text>
          <Text>
            Payments are handled entirely by Patreon — IVEplay does not process payments directly.
            For billing questions, refunds, or subscription management, please contact Patreon.
          </Text>
        </Box>

        {/* API usage */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            API access
          </Title>
          <Text mb="md">
            Access to the IVE API is subject to rate limits. If you have been issued an API key, you
            must keep it confidential and use it only for its intended purpose.
          </Text>
          <Text>
            We may revoke API keys or adjust rate limits at any time without notice. Abuse of the
            API (excessive requests, scraping, or circumventing limits) may result in key revocation
            and account suspension.
          </Text>
        </Box>

        {/* Disclaimers */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Disclaimers
          </Title>
          <Text mb="md">
            The Service is provided{' '}
            <Text component="span" fw={600}>
              "as is"
            </Text>{' '}
            and{' '}
            <Text component="span" fw={600}>
              "as available"
            </Text>{' '}
            without warranties of any kind, whether express or implied. We do not guarantee that the
            Service will be uninterrupted, error-free, or compatible with every device or website.
          </Text>
          <Text mb="md">
            IVEplay does not host or control the video content you watch. We are a tool that
            synchronizes scripts with videos you access independently. We make no representations
            about third-party content.
          </Text>
          <Text>
            You are solely responsible for how you use connected devices. IVEplay is not liable for
            any physical injury, device damage, or other harm that may result from device usage.
          </Text>
        </Box>

        {/* Limitation of liability */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Limitation of liability
          </Title>
          <Text>
            To the maximum extent permitted by law, IVEplay and its operators shall not be liable
            for any indirect, incidental, special, consequential, or punitive damages arising from
            your use of the Service. This includes but is not limited to loss of data, device
            damage, or damages arising from third-party services or content. Our total liability for
            any claim related to the Service is limited to the amount you paid us in the 12 months
            before the claim, or $0 if you have not made any payments.
          </Text>
        </Box>

        {/* Termination */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Termination
          </Title>
          <Text mb="md">
            You can stop using the Service at any time. You can uninstall the extension and delete
            your Hub account whenever you want.
          </Text>
          <Text>
            We may suspend or terminate your account if you violate these Terms or if we need to do
            so for legal or security reasons. If we terminate your account, we will make reasonable
            efforts to notify you unless prohibited by law.
          </Text>
        </Box>

        {/* Changes to terms */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Changes to these Terms
          </Title>
          <Text>
            We may update these Terms from time to time. If we make significant changes, we will
            notify you through the website or our Discord community. Continued use of the Service
            after changes take effect means you accept the updated Terms.
          </Text>
        </Box>

        {/* Governing law */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Governing law
          </Title>
          <Text mb="md">
            These Terms are governed by Norwegian law. Any disputes that cannot be resolved
            informally shall be handled by the Norwegian courts.
          </Text>
          <Text>
            If you are a consumer in the EEA, nothing in these Terms affects your statutory rights
            under applicable consumer protection laws.
          </Text>
        </Box>

        {/* General */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            General
          </Title>
          <Text mb="md">
            If any part of these Terms is found to be unenforceable, the rest remains in effect. Our
            failure to enforce a provision does not waive our right to do so later.
          </Text>
          <Text mb="md">
            IVEplay is not liable for any failure or delay in performing its obligations where such
            failure or delay results from circumstances beyond our reasonable control, including but
            not limited to outages of third-party services, network failures, or natural disasters.
          </Text>
          <Text>
            These Terms, together with our{' '}
            <Anchor href="/privacy" fw={600}>
              Privacy Policy
            </Anchor>
            , make up the entire agreement between you and IVEplay regarding the Service.
          </Text>
        </Box>

        {/* Contact */}
        <Box mb="xl">
          <Title order={2} size="h3" mb="md" fw={500}>
            Contact
          </Title>
          <Text mb="sm">Questions about these Terms? Reach out:</Text>
          <List spacing="sm" mb="md">
            <List.Item>
              <Text component="span" fw={600}>
                Email:
              </Text>{' '}
              <Anchor href="mailto:contact@iveplay.io" fw={600}>
                contact@iveplay.io
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
      </Flex>
      <div className={clsx(styles.sideBoxes, 'box')} />
    </Flex>
  );
};
