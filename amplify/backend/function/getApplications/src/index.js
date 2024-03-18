const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const pageSize = parseInt(event.queryStringParameters?.pageSize) || 15;
    const startKey = event.queryStringParameters?.startKey || null;
    const batch = event.queryStringParameters?.batch || 2023;
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
         // Limit: pageSize,
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
         return await dynamoDB.query(params).promise();
     }
        catch (error) {
            console.error('Error getting applications', error);
            throw new Error('Error getting applications');
        }
}
