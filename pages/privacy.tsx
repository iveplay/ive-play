import { Box } from '@mantine/core';
import { Footer } from '@/components/footer/Footer';
import { Navigation } from '@/components/navigation/Navigation';
import { PrivacyContent } from '@/content/privacy/PrivacyContent';

const PrivacyPage = () => {
  return (
    <Box m="md">
      <Navigation />
      <PrivacyContent />
      <Footer />
    </Box>
  );
};

export default PrivacyPage;
