/*
 * This file saves new reading into the database
 */
import uuid from 'uuid';
import * as dynamoDBLib from './libs/dynamodb';
import {sendResponse} from './libs/response';

export async function create(event, context, callback) {
    const data = JSON.parse(event.body);

    const params = {
        TableName: 'readings',
        Item: {
            userId: event.requestContext.authorizer.claims.sub,
            readingId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: new Date().getTime(),
        },
    };
    // save reading into db
    dynamoDBLib.crud('put', params)
    .then((res) => {
        callback(null, sendResponse(200, params.Item));
    })
    .catch((err) => {
        callback(null, sendResponse(500, {status:false}));
    });
}
