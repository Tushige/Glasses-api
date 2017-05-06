import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-west-2'
});

/*
 * Functions return the 'promise' form of the DynamoDB methods
 */
export function crud(op, params) {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    switch(op) {
        case 'put':
            return put(dynamoDB, params);
            break;
        case 'get':
            return get(dynamoDB, params);
            break;
        case 'update':
            return update(dynamoDB, params);
            break;
        case 'delete':
            return deleteItem(dynamoDB, params);
            break;
        case 'query':
            return query(dynamoDB, params);
            break;
        default:
            return Promise.reject(new Error('invalid operation ' + op));
    }
}

// READ
function get(dynamoDB, params) {
    return dynamoDB.get(params).promise();
}

// CREATE
function put(dynamoDB, params) {
    return dynamoDB.put(params).promise();
}

// UPDATE
function update(dynamoDB, params) {
    return dynamoDB.update(params).promise();
}

// DELETE
function deleteItem(dynamoDB, params) {
    return dynamoDB.delete(params).promise();
}

// QUERY
function query(dynamoDB, params) {
    return dynamoDB.query(params).promise();
}
