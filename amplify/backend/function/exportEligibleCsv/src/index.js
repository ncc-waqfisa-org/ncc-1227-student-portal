/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */


exports.handler = async (event) => {
    const token = event.headers?.authorization?.slice(7);
    const isAdmin = await checkIsAdmin(token);
    if (!isAdmin) {
        return {
            statusCode: 403,
            body: JSON.stringify({ message: 'Forbidden. You are not an admin' })
        };
    }

    const batchValue = parseInt(event.queryStringParameters?.batch) || new Date().getFullYear();
    const exceptionUniversities = await getExceptionUniversities();
    const extendedUniversities = await getExtendedUniversities();
    const batchDetails = await getBatchDetails(batchValue);

    console.log('Universities:', exceptionUniversities);
    console.log(`EVENT: ${JSON.stringify(event)}`);

    try {
        const applications = await getApplications('Application-cw7beg2perdtnl7onnneec4jfa-staging', batchValue, exceptionUniversities,
        extendedUniversities, batchDetails);
        const csv = await convertToCsv(applications);
        const url = await uploadToS3(csv);
        return {
            statusCode: 200,
            body: JSON.stringify({url})
        };
    }
    catch (error) {
        console.error('Error exporting applications', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error exporting applications' })
        };
    }
};

async function getApplications(tableName, batchValue, exceptionUniversities, extendedUniversities, batchDetails) {
    // const programs = await getPrograms();
    const params = {
        TableName: tableName,
        IndexName: 'byNationalityCategory',
        KeyConditionExpression: '#batch = :batchValue AND nationalityCategory = :nationalityCategory',
        ExpressionAttributeNames: {
            '#batch': 'batch'
        },
        ExpressionAttributeValues: {
            ':batchValue': batchValue,
            ':nationalityCategory': 'BAHRAINI'
        },
    };

    let allApplications = [];

    do {
        const applications = await dynamoDB.query(params).promise();
        allApplications = allApplications.concat(applications.Items);

        // Check if there are more items to fetch
        params.ExclusiveStartKey = applications.LastEvaluatedKey;
    } while (params.ExclusiveStartKey);

    // Remove the NOT_COMPLETED application unless the university is an exception]

    allApplications = allApplications.filter(application => {
        // Filter out rejected applications
        if (application.status === 'REJECTED' || application.status === 'WITHDRAWN') {
            return false;
        }
        // Filter out not completed applications unless they are from exception or extended universities
        if (application.status === 'NOT_COMPLETED') {
            // return exceptionUniversities.some(university => university.id === application.universityID)
            //     || extendedUniversities.some(university => university.id === application.universityID);
            if(exceptionUniversities.some(university => university.id === application.universityID)){
                return true;
            }
            if (extendedUniversities.some(university => university.id === application.universityID)) {
                // Check if today is before the extended deadline
                const today = new Date();
                const chosenUniversity = extendedUniversities.find(university => university.id === application.universityID);

                const updateApplicationEndDate = batchDetails.updateApplicationEndDate;

                const [year, month, day] = updateApplicationEndDate.split('-').map(Number);

                let deadline = new Date(year, month - 1, day);

                deadline.setDate(deadline.getDate() + chosenUniversity.extensionDuration);

                console.log('Today:', today);
                console.log('Deadline:', deadline);
                console.log('Is today before deadline:', today <= deadline);

                return today <= deadline;
            }
            return false;
        }
        // Keep all other applications
        return true;
    });


    return allApplications;
}


async function convertToCsv(applications) {
    // TODO: REMOVE THE Status, UniversityID, ProgramID from the CSV
    // let csv = 'StudentCPR,GPA,verifiedGPA,Status,University\n';
    let csv = 'StudentCPR,GPA,verifiedGPA\n';
    for (const application of applications) {
        // let university = application.universityID? await getUniversity(application.universityID): {name: 'UNKNOWN'};
        // csv += `=""${application.studentCPR}"",${application.gpa},PLEASE VERIFY,${application.status},${university?.name}\n`;
        csv += `=""${application.studentCPR}"",${application.gpa},PLEASE VERIFY\n`;

    }
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
    } while (params.ExclusiveStartKey)

    return allUniversities;
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
    console.log('Extended Universities:', allUniversities);

    return allUniversities;
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

// async function getPrograms() {
//     const params = {
//         TableName: 'Program-cw7beg2perdtnl7onnneec4jfa-staging',
//     };
//
//     let allPrograms = [];
//
//     do {
//         const programs = await dynamoDB.scan(params).promise();
//         allPrograms = allPrograms.concat(programs.Items);
//         params.ExclusiveStartKey = programs.LastEvaluatedKey;
//     } while (params.ExclusiveStartKey);
//
//     return allPrograms;
// }
//

// async function getUniversity(universityID) {
//     const params = {
//         TableName: 'University-cw7beg2perdtnl7onnneec4jfa-staging',
//         Key: {
//             id: universityID
//         }
//     };
//
//     const university = await dynamoDB.get(params).promise();
//     return university.Item;
// }


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

