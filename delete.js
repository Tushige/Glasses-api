/*
 * DELETE API: deletes a selected reading from the list
 */
import * as dynamoDBLib from './libs/dynamodb';
import {sendResponse} from './libs/response';

export function deleteItem(event, context, callback) {
    const params = {
        TableName: "readings",
        Key: {
            "userId": event.requestContext.authorizer.claims.sub,
            "readingId": event.pathParameters.id,
        },
    };
    var deletePromise = dynamoDBLib.crud('delete', params);
    deletePromise.then((res) => {
        callback(null, sendResponse(200, {status:true}));
    })
    .catch((err) => {
        callback(null, sendResponse(500, {status:false}));
    })
};
