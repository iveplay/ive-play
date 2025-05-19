import { Download } from '@/components/Downlaod/Download';
import { Navigation } from '@/components/Navigation/Navigation';
import { Welcome } from '@/components/Welcome/Welcome';

const HomePage = () => {
  return (
    <>
      <Navigation />
      <Welcome />
      <Download />
    </>
  );
};

export default HomePage;
