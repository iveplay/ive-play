import { useUser } from '@clerk/nextjs';
import { Center, Loader } from '@mantine/core';
import { HubLayout } from '@/components/layout/HubLayout';
import { CloudVideos } from '@/content/hub/CloudVideos';
import { NotSignedInHub } from '@/content/hub/NotSignedInHub';

const HubPage = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <HubLayout>
        <Center h="100%" flex={1}>
          <Loader size="lg" />
        </Center>
      </HubLayout>
    );
  }

  if (!isSignedIn) {
    return (
      <HubLayout>
        <NotSignedInHub />
      </HubLayout>
    );
  }

  return (
    <HubLayout>
      <CloudVideos />
    </HubLayout>
  );
};

export default HubPage;
