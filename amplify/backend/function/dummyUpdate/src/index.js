const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

    console.log(`EVENT: ${JSON.stringify(event)}`);
    const batchValue = event.queryStringParameters?.batch || 2023;
    await updateAllStudents(batchValue);
    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('Hello from Lambda!'),
    };
};

async function updateAllStudents(batchValue) {
    const params = {
        TableName: 'Student-cw7beg2perdtnl7onnneec4jfa-staging',
    };

    let allStudents = [];

    do {
        const students = await dynamoDB.scan(params).promise();
        allStudents = allStudents.concat(students.Items);

        // Check if there are more items to fetch
        params.ExclusiveStartKey = students.LastEvaluatedKey;
    } while (params.ExclusiveStartKey);

    for (const student of allStudents) {
        await updateStudent(student, batchValue);
    }

    return allStudents;
}

async function updateStudent(student, batchValue) {
    const params = {
        TableName: 'Student-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            cpr: student.cpr,
        },
        UpdateExpression: 'SET #batch = :batch',
        ExpressionAttributeValues: {
            ':batch': batchValue,
        },
        ExpressionAttributeNames: {
            '#batch': 'batch',
        },
    };

    return dynamoDB.update(params).promise();
}
