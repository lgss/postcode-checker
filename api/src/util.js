exports.response = (statusCode, body) => ({ statusCode, body, headers: {"Access-Control-Allow-Origin": "*"}})

/* 
 * params postcodes: array of postcodes to format
 * removes blank postcodes, converts to upper case
 * and correctly formats postcodes
 */
exports.formatPostcodes = (postcodes) => {
    var filtered = postcodes.filter(Boolean).toUpperCase();
    filtered.forEach((postcode, index) => {
        filtered[index] = formatPostcode
    });
    return filtered
}

/* 
 * params postcodes: string - single postcode
 * removes non alpha numeric chatacters
 * puts the space in the correct place
 */
exports.formatPostcode = (postcode) => {
    let filtered = postcode.replace(/[^0-9a-zA-Z]/g, '').replace(/^(.*)(.{3})$/,'$1 $2')
    return filtered
}