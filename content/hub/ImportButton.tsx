import { useRef, useState } from 'react';
import { IconUpload } from '@tabler/icons-react';
import { useShallow } from 'zustand/shallow';
import { Button, Flex, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useIveStore } from '@/store/useIveStore';
import { iveBridge } from '@/utils/iveBridge';

interface ImportData {
  version: string;
  exportDate: string;
  totalEntries: number;
  favorites?: string[];
  entries: Array<{
    entry: {
      id: string;
      title: string;
      duration?: number;
      thumbnail?: string;
      tags?: string[];
      createdAt: number;
      updatedAt: number;
    };
    videoSources: Array<{
      url: string;
      status?: 'working' | 'broken' | 'unknown';
    }>;
    scripts: Array<{
      url: string;
      name: string;
      creator: string;
      supportUrl?: string;
      avgSpeed?: number;
      maxSpeed?: number;
      actionCount?: number;
    }>;
  }>;
}

export const ImportButton = () => {
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { loadEntries, loadFavorites } = useIveStore(
    useShallow((state) => ({
      loadEntries: state.loadEntries,
      loadFavorites: state.loadFavorites,
    }))
  );

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsImporting(true);

    try {
      const text = await file.text();
      const data: ImportData = JSON.parse(text);

      if (!data.entries || !Array.isArray(data.entries)) {
        throw new Error('Invalid backup file format');
      }

      let imported = 0;
      let failed = 0;
      const entryIdMapping = new Map<string, string>(); // old ID -> new ID

      for (const entryData of data.entries) {
        try {
          const newEntryId = await iveBridge.createEntry({
            title: entryData.entry.title,
            duration: entryData.entry.duration,
            thumbnail: entryData.entry.thumbnail,
            tags: entryData.entry.tags,
            videoSources: entryData.videoSources.map((vs) => ({
              url: vs.url,
              status: vs.status,
            })),
            scripts: entryData.scripts.map((s) => ({
              url: s.url,
              name: s.name,
              creator: s.creator,
              supportUrl: s.supportUrl,
              avgSpeed: s.avgSpeed,
              maxSpeed: s.maxSpeed,
              actionCount: s.actionCount,
            })),
          });
          entryIdMapping.set(entryData.entry.id, newEntryId);
          imported++;
        } catch (error) {
          console.error(`Failed to import entry: ${entryData.entry.title}`, error);
          failed++;
        }
      }

      // Import favorites
      if (data.favorites && Array.isArray(data.favorites)) {
        for (const oldFavoriteId of data.favorites) {
          const newEntryId = entryIdMapping.get(oldFavoriteId);
          if (newEntryId) {
            try {
              await iveBridge.addFavorite(newEntryId);
            } catch (error) {
              console.error(`Failed to favorite entry: ${oldFavoriteId}`, error);
            }
          }
        }
      }

      // Reload entries and favorites to show imported data
      await loadEntries(true);
      await loadFavorites();

      notifications.show({
        title: 'Import Complete',
        message: `Imported ${imported} entries${failed > 0 ? `, ${failed} failed` : ''}`,
        color: failed > 0 ? 'yellow' : 'green',
      });
    } catch (error) {
      console.error('Import error:', error);
      notifications.show({
        title: 'Import Failed',
        message: error instanceof Error ? error.message : 'Failed to import data',
        color: 'red',
      });
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImport}
        style={{ display: 'none' }}
      />
      <Button
        className="box h menuItem"
        miw={64}
        onClick={() => fileInputRef.current?.click()}
        loading={isImporting}
      >
        <Flex gap="xs" align="center">
          <IconUpload />
          <Text display={{ base: 'none', sm: 'block' }}>Import</Text>
        </Flex>
      </Button>
    </>
  );
};
