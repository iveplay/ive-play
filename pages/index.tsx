import { Download } from '@/components/Download/Download';
import { Features } from '@/components/Features/Features';
import { Footer } from '@/components/Footer/Footer';
import { Navigation } from '@/components/Navigation/Navigation';
import { Support } from '@/components/Support/Support';
import { Welcome } from '@/components/Welcome/Welcome';

const HomePage = () => {
  return (
    <>
      <Navigation />
      <Welcome />
      <Download />
      <Features />
      <Support />
      <Footer />
    </>
  );
};

export default HomePage;
