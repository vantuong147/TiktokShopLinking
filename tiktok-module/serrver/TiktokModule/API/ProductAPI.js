const { generateUrl, apiRequest } = require('../Helper/HelperFunction');

const apiEndpoints = {
    get_product_list: '/product/202309/products/search',
    get_product_detail: '/product/202309/products/{product_id}'
};

const ProductAPI = {
    async GetProductList(config, timestamp, filterParams) {
        const queryParams = {
            app_key: config.appKey,
            timestamp,
            shop_cipher: config.shopCipher,
            page_size: "100"
        };
        const url = generateUrl(config, apiEndpoints.get_product_list, queryParams, true, {});
        return apiRequest(config, url, 'post');
    },
    async GetProductDetail(config, timestamp, productID) {
        const queryParams = {
            app_key: config.appKey,
            timestamp,
            shop_cipher: config.shopCipher
        };
        const url = generateUrl(config, apiEndpoints.get_product_detail.replace("{product_id}", productID), queryParams, false, null);
        return apiRequest(config, url, 'get');
    },
};

module.exports = ProductAPI;
