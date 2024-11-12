import React from 'react';
import { Button, Stack, Flex, Spacer } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

type StoreFilterProps = {
  onAddNewShopClick: () => void;
};


const StoreFilter: React.FC<StoreFilterProps> = ({onAddNewShopClick}) => {
  return (
    <Flex mb={4}>
    <Stack direction="row" spacing={4}>
      <Button colorScheme="teal">Actived</Button>
      <Button colorScheme="blue">New</Button>
      <Button colorScheme="yellow">Deactived</Button>
      <Button colorScheme="red">Removed</Button>
      <Button colorScheme="orange">Suspending</Button>
      <Button colorScheme="gray">All</Button>
    </Stack>
    <Spacer />
    <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={()=>((onAddNewShopClick()))}>
      Add New Shop
    </Button>
    
  </Flex>
  );
};

export default StoreFilter;
