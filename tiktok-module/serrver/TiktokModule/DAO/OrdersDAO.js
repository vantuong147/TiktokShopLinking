const OrdersParser = require('../Helper/Parser/OrdersParser'); // Import OrderParser
class OrdersDAO {
    constructor(response, isJson) {
        if (!isJson)
        {
            console.log("CREATE FROM RESPONSE: " + JSON.stringify(response));
            this.data = new OrderParser(response);
        }

        else
            this.data = new OrderParser({sucess:true, data: {data:response}});
    }


    // Method to get the order ID
    getOrderBasicDetails(index = 0) {
        return this.data.getOrderBasicDetails(index);
    }
    getCSVDetails(index = 0)
    {
        return this.data.getCSVDetails(index);
    }
    getCount()
    {
        return this.data.getCount();
    }

    // Method to get the items in the order
    getItems() {
        return this.data.getAllItemsID();
    }
}

module.exports = OrdersDAO;
