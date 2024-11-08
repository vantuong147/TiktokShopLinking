
const Helper = require("../Helper/HelperFunction");
const SellerAPI = require('../API/SellerAPI');


const GetActiveShops = (config) => {
    console.log('GetActiveShops', { config });
    return SellerAPI.GetActiveShops(config, Helper.timestamp());
  };

module.exports = {GetActiveShops};