// OrderAPI.js
import { getCookieValue, appKey, shopData } from "../HelperFunction";
import {fetchData} from './APIService';

export const GetOrderList = (shopID, filterParams) => {
  console.log('GetOrderList', { shopID, filterParams });
  return fetchData('get_order_list', appKey(), shopData(shopID));
};

export const GetOrderDetail = (shopID, orderIDs) => {
  console.log('GetOrderDetail', { shopID, orderIDs });
  return fetchData('get_order_detail', appKey(), shopData(shopID), { params: { orderIDs: orderIDs.trim() } });
};

export const CancelOrder = (shopID, orderID, cancelReason) => {
  console.log('CancelOrder', { shopID, orderID, cancelReason });
  return fetchData('cancel_order', appKey(), shopData(shopID), { params: { orderID: orderID.trim(), cancelReason: cancelReason } });
};

export const ShipAllItem = (shopID, orderID) => {
  console.log('ShipAllItem', { shopID, orderID });
  return fetchData('ship_all_items', appKey(), shopData(shopID), { params: { orderID: orderID.trim()} });
};

export const GetPackageDetail = (shopID, packageID) => {
  console.log('GetPackageDetail', { shopID, packageID });
  return fetchData('get_package_detail', appKey(), shopData(shopID), { params: { packageID: packageID} });
};
