import { HubLayout } from '@/components/layout/HubLayout';
import { ExportButton } from '@/content/local/ExportButton';
import { Filters } from '@/content/local/Filters';
import { ImportButton } from '@/content/local/ImportButton';
import { NewEntry } from '@/content/local/videos/NewEntry';
import { Videos } from '@/content/local/videos/Videos';

const LocalPage = () => {
  return (
    <HubLayout
      headerContent={
        <>
          <Filters />
          <ExportButton />
          <ImportButton />
          <NewEntry />
        </>
      }
    >
      <Videos />
    </HubLayout>
  );
};

export default LocalPage;
