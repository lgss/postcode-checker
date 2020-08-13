const { response } = require("./util");
const db = require("./db");

exports.save = (event, context, callback) => {
    reqBody = JSON.parse(event.body);
    let item = {
        ...reqBody,
        id: event.pathParameters.id,
        sortkey: "notice",
        specificity: (reqBody.postcodes || []).length,
    };
    return db.simple_create(event, item, callback);
};

exports.get = (event, context, callback) => {
    let id = event.pathParameters ? event.pathParameters.id : null;
    if (id) {
        return db.simple_get(event, event.pathParameters.id, callback);
    } else {
        return db.simple_scan(event, "sortkey", "notice", callback);
    }
};

exports.byPostcode = (event, context, callback) => {
    let pc = event.pathParameters.postcode;
    let params = {
        FilterExpression:
            "contains(#sortkey, :sortkey) and contains(#attribute, :input)",
        ExpressionAttributeNames: {
            "#attribute": "postcodes",
            "#sortkey": "sortkey",
        },
        ExpressionAttributeValues: { ":input": pc, ":sortkey": "notice" },
    };
    return db.advanced_scan(event, params, callback);
};
