const axios = require('axios');
const signGenerator = require('./signGenerator');
const { response } = require('express');
const HOST = 'https://open-api.tiktokglobalshop.com';

const generateUrl = (config, endpoint, queryParams, isNeedAddBody = true, body = {}) => {
    const signature = signGenerator.generateSignAndTimestamp(
        config.appSecret,
        endpoint,
        queryParams.timestamp,
        queryParams,
        isNeedAddBody,
        body
    );
    const url = `${HOST}${endpoint}?${new URLSearchParams({
        access_token: config.accessToken,
        ...queryParams,
        sign: signature.signature,
    })}`;
    console.log("URL:" + url);
    return url;
};

const apiRequest = async (config, url, method = 'post', body = {}) => {
    const options = {
        headers: {
            'content-type': 'application/json',
            'x-tts-access-token': config.accessToken,
        },
    };

    try {
        const response = method === 'post'
            ? await axios[method](url, JSON.stringify(body, null, 2), options)
            : await axios[method](url, options);

        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        const responseErr = error.response ? error.response.data : { error: "Unknown error" };
        console.error(`Error in API request: ${error}`);
        console.log("Response Err: " + JSON.stringify(responseErr));
        return {
            success: false,
            data: responseErr
        };
    }
};
const timestamp = ()=> {
    return Math.floor(Date.now() / 1000);
}
module.exports = {timestamp, generateUrl, apiRequest };