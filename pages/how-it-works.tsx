import { Box } from '@mantine/core';
import { Footer } from '@/components/footer/Footer';
import { Navigation } from '@/components/navigation/Navigation';
import { Faq } from '@/content/help/faq/Faq';
import { FeaturesExplained } from '@/content/help/featuresExplained/FeaturesExplained';
import { GettingStarted } from '@/content/help/getting-started/GettingStarted';
import { HelpIntro } from '@/content/help/help-intro/HelpIntro';
import { Support } from '@/content/home/support/Support';

const HowItWorks = () => {
  return (
    <Box m="md">
      <Navigation />
      <HelpIntro />
      <GettingStarted />
      <FeaturesExplained />
      <Faq />
      <Support />
      <Footer />
    </Box>
  );
};

export default HowItWorks;
