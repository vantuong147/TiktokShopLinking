
const Helper = require("../Helper/HelperFunction");
const OrderAPI = require('../API/OrderAPI');
const OrderDAO = require("../DAO/OrderDAO");

const GetOrderList = (config, filterParams = null) => {
    console.log('GetOrderList', { config, filterParams });
    return OrderAPI.getOrderList(config, Helper.timestamp(), filterParams);
  };
  
const GetOrderDetail = async (config, orderIDs, isCSVFormat = true) => {
    console.log('GetOrderDetail', { config, orderIDs, isCSVFormat });
    const response = await OrderAPI.getOrderDetail(config, Helper.timestamp(), orderIDs);
    console.log("RESPONSE: " + JSON.stringify(response));
    if (!response.success)
      return response;
    if (isCSVFormat)
    {
      const ordersDAO = new OrderDAO(response, false);
      const n = ordersDAO.getCount();
      let result = {success: true, data:[]};
      for (var i = 0; i < n; i++)
      {
        let basicDetails = ordersDAO.getCSVDetails(i);
        console.log(basicDetails);
        result.data.push(basicDetails);
      }
  
      return result;
    }
    else
    {
      return {success: true, data: response.data};
    }
  };
  
const CancelOrder = (config, orderID, cancelReason) => {
    console.log('CancelOrder', { config, orderID, cancelReason });
    return OrderAPI.cancelOrder(config, Helper.timestamp(), orderID, cancelReason);
  };
const ShipAllItems = async (config, orderID) => {
    console.log('ShipAllItems', { config, orderID });
    
    const orderResponse = await GetOrderDetail(config, orderID, false);
    const order = new OrderDAO(orderResponse, false);
    const basicDetails = order.getOrderBasicDetails();
    
    console.log("Details: " + JSON.stringify(basicDetails));

    // Iterate over all packages and call shipPackage for each
    const shipResults = await Promise.all(basicDetails.packages.map(async (pkg) => {
        try {
            const result = await OrderAPI.shipPackage(config, Helper.timestamp(), pkg.id, basicDetails.shipping_provider_id);
            return { success: true, packageId: pkg.id, result };
        } catch (error) {
            console.error(`Error shipping package ${pkg.id}:`, error.message);
            return { success: false, packageId: pkg.id, error: error.message };
        }
    }));

    console.log("RESULT:", shipResults);
    return {success: true, data: shipResults}; // Array of results for each package
};


module.exports = {GetOrderList, GetOrderDetail, CancelOrder, ShipAllItems};