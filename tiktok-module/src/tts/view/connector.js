import React, { useEffect, useState } from 'react';
import './css/connector.css'; // Import a CSS file for custom styles

const Connector = () => {
  const [status, setStatus] = useState([]);

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
        console.log("token data");
        console.log(tokenData);
        if (tokenData.success)
        {
          alert("Sucess!");
        }
        else
          alert("Failed: " + tokenData.message);

      } catch (error) {
        console.error('Error:', error);
        appendStatus(`Error: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const appendStatus = (message) => {
    setStatus(prevStatus => [...prevStatus, message]);
  };
  const getCookieValue = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
};

  return (
    <div>
      <h1>Connector Page</h1>
      <div>
        {status.map((msg, index) => (
          <h3 key={index}>{msg}</h3>
        ))}
      </div>
    </div>
  );
};

export default Connector;
