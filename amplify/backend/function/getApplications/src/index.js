const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const page = parseInt(event.queryStringParameters?.page) || 1;
    const pageSize = parseInt(event.queryStringParameters?.pageSize) || 10;
    const startKey = event.queryStringParameters?.startKey || null;

    const applications = await getApplications(page, pageSize, startKey);

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify(applications)
    };
};

 async function getApplications(page, pageSize, startKey = null) {

     const params = {
         TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
         Limit: pageSize,
         ExclusiveStartKey: startKey,
         IndexName: 'byScore',
     };

     const result = await dynamoDB.scan(params).promise();
     return result.Items;
}
