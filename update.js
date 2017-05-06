/*
 * UPDATE API: updates existing reading item
 */
import * as DynamoDBLib from './libs/dynamodb';
import {sendResponse} from './libs/response';

export async function update(event, context, callback) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: "readings",
        Key: {
            "userId": event.requestContext.authorizer.claims.sub,
            "readingId": event.pathParameters.id
        },
        UpdateExpression: "set content = :content, attachment = :attachment, createdAt = :date",
        ExpressionAttributeValues: {
            ":content": data.content ? data.content:null,
            ":attachment": data.attachment ? data.attachment:null,
            ":date": new Date().getTime()
        },
        // return only the updated attributes
        ReturnValues:"UPDATED_NEW"
    };
    var updatePromise = DynamoDBLib.crud("update", params);
    updatePromise.then((res) => {
        callback(null, sendResponse(200, res));
    })
    .catch((err) => {
        callback(null, sendResponse(500,{status:false}));
    });
};
