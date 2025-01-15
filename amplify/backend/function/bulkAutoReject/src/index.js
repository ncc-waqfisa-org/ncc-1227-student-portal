const AWS = require("aws-sdk");
const uuid = require("uuid");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const {
  ApplicationTable: APPLICATION_TABLE,
  StudentTable: STUDENT_TABLE,
  UniversityTable: UNIVERSITY_TABLE,
  ProgramTable: PROGRAM_TABLE,
  BatchTable: BATCH_TABLE,
  AdminLogTable: ADMIN_LOG_TABLE,
} = {
  ApplicationTable: "Application-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  StudentTable: "Student-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  UniversityTable: "University-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  ProgramTable: "Program-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  BatchTable: "Batch-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  AdminLogTable: "AdminLog-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const today = new Date();
  const batchValue = today.getFullYear();
  const batchDetails = await getBatchDetails(batchValue);
  console.log("batchDetails", batchDetails);
  if (!batchDetails) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Batch not found" }),
    };
  }
  const updateApplicationEndDate = new Date(
    batchDetails.updateApplicationEndDate
  );

  if (today < updateApplicationEndDate) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message:
          "Batch update period has not finished yet. Skipping auto reject",
      }),
    };
  }

  const applications = await getApplications(batchValue);
  const universities = await getUniversities();
  const programs = await getPrograms();
  console.log("universities", universities);
  const extendedUniversities = universities.filter(
    (university) => university.isExtended
  );
  const exceptionUniversities = universities.filter(
    (university) => university.isException
  );
  await bulkUpdateApplications(
    batchValue,
    applications,
    extendedUniversities,
    exceptionUniversities,
    universities,
    programs,
    batchDetails
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Applications updated" }),
  };
};

async function getApplications(batch) {
  const params = {
    TableName: APPLICATION_TABLE,
    IndexName: "byProcessed",
    KeyConditionExpression:
      "#batch = :batchValue AND #processed = :processedValue",
    ScanIndexForward: false,
    ExpressionAttributeNames: {
      "#batch": "batch",
      "#processed": "processed",
    },
    ExpressionAttributeValues: {
      ":batchValue": batch,
      ":processedValue": 0,
    },
  };

  let allApplications = [];
  do {
    const applications = await dynamoDB.query(params).promise();
    allApplications = allApplications.concat(applications.Items);
    params.ExclusiveStartKey = applications.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);

  return allApplications;
}

async function bulkUpdateApplications(
  batchValue,
  applications,
  extendedUniversities,
  exceptionUniversities,
  universities,
  programs,
  batchDetails
) {
  const updatePromises = applications.map(async (application) => {
    let isProcessed = 1;
    const params = {
      TableName: APPLICATION_TABLE,
      Key: {
        id: application.id,
      },
      UpdateExpression: "set #processed = :processedValue",
      ExpressionAttributeValues: {
        ":processedValue": isProcessed,
      },
      ExpressionAttributeNames: {},
    };
    const minimumGPA =
      programs.find((program) => program.id === application.programID)
        .minimumGPA || 88;
    const universityId = application.universityID;
    const isNonBahraini = application.nationalityCategory === "NON_BAHRAINI";
    const isEligible = application.verifiedGPA
      ? application.verifiedGPA >= minimumGPA
      : false;
    const isGpaVerified = !!application.verifiedGPA;
    console.log("isEligible", isEligible);
    console.log("Program minimum GPA:", minimumGPA);
    console.log("Application verified GPA:", application.verifiedGPA);

    let status;
    let reason = "Processed by system";
    let snapshot = "";

    if (isNonBahraini) {
      status = "REJECTED";
      isProcessed = 1;
      reason = "Student is not Bahraini";
      snapshot = "Changed from " + application.status + " to " + status;
    } else if (application.verifiedGPA && application.verifiedGPA < 88) {
      status = "REJECTED";
      isProcessed = 1;
      reason = "GPA is less than 88";
      snapshot = "Changed from " + application.status + " to " + status;
    } else if (isEligible) {
      status = "ELIGIBLE";
      isProcessed = 1;
    } else if (!isEligible && application.verifiedGPA) {
      status = "REJECTED";
      isProcessed = 1;
      reason = "GPA is less than program minimum GPA";
      snapshot = "Changed from " + application.status + " to " + status;
    } else {
      isProcessed = 0;
    }

    params.UpdateExpression = "set #processed = :processedValue, ";

    if (status) {
      params.UpdateExpression += "#status = :status";
    } else {
      // remove the last comma
      params.UpdateExpression = params.UpdateExpression.slice(0, -2);
    }

    console.log("UpdateExpression:", params.UpdateExpression);

    params.ExpressionAttributeValues[":status"] = status;
    params.ExpressionAttributeValues[":processedValue"] = isProcessed;

    params.ExpressionAttributeNames["#status"] = "status";
    params.ExpressionAttributeNames["#processed"] = "processed";

    await dynamoDB.update(params).promise();
    await createAdminLog(reason, snapshot, application.id);
  });
  return Promise.all(updatePromises);
}

async function getStudent(cpr) {
  const params = {
    TableName: STUDENT_TABLE,
    Key: {
      cpr: cpr,
    },
  };
  const student = await dynamoDB.get(params).promise();
  return student.Item;
}

async function getBatchDetails(batch) {
  const params = {
    TableName: BATCH_TABLE,
    Key: {
      batch: batch,
    },
  };
  const batchDetails = await dynamoDB.get(params).promise();
  return batchDetails.Item;
}

async function getUniversity(universityId) {
  const params = {
    TableName: UNIVERSITY_TABLE,
    Key: {
      id: universityId,
    },
  };
  const university = await dynamoDB.get(params).promise();
  return university.Item;
}

async function getUniversities() {
  const params = {
    TableName: UNIVERSITY_TABLE,
  };
  let allUniversities = [];
  do {
    const universities = await dynamoDB.scan(params).promise();
    allUniversities = allUniversities.concat(universities.Items);
    params.ExclusiveStartKey = universities.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);
  return allUniversities;
}

async function getPrograms() {
  const params = {
    TableName: PROGRAM_TABLE,
  };
  let allPrograms = [];
  do {
    const programs = await dynamoDB.scan(params).promise();
    allPrograms = allPrograms.concat(programs.Items);
    params.ExclusiveStartKey = programs.LastEvaluatedKey;
  } while (params.ExclusiveStartKey);
  return allPrograms;
}

async function createAdminLog(reason, snapshot, applicationId) {
  const id = uuid.v4();
  const params = {
    TableName: ADMIN_LOG_TABLE,
    Item: {
      id: id,
      __typename: "AdminLog",
      _version: 1,
      reason: reason,
      snapshot: snapshot,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dateTime: new Date().toISOString(),
      applicationID: applicationId,
      applicationAdminLogsId: applicationId,
      adminCPR: "999999999",
      _lastChangedAt: new Date().getTime(),
    },
  };
  await dynamoDB.put(params).promise();
}
