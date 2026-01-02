import { Title } from '@mantine/core';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { HubLayout } from '@/components/layout/HubLayout';
import { SettingsContent } from '@/content/me/SettingsContent';

const SettingsPage = () => {
  return (
    <HubLayout
      headerCenter={
        <Title order={2} fw={300} ff="var(--font-frankfurter)">
          Settings
        </Title>
      }
    >
      <RequireAuth>
        <SettingsContent />
      </RequireAuth>
    </HubLayout>
  );
};

export default SettingsPage;
