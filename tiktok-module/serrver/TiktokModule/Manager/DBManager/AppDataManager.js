const fs = require('fs').promises;
const path = require('path');
const app_data_path = path.join(__dirname, '../../DB/app_data.json');

const getAppSecret = async (app_key) => {
    try {
        const data = await fs.readFile(app_data_path, 'utf8');
        const appData = JSON.parse(data);
        for (i = 0; i< appData.length ;i ++)
        {
            console.log("test: " + appData[i].app_key +" compare -> " + app_key + " " + (appData[i].app_key===app_key));
        }
        const appEntry = appData.find(entry => entry.app_key === app_key);

        if (!appEntry) {
            throw new Error('App key not found');
        }

        console.log("Read app_secret: " + appEntry.secret_key);
        return appEntry.secret_key;
    } catch (err) {
        console.error('Error reading app_data.json:', err);
        throw err; // Ném lỗi để xử lý bên ngoài
    }
    return "";
};
module.exports = { getAppSecret };