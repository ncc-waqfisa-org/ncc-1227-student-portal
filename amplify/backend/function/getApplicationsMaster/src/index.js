const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();

// Environment variables
const { MasterApplicationTable: APPLICATION_TABLE, AdminTable: ADMIN_TABLE } = {
  MasterApplicationTable:
    "MasterApplication-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  AdminTable: "Admin-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
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

  const pageSize = parseInt(event.queryStringParameters?.pageSize) || 30;
  let startKey = event.queryStringParameters?.startKey || null;
  if (startKey) {
    startKey = JSON.parse(startKey);
  }

  const batch =
    parseInt(event.queryStringParameters?.batch) || new Date().getFullYear();
  const status = event.queryStringParameters?.status || null;
  const cpr = event.queryStringParameters?.cpr || null;
  if (cpr) {
    // must be 9 digits
    if (cpr.length !== 9 || isNaN(cpr)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Invalid CPR" }),
      };
    }
  }
  const applications = cpr
    ? await getApplicationsByCPR(cpr, batch)
    : await getApplications(pageSize, startKey, batch, status);

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: applications.Items,
      nextStartKey: applications.LastEvaluatedKey,
    }),
  };
};

//we migth change this
async function getApplications(pageSize, startKey, batch, status = null) {
  const params = {
    TableName: APPLICATION_TABLE,
    Limit: pageSize,
    ExclusiveStartKey: startKey,
    IndexName: "byMasterScore",
    KeyConditionExpression: "#batch = :batchValue AND score >= :score",
    ScanIndexForward: false,
    ExpressionAttributeNames: {
      "#batch": "batch",
    },
    ExpressionAttributeValues: {
      ":batchValue": batch,
      ":score": 0.0,
    },
  };

  if (status) {
    params.FilterExpression = "#status = :status";
    params.ExpressionAttributeNames["#status"] = "status";
    params.ExpressionAttributeValues[":status"] = status;
  }

  try {
    const result = await dynamoDB.query(params).promise();
    if (result.Items.length < pageSize) {
      if (!result.LastEvaluatedKey) {
        return result;
      }
      const remaining = pageSize - result.Items.length;
      const nextResult = await getApplications(
        remaining,
        result.LastEvaluatedKey,
        batch,
        status
      );
      result.Items = result.Items.concat(nextResult.Items);
      result.LastEvaluatedKey = nextResult.LastEvaluatedKey;
    }
    return result;
  } catch (error) {
    console.error("Error getting applications", error);
    throw new Error("Error getting applications");
  }
}

//We might change this
async function getApplicationsByCPR(cpr, batch) {
  const params = {
    TableName: APPLICATION_TABLE,
    IndexName: "byMasterStudentCPR",
    KeyConditionExpression: "studentCPR = :cpr",
    FilterExpression: "#batch = :batchValue",
    ExpressionAttributeNames: {
      "#batch": "batch",
    },
    ExpressionAttributeValues: {
      ":cpr": cpr,
      ":batchValue": batch,
    },
  };

  try {
    const result = await dynamoDB.query(params).promise();
    return result;
  } catch (error) {
    console.error("Error getting application by CPR", error);
    throw new Error("Error getting application by CPR");
  }
}

async function checkIsAdmin(token) {
  try {
    const cognitoUser = await cognito.getUser({ AccessToken: token }).promise();
    const username = cognitoUser.Username;
    console.log(`The user name from cognito: ${username}`);

    const params = {
      TableName: ADMIN_TABLE,
      Key: {
        cpr: username,
      },
    };
    const { Item } = await dynamoDB.get(params).promise();
    console.log(`Item get from the admin table ${Item}`);
    return Item !== undefined;
  } catch (error) {
    console.error("Error checking if user is admin", error);
    return false;
  }
}
