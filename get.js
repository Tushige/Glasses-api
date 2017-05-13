/*
 * READ API: retrieves an existing reading item
 */
import * as dynamoDBLib from './libs/dynamodb';
import {sendResponse} from './libs/response';

export async function get(event, context, callback) {
    const params = {
        TableName: 'readingList',
        Key: {
            userId: event.requestContext.authorizer.claims.sub,
            readingId: event.pathParameters.id,
        },
    };
    var getPromise = dynamoDBLib.crud('get', params)
    getPromise.then((res) => {
        callback(null, sendResponse(200, res.Item))
    })
    .catch((err) => {
        callback(null, sendResponse(500, {status: false}))
    });
};
