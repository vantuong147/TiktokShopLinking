import { appKey, shopData } from '../HelperFunction';
import {fetchData} from './APIService';
//-----------------------------------------------------------------------------------------Get API------------------------------------------------------------------
export const GetAttributes = (shopID) => {
    console.log('GetAttributes', { shopID });
  };
  
  export const GetCategories = (shopID, categoryVersion) => {
    console.log('GetCategories', { shopID, categoryVersion });
  };
  
  export const GetCategoryRules = (shopID) => {
    console.log('GetCategoryRules', { shopID });
  };
  
  export const GetListSchemas = (shopID, categoryIDs) => {
    console.log('GetListSchemas', { shopID, categoryIDs });
  };
  
  export const GetListingPrerequisites = (shopID) => {
    console.log('GetListingPrerequisites', { shopID });
  };
  
  export const GetBrands = (shopID, pageSize) => {
    console.log('GetBrands', { shopID, pageSize });
  };
  
  export const GetProductDetail = (shopID, productID) => {
    console.log('GetProductDetail', { shopID, productID });
    return fetchData('get_product_detail', appKey(), shopData(shopID), { params: { productID: productID}});
  };

  export const GetProductList = (shopID) => {
    console.log('GetProductDetails', { shopID });
    return fetchData('get_product_list', appKey(), shopData(shopID));
  };
  export const GetProductInformationIssueDiagnosis = (shopID) => {
    console.log('GetProductInformationIssueDiagnosis', { shopID });
  };
  
  export const GetGlobalProductDetails = () => {
    console.log('GetGlobalProductDetails');
  };
//-------------------------------------------------------------------------------------End Get API------------------------------------------------------------------  
// Các API edit, create product đòi hỏi tham số rất phức tạp, khuyến nghị nên xử lý ở trang chủ của tiktok shop





















