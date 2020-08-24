exports.response = (statusCode, body) => ({ statusCode, body, headers: {"Access-Control-Allow-Origin": "*"}})

/* 
 * params postcodes: array - postcodes to format
 * removes blank postcodes, converts to upper case
 * and correctly formats postcodes
 */
exports.formatPostcodes = (postcodes) => {
    var filtered = postcodes.filter(Boolean).toUpperCase();
    filtered.forEach((postcode, index) => {
        filtered[index] = formatPostcode(postcode)
    });
    return filtered
}

/* 
 * params postcode: string - single postcode
 * removes non alpha numeric chatacters
 * puts the space in the correct place
 */
exports.formatPostcode = (postcode) => {
    let filtered = decodeURIComponent(postcode)
    // remove non alpha numeric chatacters
    filtered = filtered.replace(/[^0-9a-zA-Z]/g, '')
    // put the space in the correct place
    filtered = filtered.replace(/^(.*)(.{3})$/,'$1 $2')
    return filtered.toUpperCase()
}