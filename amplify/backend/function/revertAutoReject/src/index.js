const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const rejectedApplications = await getRejectedApplications();
    const universities = await getUniversities();
    const exceptionUniversities = universities.filter(university => university.isException);

    await processRejectedApplications(rejectedApplications, exceptionUniversities);
    return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
};

async function getRejectedApplications() {
    const batchValue = 2024;
    const params = {
        TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
        IndexName: 'byStatus',
        KeyConditionExpression: '#status = :statusValue and #batch = :batchValue',
        ExpressionAttributeNames: {
            '#status': 'status',
            '#batch': 'batch'
        },
        ExpressionAttributeValues: {
            ':statusValue': 'NOT_COMPLETED',
            ':batchValue': batchValue
        }
    };
    const { Items } = await dynamoDB.query(params).promise();
    return Items;
}


async function revertAutoReject(applicationId, status) {
    const params = {
        TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            id: applicationId
        },
        UpdateExpression: 'set #status = :status, #processed = :isProcessed',
        ExpressionAttributeNames: {
            '#status': 'status',
            '#processed': 'processed'
        },
        ExpressionAttributeValues: {
            ':status': status,
            ':isProcessed': 0
        }
    };
    await dynamoDB.update(params).promise();
}

async function processRejectedApplications(rejectedApplications,extendedUniversities) {
    for (const application of rejectedApplications) {
        const { id, attachmentID } = application;
        const attachment = await getAttachment(attachmentID);
        const programChoice = await getProgramChoice(id);
        const universityID = application.universityID;
        const university = extendedUniversities.find(u => u.id === universityID);

        let status = "NOT_COMPLETED";
        const schoolCertificate = attachment?.schoolCertificate;
        const transcript = attachment?.transcriptDoc;
        const acceptanceLetter = programChoice?.acceptanceLetterDoc;

        if (schoolCertificate && transcript && acceptanceLetter) {
            status = "REVIEW";
        }
        if (university) {
            status = "REVIEW";
        }

        await revertAutoReject(id, status);
    }
}

async function getAttachment(attachmentId) {
    const params = {
        TableName: 'Attachment-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            id: attachmentId
        }
    };

    const attachment = await dynamoDB.get(params).promise();
    return attachment.Item;
}

async function getProgramChoice(applicationId) {
    const indexName = 'applicationID-index';
    const params = {
        TableName: 'ProgramChoice-cw7beg2perdtnl7onnneec4jfa-staging',
        IndexName: indexName,
        KeyConditionExpression: 'applicationID = :applicationID',
        ExpressionAttributeValues: {
            ':applicationID': applicationId
        }
    };

    const programChoice = await dynamoDB.query(params).promise();
    return programChoice.Items[0];
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
