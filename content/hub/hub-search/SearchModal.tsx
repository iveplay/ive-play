import { useMemo, useRef } from 'react';
import { IconSearch, IconX } from '@tabler/icons-react';
import {
  ActionIcon,
  Flex,
  Grid,
  Modal,
  MultiSelect,
  TagsInput,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core';
import { EntriesSearchParams } from '@/utils/api/entries';
import { useHubSearch } from './useHubSearch';

const SOURCE_OPTIONS = [
  { value: 'faptap', label: 'FapTap' },
  { value: 'eroscripts', label: 'Eroscripts' },
  { value: 'ivdb', label: 'IVDB' },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchChange: (params: EntriesSearchParams) => void;
}

export const SearchModal = ({ isOpen, onClose, onSearchChange }: SearchModalProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    query,
    source,
    tags,
    creator,
    domain,
    tagSuggestions,
    setQuery,
    setCreator,
    setDomain,
    handleSourceChange,
    handleTagsChange,
    clearFilters,
  } = useHubSearch({ onSearchChange });

  const tagCountMap = useMemo(
    () => new Map(tagSuggestions.map((tag) => [tag.tag, tag.count])),
    [tagSuggestions]
  );

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      size="xl"
      radius="xl"
      centered={false}
      withCloseButton={false}
    >
      {/* Search Input */}
      <TextInput
        ref={inputRef}
        placeholder="Search videos..."
        leftSection={<IconSearch size={20} stroke={1.5} />}
        rightSection={
          query && (
            <ActionIcon variant="subtle" size="sm" onClick={() => setQuery('')}>
              <IconX size={14} />
            </ActionIcon>
          )
        }
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        size="lg"
        radius="xl"
        mb="md"
      />

      {/* Filters */}
      <Grid gutter="md">
        <Grid.Col span={6}>
          <MultiSelect
            label="Source"
            placeholder="All sources"
            data={SOURCE_OPTIONS}
            value={source}
            onChange={handleSourceChange}
            clearable
            size="sm"
            radius="lg"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Site"
            placeholder="pornhub..."
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            size="sm"
            radius="lg"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TextInput
            label="Creator"
            placeholder="name..."
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            size="sm"
            radius="lg"
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <TagsInput
            label="Tags"
            size="sm"
            radius="lg"
            value={tags}
            placeholder="Add tags..."
            renderOption={({ option }) => `${option.value} (${tagCountMap.get(option.value) || 0})`}
            data={tagSuggestions.map((tag) => tag.tag)}
            onChange={handleTagsChange}
          />
        </Grid.Col>
      </Grid>

      <Flex align="center" justify="flex-end" mt="md" mr="md">
        <UnstyledButton onClick={clearFilters}>
          <Text size="xs" c="dimmed">
            Clear all
          </Text>
        </UnstyledButton>
      </Flex>
    </Modal>
  );
};
