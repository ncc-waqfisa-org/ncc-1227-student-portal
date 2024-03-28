const AWS = require('aws-sdk');
const {round} = require("lodash");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

    console.log(`EVENT: ${JSON.stringify(event)}`);
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


function calculateScore(familyIncome, gpa, adminScore= 0) {
    let score = gpa * 0.7 + adminScore;
    if(familyIncome === "LESS_THAN_1500") {
        score += 10;
    }
    return round(score, 2);
}

async function updateScore(applicationId, score) {
    const params = {
        TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            id: applicationId
        },
        UpdateExpression: 'SET score = :score',
        ExpressionAttributeValues: {
            ':score': score
        }
    };
    return dynamoDB.update(params).promise();

}


