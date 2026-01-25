import { useUser } from '@clerk/nextjs';
import { Center, Loader, Text } from '@mantine/core';
import { HubLayout } from '@/components/layout/HubLayout';
import { CloudVideos } from '@/content/hub/CloudVideos';
import { NotSignedInHub } from '@/content/hub/NotSignedInHub';

const HubPage = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <HubLayout
        headerCenter={
          <Text size="32px" fw={300} ff="var(--font-frankfurter)">
            Hub
          </Text>
        }
      >
        <Center h="100%" flex={1}>
          <Loader size="lg" />
        </Center>
      </HubLayout>
    );
  }

  if (!isSignedIn) {
    return (
      <HubLayout
        headerCenter={
          <Text size="32px" fw={300} ff="var(--font-frankfurter)">
            Hub
          </Text>
        }
      >
        <NotSignedInHub />
      </HubLayout>
    );
  }

  return (
    <HubLayout
      headerCenter={
        <Text size="32px" fw={300} ff="var(--font-frankfurter)">
          Hub
        </Text>
      }
    >
      <CloudVideos />
    </HubLayout>
  );
};

export default HubPage;
