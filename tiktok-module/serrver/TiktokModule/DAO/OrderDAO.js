const OrderParser = require('../Helper/Parser/OrderParser'); // Import OrderParser
class OrderDAO {
    constructor(orderData) {
        this.data = new OrderParser(orderData);
    }


    // Method to get the order ID
    getOrderBasicDetails() {
        return this.data.getOrderBasicDetail();
    }
    getCSVDetail()
    {
        return this.data.getCSVDetail();
    }

    // Method to get the items in the order
    getItems() {
        return this.data.getAllItemsID();
    }
}

module.exports = OrderDAO;
