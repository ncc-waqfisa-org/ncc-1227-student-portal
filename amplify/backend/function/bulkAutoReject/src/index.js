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
    console.log('batchDetails', batchDetails);
    if (!batchDetails) {
        return {
            statusCode: 404,
            body: JSON.stringify({ message: 'Batch not found' })
        };
    }
    const updateApplicationEndDate = new Date(batchDetails.updateApplicationEndDate);

    if(today < updateApplicationEndDate) {
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Batch update period has not finished yet. Skipping auto reject' })
        };
    }

    const applications = await getApplications(batchValue);
    const universities = await getUniversities();
    const programs = await getPrograms();
    console.log('universities', universities);
    const extendedUniversities = universities.filter(university => university.isExtended);
    const exceptionUniversities = universities.filter(university => university.isException);
    await bulkUpdateApplications(batchValue, applications, extendedUniversities, exceptionUniversities, universities, programs);



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
        KeyConditionExpression: '#batch = :batchValue AND #processed = :processedValue',
        ScanIndexForward: false,
        ExpressionAttributeNames: {
            '#batch': 'batch', // Using ExpressionAttributeNames to alias the reserved keyword 'batch'
            '#processed': 'processed'
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

async function bulkUpdateApplications(batchValue, applications, extendedUniversities, exceptionUniversities, universities, programs) {
    const updatePromises = applications.map(async application => {
        let isProcessed = 1;
        // const student = await getStudent(application.studentCPR);
        const params = {
            TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
            Key: {
                id: application.id
            },
            UpdateExpression: 'set #processed = :processedValue',
            ExpressionAttributeValues: {
                ':processedValue': isProcessed
            },
            ExpressionAttributeNames: {}
        };
        const universityId = application.universityID;
        const programId = application.programID;
        const isExtended = extendedUniversities.some(university => university.id === universityId);
        const isException = exceptionUniversities.some(university => university.id === universityId);
        const isNonBahraini = application.nationalityCategory === 'NON_BAHRAINI';
        const isEligible = application.verifiedGPA? application.verifiedGPA >= programs.find(program => program.id === programId).minimumGPA: true;


        let isNotCompleted = application.status === 'NOT_COMPLETED';
        if(isException) {
            isNotCompleted = false;
        } else if(isExtended) {
            // check the date with extended deadline
            const university = extendedUniversities.find(university => university.id === universityId);
            const deadline = new Date(university.extendedTo);
            const today = new Date();
            isNotCompleted = today < deadline;
        }

        let status;

        if(isNonBahraini) {
            status = 'REJECTED';
            isProcessed = 1;
        } else if(isNotCompleted) {
            status = 'REJECTED';
            isProcessed = 1;
        }
        else if(!isNotCompleted && !isEligible && ! application.verifiedGPA) {
            status = 'REVIEW';
            isProcessed = 0;
        }
        else if(isEligible) {
            status = 'ELIGIBLE';
            isProcessed = 1;
        }
        else {
            isProcessed = 0;
        }
        // console.log('status', status);
        // console.log('isProcessed', isProcessed);
        // console.log('isNonBahraini', isNonBahraini);
        // console.log('isNotCompleted', isNotCompleted);
        // console.log('isEligible', isEligible);
        // console.log('isExtended', isExtended);
        // console.log('isException', isException);

        params.UpdateExpression = 'set #processed = :processedValue, ';

        if(status) {
            params.UpdateExpression += '#status = :status';
        }
        else{
            // remove the last comma
            params.UpdateExpression = params.UpdateExpression.slice(0, -2);
        }


        params.ExpressionAttributeValues[':status'] = status;
        params.ExpressionAttributeValues[':processedValue'] = isProcessed;

        params.ExpressionAttributeNames['#status'] = 'status';
        params.ExpressionAttributeNames['#processed'] = 'processed';


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

// async function getExtendedUniversities() {
//
//     const params = {
//         TableName: 'University-cw7beg2perdtnl7onnneec4jfa-staging',
//         IndexName: 'byExtended',
//         KeyConditionExpression: '#isExtended = :extendedValue',
//         ExpressionAttributeNames: {
//             '#isExtended': 'isExtended'
//         },
//         ExpressionAttributeValues: {
//             ':extendedValue': 1
//         }
//     };
//
//     let allUniversities = [];
//
//     do {
//         const universities = await dynamoDB.query(params).promise();
//         allUniversities = allUniversities.concat(universities.Items);
//         params.ExclusiveStartKey = universities.LastEvaluatedKey;
//     } while (params.ExclusiveStartKey);
//
//     return allUniversities;
// }
//
// async function getExceptionUniversities() {
//
//     const params = {
//         TableName: 'University-cw7beg2perdtnl7onnneec4jfa-staging',
//         IndexName: 'byException',
//         KeyConditionExpression: '#isException = :exceptionValue',
//         ExpressionAttributeNames: {
//             '#isException': 'isException'
//         },
//         ExpressionAttributeValues: {
//             ':exceptionValue': 1
//         }
//     };
//
//     let allUniversities = [];
//
//     do {
//         const universities = await dynamoDB.query(params).promise();
//         allUniversities = allUniversities.concat(universities.Items);
//         params.ExclusiveStartKey = universities.LastEvaluatedKey;
//     } while (params.ExclusiveStartKey);
//
//     return allUniversities;
// }

async function getUniversity(universityId) {
    const params = {
        TableName: 'University-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            id: universityId
        }
    };

    const university = await dynamoDB.get(params).promise();
    return university.Item;
}

async function getUniversities() {
    const params = {
        TableName: 'University-cw7beg2perdtnl7onnneec4jfa-staging'
    };

    let allUniversities = [];

    do {
        const universities = await dynamoDB.scan(params).promise();
        allUniversities = allUniversities.concat(universities.Items);
        params.ExclusiveStartKey = universities.LastEvaluatedKey;
    } while (params.ExclusiveStartKey);

    return allUniversities;
}

async function getPrograms(){
    const params = {
        TableName: 'Program-cw7beg2perdtnl7onnneec4jfa-staging'
    };

    let allPrograms = [];

    do {
        const programs = await dynamoDB.scan(params).promise();
        allPrograms = allPrograms.concat(programs.Items);
        params.ExclusiveStartKey = programs.LastEvaluatedKey;
    } while (params.ExclusiveStartKey);

    return allPrograms;
}
