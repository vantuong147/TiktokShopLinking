const fs = require('fs');
const path = require('path');

const HOST = "http://localhost:8000";
const linkShopFilePath = path.join(__dirname, '../../DB/User/DefaultUser/link_shop.json');
const avatarDirectory = path.join(__dirname, '../../DB/User/DefaultUser/avatars');


// Function to get the current shop data
const getLinkShopData = (req, res) => {
    fs.readFile(linkShopFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading link_shop.json:', err);
            return res.status(500).json({ error: 'Error reading link shop data' });
        }

        try {
            const shopData = data.trim() ? JSON.parse(data) : []; // Return empty array if data is empty
            res.json({ success: true, data: shopData });
        } catch (parseErr) {
            console.error('Error parsing link_shop.json:', parseErr);
            res.status(500).json({ success: false, error: 'Error parsing link shop data' });
        }
    });
};

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let result = '';
    
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }
// Function to add a new shop
const addNewShop = (req, res) => {
    const { shop_name } = req.body;

    fs.readFile(linkShopFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading link_shop.json:', err);
            return res.status(500).json({ error: 'Error reading link shop data' });
        }

        let shopData = data.trim() ? JSON.parse(data) : [];

        // Check if the shop already exists
        const shopExists = shopData.some(shop => shop.shop_id === shop_name);

        if (shopExists) {
            return res.status(400).json({ success: false, message: 'Shop name already exists' });
        }

        // Add the new shop with empty data
        const emptyShop = {
            "friendly_name": shop_name,
            "shop_id": "Undefined_"+generateRandomString(10),
            "shop_name": "",
            "code": "",
            "cipher": "",
            "token_data": {
              "access_token": "",
              "access_token_expire_in": 0,
              "refresh_token": "",
              "refresh_token_expire_in": 0
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
        shopData.push(emptyShop);

        fs.writeFile(linkShopFilePath, JSON.stringify(shopData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to link_shop.json:', writeErr);
                return res.status(500).json({ error: 'Error saving new shop' });
            }
            res.json({ success: true, message: 'Shop added successfully' });
        });
    });
};
const updateShopData = async (shop_id, new_data) => {
    console.log("update shopdata", { shop_name: shop_id, new_data });
    
    try {
        // Read the file as a Promise
        const data = await fs.promises.readFile(linkShopFilePath, 'utf8');
        console.log(1);
        
        let shopData = [];
        if (data) {
            shopData = JSON.parse(data);
        }
        console.log(2);
        
        const shopIndex = shopData.findIndex(shop => shop.shop_id === shop_id);
        if (shopIndex === -1) {
            console.log("Shop not found");
            return { success: false, message: "Shopname not found", code: 1 };
        } else {
            console.log(3);
            const shopIndex_new_shop_id = shopData.findIndex(shop=>shop.shop_id === new_data.shop_id);
            if (shopIndex_new_shop_id !== shopIndex)
            {
                console.log("This shop already in DB");
                return { success: false, message: "This shop already in DB", code: 2 };
            }
            shopData[shopIndex] = new_data;

            // Write the updated data as a Promise
            await fs.promises.writeFile(linkShopFilePath, JSON.stringify(shopData, null, 2));
            console.log("[SERVER] Shop updated successfully");
            console.log(5);
            
            return { success: true, message: "Authorized successfully!", code: 0 };
        }
    } catch (err) {
        console.error('Error reading/writing link_shop.json:', err);
        return { success: false, message: "Read/Write data error", code: 3 };
    }
};

const getShopData = async (shop_id) => {
    console.log("get shopdata", { shop_name: shop_id});
    
    try {
        // Read the file as a Promise
        const data = await fs.promises.readFile(linkShopFilePath, 'utf8');
        
        let shopData = [];
        if (data) {
            shopData = JSON.parse(data);
        }
        
        const shopIndex = shopData.findIndex(shop => shop.shop_id === shop_id);
        if (shopIndex === -1) {
            console.log("Shop not found");
            return null;
        } else {
           return shopData[shopIndex];
        }
    } catch (err) {
       return null;
    }
};

// Function to update shop name and avatar
const updateShopInformation = (req, res) => {
    console.log(req.body);
    const { shop_id, new_name } = req.body;
    console.log("Update: " + shop_id + " -> " + new_name);

    fs.readFile(linkShopFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading link_shop.json:', err);
            return res.status(500).json({ error: 'Error reading link shop data' });
        }

        let shopData = data.trim() ? JSON.parse(data) : [];
        const shopIndex = shopData.findIndex(shop => shop && (shop.shop_id === shop_id));

        if (shopIndex === -1) {
            return res.status(404).json({ success: false, message: 'Shop not found' });
        }
        // Update the shop name and avatar if provided
        shopData[shopIndex].friendly_name = new_name;
        
        fs.writeFile(linkShopFilePath, JSON.stringify(shopData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error updating link_shop.json:', writeErr);
                return res.status(500).json({ error: 'Error updating shop information' });
            }
            res.json({ success: true, message: 'Shop information updated successfully' });
        });
    });
};

// Function to delete a shop
const deleteShop = (req, res) => {
    const { shop_id } = req.body;
    console.log("DELETE SHOP:", shop_id)

    fs.readFile(linkShopFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading link_shop.json:', err);
            return res.status(500).json({ error: 'Error reading link shop data' });
        }

        let shopData = data.trim() ? JSON.parse(data) : [];
        const shopIndex = shopData.findIndex(shop => shop.shop_id === shop_id);

        if (shopIndex === -1) {
            return res.status(404).json({ success: false, message: 'Shop not found' });
        }

        shopData.splice(shopIndex, 1); // Remove the shop from the array

        fs.writeFile(linkShopFilePath, JSON.stringify(shopData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error updating link_shop.json:', writeErr);
                return res.status(500).json({ error: 'Error deleting shop' });
            }
            res.json({ success: true, message: 'Shop deleted successfully' });
        });
    });
};

module.exports = {getShopData, getLinkShopData, addNewShop, updateShopData, deleteShop, updateShopInformation}
