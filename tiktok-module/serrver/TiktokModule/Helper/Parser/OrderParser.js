// parsers/OrderParser.js
const ResponseParser = require('./ResponseParser');

class OrderParser extends ResponseParser {
    constructor(response) {
        super(response);
    }
    // Example: Get details of a specific order by ID
    getOrderBasicDetails(index = 0) {
        const order = this.data.orders[index];
        return {
            id: order.id,
            status: order.status,
            packages: order.packages,
            tracking_number: order.tracking_number,
            shipping_provider_id: order.shipping_provider_id,
            line_items: order.line_items,
        };
    }
    getCSVDetails(index = 0)
    {
        const order = this.data.orders[index];
        return {
            external_id:'NA',
            order_id: order.id,
            shipping_method:order.delivery_option_name,
            name: order.recipient_address.first_name+order.recipient_address.last_name+`(${order.recipient_address.name})`,
            email: order.buyer_email,
            phone: order.recipient_address.phone_number,
            country: order.recipient_address.postal_code,
            region: order.recipient_address.region_code,
            address_line_1: order.recipient_address.full_address,
            address_line_2: order.recipient_address.address_line2,
            city:'',
            zip: order.recipient_address.postal_code,
            quantity: order.line_items.length,
            variant_id: 'NA',
            front_design:'NA',
            back_design: 'NA',
            mockup_front:'NA',
            mockup_back: 'NA',
            tracking: order.tracking_number,
            link_label: 'NA',
            size: 'NA',
            color: 'NA',
            shirt_type: 'NA',
            is_rush: null
        };
    }
    getCount()
    {
        return this.data.orders.length;
    }
    getAllItemsID(){
        const result = []
        const line_items = this.data.orders[0].line_items;
        for (var i = 0; i< line_items.length; i++)
        {
            result.push(line_items[i].id);
        }
        return result;
    }
}

module.exports = OrderParser;
