import { parseAsArrayOf, parseAsString, useQueryStates } from 'nuqs';
import { useTags } from '@/hooks/useEntries';
import { EntriesSearchParams } from '@/utils/api/entries';

const searchParsers = {
  q: parseAsString.withDefault(''),
  source: parseAsArrayOf(parseAsString, ',').withDefault([]),
  tags: parseAsArrayOf(parseAsString, ',').withDefault([]),
  creator: parseAsString.withDefault(''),
  domain: parseAsString.withDefault(''),
};

export const useHubSearch = () => {
  const { data: tagsData } = useTags(100);

  const [params, setParams] = useQueryStates(searchParsers, {
    throttleMs: 400,
  });

  const setQuery = (q: string) => setParams({ q: q || null });
  const setCreator = (creator: string) => setParams({ creator: creator || null });
  const setDomain = (domain: string) => setParams({ domain: domain || null });

  const handleSourceChange = (source: string[]) =>
    setParams({ source: source.length ? source : null });

  const handleTagsChange = (tags: string[]) => setParams({ tags: tags.length ? tags : null });

  const clearFilters = () =>
    setParams({ q: null, source: null, tags: null, creator: null, domain: null });

  // Build search params for the API (strip empty values)
  const searchParams: EntriesSearchParams = {};
  if (params.q) {
    searchParams.q = params.q;
  }
  if (params.source.length) {
    searchParams.source = params.source;
  }
  if (params.tags.length) {
    searchParams.tags = params.tags;
  }
  if (params.creator) {
    searchParams.creator = params.creator;
  }
  if (params.domain) {
    searchParams.domain = params.domain;
  }

  return {
    query: params.q,
    source: params.source,
    tags: params.tags,
    creator: params.creator,
    domain: params.domain,
    tagSuggestions: tagsData?.tags || [],
    searchParams,
    setQuery,
    setCreator,
    setDomain,
    handleSourceChange,
    handleTagsChange,
    clearFilters,
  };
};
