
const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */


exports.handler = async (event) => {
    console.log(event);

    try {
        const {username, newEmail} = event;
        // Check if the user exists in DynamoDB
        const userExists = await getUserFromDynamoDB(username);
        if (!userExists) {
            return {
                statusCode: 400,
                body: JSON.stringify('User does not exist.'),
            };
        }

        // Update the user's email in Cognito user pool
        await updateUserEmailInCognito(username, newEmail);

        return {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            //  headers: {
            //      "Access-Control-Allow-Origin": "*",
            //      "Access-Control-Allow-Headers": "*"
            //  },
            body: JSON.stringify('User email updated successfully'),
        };
    }
    catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error' + error),
        };
    }
};

async function updateUserEmailInCognito(username, newEmail) {
    const params = {
        UserPoolId: 'us-east-1_ovqLD9Axf',
        Username: username,
        UserAttributes: [
            {
                Name: 'email',
                Value: newEmail,
            },
        ],
    };
    await cognito.adminUpdateUserAttributes(params).promise();
}

async function getUserFromDynamoDB(username) {
    const params = {
        TableName: 'Student-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            cpr: username,
        },
    };
    const { Item } = await dynamoDB.get(params).promise();
    return Item !== undefined;
}

