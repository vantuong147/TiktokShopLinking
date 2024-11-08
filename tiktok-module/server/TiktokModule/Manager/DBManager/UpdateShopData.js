// const fs = require('fs');
// const path = require('path');
// const linkShopFilePath = path.join(__dirname, '../../DB/User/DefaultUser/link_shop.json');

// function updateShopData(shop_name, new_data){
//     console.log("update shopdata",{shop_name, new_data});
//     fs.readFile(linkShopFilePath, 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading link_shop.json:', err);
//             return false; // Return false on error
//         }

//         let shopData = [];
//         if (data) {
//             shopData = JSON.parse(data);
//         }

//         const shopIndex = shopData.findIndex(shop => shop.shop_id === shop_name);
//         if (shopIndex === -1) {
//             console.log("Shop not found");
//             return false;
//         } else {
//             shopData[shopIndex].data = new_data;

//             fs.writeFile(linkShopFilePath, JSON.stringify(shopData, null, 2), (err) => {
//                 if (err) {
//                     console.error('Error writing to link_shop.json:', err);
//                     return resolve(false);
//                 }
//                 console.log("[SERVER] Shop updated successfully");
//                 return true;
//             });
//         }
//     });
// };

// module.exports = updateShopData;