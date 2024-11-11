import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

interface FormDialog_AddNewShopProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm: () => void;
}

const FormDialog_AddNewShop: React.FC<FormDialog_AddNewShopProps> = ({ isOpen, onClose, title, onConfirm }) => {
  const [shopName, setShopName] = useState<string>('');

  const handleShopNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShopName(event.target.value);
  };

  const handleSubmit = () => {
    if (shopName.trim()) {
      onConfirm(); // Call onConfirm if form is valid
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="shopName" isRequired>
            <FormLabel>New Friendly Shop Name</FormLabel>
            <Input
              value={shopName}
              onChange={handleShopNameChange}
              placeholder="Enter shop name"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Add Shop
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormDialog_AddNewShop;
