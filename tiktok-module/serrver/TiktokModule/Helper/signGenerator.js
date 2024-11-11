const CryptoJS = require('crypto-js');

const generateSignAndTimestamp = (app_secret, path, timestamp, params, isNeedAddBody = true, body = {}) => {
    // Function to sort the object keys
    //console.log(params);
    const objKeySort = (obj) => {
        const newKey = Object.keys(obj).sort();
        const newObj = {};
        for (const key of newKey) {
            newObj[key] = obj[key];
        }
        return newObj;
    };

    var sortedObj = objKeySort(params);

    let signstring = app_secret + path

    for (var key in sortedObj) {  
        signstring = signstring + key + sortedObj[key]  
    }

    const special = isNeedAddBody ? JSON.stringify(body, null, 2) : "";
    signstring = signstring + special +  app_secret  
    console.log("sign: " + signstring)  
    // Create the HMAC SHA256 signature
    const signValue = CryptoJS.HmacSHA256(signstring, app_secret).toString();

    return { signature: signValue, timestamp: timestamp };
};

module.exports = {generateSignAndTimestamp}
