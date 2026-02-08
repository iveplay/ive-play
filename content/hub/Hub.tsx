import { useEffect, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import { parseAsInteger, useQueryState } from 'nuqs';
import { Flex, Pagination, Text } from '@mantine/core';
import { HubLayout } from '@/components/layout/HubLayout';
import { CloudVideos } from '@/content/hub/CloudVideos';
import { usePaginatedEntries } from '@/hooks/useEntries';
import { useExtensionCheck } from '@/hooks/useExtensionCheck';
import { apiClient } from '@/utils/api/client';
import { HubSearch } from './hub-search/HubSearch';
import { useHubSearch } from './hub-search/useHubSearch';

const ITEMS_PER_PAGE = 20;

export const Hub = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    apiClient.setTokenGetter(getToken);
  }, [getToken]);

  useExtensionCheck();

  const { searchParams } = useHubSearch();
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  // Reset to page 1 when search params change
  const prevSearchRef = useRef(searchParams);
  useEffect(() => {
    if (JSON.stringify(prevSearchRef.current) !== JSON.stringify(searchParams)) {
      prevSearchRef.current = searchParams;
      if (page !== 1) {
        setPage(1);
      }
    }
  }, [searchParams]);

  const { data, error, isLoading } = usePaginatedEntries(page, ITEMS_PER_PAGE, searchParams);

  const entries = data?.entries ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <HubLayout title="Hub" search={<HubSearch />}>
      <CloudVideos entries={entries} isLoading={isLoading} error={error} />
      {totalPages > 1 && !isLoading && !error && (
        <Flex mt="xl" direction="column" gap="xs" align="center">
          <Pagination
            total={totalPages}
            value={page}
            onChange={handlePageChange}
            size="lg"
            radius="lg"
          />
          <Text size="sm" c="dimmed">
            {total} results
          </Text>
        </Flex>
      )}
    </HubLayout>
  );
};
