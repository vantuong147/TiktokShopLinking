
const Helper = require("../Helper/HelperFunction");
const ReturnRefundAPI = require('../API/ReturnRefundAPIs');


const GetCancellations = (config, filterParams = {}) => {
    console.log('GetCancellations', { config, filterParams });
    return ReturnRefundAPI.GetCancellations(config, Helper.timestamp(), filterParams);
  };

module.exports = {GetCancellations};