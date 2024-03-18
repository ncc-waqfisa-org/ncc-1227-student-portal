const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const tableName = 'Application-cw7beg2perdtnl7onnneec4jfa-staging';

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const batchValue = event.queryStringParameters?.batch || 2024;

    try {
        const countOfCurrentYearApplications = await getCountOfCurrentYearApplications(batchValue, tableName);
        const scoreChart = await getScoreChart(batchValue, tableName);
        const applicationsPerYearChart = await getApplicationsPerYearChart(batchValue, tableName);
        const statusPieChart = await getStatusPieChart(tableName);

        return {
            statusCode: 200,
            body: JSON.stringify({
                countOfCurrentYearApplications,
                scoreChart,
                applicationsPerYearChart,
                statusPieChart
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

async function getCountOfCurrentYearApplications(batchValue, tableName) {
    const countParams = {
        TableName: tableName,
        Select: 'COUNT',
        FilterExpression: '#batch = :batchValue',
        ExpressionAttributeNames: {
            '#batch': 'batch'
        },
        ExpressionAttributeValues: {
            ':batchValue': batchValue
        }
    };

    const countResult = await dynamoDB.scan(countParams).promise();
    return countResult.Count;
}

async function getScoreChart(batchValue, tableName) {
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

    const scoreResult = await dynamoDB.scan(scoreParams).promise();
    const scores = scoreResult.Items.map(item => item.score);
    return { scores };
}

async function getApplicationsPerYearChart(batchValue, tableName) {
    const applicationsPerYearParams = {
        TableName: tableName,
        ProjectionExpression: '#batch',
        ExpressionAttributeNames: {
            '#batch': 'batch'
        }
    };

    const applicationsPerYearResult = await dynamoDB.scan(applicationsPerYearParams).promise();
    return applicationsPerYearResult.Items.reduce((acc, item) => {
        const batch = item.batch;
        acc[batch] = (acc[batch] || 0) + 1;
        return acc;
    }, {});
}

async function getStatusPieChart(tableName, batchValue) {
    const statusParams = {
        TableName: tableName,
        ProjectionExpression: '#status',
        ExpressionAttributeNames: {
            '#status': 'status'
        },
        FilterExpression: '#batch = :batchValue',
        ExpressionAttributeValues: {
            ':batchValue': batchValue
        }
    };

    const statusResult = await dynamoDB.scan(statusParams).promise();
    return statusResult.Items.reduce((acc, item) => {
        const status = item.status;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
    }, {});
}
