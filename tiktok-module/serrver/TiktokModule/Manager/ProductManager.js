
const Helper = require("../Helper/HelperFunction");
const ProductAPI = require('../API/ProductAPI');


const GetProductList = (config, filterParams = null) => {
    console.log('GetProductList', { config, filterParams });
    return ProductAPI.GetProductList(config, Helper.timestamp(), filterParams);
  };

const GetProductDetail = (config, productID) => {
    console.log('GetProductDetail', { config, productID });
    return ProductAPI.GetProductDetail(config, Helper.timestamp(), productID);
  };


module.exports = {GetProductList, GetProductDetail};