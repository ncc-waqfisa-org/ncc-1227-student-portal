const AWS = require("aws-sdk");
const XLSX = require("xlsx");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const cognito = new AWS.CognitoIdentityServiceProvider();
//please rewrite all resources names on this constructor to make sure I can change it here and it changes in all the lambda function
const {
  AdminTable: ADMIN_TABLE,
  ApplicationTable: APPLICATION_TABLE,
  StudentTable: STUDENT_TABLE,
  S3Bucket: S3_BUCKET,
} = {
  AdminTable: "Admin-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  ApplicationTable: "Application-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  StudentTable: "Student-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  S3Bucket: "amplify-ncc-masterdev-2e2e0-deployment",
};
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  try {
    const token = event.headers?.authorization?.slice(7);
    const isAdmin = await checkIsAdmin(token);
    if (!isAdmin) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "Forbidden. You are not an admin" }),
      };
    }
    const batchValue =
      parseInt(event.queryStringParameters?.batch) || new Date().getFullYear();
    const applications = await getApplications(batchValue);
    const students = await getStudents(batchValue);
    const notCompletedApplications = await getNotCompletedApplications(
      applications
    );
    const signedUpButNoApplicationStudents =
      await getSignedUpButNoApplicationStudents(applications, students);
    const xlsxBuffer = jsonToXlsx([
      {
        "Total applications": applications.length,
        "Incomplete applications": notCompletedApplications.length,
        "Total Registered students": students.length,
        "Registered students without an application":
          signedUpButNoApplicationStudents.length,
      },
    ]);
    const s3Url = await uploadToS3(xlsxBuffer, batchValue);
    return {
      statusCode: 200,
      body: JSON.stringify({ url: s3Url }),
    };
  } catch (error) {
    console.error(`Error getting applications: ${error}`);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occurred" }),
    };
  }
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

async function getSignedUpButNoApplicationStudents(applications, students) {
  const noApplicationStudents = [];
  for (const student of students) {
    const application = applications.find(
      (app) => app.studentCPR === student.cpr
    );
    if (!application) {
      noApplicationStudents.push(student);
    }
  }
  return noApplicationStudents;
}

async function getApplications(batchValue) {
  const params = {
    TableName: APPLICATION_TABLE,
    IndexName: "byScore",
    KeyConditionExpression: "#batch = :batchValue AND score > :score",
    ExpressionAttributeNames: {
      "#batch": "batch",
    },
    ExpressionAttributeValues: {
      ":batchValue": batchValue,
      ":score": 0.0,
    },
    ScanIndexForward: false,
  };

  let allApplications = [];

  do {
    const applications = await dynamoDB.query(params).promise();
    allApplications = allApplications.concat(applications.Items);

    // Check if there are more items to fetch
    params.ExclusiveStartKey = applications.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  return allApplications;
}

async function getStudents(batchValue) {
  const params = {
    TableName: STUDENT_TABLE,
    // graduationDate is contained in the batch attribute
    FilterExpression: "#batch = :batchValue",
    ExpressionAttributeValues: {
      ":batchValue": batchValue,
    },
    ExpressionAttributeNames: {
      "#batch": "batch",
    },
  };
  let allStudents = [];

  do {
    const students = await dynamoDB.scan(params).promise();
    allStudents = allStudents.concat(students.Items);

    // Check if there are more items to fetch
    params.ExclusiveStartKey = students.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  return allStudents;
}

async function getNotCompletedApplications(applications) {
  const notCompletedApplications = applications.filter(
    (app) => app.status === "NOT_COMPLETED"
  );
  return notCompletedApplications;
}

async function uploadToS3(xlsxBuffer, batchValue) {
  console.log("Uploading to S3", batchValue);

  const params = {
    Bucket: S3_BUCKET,
    Key: `WebsiteStats ${batchValue}.xlsx`,
    Body: xlsxBuffer,
    ContentType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };
  await s3.upload(params).promise();

  // Return the URL of the uploaded file
  return s3.getSignedUrl("getObject", {
    Bucket: params.Bucket,
    Key: params.Key,
  });
}

function jsonToXlsx(jsonArray) {
  const worksheet = XLSX.utils.json_to_sheet(jsonArray);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
  const workbookBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "buffer",
  });

  return workbookBuffer;
}
