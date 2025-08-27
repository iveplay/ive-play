import { ReactNode } from 'react';
import { IconBubbleText } from '@tabler/icons-react';
import { Anchor, Box, Flex, Text, Title } from '@mantine/core';

export const Faq = () => {
  return (
    <Box component="section" id="faq" mb="md">
      <Flex className="box w" p={{ base: '32px', md: '64px' }} direction="column" mb="md">
        <Flex direction="column" align="center" mb="md">
          <IconBubbleText size={48} />
          <Title order={1} size={48} ta="center" my="md" fw={300} ff="var(--font-frankfurter)">
            Frequently Asked Questions
          </Title>
        </Flex>
        <Flex wrap="wrap" columnGap="md" justify="space-around" maw={960} mx="auto">
          <QA
            question="Which browsers does IVE support?"
            answer="Chrome, Edge, Brave (all Chromium browsers), Firefox desktop, and Firefox for Android."
          />
          <QA
            question="My Handy won't connect or sync. What's wrong?"
            answer="Ensure you're using firmware 4.x. Older firmware versions aren't supported. Check your connection key in the Handy app."
          />
          <QA
            question="What devices work with IVE?"
            answer="The Handy (FW4 only) connects directly. All other devices (Lovense, Kiiroo, Satisfyer, etc.) work through Intiface Central."
          />
          <QA
            question="Why isn't my script syncing properly?"
            answer="Try refreshing the page, or use the resync button in the side panel."
          />
          <QA
            question="Can I use multiple devices at once?"
            answer="Yes, through Intiface Central you can control multiple connected devices simultaneously."
          />
          <QA
            question="Can I use my own script files?"
            answer="Currently no, but local script support is planned for future updates."
          />
          <QA
            question="Is my data safe with IVE?"
            answer={
              <>
                Yes, IVE respects your privacy. Everything of IVE is completely local.{' '}
                <Text component="span" fw={700}>
                  NOTHING
                </Text>{' '}
                is collected or logged by IVE.
                <br />
                IVE does make use of The Handy's API and Intiface, so please refer to their privacy
                policy.
              </>
            }
          />
          <QA
            question="Where can I get more support?"
            answer={
              <>
                Join our{' '}
                <Anchor href="https://discord.gg/KsYCE4jRHE" target="_blank" fw={700}>
                  Discord server
                </Anchor>{' '}
                and ask your questions there.
              </>
            }
          />
        </Flex>
      </Flex>
    </Box>
  );
};

const QA = ({ question, answer }: { question: ReactNode; answer: ReactNode }) => {
  return (
    <Text size="lg" mt="md" flex={{ base: '1 1 100%', md: '1 1 40%' }}>
      <Text component="span" fw={700}>
        {question}
      </Text>
      <Text>{answer}</Text>
    </Text>
  );
};
