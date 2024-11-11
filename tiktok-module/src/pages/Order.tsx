import React from 'react';
import { Box, Heading, Text, Input, Select, Button, Table, Thead, Tbody, Tr, Th, Td, Checkbox, Flex, Stack, Spacer, IconButton, FormLabel, FormControl, BoxProps } from '@chakra-ui/react';
import { SearchIcon, DownloadIcon } from '@chakra-ui/icons';

const Order: React.FC = () => {
  return (
    <Box p={4} bg="white" rounded="lg" shadow="md">
      {/* Tiêu đề */}
      <Flex alignItems="center" mb={4}>
        <Heading size="lg">Tiktok Shop Order</Heading>
        <Spacer />
        <Button colorScheme="blue" leftIcon={<DownloadIcon />}>
          Export
        </Button>
      </Flex>

      {/* Form nhập liệu để filter và tìm kiếm */}
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
            <Input type="datetime-local" />
          </FormControl>
          <FormControl>
            <FormLabel>End Date</FormLabel>
            <Input type="datetime-local" />
          </FormControl>
          <Button leftIcon={<SearchIcon />} colorScheme="blue">
            Search
          </Button>
        </Stack>
      </Box>

      {/* Khu vực filter */}
      <Flex mb={4}>
        <Stack direction="row" spacing={2}>
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
        <Spacer />
        <Button colorScheme="blue" leftIcon={<DownloadIcon />}>
          Export
        </Button>
      </Flex>

      {/* Bảng hiển thị Order */}
      <Box overflowX="auto" maxWidth="100%">
        <Table variant="simple">
          <Thead bg="blue.100">
            <Tr>
              <Th width="5%">
                <Checkbox />
              </Th>
              <Th width="5%">#</Th>
              <Th width="15%">Time/Store</Th>
              <Th width="15%">Order</Th>
              <Th width="10%">Mockup</Th>
              <Th width="10%">DesignUrl</Th>
              <Th width="15%">Product</Th>
              <Th width="10%">TotalPrice</Th>
              <Th width="5%">Quantity</Th>
              <Th width="10%">Fullfillment</Th>
              <Th width="10%">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* Dữ liệu mẫu */}
            {Array.from({ length: 5 }).map((_, index) => (
              <Tr key={index}>
                <Td>
                  <Checkbox />
                </Td>
                <Td>{index + 1}</Td>
                <Td>Time/Store #{index + 1}</Td>
                <Td>Order #{index + 1}</Td>
                <Td>
                  <Button size="sm" colorScheme="teal">
                    View Mockup
                  </Button>
                </Td>
                <Td>
                  <Button size="sm" colorScheme="blue">
                    View Design URL
                  </Button>
                </Td>
                <Td>Product #{index + 1}</Td>
                <Td>$ {Math.floor(Math.random() * 1000)}</Td>
                <Td>{Math.floor(Math.random() * 10)}</Td>
                <Td>
                  {index % 2 === 0 ? (
                    <Text color="green.500">Fulfilled</Text>
                  ) : (
                    <Text color="red.500">Pending</Text>
                  )}
                </Td>
                <Td>
                  <Button size="sm" colorScheme="yellow">
                    Edit
                  </Button>
                  <Button size="sm" colorScheme="red" ml={2}>
                    Remove
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Order;
