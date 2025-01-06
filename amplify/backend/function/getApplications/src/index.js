const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const token = event.headers?.authorization?.slice(7);
    if (!token) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: 'Unauthorized!' })
        };
    }

    const isAdmin = await checkIsAdmin(token);
    if (!isAdmin) {
        return {
            statusCode: 403,
            body: JSON.stringify({ message: 'Forbidden. You are not an admin' })
        };
    }

    const pageSize = parseInt(event.queryStringParameters?.pageSize) || 30;
    let startKey = event.queryStringParameters?.startKey || null;
    if(startKey) {
        startKey = JSON.parse(startKey);
    }

    const batch = parseInt(event.queryStringParameters?.batch) || new Date().getFullYear();
    const status = event.queryStringParameters?.status || null;
    const cpr = event.queryStringParameters?.cpr || null;
    const applications = await getApplications(pageSize, startKey, batch, status, cpr);

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify(
            {
                data: applications.Items,
                nextStartKey: applications.LastEvaluatedKey
            }
        ),
    };
};

 async function getApplications(pageSize, startKey, batch, status = null, cpr= null) {

     const params = {
         TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
         Limit: pageSize,
         ExclusiveStartKey: startKey,
         IndexName: 'byScore',
         KeyConditionExpression: '#batch = :batchValue AND score > :score',
         ScanIndexForward: false,
         ExpressionAttributeNames: {
             '#batch': 'batch' // Using ExpressionAttributeNames to alias the reserved keyword 'batch'
         },
         ExpressionAttributeValues: {
             ':batchValue': batch,
             ':score': 0.0
            }
     };

     if(status) {
         params.FilterExpression = '#status = :status';
         params.ExpressionAttributeNames['#status'] = 'status';
         params.ExpressionAttributeValues[':status'] = status;
     }

     if(cpr) {
            // params.FilterExpression = '#studentCPR = :cpr';
            // params.ExpressionAttributeNames['#studentCPR'] = 'cpr';
            // params.ExpressionAttributeValues[':studentCPR'] = cpr;
            // non exact match
            params.FilterExpression = 'contains(#studentCPR, :cpr)';
            params.ExpressionAttributeNames['#studentCPR'] = 'cpr';
            params.ExpressionAttributeValues[':studentCPR'] = cpr;
        }


     try {
         const result = await dynamoDB.query(params).promise();
         // check if the result items are less than the page size, if so, call the function again with the last evaluated key
         if(result.Items.length < pageSize) {
             if(!result.LastEvaluatedKey) {
                    return result;
             }
             const remaining = pageSize - result.Items.length;
             const nextResult = await getApplications(remaining, result.LastEvaluatedKey, batch, status, cpr);
             result.Items = result.Items.concat(nextResult.Items);
             result.LastEvaluatedKey = nextResult.LastEvaluatedKey;
         }
            return result;
     }
        catch (error) {
            console.error('Error getting applications', error);
            throw new Error('Error getting applications');
        }
}

// async function getApplications(pageSize, startKey, batch, status = null, cpr = null) {
//     const params = {
//         TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
//         Limit: pageSize,
//         ExclusiveStartKey: startKey,
//         FilterExpression: '#batch = :batchValue AND score > :score',
//         ExpressionAttributeValues : {
//             ':batchValue': batch,
//             ':score': 0.0
//         },
//         ExpressionAttributeNames : {
//             '#batch': 'batch'
//         }
//     };
//
//         if (status) {
//             params.FilterExpression += ' AND #status = :status';
//             params.ExpressionAttributeNames['#status'] = 'status';
//             params.ExpressionAttributeValues[':status'] = status;
//         }
//
//         if (cpr) {
//             // For exact match
//             // params.FilterExpression += ' AND cpr = :cpr';
//             // For non-exact match
//             params.FilterExpression += ' AND contains(cpr, :cpr)';
//             params.ExpressionAttributeValues[':cpr'] = cpr;
//         }
//
//     try {
//         return await dynamoDB.scan(params).promise();
//     } catch (error) {
//         console.error('Error getting applications', error);
//         throw new Error('Error getting applications');
//     }
// }


async function checkIsAdmin(token) {
    // get the username from the token using cognito
    try {
        const cognitoUser = await cognito.getUser({AccessToken: token}).promise();
        const username = cognitoUser.Username;

        const params = {
            TableName: 'Admin-cw7beg2perdtnl7onnneec4jfa-staging',
            Key: {
                cpr: username
            }
        };
        const {Item} = await dynamoDB.get(params).promise();
        return Item !== undefined;
    } catch (error) {
        console.error('Error checking if user is admin', error);
        return false;
    }
}

