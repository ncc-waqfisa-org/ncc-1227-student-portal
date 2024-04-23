const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const tableName = 'Application-cw7beg2perdtnl7onnneec4jfa-staging';


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
                body: JSON.stringify({ message: 'Forbidden. You are not an admin' })
            };
        }
        const batchValue = parseInt(event.queryStringParameters?.batch) || new Date().getFullYear();
        const selectedApplications = JSON.parse(event.body).ids || null;

        const status = event.queryStringParameters?.status || null;
        if(status && !['APPROVED', 'WITHDRAWN', 'REJECTED', 'ELIGIBLE', 'NOT_COMPLETED'].includes(status)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid status. Must be one of: APPROVED, WITHDRAWN, REJECTED, ELIGIBLE, NOT_COMPLETED' })
            };
        }
        const csv = await exportApplicationsCsv(tableName, batchValue, status, selectedApplications);


        return {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            //  headers: {
            //      "Access-Control-Allow-Origin": "*",
            //      "Access-Control-Allow-Headers": "*"
            //  },q23323
            body: JSON.stringify(
                {
                    url: csv
                }
            ),
        };
    } catch (error) {
        console.error('Error exporting applications', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error exporting applications' })
        };

    }
};

async function exportApplicationsCsv(tableName, batchValue, status, selectedApplications) {
    const applications = selectedApplications? await getSelectedApplications(tableName, batchValue, status) :  await getApplications(tableName, batchValue, status);
    const students = await getStudents(batchValue);
    const csv = convertToCsv(applications, students);
    return uploadToS3(csv);
}

async function getApplications(tableName, batchValue, status) {
    const params = {
        TableName: tableName,
        IndexName: 'byScore',
        KeyConditionExpression: '#batch = :batchValue AND score > :score',
        ExpressionAttributeNames: {
            '#batch': 'batch'
        },
        ExpressionAttributeValues: {
            ':batchValue': batchValue,
            ':score': 0.0
        },
        ScanIndexForward: false,
    };
    if(status) {
        params.FilterExpression += ' AND #status = :status';
        params.ExpressionAttributeNames['#status'] = 'status';
        params.ExpressionAttributeValues[':status'] = status;
    }

    let allApplications = [];

    do {
        const applications = await dynamoDB.query(params).promise();
        allApplications = allApplications.concat(applications.Items);

        // Check if there are more items to fetch
        params.ExclusiveStartKey = applications.LastEvaluatedKey;
    } while (params.ExclusiveStartKey);

    return allApplications;
}


function convertToCsv(applications, students) {
    let csv = 'id,StudentCPR,Name,Gender,Nationality,Specialization,Phone,email,Batch,Status,GPA,Score,SchoolName,SchoolType,FamilyIncome\n';
    applications.forEach(application => {
        const student = students.find(student => student.cpr === application.studentCPR);
        if(student) {
            csv += `${application.id},=""${application.studentCPR}"","${student?.fullName}",${student?.gender},${student?.nationalityCategory},"${student?.specialization}",${student?.phone},${student?.email},${application.batch},${application.status},${application.gpa},${application.score},"${application.schoolName}",${application.schoolType},${application.familyIncome}\n`;
        }
    });
    return csv;
}

async function uploadToS3(csv) {
    const params = {
        Bucket: 'amplify-ncc-staging-65406-deployment',
        Key: 'applications.csv',
        Body: csv
    };
    await s3.upload(params).promise();
    // return the URL of the uploaded file
    return s3.getSignedUrl('getObject', {Bucket: params.Bucket, Key: params.Key});
}

async function getStudents(batchValue) {
    // const startDate = new Date();
    // startDate.setFullYear(batchValue);
    // startDate.setMonth(0); // September
    // startDate.setDate(1); // 1st
    // const endDate = new Date();
    // endDate.setMonth(11); // December
    // endDate.setDate(31); // 31st
    const params = {
        TableName: 'Student-cw7beg2perdtnl7onnneec4jfa-staging',
        // graduationDate is contained in the batch attribute
        FilterExpression: '#batch = :batchValue',
        ExpressionAttributeValues: {
            // ':startDate': startDate.toISOString(),
            // ':endDate': endDate.toISOString()
            ':batchValue': batchValue
        },
        ExpressionAttributeNames: {
            '#batch': 'batch'
        }
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


async function getSelectedApplications(tableName, batchValue, selectedApplications) {
    const params = {
        TableName: tableName,
       IndexName: 'batch-id-index',
         KeyConditionExpression: '#batch = :batchValue AND id IN (:ids)',
            ExpressionAttributeNames: {
                '#batch': 'batch'
            },
            ExpressionAttributeValues: {
                ':batchValue': batchValue,
                ':ids': selectedApplications
            }
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

async function checkIsAdmin(token) {
    // get the username from the token using cognito
    try {
        const cognitoUser = await cognito.getUser({AccessToken: token}).promise();
        const username = cognitoUser.Username;

        const params = {
            TableName: 'Admin-cw7beg2perdtnl7onnneec4jfa-staging',
            Key: {
                cpr: username
            }
        };
        const {Item} = await dynamoDB.get(params).promise();
        return Item !== undefined;
    } catch (error) {
        console.error('Error checking if user is admin', error);
        return false;
    }
}


