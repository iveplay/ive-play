import { useState } from 'react';
import { IconDownload } from '@tabler/icons-react';
import { useShallow } from 'zustand/shallow';
import { Button, Flex, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useIveStore } from '@/store/useIveStore';
import { iveBridge } from '@/utils/iveBridge';
import { REQUIRED_VERSION } from '@/utils/versions';

export const ExportButton = () => {
  const [isExporting, setIsExporting] = useState(false);

  const { entries, favoriteIds, extensionVersion } = useIveStore(
    useShallow((state) => ({
      entries: state.entries,
      favoriteIds: state.favoriteIds,
      extensionVersion: state.extensionVersion,
    }))
  );

  const handleExport = async () => {
    if (isExporting) {
      return;
    }
    setIsExporting(true);

    try {
      // Get fresh data for all entries
      const allEntriesWithDetails = await Promise.all(
        entries.map(async (entryWithDetails) => {
          const fresh = await iveBridge.getEntryWithDetails(entryWithDetails.entry.id);
          return fresh || entryWithDetails;
        })
      );

      const exportData = {
        version: extensionVersion || REQUIRED_VERSION,
        exportDate: new Date().toISOString(),
        totalEntries: allEntriesWithDetails.length,
        favorites: Array.from(favoriteIds),
        entries: allEntriesWithDetails,
      };

      const dataStr = JSON.stringify(exportData);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `ive-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      notifications.show({
        title: 'Success',
        message: `Exported ${allEntriesWithDetails.length} entries`,
        color: 'green',
      });
    } catch (error) {
      console.error('Export error:', error);
      notifications.show({
        title: 'Export Failed',
        message: error instanceof Error ? error.message : 'Failed to export data',
        color: 'red',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      className="box menuItem"
      miw={64}
      onClick={handleExport}
      loading={isExporting}
      disabled={entries.length === 0}
    >
      <Flex gap="xs" align="center">
        <IconDownload />
        <Text display={{ base: 'none', sm: 'block' }}>Export</Text>
      </Flex>
    </Button>
  );
};
