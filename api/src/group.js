const { response } = require('./util')
const db = require('./db')

exports.create = (event, context, callback) => {
    if (!event.body) return callback(response(400,"Expected group data not present in request body"))
}

exports.create = (event, context, callback) => {
    let now = new Date().toISOString()
    let item = {
        ...JSON.parse(event.body),
        id: event.pathParameters.id,
        doctype: "group",
        createdAt: now,
        modifiedAt: now
    };
    return db.simple_create(event, item, callback);
}

exports.get = (event, context, callback) => {
    let id = event.pathParameters ? event.pathParameters.id : null;
    if(id){
        return db.simple_get(event, event.pathParameters.id, callback);
    } else {
        return db.simple_scan(event, 'type', 'group', callback);
    }
}