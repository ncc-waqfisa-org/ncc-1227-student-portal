const AWS = require("aws-sdk");

const { AdminTable: ADMIN_TABLE } = {
  AdminTable: "Admin-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
};
const cognito = new AWS.CognitoIdentityServiceProvider();
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const token = event.headers.authorization.slice(7);
  const cognitoUser = await cognito.getUser({ AccessToken: token }).promise();
  console.log(cognitoUser);
  const username = cognitoUser.Username;
  const isAdmin = await checkIsAdmin(token);
  return {
    statusCode: 200,
    body: JSON.stringify({ isAdmin, username }),
  };
};

async function checkIsAdmin(token) {
  // get the username from the token using cognito
  try {
    const cognitoUser = await cognito.getUser({ AccessToken: token }).promise();
    const username = cognitoUser.Username;

    const params = {
      TableName: ADMIN_TABLE,
      Key: {
        cpr: username,
      },
    };
    const { Item } = await dynamoDB.get(params).promise();
    return Item !== undefined;
  } catch (error) {
    console.error("Error checking if user is admin", error);
    return false;
  }
}
