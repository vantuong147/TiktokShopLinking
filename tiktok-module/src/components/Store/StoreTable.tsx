import React from 'react';
import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Text, Flex, FormControl, FormLabel, Input, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from '@chakra-ui/react';
import { StoreData } from '../../types/StoreData';
import { formatShorterize, formatTimestamp } from '../utils/formatUtils';

type StoreTableProps = {
  stores: StoreData[];
  loading: boolean;
  onEditClick: (shop_id: string) => void;
  onDeleteClick: (shop_id: string) => void;
  onRenewToken: (shop_id: string) => void;
  onSyncOrder: (shop_id: string) => void;
  onSyncProduct: (shop_id: string) => void;
};

const StoreTable: React.FC<StoreTableProps> = ({
  stores,
  loading,
  onEditClick,
  onDeleteClick,
  onRenewToken,
  onSyncOrder,
  onSyncProduct,
}) => {

  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead bg="blue.100">
          <Tr>
            <Th>Number</Th>
            <Th>ID</Th>
            <Th>Information</Th>
            <Th>Products</Th>
            <Th>Details</Th>
            <Th>Warehouse</Th>
            <Th>State</Th>
            <Th>Function</Th>
          </Tr>
        </Thead>
        <Tbody>
          {loading ? (
            <Tr>
              <Td colSpan={8}>
                <Text textAlign="center">Đang tải dữ liệu...</Text>
              </Td>
            </Tr>
          ) : (
            stores.length > 0 ? (
              stores.map((store, index) => (
                <Tr key={store.shop_id}>
                  <Td>{index + 1}</Td>
                  <Td>{store.shop_id}</Td>
                  <Td>
                    <Box p={2} bg="gray.50" rounded="md" shadow="sm">
                      <Text fontWeight="bold">Friendly Name: {store.friendly_name}</Text>
                      <Text>Shop ID: {store.shop_id}</Text>
                      <Text>Shop Name: {store.shop_name}</Text>
                      <Text>Code: {store.code}</Text>
                      <Text>Cipher: {formatShorterize(store.cipher)}</Text>
                      <Text>Access Token: {formatShorterize(store.token_data.access_token)}</Text>
                      <Text>Access Token Expire In: {formatTimestamp(store.token_data.access_token_expire_in)}</Text>
                      <Text>Refresh Token: {formatShorterize(store.token_data.refresh_token)}</Text>
                      <Text>Refresh Token Expire In: {formatTimestamp(store.token_data.refresh_token_expire_in)}</Text>

                      <Flex mt={4} justify="space-between">
                        <Button colorScheme="green" size="sm" onClick={() => onRenewToken(store.shop_id)}>
                          Gia hạn Token
                        </Button>
                        <Button colorScheme="blue" size="sm" onClick={() => onSyncOrder(store.shop_id)}>
                          Sync Order
                        </Button>
                        <Button colorScheme="teal" size="sm" onClick={() => onSyncProduct(store.shop_id)}>
                          Sync Product
                        </Button>
                      </Flex>
                    </Box>
                  </Td>
                  <Td>
                    <Box p={2} bg="gray.50" rounded="md" shadow="sm">
                      <Text>Total: {store.product_data.total}</Text>
                      <Text>Live: {store.product_data.live}</Text>
                      <Text>Pending: {store.product_data.pending}</Text>
                      <Text>Rejected: {store.product_data.rejected}</Text>
                      <Text>Frozen: {store.product_data.frozen}</Text>
                      <Text>Last Sync: {formatTimestamp(store.product_data.lastest_sync)}</Text>
                    </Box>
                  </Td>
                  <Td>
                    <Button size="sm" colorScheme="teal">View Details</Button>
                  </Td>
                  <Td>Warehouse #{index + 1}</Td>
                  <Td>
                    <Text color="green.500">Active</Text>
                  </Td>
                  <Td>
                    <Button colorScheme="blue" onClick={() => onEditClick(store.shop_id)}>Edit</Button>
                    <Button colorScheme="red" onClick={() => onDeleteClick(store.shop_id)}>Delete Store</Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={8} textAlign="center">
                  Chưa có Store nào được lưu
                </Td>
              </Tr>
            )
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default StoreTable;
