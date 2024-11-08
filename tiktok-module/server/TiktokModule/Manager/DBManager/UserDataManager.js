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
            res.json({ success: true, shopData });
        } catch (parseErr) {
            console.error('Error parsing link_shop.json:', parseErr);
            res.status(500).json({ error: 'Error parsing link shop data' });
        }
    });
};

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
        shopData.push({ shop_id: shop_name, data: "" });

        fs.writeFile(linkShopFilePath, JSON.stringify(shopData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to link_shop.json:', writeErr);
                return res.status(500).json({ error: 'Error saving new shop' });
            }
            res.json({ success: true, message: 'Shop added successfully' });
        });
    });
};
const updateShopData = async (shop_name, new_data) => {
    console.log("update shopdata", { shop_name, new_data });
    
    try {
        // Read the file as a Promise
        const data = await fs.promises.readFile(linkShopFilePath, 'utf8');
        console.log(1);
        
        let shopData = [];
        if (data) {
            shopData = JSON.parse(data);
        }
        console.log(2);
        
        const shopIndex = shopData.findIndex(shop => shop.shop_id === shop_name);
        if (shopIndex === -1) {
            console.log("Shop not found");
            return { success: false, message: "Shopname not found", code: 1 };
        } else {
            console.log(3);
            const shopIndex_byTiktokID = shopData.findIndex(shop => shop.data.data && (shop.data.data.shop_id === new_data.data.shop_id));
            if (shopIndex_byTiktokID !== -1 && shopIndex_byTiktokID !== shopIndex) {
                console.log("This tiktok shop added before!");
                return { success: false, message: "This tiktok shop account authorized before!", code: 2 };
            }
            
            shopData[shopIndex].data = new_data;

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

// Function to update shop name and avatar
const updateShopInformation = (req, res) => {
    console.log(req.body);
    const { shop_id_tt, new_name } = req.body;
    console.log("Update: " + shop_id_tt + " -> " + new_name);
    const avatar = req.file; // Assumes avatar file is sent in the request

    fs.readFile(linkShopFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading link_shop.json:', err);
            return res.status(500).json({ error: 'Error reading link shop data' });
        }

        let shopData = data.trim() ? JSON.parse(data) : [];
        const shopIndex = shopData.findIndex(shop => shop.data.data && (shop.data.data.shop_id === shop_id_tt));

        if (shopIndex === -1) {
            return res.status(404).json({ success: false, message: 'Shop not found' });
        }
        // Update the shop name and avatar if provided
        shopData[shopIndex].shop_id = new_name;
        if (avatar) {
            const avatarPath = path.join(avatarDirectory, `avatar_${shop_id_tt}.png`);
            // Check if the directory exists, and create it if not
            if (!fs.existsSync(avatarDirectory)) {
                fs.mkdirSync(avatarDirectory, { recursive: true }); // Ensure that the directory is created recursively
            }
            fs.writeFileSync(avatarPath, avatar.buffer);
            const avatarUrl = `${HOST}/avatars/avatar_${shop_id_tt}.png`;
            shopData[shopIndex].avatar = avatarUrl // Store the avatar path
            console.log("ShopData: " + JSON.stringify(shopData[shopIndex]));
        }

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

module.exports = {getLinkShopData, addNewShop, updateShopData, deleteShop, updateShopInformation}
