const express = require('express');
const {getLinkShopData, addNewShop, updateShopData, deleteShop, updateShopInformation} = require('../TiktokModule/Manager/DBManager/UserDataManager');
const {handleApiRequest} = require('../controllers/tiktok_api_controller')
const {GetAccessToken} = require('../TiktokModule/Manager/AuthorizeManager')

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() }); // Store file in memory for simplicity


const router = express.Router();

router.post('/get_link_shop_data', getLinkShopData);
router.post('/add_new_shop', addNewShop);
router.post('/delete_shop', deleteShop);
router.post('/update_shop_information',upload.single('avatar'), updateShopInformation);

router.post('/api_handler',handleApiRequest);
router.post('/get_access_token', GetAccessToken);


module.exports = router;
