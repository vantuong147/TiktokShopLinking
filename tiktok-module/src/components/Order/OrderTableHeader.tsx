
import { Table, Thead, Tbody, Tr, Th, Checkbox } from '@chakra-ui/react';

const OrderTableHeader = () => {
  return (
          <Thead style={{
            position: 'sticky',
            top: 0,
            backgroundColor: "#ffd56b", // Màu nền của header
            zIndex: 1, // Đảm bảo header luôn nằm trên
            color: '#fff', // Màu chữ của header
            fontWeight: 'bold', // Đậm chữ
          }}>
          <Tr>
            {/* Select */}
            <Th width="5%">
                <Checkbox />
            </Th>
            {/* Number */}
            <Th width="5%">#</Th>
            {/* Store */}
            <Th width="10%">Store</Th>
            {/* Time */}
            <Th width="10%">Time</Th>
            {/* External ID */}
            <Th width="10%">External ID</Th>
            {/* Order ID */}
            <Th width="10%">Order ID</Th>
            {/* Shipping Method */}
            <Th width="10%">Shipping Method</Th>
            {/* Name */}
            <Th width="10%">Name</Th>
            {/* Email */}
            <Th width="10%">Email</Th>
            {/* Phone */}
            <Th width="10%">Phone</Th>
            {/* Country */}
            <Th width="10%">Country</Th>
            {/* Region */}
            <Th width="10%">Region</Th>
            {/* Address Line 1 */}
            <Th width="10%">Address 1</Th>
            {/* Address Line 2 */}
            <Th width="10%">Address 2</Th>
            {/* Address Line 3 */}
            <Th width="10%">Address 3</Th>
            {/* City */}
            <Th width="10%">City</Th>
            {/* Zip */}
            <Th width="10%">Zip</Th>
            {/* Quantity */}
            <Th width="5%">Quantity</Th>
            {/* Variant ID */}
            <Th width="10%">Variant ID</Th>
            {/* Font Design */}
            <Th width="10%">Font Design</Th>
            {/* Back Design */}
            <Th width="10%">Back Design</Th>
            {/* Mockup Front */}
            <Th width="10%">Mockup Front</Th>
            {/* Mockup Back */}
            <Th width="10%">Mockup Back</Th>
            {/* Tracking */}
            <Th width="10%">Tracking</Th>
            {/* LINK LABEL */}
            <Th width="10%">Link Label</Th>
            {/* Size */}
            <Th width="5%">Size</Th>
            {/* Color */}
            <Th width="5%">Color</Th>
            {/* ShirtType */}
            <Th width="10%">Shirt Type</Th>
            {/* IsRush */}
            <Th width="5%">Is Rush</Th>
            {/* Extra Design 1 */}
            <Th width="10%">Extra Design 1</Th>
            {/* Mockup Extra 1 */}
            <Th width="10%">Mockup Extra 1</Th>
            {/* Extra Design 2 */}
            <Th width="10%">Extra Design 2</Th>
            {/* Mockup Extra 2 */}
            <Th width="10%">Mockup Extra 2</Th>
            {/* Extra Design 3 */}
            <Th width="10%">Extra Design 3</Th>
            {/* Mockup Extra 3 */}
            <Th width="10%">Mockup Extra 3</Th>
            {/* Actions */}
            <Th width="10%">Actions</Th>
            </Tr>
        </Thead>

  );
};

export default OrderTableHeader;
