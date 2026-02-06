import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@clerk/nextjs';
import { Flex, Pagination, Text } from '@mantine/core';
import { HubLayout } from '@/components/layout/HubLayout';
import { CloudVideos } from '@/content/hub/CloudVideos';
import { usePaginatedEntries } from '@/hooks/useEntries';
import { useExtensionCheck } from '@/hooks/useExtensionCheck';
import { apiClient } from '@/utils/api/client';
import { EntriesSearchParams } from '@/utils/api/entries';
import { HubSearch } from './hub-search/HubSearch';

const ITEMS_PER_PAGE = 20;

export const Hub = () => {
  const router = useRouter();
  const { getToken } = useAuth();

  // Set up token getter on mount
  useEffect(() => {
    apiClient.setTokenGetter(getToken);
  }, [getToken]);

  // Always check for extension
  useExtensionCheck();

  const [searchParams, setSearchParams] = useState<EntriesSearchParams>({});

  // Get current page from URL query
  const page = Math.max(1, Number(router.query.page) || 1);

  // Reset to page 1 when search params change
  const handleSearchChange = (params: EntriesSearchParams) => {
    setSearchParams(params);
    if (page !== 1) {
      router.replace({ query: { page: 1 } }, undefined, { shallow: true });
    }
  };

  // Fetch entries for current page
  const { data, error, isLoading } = usePaginatedEntries(page, ITEMS_PER_PAGE, searchParams);

  const entries = data?.entries ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    router.push({ query: { ...router.query, page: newPage } }, undefined, { shallow: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <HubLayout title="Hub" search={<HubSearch onSearchChange={handleSearchChange} />}>
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
