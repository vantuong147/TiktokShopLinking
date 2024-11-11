import React, { useEffect, useRef, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import StoreTable from '../components/Store/StoreTable';
import StoreFilter from '../components/Store/StoreFilter';
import StoreForm from '../components/Store/StoreForm';
import ConfirmDialog from '../components/Dialogs/ConfirmDialog';
import FormDialog_EditShop from '../components/Dialogs/FormDialog_EditShop';
import { StoreData } from '../types/StoreData';
import { StoreUtils} from '../Utils/StoreUtils'

const Store: React.FC = () => {
  const [stores, setStores] = useState<StoreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditShop, setIsEditShop] = useState(false); // State for Add New Shop dialog
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);


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

  const handleSearch = () => {
    // Search logic here
  };

  const onClose = () => {
    setIsOpen(false); // Close confirmation dialog
  };

  const onEditClick = (shop_id: string) => {
    console.log(`Edit Shop ID: ${shop_id}`);
    setSelectedShopId(shop_id);
    setIsEditShop(true);
  };

  const onEditShopConfirm = async (newFriendlyName: string) =>{
    console.log("onEditShopConfirm", newFriendlyName);
    StoreUtils.onEditShopConfirm(selectedShopId, newFriendlyName, fetchStores)
    setIsEditShop(false);
  }

  const onDeleteClick = (shop_id: string) => {
    console.log("OnDeleteClick: ", shop_id)
    setSelectedShopId(shop_id); // Set the selected shop for deletion
    setIsOpen(true); // Open the confirmation dialog
  };

  const onConfirmDelete = () => {
    if (selectedShopId) {
      // Perform deletion logic here
      console.log(`Deleting store with shop_id: ${selectedShopId}`);
      setIsOpen(false);
      setSelectedShopId(null);
    }
  };

  const onAddNewShopClick = () => {
    
  };

  const onCloseAddNewShop = () => {
    
  };

  const onRenewToken = (shop_id: string) => {
    console.log(`Renew Token for Shop ID: ${shop_id}`);
  };

  const onSyncOrder = (shop_id: string) => {
    console.log(`Sync Order for Shop ID: ${shop_id}`);
  };

  const onSyncProduct = (shop_id: string) => {
    console.log(`Sync Product for Shop ID: ${shop_id}`);
  };

  return (
    <Box>
      <Heading>Store Management</Heading>
      <StoreForm onSearch={handleSearch} />
      <StoreFilter />
      <StoreTable
        stores={stores}
        loading={loading}
        onEditClick={onEditClick}
        onDeleteClick={onDeleteClick}
        onRenewToken={onRenewToken}
        onSyncOrder={onSyncOrder}
        onSyncProduct={onSyncProduct}
      />
       {/* Reusable ConfirmDialog */}
       <ConfirmDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Confirm Deletion"
        message="Are you sure you want to delete this store from the database?"
        onConfirm={onConfirmDelete}
        cancelRef={cancelRef}
      />
      {/* Add New Shop Form Dialog */}
      <FormDialog_EditShop
        isOpen={isEditShop}
        onClose={()=>setIsEditShop(false)}
        title="Add New Shop"
        onConfirm={onEditShopConfirm}
      />
    </Box>
  );
};

export default Store;
