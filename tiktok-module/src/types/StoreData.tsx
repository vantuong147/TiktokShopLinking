interface TokenData {
    access_token: string;
    access_token_expire_in: number;
    refresh_token: string;
    refresh_token_expire_in: number;
  }
  
interface ProductData {
    total: number;
    live: number;
    pending: number;
    rejected: number;
    frozen: number;
    lastest_sync: number;
  }
export interface StoreData {
    friendly_name: string;
    shop_id: string;
    shop_name: string;
    code: string;
    cipher: string;
    token_data: TokenData;
    product_data: ProductData;
  }