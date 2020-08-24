const { response } = require('./util')

exports.query = (event, context, callback) => {
    let postcode = event.pathParameters.postcode
    if (!postcode) {
        return callback(null, response(500, "Invalid postcode"))
    }
    return callback(null, response(200, "Success"))
}