import { Box } from '@mantine/core';
import { Footer } from '@/components/footer/Footer';
import { Navigation } from '@/components/navigation/Navigation';
import { TermsContent } from '@/content/terms/TermsContent';

const TermsPage = () => {
  return (
    <Box m="md">
      <Navigation />
      <TermsContent />
      <Footer />
    </Box>
  );
};

export default TermsPage;
