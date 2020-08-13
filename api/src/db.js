const AWS = require('aws-sdk');
exports.dynamo = new AWS.DynamoDB.DocumentClient();
const {response: createResponse} = require('./util');
const tableName = process.env.TABLE_NAME;

exports.simple_create = (event, newItem, callback) => {
    return this.dynamo.put({
        TableName: tableName,
        Item: newItem
    }).promise().then(() => {
        callback(null,createResponse(201,JSON.stringify(newItem)));
    })
    .catch(err => callback(null, createResponse(err.statusCode, JSON.stringify(err))));
}

exports.simple_get = (event, ident, callback) => {

    let params = {
        TableName: tableName,
        Key: {
            id: ident
        }
    };
    
    let dbGet = (params) => { return this.dynamo.get(params).promise() };
    
    dbGet(params).then( (data) => {
        if (!data.Item) {
            callback(null, createResponse(404, `ITEM NOT FOUND FOR ${ident}`));
            return;
        }
        console.log(`RETRIEVED ITEM SUCCESSFULLY WITH doc = ${data.Item.doc}`);
        callback(null, createResponse(200, JSON.stringify(data.Item.doc)));
    }).catch( (err) => { 
        console.log(`GET ITEM FAILED FOR doc = ${params.Key.id}, WITH ERROR: ${err}`);
        callback(null, createResponse(500, JSON.stringify(err)));
    });
}

exports.get_item = (id, callback, includeId = false) => {
    let params = {
        TableName: tableName,
        Key: {
            id: id
        }
    };
    
    let dbGet = (params) => { return this.dynamo.get(params).promise() };
    
    dbGet(params).then( (data) => {
        if (!data.Item) {
            callback(null, createResponse(404, `ITEM NOT FOUND FOR ${id}`));
            return;
        }
        console.log(`RETRIEVED ITEM SUCCESSFULLY WITH data = ${data}`);
        delete data.Item.id
        callback(null, createResponse(200, JSON.stringify(data.Item)));
    }).catch( (err) => { 
        console.log(`GET ITEM FAILED FOR doc = ${params.Key.id}, WITH ERROR: ${err}`);
        callback(null, createResponse(500, JSON.stringify(err)));
    });
}

exports.simple_scan = (event, attribute, value, callback) => {

    let params = {
        TableName: tableName,
        FilterExpression: 'contains(#attribute , :input)',
        ExpressionAttributeNames: { '#attribute': attribute },
        ExpressionAttributeValues: { ':input': value },
    };
    
    let dbScan = (params) => { return this.dynamo.scan(params).promise() };
    
    dbScan(params).then( (data) => {
        callback(null, createResponse(200, JSON.stringify(data.Items)));
    }).catch( (err) => { 
        console.log(`SIMPLE SCAN FAILED WITH ERROR: ${err}`);
        callback(null, createResponse(500, JSON.stringify(err)));
    });
}
exports.advanced_scan = (event, params, callback) => {

    params.TableName = tableName;    
    let dbScan = (params) => { return this.dynamo.scan(params).promise() };
    
    dbScan(params).then( (data) => {
        callback(null, createResponse(200, JSON.stringify(data.Items)));
    }).catch( (err) => { 
        console.log(`SCAN FAILED WITH ERROR: ${err}`);
        callback(null, createResponse(500, JSON.stringify(err)));
    });
}

exports.simple_delete = (event, ident, callback) => {
    
    let params = {
        TableName: tableName,
        Key: {
            id: ident
        }
    };

    return this.dynamo.delete(params)
        .promise()
        .then(() => callback(null, createResponse(200, JSON.stringify({message: 'item deleted successful'}))))
        .catch(err => callback(null, createResponse(err.statusCode, JSON.stringify(err))))

}

exports.simple_update = (event, ident, callback) => {
    let id = ident;
    let body = JSON.parse(event.body);

    body.updates.forEach(update => {
        let paramName = update.paramName;
        let paramValue = update.paramValue;
        let params = {
            Key: {
                id: id
            },
            TableName: tableName,
            ConditionalExpression: 'attribute_exists(id)',
            UpdateExpression: 'set ' + paramName + ' = :v',
            ExpressionAttributeValues: {
                ':v': paramValue
            },
            ReturnValue: 'ALL_NEW'
        }
    
        return this.dynamo.update(params)
            .promise()
            .then(res => {
                callback(null, createResponse(200, JSON.stringify(res)))
            })
            .catch(err => callback(null, createResponse(err.statusCode, JSON.stringify(err))))
    });
}
