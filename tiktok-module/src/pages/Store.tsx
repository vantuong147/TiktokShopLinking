import { useCookies } from 'react-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import StoreTable from '../components/Store/StoreTable';
import StoreFilter from '../components/Store/StoreFilter';
import StoreForm from '../components/Store/StoreForm';
import ConfirmDialog from '../components/Dialogs/ConfirmDialog';
import FormDialog_EditShop from '../components/Dialogs/FormDialog_EditShop';
import { StoreData } from '../types/StoreData';
import { StoreUtils} from '../Utils/StoreUtils'
import FormDialog_AddShop from '../components/Dialogs/FormDialog_AddNewShop';


const Store: React.FC = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['crr_authorize_shop_id']);
  const [stores, setStores] = useState<StoreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditShop, setIsEditShop] = useState(false); // State for Edit Shop dialog
  const [isAddShop, setIsAddShop] = useState(false); // State for Add New Shop dialog
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);


  const fetchStores = async () => {
    console.log("fetchStores");
    const result = await StoreUtils.fetchShopData();
    if (result.success)
    {
      const data = result.data;
      if (data.success)
        setStores(data.data);
    }
    else
    {
      setStores([]);
    }
    setLoading(false);
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

  const onConfirmDelete = async () => {
    if (selectedShopId) {
      // Perform deletion logic here
      console.log(`Deleting store with shop_id: ${selectedShopId}`);
      const result = await StoreUtils.onSubmitDeleteShop(selectedShopId);
      console.log("Result delete:", result);
      setIsOpen(false);
      setSelectedShopId(null);
      fetchStores();
    }
  };

  const onAddNewShopClick = () => {
    console.log("onAddNewShopClick");
    setIsAddShop(true);
  };

  const onSubmitAddNewShop = async (shop_friendly_name: string) => {
    console.log("OnSubmit Add new shop:", shop_friendly_name);
    const result = await StoreUtils.onSubmitAddNewShop(shop_friendly_name);
    console.log("Result Add new shop:", result);
    setIsAddShop(false);
    fetchStores();
  };

  const onRenewToken = (shop_id: string) => {
    console.log(`Renew Token for Shop ID: ${shop_id}`);
    if (shop_id.startsWith("Undefined"))
    {
      console.log("Authorize shop");
      setSelectedShopId(shop_id);
      setCookie("crr_authorize_shop_id", shop_id, { path: '/', maxAge: 3600 }); // Tồn tại 1 giờ
      window.open('https://services.tiktokshop.com/open/authorize?service_id=7428518803406079750', '_blank');
    }
    else
    {
      console.log("Extend token");
    }
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
      <StoreFilter onAddNewShopClick={onAddNewShopClick} />
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
      {/* Edit Shop Form Dialog */}
      <FormDialog_EditShop
        isOpen={isEditShop}
        onClose={()=>setIsEditShop(false)}
        title="Edit Shop Friendly Name"
        onConfirm={onEditShopConfirm}
      />
      {/* Add New Shop Form Dialog */}
      <FormDialog_AddShop
        isOpen={isAddShop}
        onClose={()=>setIsAddShop(false)}
        title="Add New Shop"
        onConfirm={onSubmitAddNewShop}
      />
    </Box>
  );
};

export default Store;
