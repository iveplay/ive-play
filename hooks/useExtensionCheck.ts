import { useEffect, useRef } from 'react';
import { useIveStore } from '@/store/useIveStore';

const MAX_TIMEOUT = 10000; // 10 seconds

export const useExtensionCheck = () => {
  const isLoading = useRef(true);
  const { checkExtension, extensionAvailable, loadEntries, loadFavorites } = useIveStore();

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const pingExtension = async () => {
      await checkExtension();
      if (extensionAvailable) {
        intervalId && clearInterval(intervalId);
        timeoutId && clearTimeout(timeoutId);
      }
    };

    pingExtension();
    intervalId = setInterval(pingExtension, 200);

    timeoutId = setTimeout(() => {
      intervalId && clearInterval(intervalId);
    }, MAX_TIMEOUT);

    return () => {
      intervalId && clearInterval(intervalId);
      timeoutId && clearTimeout(timeoutId);
    };
  }, [checkExtension, extensionAvailable]);

  useEffect(() => {
    if (extensionAvailable && isLoading.current) {
      isLoading.current = false;
      Promise.all([loadEntries(true), loadFavorites()]);
    }
  }, [extensionAvailable, loadEntries, loadFavorites]);

  return { isLoading: isLoading.current };
};
