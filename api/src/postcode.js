const { response, formatPostcode } = require("./util");
const { dynamo, simple_get } = require("./db");
const tableName = process.env.TABLE_NAME;

// Todo: amend samloconfig to point to this instead of notice.js#byPostcode()
exports.query = (event, context, callback) => {
    let postcode = formatPostode(event.pathParameters.postcode);
    if (!postcode) {
        return callback(null, response(500, "Invalid postcode"));
    }
    // Todo: replace with get postcode then if no postcode get default postcode then post response
    return simple_get(event, postcode, callback);
};

exports.get = (id) => {
    let params = {
        TableName: tableName,
        Key: {
            id: ident,
            //todo sortkey hashkey
        },
    };
    return dynamo.get(params).promise();
};

exports.pushNotice = (postcode, notice) => {
    let noticeId = notice.id;
    delete notice.id;
    return this.get(postcode).then((res) => {
        if (res.Item) {
            let params = {
                TableName: tableName,
                Key: {
                    id: postcode,
                },
                UpdateExpression: "SET notices.#n = :val",
                ExpressionAttributeNames: {
                    "#n": noticeId,
                },
                ExpressionAttributeValues: {
                    ":val": notice,
                },
            };
            return dynamo.update(params).promise();
        }
        let notices = {};
        notices[noticeId] = notice;
        return this.create(id, notices);
    });
};

exports.pullNotice = (postcode, noticeId) => {
    let params = {
        TableName: tableName,
        Key: {
            id: postcode,
        },
        UpdateExpression: "REMOVE notices.#n",
        ExpressionAttributeNames: {
            "#n": noticeId,
        },
    };
    return dynamo.update(params).promise();
};

exports.create = (postcode, notices = {}) => {
    let params = {
        TableName: tableName,
        Item: {
            id: postcode,
            sortKey: "postcode",
            notices: notices,
        },
    };
    return dynamo.put({ params }).promise();
};
