/*
 * manages building the response objects with
 *  1. proper status code
 *  2. headers
 */

export function sendResponse(statusCode, body) {
    switch(statusCode) {
        case 200:
            return buildResponse(200, body);
            break;
        case 500:
            return buildResponse(500, body);
            break;
        default:
            return buildResponse(404, {status: false});
    }
}

/*
 * helper function to build the response
 */
function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
        },
        body: JSON.stringify(body, null, 2),
    };
}
