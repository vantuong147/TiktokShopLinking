import React from 'react';
import { Box, Flex, Button, Avatar, Text, Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react';
import { FaHome, FaStore, FaClipboardList, FaBox, FaUserCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Box bg="blue.600" color="white" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">My Web System</Text>
        <Flex gap={4}>
          <Button as={Link} to="/dashboard" leftIcon={<FaHome />} colorScheme="whiteAlpha">Dashboard</Button>
          <Button as={Link} to="/store" leftIcon={<FaStore />} colorScheme="whiteAlpha">Store</Button>
          <Button as={Link} to="/order" leftIcon={<FaClipboardList />} colorScheme="whiteAlpha">Order</Button>
          <Button as={Link} to="/product" leftIcon={<FaBox />} colorScheme="whiteAlpha">Product</Button>
          <Button as={Link} to="/user-account-manager" leftIcon={<FaUserCog />} colorScheme="whiteAlpha">User</Button>
        </Flex>

        <Menu>
          <MenuButton as={Button} colorScheme="whiteAlpha">
            <Avatar size="sm" />
          </MenuButton>
          <MenuList>
            <MenuItem icon={<FaUserCog />}>Profile</MenuItem>
            <MenuItem icon={<FaSignOutAlt />}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Box>
  );
};

export default Header;
