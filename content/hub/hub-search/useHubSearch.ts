import { useEffect, useRef, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { useTags } from '@/hooks/useEntries';
import { EntriesSearchParams } from '@/utils/api/entries';

interface UseHubSearchOptions {
  onSearchChange: (params: EntriesSearchParams) => void;
}

export const useHubSearch = ({ onSearchChange }: UseHubSearchOptions) => {
  const isInitialMount = useRef(true);

  // Fetch available tags
  const { data: tagsData } = useTags(100);

  // Search state
  const [query, setQuery] = useState('');
  const [source, setSource] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [creator, setCreator] = useState('');
  const [domain, setDomain] = useState('');

  // Debounce text inputs
  const [debouncedQuery] = useDebouncedValue(query, 400);
  const [debouncedCreator] = useDebouncedValue(creator, 400);
  const [debouncedDomain] = useDebouncedValue(domain, 400);

  // Build search params
  const buildSearchParams = (overrides?: Partial<EntriesSearchParams>): EntriesSearchParams => {
    const params: EntriesSearchParams = {};

    const q = overrides?.q !== undefined ? overrides.q : debouncedQuery;
    const s = overrides?.source !== undefined ? overrides.source : source;
    const t = overrides?.tags !== undefined ? overrides.tags : tags;
    const c = overrides?.creator !== undefined ? overrides.creator : debouncedCreator;
    const d = overrides?.domain !== undefined ? overrides.domain : debouncedDomain;

    if (q) {
      params.q = q;
    }
    if (s) {
      params.source = s as EntriesSearchParams['source'];
    }
    if (t?.length) {
      params.tags = t;
    }
    if (c) {
      params.creator = c;
    }
    if (d) {
      params.domain = d;
    }

    return params;
  };

  // Trigger search when debounced values change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    onSearchChange(buildSearchParams());
  }, [debouncedQuery, debouncedCreator, debouncedDomain]);

  // Handle immediate filter changes
  const handleSourceChange = (value: string | null) => {
    const newSource = value || '';
    setSource(newSource);
    onSearchChange(
      buildSearchParams({ source: newSource as EntriesSearchParams['source'] })
    );
  };

  const handleTagsChange = (value: string[]) => {
    setTags(value);
    onSearchChange(buildSearchParams({ tags: value.length ? value : undefined }));
  };

  // Clear all filters
  const clearFilters = () => {
    setQuery('');
    setSource('');
    setTags([]);
    setCreator('');
    setDomain('');
    onSearchChange({});
  };

  return {
    // State
    query,
    source,
    tags,
    creator,
    domain,
    tagSuggestions: tagsData?.tags || [],

    // Setters
    setQuery,
    setCreator,
    setDomain,

    // Handlers
    handleSourceChange,
    handleTagsChange,
    clearFilters,
  };
};
