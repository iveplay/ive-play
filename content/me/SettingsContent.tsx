import { useState } from 'react';
import { useClerk, useUser } from '@clerk/nextjs';
import { IconTrash } from '@tabler/icons-react';
import {
  Alert,
  Avatar,
  Button,
  Card,
  Checkbox,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useAuthStore } from '@/store/useAuthStore';
import { authApi } from '@/utils/api/auth';
import { PatreonSection } from './PatreonSection';

export const SettingsContent = () => {
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const user = useAuthStore((state) => state.user);
  const canDeleteScripts = user?.role === 'creator';

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [deleteScripts, setDeleteScripts] = useState(false);

  const handleDeleteAccount = async () => {
    if (confirmText !== clerkUser?.primaryEmailAddress?.emailAddress) {
      return;
    }

    try {
      await authApi.deleteAccount({
        deleteScripts: canDeleteScripts ? deleteScripts : true,
        confirmEmail: confirmText,
      });
      await signOut({ redirectUrl: '/' });
      notifications.show({
        title: 'Account Deleted',
        message: 'Your account has been permanently deleted.',
        color: 'red',
      });
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete account',
        color: 'red',
      });
    }
  };

  return (
    <>
      <Stack gap="lg" maw={600} mx="auto" w="100%">
        <Card className="box" p="md">
          <Stack gap="md">
            <Title order={4}>Profile</Title>
            <Group>
              <Avatar src={clerkUser?.imageUrl} size="lg" radius="xl" />
              <div>
                <Text fw={500}>{clerkUser?.username || 'User'}</Text>
                <Text size="sm">{clerkUser?.primaryEmailAddress?.emailAddress}</Text>
              </div>
            </Group>
          </Stack>
        </Card>
        <PatreonSection />

        {/* Danger Zone */}
        <Card className="box" p="md">
          <Stack gap="md">
            <Title order={4} c="red">
              Danger zone
            </Title>
            <Text>
              Permanently delete your account and all associated data.
              <br />
              <strong>This action cannot be undone!</strong>
            </Text>
            <Button
              w="fit-content"
              radius="lg"
              color="red"
              variant="outline"
              leftSection={<IconTrash size={16} />}
              onClick={() => setDeleteModalOpen(true)}
            >
              Delete account
            </Button>
          </Stack>
        </Card>
      </Stack>
      <Modal
        radius="lg"
        opened={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setConfirmText('');
        }}
        title="Delete Account"
        centered
      >
        <Stack gap="md">
          <Alert color="red" radius="lg" variant="light">
            This will permanently delete your account, <strong>all</strong> your data, and cannot be
            undone.
          </Alert>
          <TextInput
            label={
              <>
                Type your <strong>email</strong> to confirm:
              </>
            }
            radius="lg"
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
          />
          {canDeleteScripts && (
            <Checkbox
              label="Also delete all my scripts"
              checked={deleteScripts}
              onChange={(e) => setDeleteScripts(e.currentTarget.checked)}
            />
          )}
          <Group justify="flex-end">
            <Button variant="subtle" radius="lg" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button
              radius="lg"
              color="red"
              onClick={handleDeleteAccount}
              disabled={confirmText !== clerkUser?.primaryEmailAddress?.emailAddress}
            >
              Delete my account
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};
