import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Container, Center, Spinner } from '@chakra-ui/react';

const Connector: React.FC = () => {
  const [status, setStatus] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Lấy tham số từ URL
      const urlParams = new URLSearchParams(window.location.search);
      const app_key = urlParams.get('app_key');
      const code = urlParams.get('code');

      console.log("Received: " + app_key + " | " + code);
      appendStatus(`Received: app_key = ${app_key}, code = ${code}`);

      try {
        // Gửi yêu cầu lấy token
        const tokenParams = {
          shop_name: getCookieValue('crrShopName'),
          app_key: app_key,
          auth_code: code, // Sử dụng code đã nhận
          grant_type: 'authorized_code'
        };

        const url_get_token = 'http://localhost:8000/get_access_token';
        appendStatus(`Being sent request to: ${url_get_token}`);

        const tokenResponse = await fetch(url_get_token, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Đặt loại nội dung là JSON
          },
          body: JSON.stringify(tokenParams) // Chuyển đổi đối tượng thành chuỗi JSON
        });

        const tokenData = await tokenResponse.json();
        console.log("token data", tokenData);
        if (tokenData.success) {
          alert("Success!");
        } else {
          alert("Failed: " + tokenData.message);
        }
      } catch (error) {
        let err = error as Error;
        console.error('Error:', err);
        appendStatus(`Error: ${err.message}`);
      }
    };

    fetchData();
  }, []);

  const appendStatus = (message: string) => {
    setStatus(prevStatus => [...prevStatus, message]);
  };

  const getCookieValue = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  };

  return (
    <Container maxW="100%" pt={4}>
      <Box p={4} bg="white" rounded="lg" shadow="md">
        {/* Header */}
        <Heading as="h1" size="lg" mb={4} textAlign="center">
          Connector Page
        </Heading>

        {/* Content */}
        <Center>
          <Box textAlign="center">
            <Text fontSize="xl" mb={4}>
              Connecting...
            </Text>
            <Spinner size="xl" />
          </Box>
        </Center>

        {/* Displaying status messages */}
        <Box mt={6}>
          {status.map((msg, index) => (
            <Text key={index} mb={2} fontSize="sm" color="gray.600">
              {msg}
            </Text>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Connector;
