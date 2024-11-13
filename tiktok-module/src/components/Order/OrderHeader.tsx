import React from 'react';
import { Flex, Heading, Button, Spacer } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

interface OrderHeaderProps {
    onExportClick: () => void;
  }
  
  const OrderHeader: React.FC<OrderHeaderProps> = ({ onExportClick }) => {
    return (
      <Flex alignItems="center" mb={4}>
        <Heading size="lg">Tiktok Shop Order</Heading>
        <Spacer />
        <Button 
          colorScheme="blue" 
          leftIcon={<DownloadIcon />} 
          onClick={onExportClick}
        >
          Export
        </Button>
      </Flex>
    );
  };
  
  export default OrderHeader;
