const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();

const { AdminTable: ADMIN_TABLE, UserPoolId: USER_POOL_ID } = {
  AdminTable: "Admin-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  UserPoolId: "us-east-1_79xE8d6FS", // Consider moving this to environment variables
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const token = event.headers?.authorization?.slice(7);
  const isSuperAdmin = await checkIsSuperAdmin(token);
  if (!isSuperAdmin) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "Forbidden. You are not a super admin" }),
    };
  }
  // validate body
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "username is required" }),
    };
  }
  const body = JSON.parse(event.body);
  if (!body.username) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Username is required" }),
    };
  }
  // check if the user to delete is not a super admin
  const isNotSuperAdmin = await checkToDeleteAdminIsNotSuperAdmin(
    body.username
  );
  if (!isNotSuperAdmin) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Cannot delete super admin" }),
    };
  }
  // delete admin
  const result =
    (await deleteAdminFromDynamoDB(body.username)) &&
    (await deleteAdminFromCognito(body.username));
  if (result) {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Admin deleted successfully" }),
    };
  } else {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error deleting admin" }),
    };
  }

  console.log(`EVENT: ${JSON.stringify(event)}`);
};

async function checkIsSuperAdmin(token) {
  try {
    const cognitoUser = await cognito.getUser({ AccessToken: token }).promise();
    const username = cognitoUser.Username;
    console.log("Username", username);

    const params = {
      TableName: ADMIN_TABLE,
      Key: {
        cpr: username,
      },
    };
    const { Item } = await dynamoDB.get(params).promise();
    return Item && Item.role === "SUPER_ADMIN";
  } catch (error) {
    console.error("Error checking if user is admin", error);
    return false;
  }
}

async function deleteAdminFromDynamoDB(username) {
  const params = {
    TableName: ADMIN_TABLE,
    Key: {
      cpr: username,
    },
  };
  try {
    await dynamoDB.delete(params).promise();
    return true;
  } catch (error) {
    console.error("Error deleting admin", error);
    return false;
  }
}

async function deleteAdminFromCognito(username) {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: username,
  };
  try {
    await cognito.adminDeleteUser(params).promise();
    return true;
  } catch (error) {
    console.error("Error deleting admin from cognito", error);
    return false;
  }
}

async function checkToDeleteAdminIsNotSuperAdmin(username) {
  const params = {
    TableName: ADMIN_TABLE,
    Key: {
      cpr: username,
    },
  };
  try {
    const { Item } = await dynamoDB.get(params).promise();
    return Item && Item.role !== "SUPER_ADMIN";
  } catch (error) {
    console.error("Error checking if user is super admin", error);
    return false;
  }
}
