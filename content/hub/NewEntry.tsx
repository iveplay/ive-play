import { IconPlus } from '@tabler/icons-react';
import { Button, Flex, Text } from '@mantine/core';

export const NewEntry = () => {
  return (
    <Button className="box menuItem" miw={64} onClick={() => {}}>
      <Flex gap="xs" align="center">
        <IconPlus />
        <Text display={{ base: 'none', sm: 'block' }}>New</Text>
      </Flex>
    </Button>
  );
};
