const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

    console.log(`EVENT: ${JSON.stringify(event)}`);
    const batchValue = event.queryStringParameters?.batch || 2023;
    // await updateAllStudents(batchValue);
    const applications = await getApplications();
    await updateApplications(applications);

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify('Hello from Lambda!'),
    };
};

async function updateAllStudents(batchValue) {
    const params = {
        TableName: 'Student-cw7beg2perdtnl7onnneec4jfa-staging',
    };

    let allStudents = [];

    do {
        const students = await dynamoDB.scan(params).promise();
        allStudents = allStudents.concat(students.Items);

        // Check if there are more items to fetch
        params.ExclusiveStartKey = students.LastEvaluatedKey;
    } while (params.ExclusiveStartKey);

    for (const student of allStudents) {
        if (student.familyIncome === "LESS_THAN_500" || student.familyIncome === "BETWEEN_500_AND_700" || student.familyIncome === "BETWEEN_700_AND_1000") {
            await updateStudent(student, "LESS_THAN_1500");
        }
    }

    return allStudents;
}

async function updateStudent(student, familyIncome) {
    const params = {
        TableName: 'Student-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            cpr: student.cpr,
        },
        UpdateExpression: 'SET familyIncome = :familyIncome',
        ExpressionAttributeValues: {
            ':familyIncome': familyIncome,
        }
    };

    return dynamoDB.update(params).promise();
}

async function updateApplications(applications){
    for (const application of applications) {
        const programChoice = await getProgramChoice(application.id);

        if (programChoice) {
            const program= await getProgram(programChoice?.programID);
            programChoice.universityID = program.universityID;a
            await updateApplication(application, programChoice);
        }
    }

}

async function updateApplication(application, programChoice) {
    const params = {
        TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            id: application.id
        },
        UpdateExpression: 'SET universityID = :universityID, programID = :programID',
        ExpressionAttributeValues: {
            ':universityID': programChoice.universityID,
            ':programID': programChoice.programID
        }

    };

    if(! programChoice.universityID || ! programChoice.programID){
        console.log('No program choice for application:', application.id);
        return;
    }

    await dynamoDB.update(params).promise();
}


async function getApplications(){
    const params = {
        TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
        IndexName: 'byBatch',
        KeyConditionExpression: '#batch = :batchValue',
        ExpressionAttributeValues: {
            ':batchValue': 2023
        },
        ExpressionAttributeNames: {
            '#batch': 'batch'
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

async function getProgram(programID) {
    const params = {
        TableName: 'Program-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            id: programID
        }
    };

    const program = await dynamoDB.get(params).promise();
    return program.Item;
}
