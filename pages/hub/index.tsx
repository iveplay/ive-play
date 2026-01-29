import { useUser } from '@clerk/nextjs';
import { Center, Loader } from '@mantine/core';
import { HubLayout } from '@/components/layout/HubLayout';
import { Hub } from '@/content/hub/Hub';
import { NotSignedInHub } from '@/content/hub/NotSignedInHub';

const HubPage = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return (
      <HubLayout title="Hub">
        <Center h="100%" flex={1}>
          <Loader size="lg" />
        </Center>
      </HubLayout>
    );
  }

  if (!isSignedIn) {
    return (
      <HubLayout title="Hub">
        <NotSignedInHub />
      </HubLayout>
    );
  }

  return <Hub />;
};

export default HubPage;
