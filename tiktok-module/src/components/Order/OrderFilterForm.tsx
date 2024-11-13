import React from 'react';
import { Box, Input, Select, Button, Stack, FormControl, FormLabel } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const OrderFilterForm: React.FC = () => {
  return (
    <Box mb={6} p={4} bg="gray.50" rounded="lg" shadow="sm">
        <Stack direction={['column', 'row']} spacing={4} alignItems="center">
          <FormControl>
            <FormLabel>OrderID</FormLabel>
            <Input placeholder="Enter Order ID" />
          </FormControl>
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input placeholder="Enter Product Name" />
          </FormControl>
          <FormControl>
            <FormLabel>Fullfillment Status</FormLabel>
            <Select placeholder="Select status">
              <option value="unpaid">Unpaid</option>
              <option value="on-hold">On Hold</option>
              <option value="awaiting-shipment">Awaiting Shipment</option>
              <option value="awaiting-collection">Awaiting Collection</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Store Tiktok</FormLabel>
            <Input placeholder="Enter Store Tiktok" />
          </FormControl>
          <FormControl>
            <FormLabel>Product SKU</FormLabel>
            <Input placeholder="Enter Product SKU" />
          </FormControl>
          <FormControl>
            <FormLabel>Page Size</FormLabel>
            <Select placeholder="Select page size">
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>From Date</FormLabel>
            <Input type="datetime-local" width = "150px"/>
          </FormControl>
          <FormControl>
            <FormLabel>End Date</FormLabel>
            <Input type="datetime-local" width = "150px" />
          </FormControl>
          <Button leftIcon={<SearchIcon />} colorScheme="blue"></Button>
        </Stack>
      </Box>
  );
};

export default OrderFilterForm;
