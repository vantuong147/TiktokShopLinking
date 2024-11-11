import React, { useState } from 'react';
import { Input, Button, FormControl, FormLabel, Box, Stack, Text } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface StoreFormProps {
  onSearch: () => void;
}

const StoreForm: React.FC<StoreFormProps> = ({ onSearch }) => {
  const [friendlyName, setFriendlyName] = useState('');

  return (
    <Box mb={6} p={4} bg="gray.50" rounded="lg" shadow="sm">
    <Stack direction={['column', 'row']} spacing={4} alignItems="center">
      <Box>
        <Text mb={2}>Friendly Name</Text>
        <Input placeholder="Enter store name" />
      </Box>
      <Box>
        <Text mb={2}>ID TiktokShop</Text>
        <Input placeholder="Enter TiktokShop ID" />
      </Box>
      <Button leftIcon={<SearchIcon />} colorScheme="blue" onClick={()=>onSearch()}>
        Search
      </Button>
    </Stack>
  </Box>
  );
};

export default StoreForm;
