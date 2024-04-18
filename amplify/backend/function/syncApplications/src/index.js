const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        // const requestBody = JSON.parse(event.body);
        const requestBody = event;
        console.log(requestBody);

        const student = requestBody.Records[0].dynamodb.NewImage;
        const oldStudent = requestBody.Records[0].dynamodb.OldImage;
        const application = await getApplication(student.cpr.S);
        if(!application) {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Application not found. Skipping update' })
            };
        }

        const applicationId = application.id;
        console.log("applicationId", applicationId);

        console.log("oldStudent", oldStudent);
        console.log("student", student);
        console.log(applicationId);

        await updateApplication(applicationId, oldStudent, student);
        console.log('Lambda executed successfully');

        return {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            //  headers: {
            //      "Access-Control-Allow-Origin": "*",
            //      "Access-Control-Allow-Headers": "*"
            //  },
            body: JSON.stringify({
                message: 'Application updated successfully'
            }),
            }

    }
    catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify('Error' + error),
        };
    }
};

async function updateApplication(applicationId, oldStudent, student) {
    // update studentName, nationalityCategory, familyIncome

const params = {
    TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
    Key: {
        id: applicationId
    },
    UpdateExpression: 'SET ',
    ExpressionAttributeValues: {}
};

if (student.fullName.S !== oldStudent.fullName.S) {
    params.UpdateExpression += 'studentName = :studentName, ';
    params.ExpressionAttributeValues[':studentName'] = student.fullName.S;
}

if (student.nationalityCategory.S !== oldStudent.nationalityCategory.S) {
    params.UpdateExpression += 'nationalityCategory = :nationalityCategory, ';
    params.ExpressionAttributeValues[':nationalityCategory'] = student.nationalityCategory.S;
}

if (student.familyIncome.S !== oldStudent.familyIncome.S) {
    const score = calculateScore(student.familyIncome.S, student.verifiedGPA?.N, student.adminPoints?.N);
    params.UpdateExpression += 'familyIncome = :familyIncome, score = :score, ';
    params.ExpressionAttributeValues[':familyIncome'] = student.familyIncome.S;
    params.ExpressionAttributeValues[':score'] = score;
}

console.log(params.UpdateExpression);
if (params.UpdateExpression === 'SET ') {
    return;
}

params.UpdateExpression = params.UpdateExpression.slice(0, -2); // Remove the last comma
await dynamoDB.update(params).promise();
}

async function getApplication(studentCPR) {
    const params = {
        TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
        IndexName: 'byCPR',
        KeyConditionExpression: 'studentCPR = :studentCPR',
        ExpressionAttributeValues: {
            ':studentCPR': studentCPR
        }
    };
    const application = await dynamoDB.query(params).promise();
    return application.Items[0];
}

function calculateScore(familyIncome, verifiedGPA, adminPoints) {
    if(!verifiedGPA) {
        return 0;
    }
    let score = verifiedGPA * 0.7;
    if (familyIncome === "LESS_THAN_1500") {
        score += 20;
    }
    else if (familyIncome === "MORE_THAN_1500") {
        score += 10;
    }

    score += adminPoints ? parseInt(adminPoints) : 0;
    return Math.round(score * 100) / 100;
}
