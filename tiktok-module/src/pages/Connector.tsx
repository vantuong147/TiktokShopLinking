import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, useToast } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Connector: React.FC = () => {
  const [cookies] = useCookies(['crr_authorize_shop_id']); // Sử dụng React Cookie
  const [status, setStatus] = useState<string[]>([]);
  const toast = useToast();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      // Lấy tham số từ URL
      const urlParams = new URLSearchParams(location.search);
      const app_key = urlParams.get('app_key') || '';
      const code = urlParams.get('code') || '';

      appendStatus(`Received: app_key = ${app_key}, code = ${code}`);
      console.log(`Received: app_key = ${app_key} | code = ${code}`);

      const first_shop_id = cookies.crr_authorize_shop_id;
      console.log("First shop id:", first_shop_id);
      if (!first_shop_id) return;
      try {
        // Gửi yêu cầu lấy token
        const tokenParams = {
          first_shop_id: first_shop_id || '',
          app_key: app_key,
          auth_code: code,
          grant_type: 'authorized_code',
        };

        const url_get_token = 'http://localhost:8000/get_access_token';
        appendStatus(`Being sent request to: ${url_get_token}`);

        const tokenResponse = await fetch(url_get_token, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tokenParams),
        });

        const tokenData = await tokenResponse.json();
        console.log('Token data:', tokenData);

        if (tokenData.success) {
          toast({
            title: 'Success',
            description: 'Access token retrieved successfully!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Failed',
            description: `Error: ${tokenData.message}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error: any) {
        console.error('Error:', error);
        appendStatus(`Error: ${error.message}`);
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchData();
  }, [location.search, toast]);

  const appendStatus = (message: string) => {
    setStatus((prevStatus) => [...prevStatus, message]);
  };

  const getCookieValue = (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  };

  return (
    <Box>
      <Heading as="h1" size="lg" mb={4}>
        Connector Page
      </Heading>
      <VStack align="start" spacing={2}>
        {status.map((msg, index) => (
          <Text key={index} fontSize="md" color="gray.600">
            {msg}
          </Text>
        ))}
      </VStack>
    </Box>
  );
};

export default Connector;
