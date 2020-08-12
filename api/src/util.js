exports.response = (statusCode, body) => ({ statusCode, body, headers: {"Access-Control-Allow-Origin": "*"}})
