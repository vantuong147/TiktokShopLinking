// OrderAPI.js
import { getCookieValue, appKey, shopData } from "../HelperFunction";
import {fetchData} from './APIService';

export const GetActiveShops = (shopID) => {
  console.log('GetActiveShops', { shopID });
  return fetchData('get_active_shops', appKey(), shopData(shopID));
};