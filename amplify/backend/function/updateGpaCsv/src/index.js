const AWS = require('aws-sdk');
const csv = require('csv-parser');
const cognito = new AWS.CognitoIdentityServiceProvider();
const lambda = new AWS.Lambda();

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const tableName = 'Application-cw7beg2perdtnl7onnneec4jfa-staging';


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    const token = event.headers?.authorization?.slice(7);
    if (!token) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: 'Unauthorized!' })
        };
    }

    const isAdmin = await checkIsAdmin(token);
    if (!isAdmin) {
        return {
            statusCode: 403,
            body: JSON.stringify({ message: 'Forbidden. You are not an admin' })
        };
    }

    // const csvData = JSON.parse(event.body).csv;
    const csvData = event.body;
    if(!csvData){
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing required parameters, csv' })
        };
    }

    const batchValue = parseInt(event.queryStringParameters?.batch) || 2024;
    const applications = await getApplications(batchValue);
    const dataStream = processCsv(csvData, applications);
    try {
        await bulkUpdateApplications(tableName, batchValue, dataStream);
        // invoke the autoReject lambda function
        const params = {
            FunctionName: 'bulkAutoReject-staging',
            InvocationType: 'Event',
            Payload: JSON.stringify({batch: batchValue})
        };
        await lambda.invoke(params).promise();

        return {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            //  headers: {
            //      "Access-Control-Allow-Origin": "*",
            //      "Access-Control-Allow-Headers": "*"
            //  },
            body: JSON.stringify({ message: 'Applications updated' })
        };
    } catch (error) {
        console.error('Error updating applications', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating applications' })
        };
    }

};

async function bulkUpdateApplications(tableName, batchValue, dataStream){

    const updatePromises = dataStream.map(async row => {
        // const student = await getStudent(row.cpr);
        // const bahrainiTypos = ["بحريني", "بحرين", "البحرين", "بحراني", "بحرينيه", "بحرينية", "بحرانية","بجريني", "بحرنية", "بحرينة", "بحرني","بحرنية", "بحريني الجنسية", "bahrian", "بحريني الجنسيه", "BAH","Bahraiani", "bahraini", "BAHRAIN", "BAHRAINI", "bahrani", "Bahrani", "Bahrainy" ,"Bahrini","Bahrain", "bahrain", "Bahraini","بحرانيه"];
        // const otherNationalities = ["Egyptian" ,"سورية", "سعودية" ,"مصري", "باكستانية","Iraqi", "كويتية", "عراقية"];
        // if (!student) {
        //     return Promise.resolve();
        // }
        let score = calculateScore(row.familyIncome, row.verifiedGPA, row.adminPoints);
        if(isNaN(score) || score < 0 || isNaN(row.verifiedGPA)){
           score = 0;
        }

        console.log('Score:', score);
        console.log('Row:', row);


        const params = {
            TableName: tableName,
            Key: {
                id: row.id
            },
            UpdateExpression: 'set verifiedGPA = :gpa, score = :score',
            ExpressionAttributeValues: {
                ':gpa': !isNaN(row.verifiedGPA) ? row.verifiedGPA : 0,
                // ':studentName': row.name,
                ':score': score,
                // ':nationalityCategory': otherNationalities.includes(student.nationality) ? 'NON_BAHRAINI' : 'BAHRAINI',
                // ':familyIncome': student.familyIncome
            },
        };
        if (row.id && row.verifiedGPA) {
            return dynamoDB.update(params).promise();
        } else {
            return Promise.resolve();
        }
    });
    return Promise.all(updatePromises);
}

function processCsv(csvData, applications) {
    let csvString = Buffer.from(csvData, 'base64').toString('utf-8');
    const rows = csvString.split(/\r?\n/).slice(1);

    const dataStream = rows.map(row => {
        const columns = row.split(',');
        let cpr = // take only the digits and remove any spaces or special characters or quotes
            columns[0]?.replace(/[^0-9]/g, '');
        console.log('CPR:', cpr);

        if(cpr.length < 9){
            // add the missing zeros
            cpr = '0'.repeat(9 - cpr.length) + cpr;
        }

        return {
            // id: columns[0],
            // name: // remove the quotes around the name
            //     columns[2]?.replace(/^"(.*)"$/, '$1'),
            id: applications.find(application => application.studentCPR === cpr)?.id,
            cpr: cpr,
            // GPA: columns[1],
            verifiedGPA: columns[1],
            familyIncome: applications.find(application => application.studentCPR === cpr)?.familyIncome,
            adminPoints: applications.find(application => application.studentCPR === cpr)?.adminPoints ?? 0,
            // familyIncome: columns[2],
            // adminPoints: columns[3],
        };
    }).filter(row => row.id && row.verifiedGPA && !isNaN(row.verifiedGPA) && row.cpr.length === 9);
    // console.log('Data Stream:', dataStream);

    return dataStream;

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

function calculateScore(familyIncome, gpa, adminPoints= 0) {
    let score = gpa * 0.7 + adminPoints;
    if(familyIncome === "LESS_THAN_1500") {
        score += 20;
    }
    else if(familyIncome === "MORE_THAN_1500") {
        score += 10;
    }
    // convert to 2 decimal places
    return Math.round(score * 100) / 100;
}

async function getStudent(cpr) {
    const params = {
        TableName: 'Student-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            cpr: cpr
        }
    };
    const {Item} = await dynamoDB.get(params).promise();
    return Item;
}

async function getApplications(batch) {
    const params = {
        TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
        KeyConditionExpression: '#batch = :batchValue',
        ScanIndexForward: false,
        IndexName: 'byBatch',
        ExpressionAttributeNames: {
            '#batch': 'batch' // Using ExpressionAttributeNames to alias the reserved keyword 'batch'
        },
        ExpressionAttributeValues: {
            ':batchValue': batch,
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

