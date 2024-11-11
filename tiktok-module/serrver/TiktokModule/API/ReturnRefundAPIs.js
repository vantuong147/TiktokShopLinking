const { generateUrl, apiRequest } = require('../Helper/HelperFunction');
const apiEndpoints = {
    get_cancellations: '/return_refund/202309/cancellations/search'
};

const ReturnRefundAPI = {
    async GetCancellations(config, timestamp, filterParams = {}) {
        const queryParams = {
            app_key: config.appKey,
            shop_cipher: config.shopCipher,
            timestamp,
        };
        const url = generateUrl(config, apiEndpoints.get_cancellations, queryParams, true, filterParams);
        return apiRequest(config, url, 'post', filterParams);
    },
};

module.exports = ReturnRefundAPI;
