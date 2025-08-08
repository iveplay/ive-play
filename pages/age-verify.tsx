import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Button, Flex, Text, Title } from '@mantine/core';
import { Logo } from '@/components/logo/Logo';

const AgeVerifyPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAgeVerification = async (confirmed: boolean) => {
    if (!confirmed) {
      window.history.back();
      return;
    }

    setLoading(true);
    document.cookie = 'age_verified=true; max-age=31536000; path=/; secure; samesite=strict';
    const callback = (router.query.callback as string) || '/';
    router.push(callback);
  };

  return (
    <>
      <Head>
        <title>IVE - Interactive Video Experience</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Flex
        component="main"
        mih="calc(100vh - 64px)"
        align="center"
        justify="center"
        gap="md"
        direction="column"
      >
        <Logo size={96} />
        <Box
          className="box w"
          mt="lg"
          px={{ base: '32px', md: '64px' }}
          py={{ base: '16px', md: '32px' }}
          style={{
            maxWidth: '500px',
            textAlign: 'center',
          }}
        >
          <Title order={1} my="md" fw={300} ff="var(--font-frankfurter)">
            Age Verification Required
          </Title>
          <Text mb="lg" c="dimmed" style={{ lineHeight: 1.6 }}>
            This website contains adult content and is intended for users 18 years of age or older.
          </Text>
          <Text mb="lg" fw={500}>
            Are you 18 years of age or older?
          </Text>
          <Flex gap="md">
            <Button
              radius="lg"
              size="lg"
              fw={500}
              loading={loading}
              onClick={() => handleAgeVerification(true)}
              miw={160}
            >
              Yes, I am 18+
            </Button>
            <Button
              radius="lg"
              size="lg"
              fw={500}
              variant="default"
              onClick={() => handleAgeVerification(false)}
              miw={160}
            >
              No, I am under 18
            </Button>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};

export default AgeVerifyPage;
