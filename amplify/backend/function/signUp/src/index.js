/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */


const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();
const uuid = require('uuid');


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(event);


    try {
        const requestBody = JSON.parse(event.body);
        const studentData = requestBody.student.input;
        const parentData = requestBody.parentInfo.input;
        const username = studentData.cpr;
        const email = studentData.email;
        const password = requestBody.password;

        const userExists = await getUserFromDynamoDB(username) || await getUserFromCognito(username);
        if (userExists) {
            return {
                "statusCode": 400,
                "headers": {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Headers": "*",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
                },
                "isBase64Encoded": false,
                "body": JSON.stringify(
                    {
                    "message": "User already exists",
                    },
                ),
            };
        }

        parentData._version = 1;
        parentData._lastChangedAt = new Date().getTime(); // Get timestamp in milliseconds
        parentData.createdAt = new Date().toISOString(); // Get current date in ISO format
        parentData.updatedAt = new Date().toISOString(); // Get current date in ISO format

        studentData.parentInfoID = await saveParentToDynamoDB(parentData);
        studentData._version = 1;
        studentData._lastChangedAt = new Date().getTime(); // Get timestamp in milliseconds
        studentData.createdAt = new Date().toISOString(); // Get current date in ISO format
        studentData.updatedAt = new Date().toISOString(); // Get current date in ISO format

        await saveStudentToDynamoDB(studentData);
        await signUpUserToCognito(username, email, password);

        return {
            "isBase64Encoded": false,
            "statusCode": 201,
            "body": JSON.stringify(
{
                    "message": "User created successfully",
                    },
            ),
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
           "message": "User created successfully",



        };
    } catch (error) {
        console.error(error);
        await rollback(JSON.parse(event.body).student.input.cpr);
        return {
            "statusCode": 500,
            "body": JSON.stringify('Error' + error),
        };
    }
};

async function signUpUserToCognito(username, email, password) {
    console.log(username, email, password);
    const params = {
        ClientId: '41ci7tn8aleem14rrr5gs7tkbs',
        Username: username,
        Password: password,
        UserAttributes: [
            {
                Name: 'email',
                Value: email,
            },
        ],
    };
    await cognito.signUp(params).promise();
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
    // generate a unique id for the parent
    parentData.id = uuid.v4();
    const params = {
        TableName: 'ParentInfo-cw7beg2perdtnl7onnneec4jfa-staging',
        Item: parentData,
    };
    let createdItem = dynamoDB.put(params).promise();
    await createdItem;
    return parentData.id;

}


async function rollback(username) {
    // Perform rollback operations
    // Delete the user from DynamoDB
    const userExistsDynamoDB = await getUserFromDynamoDB(username);
    if (userExistsDynamoDB) {
        await dynamoDB.delete({
            TableName: 'Student-cw7beg2perdtnl7onnneec4jfa-staging',
            Key: {
                cpr: username,
            },
        }).promise();
    }

    // Delete the user from Cognito
    const userExistsCognito = await getUserFromCognito(username);
    if (userExistsCognito) {
        await cognito.adminDeleteUser({
            UserPoolId: 'us-east-1_ovqLD9Axf',
            Username: username,
        }).promise();
    }
}

async function getUserFromCognito(username) {
    const params = {
        UserPoolId: 'us-east-1_ovqLD9Axf',
        Username: username,
    };
    try {
        const user = await cognito.adminGetUser(params).promise();
        return user !== undefined;
    } catch (error) {
        return false;
    }
}





