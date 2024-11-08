const { generateUrl, apiRequest } = require('../Helper/HelperFunction');
const apiEndpoints = {
    get_package_detail: '/fulfillment/202309/packages/{package_id}'
};

const PackageAPI = {
    async GetPackageDetail(config, timestamp, packageID) {
        const queryParams = {
            app_key: config.appKey,
            timestamp,
            shop_cipher: config.shopCipher,
        };
        const url = generateUrl(config, apiEndpoints.get_package_detail.replace("{package_id}", packageID), queryParams, false, null);
        return apiRequest(config, url, 'get', null);
    },
};

module.exports = PackageAPI;
