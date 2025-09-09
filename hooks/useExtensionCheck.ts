import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';
import { useIveStore } from '@/store/useIveStore';

const MAX_TIMEOUT = 5000; // 5s
const CHECK_INTERVAL = 200;

export const useExtensionCheck = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { checkExtension, loadEntries, loadFavorites } = useIveStore(
    useShallow((state) => ({
      checkExtension: state.checkExtension,
      loadEntries: state.loadEntries,
      loadFavorites: state.loadFavorites,
    }))
  );

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined = undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined = undefined;

    const tryCheck = async () => {
      const result = await checkExtension();

      if (result) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        setIsLoading(false);

        // Load data once extension is ready
        Promise.all([loadEntries(true), loadFavorites()]);
      }
    };

    intervalId = setInterval(tryCheck, CHECK_INTERVAL);
    timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      setIsLoading(false);
    }, MAX_TIMEOUT);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [checkExtension, loadEntries, loadFavorites]);

  return { isLoading };
};
