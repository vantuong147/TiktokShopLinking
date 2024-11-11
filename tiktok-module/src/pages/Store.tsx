import React, { useEffect, useState, useRef  } from 'react';
import { Box, Heading, Text, Input, Button, Table, Thead, Tbody, Tr, Th, Td, Flex, Spacer, Stack, IconButton } from '@chakra-ui/react';
import {FormControl, FormLabel, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay} from '@chakra-ui/react';
import { AddIcon, SearchIcon } from '@chakra-ui/icons';

interface TokenData {
  access_token: string;
  access_token_expire_in: number;
  refresh_token: string;
  refresh_token_expire_in: number;
}

interface ProductData {
  total: number;
  live: number;
  pending: number;
  rejected: number;
  frozen: number;
  lastest_sync: number;
}

interface StoreData {
  friendly_name: string;
  shop_id: string;
  shop_name: string;
  code: string;
  cipher: string;
  token_data: TokenData;
  product_data: ProductData;
}

const Store: React.FC = () => {
  const [stores, setStores] = useState<StoreData[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Thêm state để quản lý loading

  const [isOpen, setIsOpen] = useState(false);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);
  const [newFriendlyName, setNewFriendlyName] = useState('');
  const [isEditOpen, setIsEditOpen] = useState(false); // Mở form chỉnh sửa
  const cancelRef = useRef<HTMLButtonElement>(null); // Create a reference for the cancel button

  const onClose = () => setIsOpen(false);

  const handleEditClick = (shop_id: string) => {
    setSelectedStoreId(shop_id);
    setIsEditOpen(true); // Mở form nhập liệu
  };

  const handleEditClose = () => {
    setIsEditOpen(false); // Đóng form nhập liệu
  };
  const handleSaveEdit = async () => {
    setIsEditOpen(false); // Đóng form nhập liệu sau khi lưu

    try {
        console.log("handleUpdate shop info: " + selectedStoreId + " | " + newFriendlyName);
        if (!newFriendlyName) {
          alert("Please provide a friendly name for your shop");
          return;
        }
    
        const formData = new FormData();
        formData.append('shop_id', selectedStoreId+"");
        formData.append('new_name', newFriendlyName);
    
        const response = await fetch('http://localhost:8000/update_shop_information', {
          method: 'POST',
          body: formData,
        });
    
        // Check response status
        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message || 'Failed to update shop info');
        }
    
        const result = await response.json();
        console.log("Update result: ", result);
        fetchStores();
    
      } catch (error) {
        // Improved error handling
        console.error('Error updating shop info:', error);
        alert('Error updating shop info: ' + error);
      }
  };

  const handleDelete = (storeId: string) => {
    setSelectedStoreId(storeId);
    setIsOpen(true); // Open the dialog when you want to delete a store
  };

  const handleConfirmDelete = async () => {
    console.log(`Deleting store with ID: ${selectedStoreId}`);
    setIsOpen(false);

    try {
        const response = await fetch('http://localhost:8000/delete_shop', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ shop_id: selectedStoreId }),
        });
        const result = await response.json();

        console.log("Delete result:", result.message);
        fetchStores();
      } catch (error) {
        alert('Error deleting shop: ' + error);
      }
  };

  // Hàm để cắt token và thay thế phần sau bằng dấu sao
  const formatShorterize = (token: string) => {
    return token ? `${token.slice(0, 5)}*****` : 'Không có token';
  };

  // Hàm để chuyển đổi timestamp thành định dạng ngày tháng dễ đọc
  const formatTimestamp = (timestamp: number) => {
    if (!timestamp) return 'Không có dữ liệu';
    const date = new Date(timestamp * 1000); // Chuyển từ giây sang mili giây
    return date.toLocaleString(); // Định dạng theo múi giờ người dùng
  };
  
  const handleRenewToken = (shopId: string) => {
    console.log('Gia hạn Token cho shop ID:', shopId);
    // Logic gia hạn token ở đây
  };
  
  const handleSyncOrder = (shopId: string) => {
    console.log('Đồng bộ đơn hàng cho shop ID:', shopId);
    // Logic đồng bộ đơn hàng ở đây
  };
  
  const handleSyncProduct = (shopId: string) => {
    console.log('Đồng bộ sản phẩm cho shop ID:', shopId);
    // Logic đồng bộ sản phẩm ở đây
  };

  const fetchStores = async () => {
    console.log("fetchStores");
    try {
      // Tạo body để gửi kèm trong request POST
      const requestBody = {
        shop_name: 'myShop', // Ví dụ tham số bạn muốn gửi trong POST request
      };

      // Gửi yêu cầu POST với headers và body
      const response = await fetch('http://localhost:8000/get_link_shop_data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Đảm bảo gửi dữ liệu dạng JSON
        },
        body: JSON.stringify(requestBody), // Chuyển đối tượng thành chuỗi JSON
      });

      const data = await response.json();

      if (data.success) {
        // Nếu success là true, cập nhật dữ liệu
        if (data.data) {
          console.log("Data:", data.data);
          setStores(data.data); // Giả sử API trả về mảng stores
        } else {
          console.log('Chưa có Store nào được lưu');
          setStores([]);
        }
      } else {
        // Xử lý khi response không thành công
        console.log('Lỗi: ' + (data.message || 'Không có dữ liệu'));
        setStores([]);
      }
    } catch (error) {
      console.error('Error:', error);
      console.log('Không thể kết nối đến API');
      setStores([]); // Set mảng trống khi có lỗi kết nối
    } finally {
      setLoading(false); // Đánh dấu đã xong việc lấy dữ liệu
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <Box p={4} bg="white" rounded="lg" shadow="md">
      {/* Tiêu đề */}
      <Flex alignItems="center" mb={4}>
        <Heading size="lg">Store Management</Heading>
        <Spacer />
        <Button colorScheme="blue" leftIcon={<AddIcon />}>
          Add New Shop
        </Button>
      </Flex>

      {/* Khu vực nhập liệu */}
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
          <Button leftIcon={<SearchIcon />} colorScheme="blue">
            Search
          </Button>
        </Stack>
      </Box>

      {/* Khu vực filter */}
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
        <Button colorScheme="blue" leftIcon={<AddIcon />}>
          Add New Shop
        </Button>
        
      </Flex>

      {/* Bảng hiển thị Store */}
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
            {/* Nếu đang tải dữ liệu */}
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
                        {/* Hiển thị thông tin cửa hàng dưới dạng đẹp mắt */}
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

                            {/* Thêm các nút */}
                            <Flex mt={4} justify="space-between">
                            <Button colorScheme="green" size="sm" onClick={() => handleRenewToken(store.shop_id)}>
                                Gia hạn Token
                            </Button>
                            <Button colorScheme="blue" size="sm" onClick={() => handleSyncOrder(store.shop_id)}>
                                Sync Order
                            </Button>
                            <Button colorScheme="teal" size="sm" onClick={() => handleSyncProduct(store.shop_id)}>
                                Sync Product
                            </Button>
                            </Flex>
                        </Box>
                        </Td>

                    <Td>
                      {/* Hiển thị dữ liệu sản phẩm */}
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
                      <Button size="sm" colorScheme="teal">
                        View Details
                      </Button>
                    </Td>
                    <Td>Warehouse #{index + 1}</Td>
                    <Td>
                      {/* Hiển thị trạng thái của cửa hàng */}
                      <Text color="green.500">Active</Text>
                    </Td>
                    <Td>
                      <Button colorScheme="blue" onClick={()=> handleEditClick(store.shop_id)}>Edit</Button>
                        {/* Form nhập liệu khi nhấn nút Edit */}
                        {isEditOpen && (
                            <AlertDialog
                            isOpen={isEditOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={handleEditClose}
                            >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                <AlertDialogHeader>Edit Friendly Name</AlertDialogHeader>
                                <AlertDialogBody>
                                    <FormControl>
                                    <FormLabel>Friendly Name:</FormLabel>
                                    <Input
                                        value={newFriendlyName}
                                        onChange={(e) => setNewFriendlyName(e.target.value)}
                                        placeholder="Enter new Friendly Name"
                                    />
                                    </FormControl>
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={handleEditClose}>
                                    Cancel
                                    </Button>
                                    <Button colorScheme="blue" onClick={handleSaveEdit} ml={3}>
                                    OK
                                    </Button>
                                </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                            </AlertDialog>
                        )}
                      <Button colorScheme="red" onClick={() => handleDelete(store.shop_id)}>Delete Store</Button>
                            {/* Xác nhận xóa cửa hàng */}
                            <AlertDialog
                                isOpen={isOpen}
                                leastDestructiveRef={cancelRef}  // Assign the least destructive button (Cancel)
                                onClose={onClose}
                            >
                                <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader>Confirm Deletion</AlertDialogHeader>
                                    <AlertDialogBody>
                                    Are you sure you want to delete this store? This action cannot be undone.
                                    </AlertDialogBody>
                                    <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
                                    <Button colorScheme="red" onClick={handleConfirmDelete} ml={3}>Delete</Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                                </AlertDialogOverlay>
                            </AlertDialog>
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
    </Box>
  );
};

export default Store;
