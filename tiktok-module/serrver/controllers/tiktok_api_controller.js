const get_app_data = require('../TiktokModule/Manager/DBManager/AppDataManager');
const OrderManager= require('../TiktokModule/Manager/OrderManager');
const PackageManager= require('../TiktokModule/Manager/PackageManager');
const ProductManager = require('../TiktokModule/Manager/ProductManager');
const SellerManager = require('../TiktokModule/Manager/SellerManager');
const ReturnRefundManager = require('../TiktokModule/Manager/ReturnRefundManager');

const handleApiRequest = async (req, res) => {
    const {requestId, params = '' } = req.body;
    try {
        let result;
        switch (requestId) {
//------------------------------------------------------Order APIs-----------------------------------------------------------------------------
            case 'get_order_list':
                result = await OrderManager.GetOrderList(params);
                return res.status(result.success ? 200 : 500).json(result);
            case 'get_order_detail':
                result = await OrderManager.GetOrderDetail(config, params.orderIDs);
                console.log(result);
                return res.status(result.success ? 200 : 500).json(result);
            case 'cancel_order':
                result = await OrderManager.CancelOrder(config, params.orderID, params.cancelReason);
                return res.status(result.success ? 200 : 500).json(result);
            case 'ship_all_items':
                result = await OrderManager.ShipAllItems(config, params.orderID);
                return res.status(result.success ? 200 : 500).json(result);
//------------------------------------------------------End Order APIs------------------------------------------------------------------------
//-------------------------------------------------------Package APIs-------------------------------------------------------------------------
            case 'get_package_detail':
                result = await PackageManager.GetPackageDetail(config, params.packageID);
                return res.status(result.success ? 200 : 500).json(result);
//-----------------------------------------------------End Package APIs-------------------------------------------------------------------------
//-------------------------------------------------------Product APIs-------------------------------------------------------------------------

            case 'get_product_list':
                result = await ProductManager.GetProductList(config);
                return res.status(result.success ? 200 : 500).json(result);
            case 'get_product_detail':
                result = await ProductManager.GetProductDetail(config, params.productID);
                return res.status(result.success ? 200 : 500).json(result);
//-----------------------------------------------------End Product APIs-------------------------------------------------------------------------
//--------------------------------------------------------Seller APIs-------------------------------------------------------------------------
            case 'get_active_shops':
                result = await SellerManager.GetActiveShops(config);
                return res.status(result.success ? 200 : 500).json(result);
//-----------------------------------------------------End Seller APIs-------------------------------------------------------------------------
            case 'get_cancellations':
                result = await ReturnRefundManager.GetCancellations(config, params.filterParams);
                return res.status(result.success ? 200 : 500).json(result);
            default:
                return res.status(200).json({success: false, error: 'unknown request_id: ' + requestId});
        }
    } catch (error) {
        console.error('Error executing API request:', error);
        return res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { handleApiRequest };
