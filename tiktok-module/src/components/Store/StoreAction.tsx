import React from 'react';
import { Button, Box } from '@chakra-ui/react';

interface StoreActionsProps {
  onRenewToken: (shopId: string) => void;
  onSyncOrder: (shopId: string) => void;
  onSyncProduct: (shopId: string) => void;
  shopId: string;
}

const StoreActions: React.FC<StoreActionsProps> = ({ shopId, onRenewToken, onSyncOrder, onSyncProduct }) => {
  return (
    <Box>
      <Button colorScheme="green" onClick={() => onRenewToken(shopId)}>Renew Token</Button>
      <Button colorScheme="blue" onClick={() => onSyncOrder(shopId)}>Sync Order</Button>
      <Button colorScheme="teal" onClick={() => onSyncProduct(shopId)}>Sync Product</Button>
    </Box>
  );
};

export default StoreActions;
