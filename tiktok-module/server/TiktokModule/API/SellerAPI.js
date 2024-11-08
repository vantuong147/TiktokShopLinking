const { generateUrl, apiRequest } = require('../Helper/HelperFunction');
const apiEndpoints = {
    get_active_shops: '/seller/202309/shops'
};

const SellerAPI = {
    async GetActiveShops(config, timestamp, packageID) {
        const queryParams = {
            app_key: config.appKey,
            timestamp,
        };
        const url = generateUrl(config, apiEndpoints.get_active_shops, queryParams, false, null);
        return apiRequest(config, url, 'get', null);
    },
};

module.exports = SellerAPI;
