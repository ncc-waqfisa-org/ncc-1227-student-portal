const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const  today = new Date();
    const batchValue = today.getFullYear();
    const batchDetails = await getBatchDetails(batchValue);
    if (!batchDetails) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Batch not found' })
        };
    }

    if(batchDetails.updateApplicationEndDate < today){
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Batch update period has not finished yet. Skipping auto reject' })
        };
    }

    const applications = await getApplications(batchValue);
    const extendedUniversities = getExtendedUniversities();
    const exceptionUniversities = getExceptionUniversities();
    await bulkUpdateApplications(batchValue, applications, extendedUniversities, exceptionUniversities);



    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify({ message: 'Applications updated' })
    };
};


async function getApplications(batch) {
    const params = {
        TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
        IndexName: 'byProcessed',
        KeyConditionExpression: '#batch = :batchValue AND processed = :processedValue',
        ScanIndexForward: false,
        ExpressionAttributeNames: {
            '#batch': 'batch' // Using ExpressionAttributeNames to alias the reserved keyword 'batch'
        },
        ExpressionAttributeValues: {
            ':batchValue': batch,
            ':processedValue': 0,
        }
    };

    let allApplications = [];

    do {
        const applications = await dynamoDB.query(params).promise();
        allApplications = allApplications.concat(applications.Items);
        params.ExclusiveStartKey = applications.LastEvaluatedKey;
    } while (params.ExclusiveStartKey);

    return allApplications;
}

async function bulkUpdateApplications(batchValue, applications, extendedUniversities, exceptionUniversities) {
    const updatePromises = applications.map(async application => {
        const student = await getStudent(application.studentCPR);
        const params = {
            TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
            Key: {
                id: application.id
            },
            UpdateExpression: 'set processed = :processedValue',
            ExpressionAttributeValues: {
                ':processedValue': 1
            }
        };
        const isNonBahraini = student.nationalityCategory === 'NON_BAHRAINI';
        const isNotCompleted = application.status === 'NOT_COMPLETED';

        if (isNonBahraini) {
            params.UpdateExpression += ', status = :statusValue';
            params.ExpressionAttributeValues[':statusValue'] = 'REJECTED';
        } else {

        }

        return dynamoDB.update(params).promise();
    });
    return Promise.all(updatePromises);
    }

async function getStudent(cpr) {
    const params = {
        TableName: 'Student-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            cpr: cpr
        }
    };

    const student = await dynamoDB.get(params).promise();
    return student.Item;
}

async function getBatchDetails(batch) {
    const params = {
        TableName: 'Batch-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            batch: batch
        }
    };

    const batchDetails = await dynamoDB.get(params).promise();
    return batchDetails.Item;
}

async function getExtendedUniversities() {

    const params = {
        TableName: 'University-cw7beg2perdtnl7onnneec4jfa-staging',
        IndexName: 'byExtended',
        KeyConditionExpression: '#isExtended = :extendedValue',
        ExpressionAttributeNames: {
            '#isExtended': 'isExtended'
        },
        ExpressionAttributeValues: {
            ':extendedValue': 1
        }
    };

    let allUniversities = [];

    do {
        const universities = await dynamoDB.query(params).promise();
        allUniversities = allUniversities.concat(universities.Items);
        params.ExclusiveStartKey = universities.LastEvaluatedKey;
    } while (params.ExclusiveStartKey);

    return allUniversities;
}

async function getExceptionUniversities() {

    const params = {
        TableName: 'University-cw7beg2perdtnl7onnneec4jfa-staging',
        IndexName: 'byException',
        KeyConditionExpression: '#isException = :exceptionValue',
        ExpressionAttributeNames: {
            '#isException': 'isException'
        },
        ExpressionAttributeValues: {
            ':exceptionValue': 1
        }
    };

    let allUniversities = [];

    do {
        const universities = await dynamoDB.query(params).promise();
        allUniversities = allUniversities.concat(universities.Items);
        params.ExclusiveStartKey = universities.LastEvaluatedKey;
    } while (params.ExclusiveStartKey);

    return allUniversities;
}

async function getAppliedToUniversities(studentId) {
    const params = {
        TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
        IndexName: 'byStudent',
        KeyConditionExpression: '#studentId = :studentId',
        ExpressionAttributeNames: {
            '#studentId': 'studentId'
        },
        ExpressionAttributeValues: {
            ':studentId': studentId
        }
    };

    let allApplications = [];

    do {
        const applications = await dynamoDB.query(params).promise();
        allApplications = allApplications.concat(applications.Items);
        params.ExclusiveStartKey = applications.LastEvaluatedKey;
    } while (params.ExclusiveStartKey);

    return allApplications;
}

