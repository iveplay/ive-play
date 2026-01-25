import { Text } from '@mantine/core';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { HubLayout } from '@/components/layout/HubLayout';
import { SettingsContent } from '@/content/me/SettingsContent';

const SettingsPage = () => {
  return (
    <HubLayout
      headerCenter={
        <Text size="32px" fw={300} ff="var(--font-frankfurter)">
          Settings
        </Text>
      }
    >
      <RequireAuth>
        <SettingsContent />
      </RequireAuth>
    </HubLayout>
  );
};

export default SettingsPage;
