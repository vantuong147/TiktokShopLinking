import React from 'react';
import { Tr, Td, Button, Checkbox, Text } from '@chakra-ui/react';

interface OrderRowProps {
    order: {
    store: {
        friendly_name: string;
        shop_name: string;
        shop_id: string;
        };
      time: string;
      external_id: string;
      order_id: string;
      shipping_method: string;
      name: string;
      email: string;
      phone: string;
      country: string;
      region: string;
      address_line_1: string;
      address_line_2: string;
      address_line_3: string;
      city: string;
      zip: string;
      quantity: number;
      variant_id: string;
      tracking: string;
      link_label: string;
      size: string;
      color: string;
      shirt_type: string;
      is_rush: boolean;
      font_design: string;
      back_design: string;
      mockup_front: string;
      mockup_back: string;
      extra_design_1: string;
      mockup_extra_1: string;
      extra_design_2: string;
      mockup_extra_2: string;
      extra_design_3: string;
      mockup_extra_3: string;
    };
    index: number;
  }  

const OrderRow: React.FC<OrderRowProps> = ({ order, index }) => {
  return (
    <Tr>
      {/* Select */}
      <Td>
        <Checkbox />
      </Td>
      {/* Number */}
      <Td>{index + 1}</Td>
      {/* Store */}
      <Td>
        <Text><strong>Friendly Name:</strong> {order.store.friendly_name}</Text>
        <Text><strong>Shop Name:</strong> {order.store.shop_name}</Text>
        <Text><strong>Shop ID:</strong> {order.store.shop_id}</Text>
      </Td>
      {/* Time */}
      <Td>{order.time}</Td>
      {/* External ID */}
      <Td>{order.external_id}</Td>
      {/* Order ID */}
      <Td>{order.order_id}</Td>
      {/* Shipping method */}
      <Td>{order.shipping_method}</Td>
      {/* Customer Name */}
      <Td>{order.name}</Td>
      {/* Email */}
      <Td>{order.email}</Td>
      {/* Phone */}
      <Td>{order.phone}</Td>
      {/* Country */}
      <Td>{order.country}</Td>
      {/* Region */}
      <Td>{order.region}</Td>
      {/* Address line 1 */}
      <Td>{order.address_line_1}</Td>
      {/* Address line 2 */}
      <Td>{order.address_line_2}</Td>
      {/* Address line 3 */}
      <Td>{order.address_line_3}</Td>
      {/* City */}
      <Td>{order.city}</Td>
      {/* Zip */}
      <Td>{order.zip}</Td>
      {/* Quantity */}
      <Td>{order.quantity}</Td>
      {/* Variant ID */}
      <Td>{order.variant_id}</Td>
      {/* Font Design */}
      <Td>
        {order.font_design && order.font_design !== 'NA' ? (
            <a href={order.font_design} target="_blank" rel="noopener noreferrer">
            <Button size="sm" colorScheme="teal">
                View Font Design
            </Button>
            </a>
        ) : (
            <span>{order.font_design || 'N/A'}</span>
        )}
      </Td>
      {/* Back Design */}
      <Td>
        {order.back_design && order.back_design !== 'NA' ? (
            <a href={order.back_design} target="_blank" rel="noopener noreferrer">
            <Button size="sm" colorScheme="teal">
                View Back Design
            </Button>
            </a>
        ) : (
            <span>{order.back_design || 'N/A'}</span>
        )}
      </Td>
      {/* Mockup Front */}
      <Td>
        {order.mockup_front && order.mockup_front !== 'NA' ? (
            <a href={order.mockup_front} target="_blank" rel="noopener noreferrer">
            <Button size="sm" colorScheme="teal">
                View Mockup Front
            </Button>
            </a>
        ) : (
            <span>{order.mockup_front || 'N/A'}</span>
        )}
      </Td>
      {/* Mockup Back */}
      <Td>
        {order.mockup_back && order.mockup_back !== 'NA' ? (
            <a href={order.mockup_back} target="_blank" rel="noopener noreferrer">
            <Button size="sm" colorScheme="teal">
                View Mockup Back
            </Button>
            </a>
        ) : (
            <span>{order.mockup_back || 'N/A'}</span>
        )}
      </Td>
      {/* Tracking */}
      <Td>{order.tracking}</Td>
      {/* LINK LABEL */}
      <Td>{order.link_label}</Td>
      {/* Size */}
      <Td>{order.size}</Td>
      {/* Color */}
      <Td>{order.color}</Td>
      {/* ShirtType */}
      <Td>{order.shirt_type}</Td>
      {/* IsRush */}
      <Td>
        {order.is_rush ? <Text color="red.500">Yes</Text> : <Text color="green.500">No</Text>}
      </Td>
      {/* ExtraDesign1 */}
      <Td>
        <Button size="sm" colorScheme="green">
          View Extra Design 1
        </Button>
      </Td>
      {/* MockupExtra1 */}
      <Td>
        <Button size="sm" colorScheme="blue">
          View Mockup Extra 1
        </Button>
      </Td>
      {/* ExtraDesign2 */}
      <Td>
        <Button size="sm" colorScheme="green">
          View Extra Design 2
        </Button>
      </Td>
      {/* MockupExtra2 */}
      <Td>
        <Button size="sm" colorScheme="blue">
          View Mockup Extra 2
        </Button>
      </Td>
      {/* ExtraDesign3 */}
      <Td>
        <Button size="sm" colorScheme="green">
          View Extra Design 3
        </Button>
      </Td>
      {/* MockupExtra3 */}
      <Td>
        <Button size="sm" colorScheme="blue">
          View Mockup Extra 3
        </Button>
      </Td>
      {/* Action */}
      <Td>
        <Button size="sm" colorScheme="yellow">
          Edit
        </Button>
        <Button size="sm" colorScheme="red" ml={2}>
          Remove
        </Button>
      </Td>
    </Tr>
  );
};

export default OrderRow;
