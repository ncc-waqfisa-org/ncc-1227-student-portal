/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();
const uuid = require("uuid");
const {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
  StudentTable: STUDENT_TABLE,
  ParentTable: PARENT_TABLE,
} = {
  UserPoolId: "us-east-1_79xE8d6FS",
  ClientId: "55hv3u8tffa9qml7krg9n0cfuq",
  StudentTable: "Student-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  ParentTable: "ParentInfo-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`This is event from sign up function ${event}`);
  try {
    const requestBody = JSON.parse(event.body);
    let studentData = requestBody.student.input;
    let parentData = requestBody.parentInfo?.input;
    const username = studentData?.cpr;
    let email = studentData?.email;
    const password = requestBody.password;
    const user = await getUserFromCognito(username);

    console.log(`This is user from SignUp function ${user}`);
    const userExists = !!user;
    if (userExists) {
      if (
        user.UserAttributes.find((attr) => attr.Name === "email_verified")
          .Value === "true"
      ) {
        return {
          statusCode: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          },
          isBase64Encoded: false,
          body: JSON.stringify({
            message: "User already exists",
          }),
        };
      } else {
        email = studentData.email;
        const oldStudent = await getUserFromDynamoDB(username);
        const oldParentID = oldStudent.parentInfoID;
        console.log(oldParentID, "oldParentID");
        await deleteUserFromCognito(username);
        console.log("deleted from cognito");
        await deleteUserFromDynamoDB(username);
        console.log("deleted from dynamo");
        await deleteParentFromDynamoDB(oldParentID);
        console.log("deleted parent from dynamo");

        await signUpUserToCognito(username, email, password);
        studentData.parentInfoID = await saveParentToDynamoDB(parentData);
        await saveStudentToDynamoDB(studentData);
        return {
          isBase64Encoded: false,
          statusCode: 201,
          body: JSON.stringify({
            message: "User created successfully",
          }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
          },
        };
      }
    }

    studentData.parentInfoID = await saveParentToDynamoDB(parentData);

    await saveStudentToDynamoDB(studentData, parentData);
    await signUpUserToCognito(username, email, password);

    return {
      isBase64Encoded: false,
      statusCode: 201,
      body: JSON.stringify({
        message: "User created successfully",
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
    };
  } catch (error) {
    console.error(error);
    await rollback(JSON.parse(event.body).student.input.cpr);
    return {
      statusCode: 500,
      body: JSON.stringify("Error" + error),
    };
  }
};

// 1. get functions
async function getUserFromCognito(username) {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: username,
  };
  try {
    const user = await cognito.adminGetUser(params).promise();
    return user;
  } catch (error) {
    return false;
  }
}

async function getUserFromDynamoDB(username) {
  const params = {
    TableName: STUDENT_TABLE,
    Key: {
      cpr: username,
    },
  };
  const { Item } = await dynamoDB.get(params).promise();
  console.log(Item, "Item");
  return Item;
}
async function getParentFromDynamoDB(parentID) {
  const params = {
    TableName: PARENT_TABLE,
    Key: {
      id: parentID,
    },
  };
  const { Item } = await dynamoDB.get(params).promise();
  return Item;
}

// 2. delete functions
async function deleteUserFromCognito(username) {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: username,
  };
  await cognito.adminDeleteUser(params).promise();
}
async function deleteUserFromDynamoDB(username) {
  const params = {
    TableName: STUDENT_TABLE,
    Key: {
      cpr: username,
    },
  };
  await dynamoDB.delete(params).promise();
}
async function deleteParentFromDynamoDB(parentID) {
  const params = {
    TableName: PARENT_TABLE,
    Key: {
      id: parentID,
    },
  };
  await dynamoDB.delete(params).promise();
}

// 3. save functions
async function signUpUserToCognito(username, email, password) {
  console.log(username, email, password);
  const params = {
    ClientId: CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };
  await cognito.signUp(params).promise();
}
async function saveStudentToDynamoDB(studentData, parentData) {
  studentData._version = 1;
  studentData._lastChangedAt = new Date().getTime(); // Get timestamp in milliseconds
  studentData.createdAt = new Date().toISOString(); // Get current date in ISO format
  studentData.updatedAt = new Date().toISOString(); // Get current date in ISO format

  studentData.batch = new Date().getFullYear();
  studentData.numberOfFamilyMembers = parentData.numberOfFamilyMembers;
  const params = {
    TableName: STUDENT_TABLE,
    Item: studentData,
  };
  await dynamoDB.put(params).promise();
}

async function saveParentToDynamoDB(parentData) {
  // generate a unique id for the parent
  parentData.id = uuid.v4();
  parentData._version = 1;
  parentData._lastChangedAt = new Date().getTime(); // Get timestamp in milliseconds
  parentData.createdAt = new Date().toISOString(); // Get current date in ISO format
  parentData.updatedAt = new Date().toISOString(); // Get current date in ISO format

  const params = {
    TableName: PARENT_TABLE,
    Item: parentData,
  };
  let createdItem = dynamoDB.put(params).promise();
  await createdItem;
  return parentData.id;
}

// 4. rollback function
async function rollback(username) {
  // Perform rollback operations
  // Delete the user from DynamoDB
  const userExistsDynamoDB = await getUserFromDynamoDB(username);
  if (userExistsDynamoDB) {
    await dynamoDB
      .delete({
        TableName: STUDENT_TABLE,
        Key: {
          cpr: username,
        },
      })
      .promise();
  }

  // Delete the user from Cognito
  const userExistsCognito = await getUserFromCognito(username);
  if (userExistsCognito) {
    await cognito
      .adminDeleteUser({
        UserPoolId: USER_POOL_ID,
        Username: username,
      })
      .promise();
  }
}
