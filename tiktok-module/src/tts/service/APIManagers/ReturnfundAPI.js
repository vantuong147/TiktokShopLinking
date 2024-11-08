import { getCookieValue, appKey, shopData } from "../HelperFunction";
import {fetchData} from './APIService';
  
  export const GetRejectReasons = (shopID, locale, returnOrCancelID) => {
    console.log('GetRejectReasons', { shopID, locale, returnOrCancelID });
  };
  
  export const GetCancellations = (shopID, filterParams) => {
    console.log('GetCancellations', {shopID, filterParams});
    return fetchData('get_cancellations', appKey(), shopData(shopID), { params: { filterParams: filterParams } });
  };