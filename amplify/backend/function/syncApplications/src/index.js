const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        // const requestBody = JSON.parse(event.body);
        const requestBody = event.Records[0];
        console.log(requestBody);
        console.log(requestBody.eventName);
        if(requestBody.eventName !== 'MODIFY') {
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'No changes detected. Skipping update' })
            };
        }

        const student = requestBody.dynamodb.NewImage;
        const oldStudent = requestBody.dynamodb.OldImage;
        console.log(student, oldStudent);
        const application = await getApplication(student.cpr.S);
        console.log(application);
        if(!application) {
            console.log('Application not found. Skipping update');
            return {
                statusCode: 200,
                body: JSON.stringify({ message: 'Application not found. Skipping update' })
            };
        }


        console.log("oldStudent", oldStudent);
        console.log("student", student);

        await updateApplication(application, oldStudent, student);
        console.log('Lambda executed successfully');

        return {
            statusCode: 200,
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

async function updateApplication(application, oldStudent, student) {
    // update studentName, nationalityCategory, familyIncome

const params = {
    TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
    Key: {
        id: application.id
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
    const score = calculateScore(student.familyIncome.S, application.verifiedGPA,application.gpa ,application.adminPoints);
    console.log('Score:', score, student.familyIncome.S, application.verifiedGPA,application.gpa ,application.adminPoints);
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

function calculateScore(familyIncome, verifiedGPA, gpa, adminPoints) {
    let score = verifiedGPA? verifiedGPA * 0.7 : gpa * 0.7;
    if (familyIncome === "LESS_THAN_1500" || familyIncome === "BETWEEN_500_AND_700" || familyIncome === "BETWEEN_700_AND_1000" || familyIncome === "LESS_THAN_500") {
        score += 20;
    }
    else if (familyIncome === "MORE_THAN_1500") {
        score += 10;
    }

    score += adminPoints ? parseInt(adminPoints) : 0;
    return Math.round(score * 100) / 100;
}

