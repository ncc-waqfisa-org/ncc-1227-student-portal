/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const tableName = 'Application-cw7beg2perdtnl7onnneec4jfa-staging';
const batchValue = new Date().getFullYear();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        await updateStatistics(tableName, batchValue);


        return {
            statusCode: 200,
            //  Uncomment below to enable CORS requests
            //  headers: {
            //      "Access-Control-Allow-Origin": "*",
            //      "Access-Control-Allow-Headers": "*"
            //  },
            body: JSON.stringify({
                message: 'Statistics updated'
            })
        };
    } catch (error) {
        console.error('Error getting statistics', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error getting statistics' })
        };

    }
};


async function getScoreHistograms(tableName, batchValue) {

    let histogramJson = {};
    let lastEvaluatedKey = null;
    const scoreParams = {
        TableName: tableName,
        ProjectionExpression: 'score',
        FilterExpression: '#batch = :batchValue AND score BETWEEN :minScore AND :maxScore',
        ExpressionAttributeNames: {
            '#batch': 'batch'
        },
        ExpressionAttributeValues: {
            ':batchValue': batchValue,
            ':minScore': 70,
            ':maxScore': 100,
        }
    };
    do {
        if (lastEvaluatedKey) {
            scoreParams.ExclusiveStartKey = lastEvaluatedKey;
        }

        const scoreResult = await dynamoDB.scan(scoreParams).promise();

        scoreResult.Items.forEach(item => {
            const score = item.score;
            let bucket = Math.floor(score / 5) * 5;
            const key = `${bucket}-${bucket + 5}`;
            histogramJson[key] = (histogramJson[key] || 0) + 1;
        });

        lastEvaluatedKey = scoreResult.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return histogramJson;
}

async function getGpaHistogram(tableName, batchValue) {
    let histogramJson = {};
    let lastEvaluatedKey = null;

    do {
        const params = {
            TableName: tableName,
            ProjectionExpression: 'gpa',
            FilterExpression: '#batch = :batchValue AND gpa BETWEEN :minGpa AND :maxGpa',
            ExpressionAttributeNames: {
                '#batch': 'batch'
            },
            ExpressionAttributeValues: {
                ':batchValue': batchValue,
                ':minGpa': 80,
                ':maxGpa': 100
            },
            ExclusiveStartKey: lastEvaluatedKey
        };

        const result = await dynamoDB.scan(params).promise();

        result.Items.forEach(item => {
            const gpa = item.gpa;
            let bucket = Math.floor(gpa / 5) * 5;

            if (bucket === 100) {
                bucket = 95;
            }
            const key = `${bucket}-${bucket + 5}`;
            histogramJson[key] = (histogramJson[key] || 0) + 1;
        });

        lastEvaluatedKey = result.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return histogramJson;
}


async function getApplicationsPerYearChart(tableName, batchValue) {
    let applicationsPerYear = {};
    let lastEvaluatedKey = null;

    do {
        const applicationsPerYearParams = {
            TableName: tableName,
            ProjectionExpression: '#batch',
            ExpressionAttributeNames: {
                '#batch': 'batch'
            },
            ExclusiveStartKey: lastEvaluatedKey
        };

        const applicationsPerYearResult = await dynamoDB.scan(applicationsPerYearParams).promise();

        applicationsPerYearResult.Items.forEach(item => {
            const batch = item.batch;
            applicationsPerYear[batch] = (applicationsPerYear[batch] || 0) + 1;
        });

        lastEvaluatedKey = applicationsPerYearResult.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return applicationsPerYear;
}

async function getTotalApplications(tableName, batchValue) {
    let applicationsCount = 0;
    let lastEvaluatedKey = null;

    do {
        const applicationsParams = {
            TableName: tableName,
            ProjectionExpression: '#batch',
            FilterExpression: '#batch = :batchValue',
            ExpressionAttributeNames: {
                '#batch': 'batch'
            },
            ExpressionAttributeValues: {
                ':batchValue': batchValue
            },
            ExclusiveStartKey: lastEvaluatedKey
        };

        const applicationsResult = await dynamoDB.scan(applicationsParams).promise();

        applicationsCount += applicationsResult.Count || 0;

        lastEvaluatedKey = applicationsResult.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return applicationsCount;
}



async function getStatusPieChart(tableName, batchValue) {
    let statusCounts = {};

    let lastEvaluatedKey = null;
    do {
        const statusParams = {
            TableName: tableName,
            ProjectionExpression: '#status',
            ExpressionAttributeNames: {
                '#status': 'status',
                '#batch': 'batch'
            },
            FilterExpression: '#batch = :batchValue',
            ExpressionAttributeValues: {
                ':batchValue': batchValue
            },
            ExclusiveStartKey: lastEvaluatedKey
        };

        const statusResult = await dynamoDB.scan(statusParams).promise();

        statusResult.Items.forEach(item => {
            const status = item.status;
            statusCounts[status] = (statusCounts[status] || 0) + 1;
        });

        lastEvaluatedKey = statusResult.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    return statusCounts;
}


async function updateStatistics(tableName, batchValue) {
    const scoreHistogram = await getScoreHistograms(tableName, batchValue);
    // const applicationsPerYearChart = await getApplicationsPerYearChart(tableName, batchValue);
    const statusPieChart = await getStatusPieChart(tableName, batchValue);
    const gpaHistogramChart = await getGpaHistogram(tableName, batchValue);
    const applicationsCount = await getTotalApplications(tableName, batchValue);

    const params = {
        TableName: 'Statistics-cw7beg2perdtnl7onnneec4jfa-staging',
        Item: {
            id: batchValue,
            batch: batchValue,
            totalApplications: applicationsCount,
            // totalApplicationsPerBatch: applicationsPerYearChart,
            totalApplicationsPerStatus: statusPieChart,
            scoreHistogram: scoreHistogram,
            gpaHistogram:  gpaHistogramChart,
            totalApplicationsPerUniversity: {},
        },
    };

    await dynamoDB.put(params).promise();


}
