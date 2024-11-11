import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const Dashboard: React.FC = () => {
  return (
    <Box p={4} bg="white" rounded="lg" shadow="md">
      <Heading mb={4}>Dashboard</Heading>
      <Text>Chào mừng bạn đến với bảng điều khiển!</Text>
    </Box>
  );
};

export default Dashboard;
