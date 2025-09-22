import { useEffect } from 'react';
import { useShallow } from 'zustand/shallow';
import { useIveStore } from '@/store/useIveStore';

export const useNewVideosCheck = (intervalMs: number = 10000) => {
  const { extensionAvailable, loading, checkForNewEntries } = useIveStore(
    useShallow((state) => ({
      extensionAvailable: state.extensionAvailable,
      loading: state.loading,
      checkForNewEntries: state.checkForNewEntries,
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (extensionAvailable && !loading) {
        checkForNewEntries();
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [extensionAvailable, loading, checkForNewEntries, intervalMs]);
};
