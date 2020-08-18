const { response, formatPostcode } = require("./util");
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
        const params = {
            FilterExpression: "sortkey = :input",
            ExpressionAttributeValues: { ":input": "notice" },
            ProjectionExpression: "id, notice_name, notice_default, content, postcodes"
        }
        return db.advanced_scan(event, params, callback);
    }
};

exports.delete = (event, context, callback) => {
    return db.simple_delete(event, event.pathParameters.id, callback)
}

exports.byPostcode = (event) => {
    const failed = (err) => { 
        console.log(`SCAN FAILED WITH ERROR: ${err}`);
        return createResponse(500, JSON.stringify(err))
    }

    const success = (data) => createResponse(200, JSON.stringify(data.Items.map((x) => `<notice>${x.content}</notice>`)))
    
    let pc = event.pathParameters.postcode;
    pc = formatPostcode(pc)
    const params = {
        TableName: process.env.TABLE_NAME,
        ProjectExpression: "content",
        FilterExpression:
        "sortkey = :sortkey and contains(#attribute, :input)",
        ExpressionAttributeNames: {
            "#attribute": "postcodes",
            "#sortkey": "sortkey",
        },
        ExpressionAttributeValues: { ":input": pc, ":sortkey": "notice" },
    }

    db.dynamo.scan(params).promise()
    .then((data) => {
        if (data.Count === 0) {
            const params2 = {
                TableName: process.env.TABLE_NAME,
                ProjectExpression: "Content",
                FilterExpression:
                "sortkey = :sortkey and notice_default = :def",
                ExpressionAttributeValues: { ":def": true, ":sortkey": "notice" },
            }
            return db.dynamo.scan(params2)
            .then(success)
            .catch(failed)
        }
        else return success(data)
    })
    .catch(failed)
}