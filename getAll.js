/*
 * GETALL: retrieves all reading items for the user
 */
import * as dynamoDBLib from './libs/dynamodb';
import {sendResponse} from './libs/response';

export async function getAll(event, context, callback) {
    const params = {
        TableName: "readings",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": event.requestContext.authorizer.claims.sub,
        }
    };
    var queryPromise = dynamoDBLib.crud('query', params)
    queryPromise.then((res) => {
        callback(null, sendResponse(200, res.Items));
    })
    .catch((err) => {
        callback(null, sendResponse(500, {status: false}))
    });
};
