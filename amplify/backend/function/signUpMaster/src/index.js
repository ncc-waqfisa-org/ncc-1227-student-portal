/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();
const uuid = require("uuid");

// Make sure to replace these values with your actual IDs/Table names
const { USER_POOL_ID, CLIENT_ID, STUDENT_TABLE } = process.env;

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  try {
    // Parse the request body. We expect a single JSON object with all fields at the top-level.
    const requestBody = JSON.parse(event.body);

    /**
     * Example shape of requestBody (all fields at top level):
     * {
     *   cpr: string,
     *   password: string,
     *   cpr_doc: string,
     *   first_name: string,
     *   second_name: string,
     *   last_name: string,
     *   address: string,
     *   email: string | null,
     *   phone: string | null,
     *   gender: string | undefined,
     *   place_of_birth?: string | null,
     *   nationality: string | undefined,
     *   number_of_family_member: number,
     *   graduation_year: string,
     *   universityID: string | undefined,
     *   old_program: string,
     *   isEmployed: boolean,
     *   place_of_employment: string | null,
     *   income: string | undefined,
     *   income_doc: string,
     *   guardian_cpr: string,
     *   guardian_full_name: string,
     *   guardian_cpr_doc: string,
     *   ...
     * }
     */

    /*******************************************************
     * STEP 1: Basic validations: Ensure required fields exist
     *******************************************************/
    if (!requestBody?.cpr) {
      return {
        statusCode: 400,
        headers: getCorsHeaders(),
        body: JSON.stringify({ message: "CPR is required" }),
      };
    }
    if (!requestBody?.password) {
      return {
        statusCode: 400,
        headers: getCorsHeaders(),
        body: JSON.stringify({ message: "Password is required" }),
      };
    }

    /*******************************************************
     * STEP 2: Create a field map from incoming keys → GraphQL schema keys
     *******************************************************/
    const fieldMap = {
      cpr_doc: "cprDoc",
      first_name: "m_firstName",
      second_name: "m_secondName",
      last_name: "m_lastName",
      number_of_family_member: "m_numberOfFamilyMembers",
      graduation_year: "m_graduationYear",
      universityID: "m_universityID",
      old_program: "m_oldProgram", // If you plan to remove this field later, keep it until it's no longer needed in the schema
      isEmployed: "m_isEmployeed",
      place_of_employment: "m_placeOfEmployment",
      income: "m_income",
      income_doc: "m_incomeDoc",
      guardian_cpr: "m_guardianCPR",
      guardian_full_name: "m_guardianFullName",
      guardian_cpr_doc: "m_guardianCPRDoc",
    };

    /*******************************************************
     * STEP 3: Transform incoming data into Student schema shape
     *******************************************************/
    const studentData = {
      // Fields that don't need renaming:
      cpr: requestBody.cpr?.trim(),
      email: requestBody.email?.trim() || null,
      phone: requestBody.phone?.trim() || null,
      gender: requestBody.gender, // If you have an enum, you might do an enum validation here
      placeOfBirth: requestBody.place_of_birth?.trim() || null,
      nationality: requestBody.nationality?.trim() || null,
      address: requestBody.address?.trim() || null,
    };

    // Copy fields using the fieldMap
    Object.entries(fieldMap).forEach(([incomingKey, schemaKey]) => {
      if (requestBody[incomingKey] !== undefined) {
        const val = requestBody[incomingKey];
        studentData[schemaKey] = typeof val === "string" ? val.trim() : val;
      }
    });

    // Hardcode applicant type as "MASTER" in your data:
    studentData.m_applicantType = ["MASTER"];

    // Store password separately (not in DynamoDB)
    const password = requestBody.password?.trim();

    /*******************************************************
     * STEP 4: Validate the presence of required fields for Master students
     *******************************************************/
    const requiredFieldsForMaster = [
      "cpr",
      "m_firstName",
      "m_secondName",
      "m_lastName",
      "m_guardianCPR",
      "m_income",
      "m_incomeDoc",
    ];

    const missingFields = requiredFieldsForMaster.filter(
      (field) => !studentData[field] && studentData[field] !== false
    );

    if (missingFields.length > 0) {
      return {
        statusCode: 400,
        headers: getCorsHeaders(),
        body: JSON.stringify({
          message: `Missing required field(s): ${missingFields.join(", ")}`,
        }),
      };
    }

    // For Cognito username, we will use CPR
    const username = studentData.cpr;

    /*******************************************************
     * STEP 5: Check if user already exists in Cognito
     *******************************************************/
    const existingUser = await getUserFromCognito(username);
    const userExists = !!existingUser;

    if (userExists) {
      // If user is verified in Cognito, disallow
      const emailVerifiedAttr = existingUser.UserAttributes.find(
        (attr) => attr.Name === "email_verified"
      );
      if (emailVerifiedAttr?.Value === "true") {
        return {
          statusCode: 400,
          headers: getCorsHeaders(),
          body: JSON.stringify({ message: "User already exists" }),
        };
      } else {
        // If user is unverified, delete them from both Cognito & Dynamo to recreate
        await deleteUserFromCognito(username);
        await deleteUserFromDynamoDB(username);
      }
    }

    /*******************************************************
     * STEP 6: Insert the record into DynamoDB
     *******************************************************/
    const now = new Date();
    studentData._version = 1;
    studentData._lastChangedAt = now.getTime();
    studentData.createdAt = now.toISOString();
    studentData.updatedAt = now.toISOString();

    await saveStudentToDynamoDB(studentData);

    /*******************************************************
     * STEP 7: Sign up user in Cognito with password & optional email
     *******************************************************/
    await signUpUserToCognito(username, studentData.email, password);

    /*******************************************************
     * STEP 8: Return success response
     *******************************************************/
    return {
      statusCode: 201,
      headers: getCorsHeaders(),
      body: JSON.stringify({ message: "Master student created successfully" }),
    };
  } catch (error) {
    console.error("ERROR:", error);

    // Rollback if partial insertion happened
    try {
      const parsedBody = JSON.parse(event.body);
      if (parsedBody && parsedBody.cpr) {
        await rollback(parsedBody.cpr);
      }
    } catch (rollbackError) {
      console.error("Rollback error:", rollbackError);
    }

    return {
      statusCode: 500,
      headers: getCorsHeaders(),
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

/*******************************************************
 *                     HELPERS                         *
 *******************************************************/

/**
 * Get common CORS headers for returning responses
 */
function getCorsHeaders() {
  return {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
  };
}

/**
 * Checks Cognito for a user. Returns user if found, false if not found/404.
 */
async function getUserFromCognito(username) {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: username,
  };
  try {
    return await cognito.adminGetUser(params).promise();
  } catch (error) {
    // If user doesn't exist or is not found, Cognito throws an error
    // We can safely return false here
    return false;
  }
}

/**
 * Deletes user from Cognito
 */
async function deleteUserFromCognito(username) {
  const params = {
    UserPoolId: USER_POOL_ID,
    Username: username,
  };
  await cognito.adminDeleteUser(params).promise();
}

/**
 * Deletes user from DynamoDB by CPR
 */
async function deleteUserFromDynamoDB(username) {
  const params = {
    TableName: STUDENT_TABLE,
    Key: { cpr: username },
  };
  await dynamoDB.delete(params).promise();
}

/**
 * Saves a student record to your DynamoDB table
 */
async function saveStudentToDynamoDB(studentData) {
  const params = {
    TableName: STUDENT_TABLE,
    Item: studentData,
  };
  await dynamoDB.put(params).promise();
}

/**
 * Signs up user in Cognito using provided username, email, and password
 */
async function signUpUserToCognito(username, email, password) {
  // Build user attributes array
  const userAttributes = [];
  if (email) {
    userAttributes.push({ Name: "email", Value: email });
  }

  const params = {
    ClientId: CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: userAttributes,
  };
  await cognito.signUp(params).promise();
}

/**
 * Gets a user from DynamoDB by CPR
 */
async function getUserFromDynamoDB(username) {
  const params = {
    TableName: STUDENT_TABLE,
    Key: { cpr: username },
  };
  const { Item } = await dynamoDB.get(params).promise();
  return Item;
}

/**
 * Rollback logic: removes user from DynamoDB and Cognito if they exist
 */
async function rollback(username) {
  // Check if DynamoDB user exists
  const userExistsDynamoDB = await getUserFromDynamoDB(username);
  if (userExistsDynamoDB) {
    await dynamoDB
      .delete({
        TableName: STUDENT_TABLE,
        Key: { cpr: username },
      })
      .promise();
  }

  // Check if Cognito user exists
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
