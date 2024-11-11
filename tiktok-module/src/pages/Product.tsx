import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const Product: React.FC = () => {
  return (
    <Box p={4} bg="white" rounded="lg" shadow="md">
      <Heading mb={4}>Product</Heading>
      <Text>Quản lý sản phẩm của bạn!</Text>
    </Box>
  );
};

export default Product;
