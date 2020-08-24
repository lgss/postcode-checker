const { response } = require("./util");
const db = require("./db");

exports.save = (event, context, callback) => {
    body = JSON.parse(event.body);
    let item = {
        ...body,
        id: event.pathParameters.id,
        sortkey: "group",
    };
    return db.simple_create(event, item, callback);
};

exports.get = (event, context, callback) => {
    let id = event.pathParameters ? event.pathParameters.id : null;
    if (id) {
        return db.simple_get(event, event.pathParameters.id, callback);
    } else {
        return db.simple_scan(event, "sortkey", "group", callback);
    }
};

exports.delete = (event, context, callback) => {
    return db.simple_delete(event, event.pathParameters.id, callback);
}
