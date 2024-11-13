import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import OrderHeader from '../components/Order/OrderHeader';
import OrderFilterForm from '../components/Order/OrderFilterForm';
import OrderStatusFilter from '../components/Order/OrderStatusFilter';
import OrderTable from '../components/Order/OrderTable';

const API_URL = 'http://localhost:8000/api_handler';

const Order: React.FC = () => {
  const [orderData, setOrderData] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const requestId = 'get_order_list';
    const fetchOrderData = async () => {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ requestId }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setOrderData(data.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  const exportToCSV = () => {
    if (orderData.length === 0) {
      alert('No data available for export');
      return;
    }
  
    // Định nghĩa tiêu đề các cột cần export dựa trên các thuộc tính của order
    const headers = [
      'External ID', 'Order ID', 'Shipping Method', 'Name', 'Email', 'Phone', 
      'Country', 'Region', 'Address 1', 'Address 2', 'Address 3', 
      'City', 'ZIP', 'Quantity', 'Variant ID', 'Tracking', 
      'Link Label', 'Size', 'Color', 'Shirt Type', 'Is Rush', 
      'Font Design Link', 'Back Design Link', 'Mockup Front Link', 'Mockup Back Link', 'extraDesign1', 'mockupExtra1','extraDesign2', 'mockupExtra2','extraDesign3', 'mockupExtra3'
    ];
  
    // Chuẩn bị dữ liệu cho các cột cần export
    const csvContent = orderData.map((order) => [
      order.external_id || '',
      order.order_id || '',
      order.shipping_method || '',
      order.name || '',
      order.email || '',
      order.phone || '',
      order.country || '',
      order.region || '',
      order.address_line_1 || '',
      order.address_line_2 || '',
      order.address_line_3 || '',
      order.city || '',
      order.zip || '',
      order.quantity || '',
      order.variant_id || '',
      order.tracking || '',
      order.link_label || '',
      order.size || '',
      order.color || '',
      order.shirt_type || '',
      order.is_rush ? 'Yes' : 'No', // Boolean field converted to Yes/No
      order.font_design || '',
      order.back_design || '',
      order.mockup_front || '',
      order.mockup_back || '',
      order.extra_design_1 || '',
      order.mocku_extra_1 || '',
      order.extra_design_2 || '',
      order.mocku_extra_2 || '',
      order.extra_design_3 || '',
      order.mocku_extra_3 || ''
    ]);
  
    // Kết hợp headers và dữ liệu thành chuỗi CSV
    const csvRows = [
      headers.join(','), 
      ...csvContent.map(row => row.map(value => `"${value}"`).join(','))
    ];
    const csvString = csvRows.join('\n');
  
    // Tạo Blob từ chuỗi CSV
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
  
    // Tạo thẻ <a> để download file
    const link = document.createElement('a');
    link.href = url;
    link.download = 'orders_full.csv';
    link.click();
  
    // Giải phóng URL Blob
    URL.revokeObjectURL(url);
  };
  
  

  if (loading) {
    return <div style={{ textAlign: 'center' }}>Loading Orders...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center', color: 'red' }}>{error}</div>;
  }

  return (
    <Box p={4} bg="white" rounded="lg" shadow="md">
      <OrderHeader onExportClick={exportToCSV} />
      <OrderFilterForm />
      <OrderStatusFilter />
      <OrderTable orderData={orderData} />
    </Box>
  );
};

export default Order;
