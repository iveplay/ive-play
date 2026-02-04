import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { Box, Button, Flex, Loader } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { HubLayout } from '@/components/layout/HubLayout';
import { CloudVideos } from '@/content/hub/CloudVideos';
import { useInfiniteEntries } from '@/hooks/useEntries';
import { useExtensionCheck } from '@/hooks/useExtensionCheck';
import { apiClient } from '@/utils/api/client';
import { EntriesSearchParams } from '@/utils/api/entries';
import { HubSearch } from './hub-search/HubSearch';

export const Hub = () => {
  const { getToken } = useAuth();

  // Set up token getter on mount
  useEffect(() => {
    apiClient.setTokenGetter(getToken);
  }, [getToken]);

  // Always check for extension
  useExtensionCheck();

  const [searchParams, setSearchParams] = useState<EntriesSearchParams>({});

  // Fetch entries with search params
  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteEntries(20, searchParams);

  const entries = data?.pages.flatMap((page) => page.entries) ?? [];

  const { ref: sentinelRef, entry: sentinelEntry } = useIntersection({ rootMargin: '200px' });

  useEffect(() => {
    if (sentinelEntry?.isIntersecting && fetchNextPage) {
      fetchNextPage();
    }
  }, [sentinelEntry?.isIntersecting, fetchNextPage]);

  return (
    <HubLayout title="Hub" search={<HubSearch onSearchChange={setSearchParams} />}>
      <CloudVideos entries={entries} isLoading={isLoading} error={error} />
      {((hasNextPage && !isFetchingNextPage) || isFetchingNextPage) &&
        fetchNextPage &&
        entries.length > 0 &&
        !error && (
          <Flex mt="md" gap="md" justify="center" align="center" ref={sentinelRef}>
            <Box className="box w" h="50" />
            {isFetchingNextPage ? (
              <Loader size="md" />
            ) : (
              <Button
                onClick={() => fetchNextPage()}
                loading={isFetchingNextPage}
                size="lg"
                radius="lg"
                flex="0 0 auto"
              >
                Load more
              </Button>
            )}
            <Box className="box w" h="50" />
          </Flex>
        )}
    </HubLayout>
  );
};
