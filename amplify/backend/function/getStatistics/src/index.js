const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();

const tableName = 'Application-cw7beg2perdtnl7onnneec4jfa-staging';
const universityTableName = 'University-cw7beg2perdtnl7onnneec4jfa-staging';
const programChoiceTableName = 'ProgramChoice-cw7beg2perdtnl7onnneec4jfa-staging';

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

    const batchValue = parseInt(event.queryStringParameters?.batch) || 2024;

    try {
        const statistics = await getStatistics(batchValue);
        return {
            statusCode: 200,
            body: JSON.stringify({
                statistics
            })
        };
    } catch (error) {
        console.error('Error getting statistics', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error getting statistics' })
        };
    }
};

async function getStatistics(batchValue) {
    const params = {
        TableName: 'Statistics-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            id: batchValue
        }
    };
    const { Item } = await dynamoDB.get(params).promise();
    return Item;
}

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





