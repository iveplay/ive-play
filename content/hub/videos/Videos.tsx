import { SimpleGrid } from '@mantine/core';
import { Video } from '@/components/video/Video';

export const Videos = () => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md" verticalSpacing="md">
      <Video
        href="https://xhamster.com/videos/a-muscular-colombian-girl-amazing-convulsion-xhDUQow"
        title="A muscular Colombian girl, amazing convulsion"
        imageUrl="https://placehold.co/400"
        duration={1234500}
        actions={1000}
        maxSpeed={200}
        creator="Jack the scripter"
        creatorUrl="#"
        tags={['colombian', 'colombian girl', 'creampie', 'fbb', 'hardcore', 'hardcore lingerie']}
      />
      <Video
        href="https://fr.pornhub.com"
        title="This is a  very long long video title"
        imageUrl="https://placehold.co/400"
        isFavorite
      />
    </SimpleGrid>
  );
};
