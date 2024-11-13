
const fs = require('fs');  // Đảm bảo đã import fs
const Helper = require("../Helper/HelperFunction");
const OrderAPI = require('../API/OrderAPI');
const OrdersDAO = require("../DAO/OrdersDAO");
const OrderDAO = require("../DAO/OrderDAO");

const {getMultiShopData} = require("../Manager/DBManager/UserDataManager")
const get_app_data = require('./DBManager/AppDataManager');



const GetOrderList = async (filterParams = null) => {
  console.log('GetOrderList', { filterParams });

  const app_key = "6e2skahs13mp0";
  const app_secret = await get_app_data.getAppSecret(app_key);

  const allShop = await getMultiShopData("ALL");
  console.log("allShop:", allShop.map(shop => shop.shop_id));

  // Duyệt qua tất cả các shop và gọi OrderAPI.getOrderList cho từng shop
  const orderPromises = allShop.map(async (shop) => {
      if (!shop.shop_id || shop.shop_id.startsWith("Undefined")) {
          return null; // Nếu shop_id là rỗng hoặc bắt đầu bằng "Undefined", bỏ qua shop này
      }

      const config = {
          appKey: app_key,
          appSecret: app_secret,
          accessToken: shop.token_data.access_token, // Giả sử shop có trường access_token
          shopCipher: shop.cipher, // Giả sử shop có trường cipher
          shopId: shop.shop_id, // Giả sử shop có trường shop_id
      };
      let timestamp = Math.floor(Date.now() / 1000);
      // Gọi hàm OrderAPI.getOrderList với config và timestamp
      const orders = await OrderAPI.getOrderList(config, timestamp, filterParams);
      // Lấy thời gian hiện tại
    const currentTime = new Date().toISOString();

    // Duyệt qua từng order và đính kèm thông tin về `store` và `time`
    const enrichedOrders = orders.map(order => {
      return {
        ...order,
        store: {friendly_name: shop.friendly_name, shop_name: shop.shop_name, shop_id: shop.shop_id},   // Đính kèm thông tin `store`
        fetchedTime: currentTime,   // Đính kèm thông tin `time`
      };
    });
      return enrichedOrders; // Trả về kết quả từ mỗi shop
  });

  // Chờ tất cả các promises hoàn thành và lọc các giá trị null
  const allOrders = (await Promise.all(orderPromises)).flat();
  // Duyệt qua từng đơn hàng và in ra màn hình
  let result = []
  allOrders.forEach(order => {
    const orderDAO = new OrderDAO(order, true);
    const data = {
      store: order.store,
      time: order.fetchedTime,
      ...orderDAO.getCSVDetail()
    }
    result.push(data);
    //console.log("Order:", orderDAO.getCSVDetail());
    //console.log(order.store + " | " + order.fetchedTime)  // In từng order ra màn hình
  });
  
  // Kết quả là mảng tất cả đơn hàng từ các shop
  return {success: true, data: result};
};
  
const GetOrderDetail = async (config, orderIDs, isCSVFormat = true) => {
    console.log('GetOrderDetail', { config, orderIDs, isCSVFormat });
    const response = await OrderAPI.getOrderDetail(config, Helper.timestamp(), orderIDs);
    console.log("RESPONSE: " + JSON.stringify(response));
    if (!response.success)
      return response;
    if (isCSVFormat)
    {
      const ordersDAO = new OrdersDAO(response, false);
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
    const order = new OrdersDAO(orderResponse, false);
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