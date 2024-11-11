// utils/ResponseParser.js
class ResponseParser {
    constructor(response) {
        if (response.success)
            this.data = response.data.data;
        else
            this.data = null;
    }
}

module.exports = ResponseParser;
