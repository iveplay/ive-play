import { Download } from '@/components/Download/Download';
import { Features } from '@/components/Features/Features';
import { Navigation } from '@/components/Navigation/Navigation';
import { Welcome } from '@/components/Welcome/Welcome';

const HomePage = () => {
  return (
    <>
      <Navigation />
      <Welcome />
      <Download />
      <Features />
    </>
  );
};

export default HomePage;
