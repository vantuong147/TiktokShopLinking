import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const UserAccountManager: React.FC = () => {
  return (
    <Box p={4} bg="white" rounded="lg" shadow="md">
      <Heading mb={4}>User Account Manager</Heading>
      <Text>Quản lý tài khoản người dùng!</Text>
    </Box>
  );
};

export default UserAccountManager;
