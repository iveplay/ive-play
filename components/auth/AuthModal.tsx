import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { SignIn, SignUp, useUser } from '@clerk/nextjs';
import { useShallow } from 'zustand/shallow';
import { Modal } from '@mantine/core';
import { useAuthStore } from '@/store/useAuthStore';

export const AuthModal = () => {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const { authModalOpen, authModalView, setAuthModalView, closeAuthModal } = useAuthStore(
    useShallow((state) => ({
      authModalOpen: state.authModalOpen,
      authModalView: state.authModalView,
      setAuthModalView: state.setAuthModalView,
      closeAuthModal: state.closeAuthModal,
    }))
  );

  useEffect(() => {
    const onHashChangeStart = (url: string) => {
      if (url.includes('#sign-in/')) {
        setAuthModalView('sign-in');
        return;
      }

      if (url.includes('#sign-up/')) {
        setAuthModalView('sign-up');
        return;
      }

      closeAuthModal();
    };

    router.events.on('hashChangeStart', onHashChangeStart);

    return () => {
      router.events.off('hashChangeStart', onHashChangeStart);
    };
  }, [closeAuthModal, router.events, setAuthModalView]);

  if (isSignedIn) {
    return null;
  }

  return (
    <Modal
      opened={authModalOpen}
      onClose={closeAuthModal}
      size="auto"
      centered
      withCloseButton={false}
      padding={0}
      radius="lg"
    >
      {authModalView === 'sign-in' ? (
        <SignIn routing="hash" fallbackRedirectUrl="/hub" signUpUrl="#sign-up" />
      ) : (
        <SignUp routing="hash" fallbackRedirectUrl="/hub" signInUrl="#sign-in" />
      )}
    </Modal>
  );
};
