const { generateUrl, apiRequest } = require('../Helper/HelperFunction');
const apiEndpoints = {
    get_order_list: '/order/202309/orders/search',
    get_order_detail: '/order/202309/orders',
    cancel_order: '/return_refund/202309/cancellations',
    ship_package: '/fulfillment/202309/packages/{package_id}/ship'
};

const OrderAPI = {
    async getOrderList(config, timestamp, filterParams = null) {
        const queryParams = {
            app_key: config.appKey,
            timestamp,
            shop_cipher: config.shopCipher,
            page_size: "100",
            shop_id: config.shopId,
            version: '202309'
        };
        const url = generateUrl(config, apiEndpoints.get_order_list, queryParams, true, {});
        return apiRequest(config, url, 'post');
    },

    async getOrderDetail(config, timestamp, orderIDs) {
        const queryParams = {
            app_key: config.appKey,
            timestamp,
            shop_cipher: config.shopCipher,
            ids: orderIDs
        };
        const url = generateUrl(config, apiEndpoints.get_order_detail, queryParams, false, null);
        return apiRequest(config, url, 'get', null);
    },

    async cancelOrder(config, timestamp, orderID, cancel_reason) {
        const queryParams = {
            app_key: config.appKey,
            timestamp,
            shop_cipher: config.shopCipher
        };
        const bodyCancelOrder = 
        {
            "cancel_reason": "seller_cancel_reason_wrong_price",
            "order_id": orderID
        }
        const url = generateUrl(config, apiEndpoints.cancel_order, queryParams, true, bodyCancelOrder);
        return apiRequest(config, url, 'post', bodyCancelOrder);
    },

    async shipPackage(config, timestamp, package_id, shipping_provider_id) {
        const tracking_number = "TRG_"+package_id;
        const queryParams = {
            app_key: config.appKey,
            timestamp,
            shop_cipher: config.shopCipher
        };
        const bodyShipPackage = 
        {
            "package_id": package_id,
            "pick_up": {
              "pick_up_end_time": timestamp,
              "pick_up_start_time": timestamp
            },
            "pick_up_type": 1,
            "self_shipment": {
              "shipping_provider_id": shipping_provider_id,
              "tracking_number": tracking_number
            }
        }
        console.log("BODY: " + JSON.stringify(bodyShipPackage,null,4));
        const url = generateUrl(config, apiEndpoints.ship_package.replace("{package_id}", package_id), queryParams, true, bodyShipPackage);
        return apiRequest(config, url, 'post', bodyShipPackage);
    }
};

module.exports = OrderAPI;
