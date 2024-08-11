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


async function getScoreHistograms(applications/*tableName, batchValue */) {

    // let histogramJson = {};
    // let lastEvaluatedKey = null;
    // const scoreParams = {
    //     TableName: tableName,
    //     ProjectionExpression: 'score',
    //     FilterExpression: '#batch = :batchValue AND score BETWEEN :minScore AND :maxScore',
    //     ExpressionAttributeNames: {
    //         '#batch': 'batch'
    //     },
    //     ExpressionAttributeValues: {
    //         ':batchValue': batchValue,
    //         ':minScore': 70,
    //         ':maxScore': 100,
    //     }
    // };
    // do {
    //     if (lastEvaluatedKey) {
    //         scoreParams.ExclusiveStartKey = lastEvaluatedKey;
    //     }
    //
    //     const scoreResult = await dynamoDB.scan(scoreParams).promise();
    //
    //     scoreResult.Items.forEach(item => {
    //         const score = item.score;
    //         let bucket = Math.floor(score / 5) * 5;
    //         const key = `${bucket}-${bucket + 5}`;
    //         histogramJson[key] = (histogramJson[key] || 0) + 1;
    //     });
    //
    //     lastEvaluatedKey = scoreResult.LastEvaluatedKey;
    // } while (lastEvaluatedKey);
    //
    // // // sort the histogram by key
    // // const sortedHistogram = Object.entries(histogramJson).sort((a, b) => a[0] - b[0]);
    // // histogramJson = Object.fromEntries(sortedHistogram);
    //
    // return histogramJson;

    let histogramJson = {};
    applications.forEach(item => {
        const score = item.score;
        let bucket = Math.floor(score / 5) * 5;
        const key = `${bucket}-${bucket + 5}`;
        histogramJson[key] = (histogramJson[key] || 0) + 1;
    });
    return histogramJson;
}

async function getGpaHistogram(applications, /*tableName, batchValue */) {
    // let histogramJson = {};
    // let lastEvaluatedKey = null;
    //
    // do {
    //     const params = {
    //         TableName: tableName,
    //         ProjectionExpression: 'gpa',
    //         FilterExpression: '#batch = :batchValue AND gpa BETWEEN :minGpa AND :maxGpa',
    //         ExpressionAttributeNames: {
    //             '#batch': 'batch'
    //         },
    //         ExpressionAttributeValues: {
    //             ':batchValue': batchValue,
    //             ':minGpa': 80,
    //             ':maxGpa': 100
    //         },
    //         ExclusiveStartKey: lastEvaluatedKey
    //     };
    //
    //     const result = await dynamoDB.scan(params).promise();
    //
    //     result.Items.forEach(item => {
    //         const gpa = item.gpa;
    //         let bucket = Math.floor(gpa / 5) * 5;
    //
    //         if (bucket === 100) {
    //             bucket = 95;
    //         }
    //         const key = `${bucket}-${bucket + 5}`;
    //         histogramJson[key] = (histogramJson[key] || 0) + 1;
    //     });
    //
    //     lastEvaluatedKey = result.LastEvaluatedKey;
    // } while (lastEvaluatedKey);
    //
    // return histogramJson;

    let histogramJson = {};
    applications.forEach(item => {
        const gpa = item.gpa;
        let bucket = Math.floor(gpa / 5) * 5;

        if (bucket === 100) {
            bucket = 95;
        }
        const key = `${bucket}-${bucket + 5}`;
        histogramJson[key] = (histogramJson[key] || 0) + 1;
    });
    return histogramJson;
}

async function getTopUniversities(tableName, batchValue) {
    let universityIDsCount = {};
    let lastEvaluatedKey = null;

    // get the highest 5 universityIDs repeated in Applications table, with their count

    do {
        const params = {
            TableName: tableName,
            ProjectionExpression: 'universityID',
            FilterExpression: '#batch = :batchValue',
            ExpressionAttributeNames: {
                '#batch': 'batch'
            },
            ExpressionAttributeValues: {
                ':batchValue': batchValue
            },
            ExclusiveStartKey: lastEvaluatedKey
        };

        const result = await dynamoDB.scan(params).promise();

        result.Items.forEach(item => {
            const universityID = item.universityID;
            universityIDsCount[universityID] = (universityIDsCount[universityID] || 0) + 1;
        });

        lastEvaluatedKey = result.LastEvaluatedKey;
    }
    while (lastEvaluatedKey);

    // sort the universities by count
    const sortedUniversities = Object.entries(universityIDsCount).sort((a, b) => b[1] - a[1]);
    const topUniversities = sortedUniversities.slice(0, 5);
    // get the names of the universities from the university table

    const universityNames = {};
    for (const [universityID] of topUniversities) {
        const universityParams = {
            TableName: 'University-cw7beg2perdtnl7onnneec4jfa-staging',
            Key: {
                id: universityID
            }
        };
        const universityResult = await dynamoDB.get(universityParams).promise();
        universityNames[universityID] = universityResult.Item?.name;
    }

    const topUniversitiesJson = {};
    for (const [universityID, count] of topUniversities) {
        topUniversitiesJson[universityNames[universityID]] = count;
    }

    return topUniversitiesJson;

}

async function getAllUniversities(tableName, batchValue) {
    let universityIDsCount = {};
    let lastEvaluatedKey = null;

    // Get the count of each universityID in the Applications table, filtered by batch
    do {
        const params = {
            TableName: tableName,
            ProjectionExpression: 'universityID',
            FilterExpression: '#batch = :batchValue',
            ExpressionAttributeNames: {
                '#batch': 'batch'
            },
            ExpressionAttributeValues: {
                ':batchValue': batchValue
            },
            ExclusiveStartKey: lastEvaluatedKey
        };

        const result = await dynamoDB.scan(params).promise();

        result.Items.forEach(item => {
            const universityID = item.universityID;
            universityIDsCount[universityID] = (universityIDsCount[universityID] || 0) + 1;
        });

        lastEvaluatedKey = result.LastEvaluatedKey;
    } while (lastEvaluatedKey);

    // Get the names of the universities from the University table
    const universityNames = {};
    for (const universityID of Object.keys(universityIDsCount)) {
        const universityParams = {
            TableName: 'University-cw7beg2perdtnl7onnneec4jfa-staging',
            Key: {
                id: universityID
            }
        };
        const universityResult = await dynamoDB.get(universityParams).promise();
        universityNames[universityID] = universityResult.Item?.name;
    }

    // Prepare the final JSON object
    const allUniversitiesJson = {};
    for (const [universityID, count] of Object.entries(universityIDsCount)) {
        allUniversitiesJson[universityNames[universityID]] = count;
    }

    return allUniversitiesJson;
}


async function getAllApplications(tableName, batchValue) {
    const params = {
        TableName: tableName,
        IndexName: 'byBatch',
        KeyConditionExpression: '#batch = :batchValue',
        ExpressionAttributeNames: {
            '#batch': 'batch'
        },
        ExpressionAttributeValues: {
            ':batchValue': batchValue,
        },
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

async function getPrivatePublicRatio(applications, students) {
    let privateCountFemale = 0;
    let privateCountMale = 0;
    let publicCountFemale = 0;
    let publicCountMale = 0;

    let privateCountFemaleToday = 0;
    let privateCountMaleToday = 0;
    let publicCountFemaleToday = 0;
    let publicCountMaleToday = 0;

    for (const application of applications) {
        let student = students.find(student => student.cpr === application.studentCPR);
            if(!student) {
                student = await getStudent('Student-cw7beg2perdtnl7onnneec4jfa-staging', application.studentCPR);
            }
        if (student) {
            if (student.schoolType === 'PRIVATE') {
                student.gender === "FEMALE" ? privateCountFemale++ : privateCountMale++;

                student.gender === "FEMALE" && new Date(application.createdAt).toDateString() === new Date().toDateString() ? privateCountFemaleToday++ : null;
                student.gender === "MALE" && new Date(application.createdAt).toDateString() === new Date().toDateString() ? privateCountMaleToday++ : null;
            } else {
                student.gender === "FEMALE" ? publicCountFemale++ : publicCountMale++;
                student.gender === "FEMALE" && new Date(application.createdAt).toDateString() === new Date().toDateString() ? publicCountFemaleToday++ : null;
                student.gender === "MALE" && new Date(application.createdAt).toDateString() === new Date().toDateString() ? publicCountMaleToday++ : null;
            }
        }
    }
    return {
        private: {
            "male": privateCountMale,
            "female": privateCountFemale
        },
        public: {
            "male": publicCountMale,
            "female": publicCountFemale
        },
        // privateToday: {
        //     "male": students.filter(student =>
        //         new Date(student.createdAt).toDateString() === new Date().toDateString() && student.schoolType === 'PRIVATE' &&
        //         student.gender === "MALE").length,
        //     "female": students.filter(student =>
        //         new Date(student.createdAt).toDateString() === new Date().toDateString() && student.schoolType === 'PRIVATE' &&
        //         student.gender === "FEMALE").length,
        //
        // },
        // publicToday: {
        //     "male": students.filter(student =>
        //         new Date(student.createdAt).toDateString() === new Date().toDateString() && student.schoolType === 'PUBLIC' &&
        //         student.gender === "MALE").length,
        //     "female": students.filter(student =>
        //         new Date(student.createdAt).toDateString() === new Date().toDateString() && student.schoolType === 'PUBLIC' &&
        //         student.gender === "FEMALE").length,
        //
        // }

        privateToday: {
            "male": privateCountMaleToday,
            "female": privateCountFemaleToday
        },

        publicToday: {
            "male": publicCountMaleToday,
            "female": publicCountFemaleToday
        }
    }

}


async function getStudent(tableName, cpr) {
    const params = {
        TableName: tableName,
        Key: {
            cpr: cpr
        }
    };
    const { Item } = await dynamoDB.get(params).promise();
    return Item;
}

async function getFamilyIncomeRatio(applications,students) {
    let above1500Female = 0;
    let above1500Male = 0;
    let below1500Female = 0;
    let below1500Male = 0;

    let above1500FemaleToday = 0;
    let above1500MaleToday = 0;
    let below1500FemaleToday = 0;
    let below1500MaleToday = 0;


    for (const application of applications) {
            let student = students.find(student => student.cpr === application.studentCPR);
            if(!student) {
                student = await getStudent('Student-cw7beg2perdtnl7onnneec4jfa-staging', application.studentCPR);
            }

            if (student) {
                if(student.familyIncome === "BETWEEN_500_AND_700" || student.familyIncome === "BETWEEN_700_AND_1000" || student.familyIncome === "LESS_THAN_500") {
                    student.familyIncome = "LESS_THAN_1500";
                }
                if(student.familyIncome === "OVER_1000") {
                    console.log('Over 1000:', student);
                }

                if (student.familyIncome === "MORE_THAN_1500") {
                    student.gender === "FEMALE" ? above1500Female++ : above1500Male++;
                    student.gender === "FEMALE" && new Date(application.createdAt).toDateString() === new Date().toDateString() ? above1500FemaleToday++ : null;
                    student.gender === "MALE" && new Date(application.createdAt).toDateString() === new Date().toDateString() ? above1500MaleToday++ : null;

                } else {
                    student.gender === "FEMALE" ? below1500Female++ : below1500Male++;
                    student.gender === "FEMALE" && new Date(application.createdAt).toDateString() === new Date().toDateString() ? below1500FemaleToday++ : null;
                    student.gender === "MALE" && new Date(application.createdAt).toDateString() === new Date().toDateString() ? below1500MaleToday++ : null;
                    if(new Date(application.createdAt).toDateString() === new Date().toDateString()){
                        console.log('Today:', student);
                    }
                }
            }
        }
    return {
        above1500: {
            "male": above1500Male,
            "female": above1500Female
        },
        below1500: {
            "male": below1500Male,
            "female": below1500Female
        },
        // above1500Today: {
        //     "male": students.filter(student =>
        //         new Date(student.createdAt).toDateString() === new Date().toDateString() && student.familyIncome === 'MORE_THAN_1500' &&
        //         student.gender === "MALE").length,
        //     "female": students.filter(student =>
        //         new Date(student.createdAt).toDateString() === new Date().toDateString() && student.familyIncome === 'MORE_THAN_1500' &&
        //         student.gender === "FEMALE").length,
        // },
        // below1500Today: {
        //     "male": students.filter(student =>
        //         new Date(student.createdAt).toDateString() === new Date().toDateString() && student.familyIncome === 'LESS_THAN_1500' &&
        //         student.gender === "MALE").length,
        //     "female": students.filter(student =>
        //         new Date(student.createdAt).toDateString() === new Date().toDateString() && student.familyIncome === 'LESS_THAN_1500' &&
        //         student.gender === "FEMALE").length,
        // }

        above1500Today: {
            "male": above1500MaleToday,
            "female": above1500FemaleToday
        },
        below1500Today: {
            "male": below1500MaleToday,
            "female": below1500FemaleToday
        }
    }
}

async function getStudents(batchValue) {
    const params = {
        TableName: 'Student-cw7beg2perdtnl7onnneec4jfa-staging',
        // graduationDate is contained in the batch attribute
        FilterExpression: '#batch = :batchValue',
        ExpressionAttributeValues: {
            ':batchValue': batchValue
        },
        ExpressionAttributeNames: {
            '#batch': 'batch'
        }
    };
    let allStudents = [];

    do {
        const students = await dynamoDB.scan(params).promise();
        allStudents = allStudents.concat(students.Items);

        // Check if there are more items to fetch
        params.ExclusiveStartKey = students.LastEvaluatedKey;
    } while (params.ExclusiveStartKey);

    return allStudents;
}


// async function getTopPrograms(tableName, batchValue) {
//     let programIDsCount = {};
//     let lastEvaluatedKey = null;
//
//     // get the highest 5 programIDs repeated in Applications table, with their count
//
//     do {
//         const params = {
//             TableName: tableName,
//             ProjectionExpression: 'programID',
//             FilterExpression: '#batch = :batchValue',
//             ExpressionAttributeNames: {
//                 '#batch': 'batch'
//             },
//             ExpressionAttributeValues: {
//                 ':batchValue': batchValue
//             },
//             ExclusiveStartKey: lastEvaluatedKey
//         };
//
//         const result = await dynamoDB.scan(params).promise();
//
//         result.Items.forEach(item => {
//             const programID = item.programID;
//             programIDsCount[programID] = (programIDsCount[programID] || 0) + 1;
//         });
//
//         lastEvaluatedKey = result.LastEvaluatedKey;
//     }
//     while (lastEvaluatedKey);
//
//     // sort the programs by count
//     const sortedPrograms = Object.entries(programIDsCount).sort((a, b) => b[1] - a[1]);
//     const topPrograms = sortedPrograms.slice(0, 5);
//     // get the names of the programs from the program table
//
//     const programNames = {};
//     for (const [programID] of topPrograms) {
//         const programParams = {
//             TableName: 'Program-cw7beg2perdtnl7onnneec4jfa-staging',
//             Key: {
//                 id: programID
//             }
//         };
//         const programResult = await dynamoDB.get(programParams).promise();
//         programNames[programID] = programResult.Item?.name;
//     }
//
//     const topProgramsJson = {};
//     for (const [programID, count] of topPrograms) {
//         topProgramsJson[programNames[programID]] = count;
//     }
//
//     return topProgramsJson;
//
// }


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



async function getStatusPieChart(applications, /* tableName, batchValue */) {
    // let statusCounts = {};
    //
    // let lastEvaluatedKey = null;
    // do {
    //     const statusParams = {
    //         TableName: tableName,
    //         ProjectionExpression: '#status',
    //         ExpressionAttributeNames: {
    //             '#status': 'status',
    //             '#batch': 'batch'
    //         },
    //         FilterExpression: '#batch = :batchValue',
    //         ExpressionAttributeValues: {
    //             ':batchValue': batchValue
    //         },
    //         ExclusiveStartKey: lastEvaluatedKey
    //     };
    //
    //     const statusResult = await dynamoDB.scan(statusParams).promise();
    //
    //     statusResult.Items.forEach(item => {
    //         const status = item.status;
    //         statusCounts[status] = (statusCounts[status] || 0) + 1;
    //     });
    //
    //     lastEvaluatedKey = statusResult.LastEvaluatedKey;
    // } while (lastEvaluatedKey);
    //
    // return statusCounts;

    let statusCounts = {};
    applications.forEach(item => {
        const status = item.status;
        statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    return statusCounts;
}

async function getApplicationsPerGender(applications, students) {
    let maleCount = 0;
    let femaleCount = 0;

    for (const application of applications) {
        let student = students.find(student => student.cpr === application.studentCPR);
        if (!student) {
            student = await getStudent('Student-cw7beg2perdtnl7onnneec4jfa-staging', application.studentCPR);
        }
        if (student) {
            student.gender === "FEMALE" ? femaleCount++ : maleCount++;
        }
    }

    return {
        male: maleCount,
        female: femaleCount,
        total: applications.length
    }
}

async function updateStatistics(tableName, batchValue) {
    const applications = await getAllApplications(tableName, batchValue);
    const allUniversities = await getAllUniversities(tableName, batchValue);
    const scoreHistogram = await getScoreHistograms(applications);
    // const applicationsPerYearChart = await getApplicationsPerYearChart(tableName, batchValue);
    const statusPieChart = await getStatusPieChart(applications);
    const gpaHistogramChart = await getGpaHistogram(applications);
    const applicationsCount = applications.length;
    const topUniversities = await getTopUniversities(tableName, batchValue);
    const students = await getStudents(batchValue);
    const privatePublicRatio = await getPrivatePublicRatio(applications, students);
    const familyIncomeRatio = await getFamilyIncomeRatio(applications,students);
    const totalStudents = students.length;
    const totalMaleStudents = students.filter(student => student.gender === "MALE").length;
    const totalFemaleStudents = students.filter(student => student.gender === "FEMALE").length;
    const studentsToday = batchValue === new Date().getFullYear() ? students.filter(student =>
        new Date(student.createdAt).toDateString() === new Date().toDateString()) : [];
    const totalStudentsToday = studentsToday.length;

    const totalFemaleStudentsToday = batchValue === new Date().getFullYear() ?
        studentsToday.filter(student => student.gender === "FEMALE").length : 0;
    const totalMaleStudentsToday = batchValue === new Date().getFullYear() ?
        studentsToday.filter(student => student.gender === "MALE").length : 0;

    const applicationsToday = batchValue === new Date().getFullYear() ?
        applications.filter(application => new Date(application.createdAt).toDateString() === new Date().toDateString()) : [];
    const applicationsPerGender = await getApplicationsPerGender(applications, students);
    const applicationsTodayPerGender = batchValue === new Date().getFullYear() ?
        await getApplicationsPerGender(applicationsToday, students):
        {
            male: 0,
            female: 0,
            total: 0
        };

    // await updateApplications(applications);





    // const topPrograms = await getTopPrograms(tableName, batchValue);

    // console.log('Top Programs:', topPrograms);
    console.log('Top Universities:', topUniversities);

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
            totalApplicationsPerUniversity: allUniversities,
            topUniversities: topUniversities,
            schoolType: privatePublicRatio,
            familyIncome: familyIncomeRatio,
            students: {
                total: totalStudents,
                male: totalMaleStudents,
                female: totalFemaleStudents
            },
            applications: applicationsPerGender,
            today: {
                students: {
                    total: totalStudentsToday,
                    male: totalMaleStudentsToday,
                    female: totalFemaleStudentsToday
                },
                totalApplications: applicationsToday.length,
                applications: applicationsTodayPerGender
            }
        },
    };

    await dynamoDB.put(params).promise();


}

// async function updateApplications(applications){
//     // SET familyIncome to be LESS_THAN_1500 if it is BETWEEN_500_AND_700, BETWEEN_700_AND_1000, or LESS_THAN_500
//     console.log('Applications:', applications);
//
//     for (const application of applications) {
//         const params = {
//             TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
//             Key: {
//                 id: application.id
//             },
//             UpdateExpression: 'SET ',
//             ExpressionAttributeValues: {}
//         };
//         if (application.familyIncome === "BETWEEN_500_AND_700" || application.familyIncome === "BETWEEN_700_AND_1000" || application.familyIncome=== "LESS_THAN_500") {
//             console.log('Family Income:', application.familyIncome);
//             params.UpdateExpression += 'familyIncome = :familyIncome, ';
//             params.ExpressionAttributeValues[':familyIncome'] = "LESS_THAN_1500";
//             // add 20 to the score
//             const score = application.score + 20;
//             params.UpdateExpression += 'score = :score, ';
//             params.ExpressionAttributeValues[':score'] = score;
//
//         }
//         if (params.UpdateExpression === 'SET ') {
//             return;
//         }
//
//         params.UpdateExpression = params.UpdateExpression.slice(0, -2); // Remove the last comma
//         await dynamoDB.update(params).promise();
//
//     }
// }


