import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

interface FormDialog_EditShopProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onConfirm: (newFriendlyName: string) => void;
}

const FormDialog_EditShop: React.FC<FormDialog_EditShopProps> = ({ isOpen, onClose, title, onConfirm }) => {
  const [shopName, setShopName] = useState<string>('');

  const handleShopNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShopName(event.target.value);
  };

  const handleSubmit = () => {
    console.log("handle submit: ", shopName);
    onConfirm(shopName);
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
            OK
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FormDialog_EditShop;
