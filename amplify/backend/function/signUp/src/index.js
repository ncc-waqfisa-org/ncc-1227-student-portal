/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */


const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(event);
    try {
        const requestBody = event;
        const studentData = requestBody.student.input;
        const parentData = requestBody.parentInfo.input;
        const username = studentData.cpr;
        const email = studentData.email;
        const password = studentData.password;

        const userExists = await getUserFromDynamoDB(username);
        if (userExists) {
            return {
                statusCode: 400,
                body: JSON.stringify('User already exists.'),
            };
        }

        await saveStudentToDynamoDB(studentData);
        await saveUserToCognito(username, email, password);
        await saveParentToDynamoDB(parentData);
        return {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            //  headers: {
            //      "Access-Control-Allow-Origin": "*",
            //      "Access-Control-Allow-Headers": "*"
            //  },
            body: JSON.stringify('User created successfully'),


        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error' + error),
        };
    }
};

async function saveUserToCognito(username, email, password) {
    const params = {
        UserPoolId: 'us-east-1_ovqLD9Axf',
        Username: username,
       // TemporaryPassword: password,
        Password: password,
        UserAttributes: [
            {
                Name: 'email',
                Value: email,
            },
        ],
    };
    await cognito.adminCreateUser(params).promise();
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

async function saveStudentToDynamoDB(StudentData) {
    const params = {
        TableName: 'Student-cw7beg2perdtnl7onnneec4jfa-staging',
        Item: StudentData,
    };
    await dynamoDB.put(params).promise();
}

async function saveParentToDynamoDB(parentData) {
    const params = {
        TableName: 'ParentInfo-cw7beg2perdtnl7onnneec4jfa-staging',
        Item: parentData,
    };
    await dynamoDB.put(params).promise();
}





