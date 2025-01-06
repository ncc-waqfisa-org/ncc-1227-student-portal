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
        const batchValue = parseInt(event.queryStringParameters?.batch) || 2024;
        const status = event.queryStringParameters?.status || null;
        if(status && !['APPROVED', 'WITHDRAWN', 'REJECTED', 'ELIGIBLE', 'NOT_COMPLETED'].includes(status)) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid status. Must be one of: APPROVED, WITHDRAWN, REJECTED, ELIGIBLE, NOT_COMPLETED' })
            };
        }
        const csv = await exportApplicationsCsv(tableName, batchValue, status);



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

async function exportApplicationsCsv(tableName, batchValue, status) {
    const applications = await getApplications(tableName, batchValue, status);
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
            csv += `${application.id},${application.studentCPR},"${student?.fullName}",${student?.gender},${student?.nationalityCategory},"${student?.specialization}",${student?.phone},${student?.email},${application.batch},${application.status},${application.gpa},${application.score},"${application.schoolName}",${application.schoolType},${application.familyIncome}\n`;
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
    const startDate = new Date();
    startDate.setFullYear(batchValue);
    startDate.setMonth(0); // September
    startDate.setDate(1); // 1st
    const endDate = new Date();
    endDate.setMonth(11); // December
    endDate.setDate(31); // 31st
    const params = {
        TableName: 'Student-cw7beg2perdtnl7onnneec4jfa-staging',
        // graduationDate is contained in the batch attribute
        FilterExpression: 'graduationDate BETWEEN :startDate AND :endDate',
        ExpressionAttributeValues: {
            ':startDate': startDate.toISOString(),
            ':endDate': endDate.toISOString()
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


