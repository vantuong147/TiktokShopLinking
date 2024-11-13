import React, { useRef } from 'react';
import { Table, Tbody } from '@chakra-ui/react';
import OrderRow from './OrderRow';
import OrderTableHeader from './OrderTableHeader';

interface OrderTableProps {
  orderData: any[]; // Define the expected type for the order data
}

const OrderTable: React.FC<OrderTableProps> = ({ orderData }) => {
  const topScrollRef = useRef<HTMLDivElement>(null);
  const bottomScrollRef = useRef<HTMLDivElement>(null);

  const syncScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = e.currentTarget.scrollLeft;
    // Đảm bảo đồng bộ hóa thanh cuộn của cả 2 phần: header và body
    if (topScrollRef.current) {
      topScrollRef.current.scrollLeft = scrollLeft;
    }
    if (bottomScrollRef.current) {
      bottomScrollRef.current.scrollLeft = scrollLeft;
    }
  };

  // Kiểm tra xem orderData có phải là mảng không trước khi gọi .map()
  if (!Array.isArray(orderData)) {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>Không có dữ liệu đơn hàng hoặc dữ liệu không hợp lệ.</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      {/* Thanh slider trên cho header */}
      <div
        ref={topScrollRef}
        style={{
          overflowX: 'auto',
          height: '20px',
          marginBottom: '10px',
        }}
        onScroll={syncScroll}
      >
        {/* Dùng một div trống với chiều rộng đủ lớn để có thể cuộn */}
        <div style={{ width: '2000px' }}></div>
      </div>

      {/* Bảng với header cố định và phần nội dung có thể cuộn */}
      <div
        ref={bottomScrollRef}
        style={{
          overflowX: 'auto',
          overflowY: 'auto',
          maxHeight: '500px',
          position: 'relative',
        }}
        onScroll={syncScroll}
      >
        <Table variant="striped" colorScheme="teal" size="sm">
          <OrderTableHeader />
          {/* Body Table với khả năng cuộn dọc */}
          <Tbody>
            {/* Map qua mảng dữ liệu và truyền từng item cho OrderRow */}
            {orderData.map((order, index) => (
              <OrderRow key={index} index={index} order={order} />
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default OrderTable;
