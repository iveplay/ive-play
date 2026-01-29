import { useRef } from 'react';
import { IconSearch, IconX } from '@tabler/icons-react';
import {
  ActionIcon,
  Flex,
  Grid,
  Modal,
  Select,
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

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      size="lg"
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
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <Select
            label="Source"
            placeholder="All sources"
            data={SOURCE_OPTIONS}
            value={source || null}
            onChange={handleSourceChange}
            clearable
            size="sm"
            radius="lg"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <TextInput
            label="Site"
            placeholder="pornhub..."
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            size="sm"
            radius="lg"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <TextInput
            label="Creator"
            placeholder="name..."
            value={creator}
            onChange={(e) => setCreator(e.target.value)}
            size="sm"
            radius="lg"
          />
        </Grid.Col>
        <Grid.Col span={{ base: 6, sm: 3 }}>
          <TagsInput
            label="Tags"
            value={tags}
            placeholder="Add tags..."
            data={tagSuggestions}
            onChange={handleTagsChange}
            size="sm"
            radius="lg"
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
