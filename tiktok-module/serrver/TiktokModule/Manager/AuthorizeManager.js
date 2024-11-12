const {getShopData, getLinkShopData, addNewShop, updateShopData, deleteShop, updateShopInformation} = require('./DBManager/UserDataManager');
const axios = require('axios');

const tiktokShop = require('tiktok-shop');
const tiktokShopClient = require('tiktok-shop-client');
const get_app_data = require('./DBManager/AppDataManager');


const GetAccessToken = async (req, res) =>{
    const { first_shop_id, app_key, auth_code } = req.body; // Use req.body to handle POST request data
    console.log("[SERVER] Received request: get_access_token: " ,{first_shop_id, app_key, auth_code});
    try {
        const app_secret = await get_app_data.getAppSecret(app_key);
        console.log("[SERVER] Got secret: " + app_secret);
        const config = {
            appKey: app_key, // Required
            appSecret: app_secret, // Required
        };

        console.log("[SERVER] Config " + config.appKey + " | " + config.appSecret);
        
        // Call authCodeToken to retrieve access token
        const accessToken = await tiktokShopClient.authCodeToken(config, auth_code);
        // console.log("accessToken: " + JSON.stringify(accessToken));
        console.log("Recieved accessToken code:", accessToken.code);
        if (accessToken.code != 0)
        {
            console.log("Code != 0");
            return res.status(500).json({
                success: false,
                error: 'Error fetching access token',
                message: accessToken.message // Provide specific error message
            });
        }


        const responseAuthorize = AuthorizeTiktok(accessToken.data.access_token).then(result => {
            console.log("REsult:", result);
            if (result.success) {
                console.log("Result OK");
                // const newShopData = {
                //     access_token: accessToken.data.access_token,
                //     access_token_expire_in: accessToken.data.access_token_expire_in,
                //     refresh_token: accessToken.data.refresh_token,
                //     refresh_token_expire_in: accessToken.data.refresh_token
                // };

                
                // const shop_info = {
                //     cipher: cipher,
                //     shop_id: shop_id,
                //     shop_name: shop_name,
                //     code: code
                // };
                // newShopData.data = shop_info;
                //--------------------------------------------------------------------------------------------------
                (async ()=>{
                    const cipher = result.data.data.shops[0].cipher;
                    const shop_id = result.data.data.shops[0].id;
                    const shop_name = result.data.data.shops[0].name;
                    const code = result.data.data.shops[0].code;

                    const crrShopData = getShopData(first_shop_id);
                    // Add the new shop with empty data
                    const shopData = {
                        "friendly_name": crrShopData.friendly_name,
                        "shop_id": shop_id,
                        "shop_name": shop_name,
                        "code": code,
                        "cipher": cipher,
                        "token_data": {
                        "access_token": accessToken.data.access_token,
                        "access_token_expire_in": accessToken.data.access_token_expire_in,
                        "refresh_token": accessToken.data.refresh_token,
                        "refresh_token_expire_in": accessToken.data.refresh_token_expire_in
                        },
                        "product_data": {
                        "total": 0,
                        "live": 0,
                        "pending": 0,
                        "rejected": 0,
                        "frozen": 0,
                        "lastest_sync": 0
                        }
                    }

                    console.log("\n");
                    console.log("SHOP DATA:", shopData);

                    const updateResult = await updateShopData(first_shop_id, shopData);
                    console.log("RESULT: " + updateResult);
                    return res.status(200).json({
                        success: updateResult.success,
                        message: updateResult.message,
                        code: updateResult.code
                    });
                })();
          }})
          .catch(error => {
            console.error('Unexpected error:', error); // Catch any unexpected errors
            res.status(500).json({
                success: false,
                error: 'Error fetching access token',
                message: error.message // Provide specific error message
            });
          });
    } catch (error) {
        console.error('Error fetching access token:', error);
        res.status(500).json({
            success: false,
            error: 'Error fetching access token',
            message: error.message // Provide specific error message
        });
    }
}

//after get access token -> authorize shop
const AuthorizeTiktok = async (accessToken) => {
    console.log("AccessToken: " + accessToken);
    appKey = "6e2skahs13mp0";
    const appSecret = await get_app_data.getAppSecret(appKey);

    var timestamp = Date.parse(new Date()) / 1000  
    const url_1 = `https://open-api.tiktokglobalshop.com/authorization/202309/shops?app_key=${appKey}&timestamp=${timestamp}`;
    const signature = tiktokShop.signByUrl(url_1, appSecret);
    console.log(signature);
    const url = `https://open-api.tiktokglobalshop.com/authorization/202309/shops?app_key=${appKey}&sign=${signature.signature}&timestamp=${signature.timestamp}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'x-tts-access-token': accessToken,
          'Content-Type': 'application/json', // Adjust content type as necessary
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      console.error('Error fetching TikTok shop data:', error);
      return { success: false, error: error.message };
    }
  };
  module.exports = {GetAccessToken, AuthorizeTiktok};