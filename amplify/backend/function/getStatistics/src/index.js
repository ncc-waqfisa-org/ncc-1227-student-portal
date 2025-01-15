const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();

const {
  //   ApplicationTable: APPLICATION_TABLE,
  //   UniversityTable: UNIVERSITY_TABLE,
  //   ProgramChoice: PROGRAM_CHOICE_TABLE,
  StatisticsTable: STATISTICS_TABLE,
  AdminTable: ADMIN_TABLE,
} = {
  //   ApplicationTable: "Application-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  //   UniversityTable: "University-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  //   ProgramChoice: "ProgramChoice-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  StatisticsTable: "Statistics-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  AdminTable: "Admin-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
};

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const token = event.headers?.authorization?.slice(7);
  if (!token) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Unauthorized!" }),
    };
  }

  const isAdmin = await checkIsAdmin(token);
  if (!isAdmin) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "Forbidden. You are not an admin" }),
    };
  }

  const batchValue = parseInt(event.queryStringParameters?.batch) || 2024;

  try {
    const statistics = await getStatistics(batchValue);
    return {
      statusCode: 200,
      body: JSON.stringify({
        statistics,
      }),
    };
  } catch (error) {
    console.error("Error getting statistics", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error getting statistics" }),
    };
  }
};

async function getStatistics(batchValue) {
  const params = {
    TableName: STATISTICS_TABLE,
    Key: {
      id: batchValue,
    },
  };
  const { Item } = await dynamoDB.get(params).promise();
  return Item;
}

async function checkIsAdmin(token) {
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
