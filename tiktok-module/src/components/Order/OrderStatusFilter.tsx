import React from 'react';
import { Stack, Button } from '@chakra-ui/react';

const OrderStatusFilter: React.FC = () => {
  return (
    <Stack direction="row" spacing={2} mb={4}>
      <Button colorScheme="teal">All</Button>
      <Button colorScheme="orange">Unpaid</Button>
      <Button colorScheme="yellow">On Hold</Button>
      <Button colorScheme="blue">Awaiting Shipment</Button>
      <Button colorScheme="red">Awaiting Collection</Button>
      <Button colorScheme="green">In Transit</Button>
      <Button colorScheme="purple">Delivered</Button>
      <Button colorScheme="gray">Completed</Button>
      <Button colorScheme="pink">Cancelled</Button>
    </Stack>
  );
};

export default OrderStatusFilter;
