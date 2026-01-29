import { RequireAuth } from '@/components/auth/RequireAuth';
import { HubLayout } from '@/components/layout/HubLayout';
import { SettingsContent } from '@/content/me/SettingsContent';

const SettingsPage = () => {
  return (
    <HubLayout title="Settings">
      <RequireAuth>
        <SettingsContent />
      </RequireAuth>
    </HubLayout>
  );
};

export default SettingsPage;
