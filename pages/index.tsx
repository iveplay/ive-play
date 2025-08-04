import { Footer } from '@/components/footer/Footer';
import { Navigation } from '@/components/navigation/Navigation';
import { Download } from '@/content/home/download/Download';
import { Features } from '@/content/home/features/Features';
import { Support } from '@/content/home/support/Support';
import { Welcome } from '@/content/home/welcome/Welcome';

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
