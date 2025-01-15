const AWS = require("aws-sdk");

const { UserPoolId: USER_POOL_ID, StudentTable: STUDENT_TABLE } = {
  UserPoolId: "us-east-1_79xE8d6FS",
  StudentTable: "Student-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
};

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
  console.log(event);

  try {
    const { username, newEmail } = JSON.parse(event.body);

    const validationError = validate(username, newEmail);
    if (validationError) {
      return validationError;
    }

    // Check if the user exists in DynamoDB
    const userExists = await getUserFromDynamoDB(username);
    if (!userExists) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Bad Request",
          message: "User does not exist",
        }),
      };
    }

    const token = event.headers.authorization.slice(7);

    // Use cognito to validate the token
    try {
      const cognitoUser = await cognito
        .getUser({ AccessToken: token })
        .promise();
      console.log(cognitoUser);
      if (cognitoUser.Username !== username) {
        return {
          statusCode: 403,
          body: JSON.stringify({
            error: "Forbidden",
            message: "You are not allowed to update this user",
          }),
        };
      }
    } catch (error) {
      console.error(error);
      return {
        statusCode: 401,
        body: JSON.stringify({
          error: "Unauthorized",
          message: "Invalid token",
        }),
      };
    }

    // Update the user's email in Cognito user pool
    await updateUserEmailInCognito(username, newEmail);
    await updateStudentEmail(username, newEmail);

    return {
      statusCode: 200,
      //  Uncomment below to enable CORS requests
      //  headers: {
      //      "Access-Control-Allow-Origin": "*",
      //      "Access-Control-Allow-Headers": "*"
      //  },
      body: JSON.stringify({
        message: "Email updated successfully",
        newEmail: newEmail,
      }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal Server Error",
        message: error.message,
      }),
    };
  }
};

async function updateUserEmailInCognito(username, newEmail) {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: username,
    UserAttributes: [
      {
        Name: "email",
        Value: newEmail,
      },
    ],
  };
  await cognito.adminUpdateUserAttributes(params).promise();
}

async function getUserFromDynamoDB(username) {
  const params = {
    TableName: STUDENT_TABLE,
    Key: {
      cpr: username,
    },
  };
  const { Item } = await dynamoDB.get(params).promise();
  return Item !== undefined;
}

async function updateStudentEmail(username, newEmail) {
  const currentTime = new Date().toISOString();

  const params = {
    TableName: STUDENT_TABLE,
    Key: {
      cpr: username,
    },
    UpdateExpression: "set email = :e, updatedAt = :updatedAt",
    ExpressionAttributeValues: {
      ":e": newEmail,
      ":updatedAt": currentTime,
    },
  };

  return dynamoDB.update(params).promise();
}

function validate(username, newEmail) {
  if (!username || !newEmail) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Bad Request",
        message: "Missing required fields",
      }),
    };
  }

  // simple email validation
  if (!newEmail.includes("@")) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: "Bad Request",
        message: "Invalid email",
      }),
    };
  }
}
