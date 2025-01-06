/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const pdfKit = require('pdfkit');

const arabicLocal = {
    "BAHRAINI": "بحريني",
    "NON_BAHRAINI": "غير بحريني",
    "PUBLIC": "حكومية",
    "PRIVATE": "خاصة",
    "LESS_THAN_1500" : "أقل من ألف وخمسمائة دينار بحريني",
    "MORE_THAN_1500" :  "أكثر من ألف وخمسمائة دينار بحريني",
    "LESS_THAN_500" : "أقل من خمسمائة دينار بحريني",
    "BETWEEN_500_AND_700" : "بين خمسمائة وسبعمائة دينار بحريني",
    "OVER_1000" : "أكثر من ألف دينار بحريني",
    "REJECTED": "مرفوض",
    "APPROVED": "مقبول",
    "NOT_COMPLETED": "غير مكتمل",
    "ELIGIBLE": "مؤهل",
    "AWAITING_VERIFICATION": "في انتظار التحقق",
};



/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    const applicationId = event.queryStringParameters?.applicationId;
    const lang = event.queryStringParameters?.lang || 'en';
    if (!applicationId) {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Missing applicationId' })
        };
    }
    try {
        const application = await getApplication(applicationId);
        if (!application) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: 'Application not found' })
            };
        }
        console.log('Application:', application);
        const program = application.programID ? await getProgram(application.programID) : null;
        console.log('Program:', program);
        const university = application.universityID ? await getUniversity(application.universityID) : null;
        console.log('University:', university);
        const student = await getStudent(application.studentCPR);

        const parent = await getParentInfo(student.parentInfoID);
        let pdfBuffer;
       if(lang === 'ar') {
           pdfBuffer = await generateArabicPdf(application, program, university, parent, student);
        }
        else {
            pdfBuffer = await generatePdf(application, program, university, parent, student);
       }
        const pdfUrl = await uploadToS3(pdfBuffer);
        return {
            statusCode: 200,
            body: JSON.stringify({ url: pdfUrl })
        };
    }
    catch (error) {
        console.error('Error exporting application', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error exporting application' })
        };
    }
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

async function getApplication(applicationId) {
    const params = {
        TableName: 'Application-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            id: applicationId
        }
    };
    const application = await dynamoDB.get(params).promise();
    return application.Item;
}

async function generatePdf(application, program, university, parent, student) {
    const logoUrl = 'https://amplify-ncc-staging-65406-deployment.s3.amazonaws.com/waqfisa_logo.png';
    const imageBuffer = await fetchImage(logoUrl);

    // Generate PDF
    const doc = new pdfKit();
    // set the line height
    doc.lineGap(4);
    const pdfBuffer = [];
    doc.on('data', chunk => {
        pdfBuffer.push(chunk);
    });
    // Using a Promise to handle the asynchronous operation
    const pdfPromise = new Promise((resolve, reject) => {
        doc.on('end', () => {
            resolve(Buffer.concat(pdfBuffer));
        });
        doc.on('error', reject);
    });
    // Add logo, top right. With 170 width
    doc.image(imageBuffer, 390, 20, { width: 170 });
    // add a title on the top left
    doc.font('./fonts/Almarai-Bold.ttf').fontSize(20).text('Waqf Isa Application', 20, 20);
    // add a line under the title and logo
    doc.moveTo(20, 90).lineTo(600, 90).stroke();
    // add today's date under the line in dd/mm/yyyy format
    doc.font('./fonts/Almarai.ttf').fontSize(10).text(new Date().toLocaleDateString(), 20, 95);
    // take a gap
    doc.text(' ');
    // add a "to whom it may concern" text
    doc.font('./fonts/Almarai.ttf').fontSize(14).text('To Whom It May Concern', {align: 'center', underline: true});
    doc.text(' ');
    doc.font('./fonts/Almarai-Bold.ttf').fontSize(12).text('This is to certify that the following student has applied for the Waqf Isa scholarship program. The application details are as follows:');
    doc.font('./fonts/Almarai.ttf').fontSize(12).text(`ID: ${application.id}`);
    doc.text("Status: ", {continued: true});
    doc.text(application.status);
    doc.text("Batch: ", {continued: true});
    doc.text(application.batch);
    // take a gap
    doc.text(' ');

    doc.font('./fonts/Almarai-Bold.ttf').fontSize(14).text('Student Details:');
    doc.font('./fonts/Almarai.ttf').fontSize(12).text("Name: ", {continued: true});
    doc.text(application.studentName, {features: ['rtla']});
    doc.text("CPR: ", {continued: true});
    doc.text(application.studentCPR);
    doc.text("Nationality: ", {continued: true});
    doc.text(application.nationalityCategory);
    doc.text("GPA: ", {continued: true});
    doc.text(application.gpa + "%");
    doc.text("Verified GPA: " + application.verifiedGPA ? application.verifiedGPA : "Awaiting verification");
    doc.text("School Name: ", {continued: true});
    doc.text(application.schoolName, {features: ['rtla']});
    doc.text("School Type: ", {continued: true});
    doc.text(application.schoolType);
    doc.text("Address: ", {continued: true});
    doc.text(student.address, {features: ['rtla']});


    doc.text("Email: ", {continued: true});
    doc.text(student.email);
    doc.text("Phone: ", {continued: true});
    doc.text(student.phone);
    // take a gap
    doc.text(' ');
    doc.font('./fonts/Almarai-Bold.ttf').fontSize(14).text('Parents Details:');
    doc.font('./fonts/Almarai.ttf').fontSize(12).text("Father Name: ", {continued: true});
    doc.text(parent.fatherFullName, {features: ['rtla']});
    doc.text("Father CPR: ", {continued: true});
    doc.text(parent.fatherCPR);
    doc.text("Mother Name: ", {continued: true});
    // align the text to the right
    doc.text(parent.motherFullName, {features: ['rtla']});

    doc.text("Mother CPR: ", {continued: true});
    doc.text(parent.motherCPR);
    doc.text("Guardian Name: ", {continued: true});
    doc.text(parent.guardianFullName, {features: ['rtla']});
    doc.text("Guardian CPR: ", {continued: true});
    doc.text(parent.guardianCPR);
    doc.text("Family Income: ", {continued: true});
    doc.text(application.familyIncome);
    // take a gap
    doc.text(' ');

    doc.font('./fonts/Almarai-Bold.ttf').fontSize(14).text('Desired Program:');
    if(program) {
        doc.font('./fonts/Almarai.ttf').fontSize(12).text(`${program.name} - ${university.name}`);
    }
    else {
        doc.font('./fonts/Almarai.ttf').fontSize(12).text('N/A');
    }
    // add a footer with a line above it
    doc.moveTo(20, 690).lineTo(600, 690).stroke();
    doc.font('./fonts/Almarai.ttf').fontSize(8).text('This document is generated by Waqf Isa system. All rights reserved ' + new Date().getFullYear(), 20, 700);
    // Finalize PDF file
    doc.end();

    // Wait for the PDF generation to finish and return the result
    return await pdfPromise;
}

async function generateArabicPdf(application, program, university, parent, student) {
    const logoUrl = 'https://amplify-ncc-staging-65406-deployment.s3.amazonaws.com/waqfisa_logo.png';
    const imageBuffer = await fetchImage(logoUrl);

    // Generate PDF
    const doc = new pdfKit();
    doc.lineGap(5);
    const pdfBuffer = [];
    doc.on('data', chunk => {
        pdfBuffer.push(chunk);
    });
    const pdfPromise = new Promise((resolve, reject) => {
        doc.on('end', () => {
            resolve(Buffer.concat(pdfBuffer));
        });
        doc.on('error', reject);
    });
    doc.image(imageBuffer, 390, 20, { width: 170 });
    doc.font('./fonts/Almarai-Bold.ttf').fontSize(20).text('طلب وقف عيسى', 20, 20, {features: ['rtla']});
    doc.moveTo(20, 90).lineTo(600, 90).stroke();
    doc.font('./fonts/Almarai.ttf').fontSize(10).text(new Date().toLocaleDateString(), 20, 95, {features: ['rtla']});
    doc.text(' ');
    doc.font('./fonts/Almarai.ttf').fontSize(14).text('إلى من يهمه الأمر', {align: 'center', underline: true, features: ['rtla']});
    doc.text(' ');
    doc.font('./fonts/Almarai-Bold.ttf').fontSize(12).text('نشهد بأن الطالب التالي قد قدم طلب لبرنامج وقف عيسى. تفاصيل الطلب كما يلي:', {features: ['rtla'], align: 'right'});
    doc.font('./fonts/Almarai-Bold.ttf').fontSize(12).text("الرقم: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(application.id, {align: 'right'});

    doc.font('./fonts/Almarai-Bold.ttf').text("الحالة: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(arabicLocal[application.status], {align: 'right'});
    doc.font('./fonts/Almarai-Bold.ttf').text("الدفعة: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(application.batch, {align: 'right'});
    doc.text(' ');
    doc.font('./fonts/Almarai-Bold.ttf').fontSize(14).text('تفاصيل الطالب:', {features: ['rtla'], align: 'right'});
    doc.font('./fonts/Almarai-Bold.ttf').fontSize(12).text("الاسم:" , { align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(application.studentName, {align: 'right', features: ['rtla']});

    doc.font('./fonts/Almarai-Bold.ttf').text("رقم البطاقة الذكية: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(application.studentCPR, {align: 'right'});
    doc.font('./fonts/Almarai-Bold.ttf').text("الجنسية: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(arabicLocal[application.nationalityCategory], {align: 'right'});
    doc.font('./fonts/Almarai-Bold.ttf').text("المعدل: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(application.gpa + "%", {align: 'right'});
    doc.font('./fonts/Almarai-Bold.ttf').text("المعدل الموثق: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(application.verifiedGPA ? application.verifiedGPA : "في انتظار التحقق", {align: 'right', features: ["rlta"]});

    doc.font('./fonts/Almarai-Bold.ttf').text("اسم المدرسة: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(application.schoolName, {align: 'right', features: ['rtla']});
    doc.font('./fonts/Almarai-Bold.ttf').text("نوع المدرسة: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(arabicLocal[application.schoolType], {align: 'right', features: ['rtla']});
    doc.font('./fonts/Almarai-Bold.ttf').text("العنوان: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(student.address, {align: 'right', features: ['rtla']});
    doc.font('./fonts/Almarai-Bold.ttf').text("البريد الإلكتروني: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(student.email, {align: 'right', features: ['rtla']});
    doc.font('./fonts/Almarai-Bold.ttf').text("رقم الهاتف: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(student.phone, {align: 'right', features: ['rtla']});
    doc.text(' ');
    doc.font('./fonts/Almarai-Bold.ttf').fontSize(14).text('تفاصيل الأهل:', {features: ['rtla'], align: 'right'});
    doc.font('./fonts/Almarai-Bold.ttf').fontSize(12).text("اسم الأب: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(parent.fatherFullName, {align: 'right', features: ['rtla']});
    doc.font('./fonts/Almarai-Bold.ttf').font('./fonts/Almarai-Bold.ttf').text("رقم البطاقة الذكية للأب: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(parent.fatherCPR, {align: 'right', features: ['rtla']});
    doc.font('./fonts/Almarai-Bold.ttf').text("اسم الأم: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(parent.motherFullName, {align: 'right', features: ['rtla']});
    doc.font('./fonts/Almarai-Bold.ttf').text("رقم البطاقة الذكية للأم: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(parent.motherCPR, {align: 'right', features: ['rtla']});
    doc.font('./fonts/Almarai-Bold.ttf').text("اسم الولي: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(parent.guardianFullName, {align: 'right', features: ['rtla']});
    doc.font('./fonts/Almarai-Bold.ttf').text("رقم البطاقة الذكية للولي: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(parent.guardianCPR, {align: 'right', features: ['rtla']});
    doc.font('./fonts/Almarai-Bold.ttf').text("الدخل الشهري: ", {align: 'right', features: ['rtla'], underline: true})
        .font('./fonts/Almarai.ttf')
        .text(arabicLocal[application.familyIncome], {align: 'right', features: ['rtla']});
    doc.text(' ');
    doc.font('./fonts/Almarai-Bold.ttf').fontSize(14).text('البرنامج المطلوب:', {features: ['rtla'], align: 'right'});
    if(program) {
        doc.font('./fonts/Almarai.ttf').fontSize(12).text(`${program.nameAr} - ${university.nameAr}`, {align: 'right', features: ['rtla']});

    }
    else {
        doc.font('./fonts/Almarai.ttf').fontSize(12).text('غير متوفر', {align: 'right', features: ['rtla']});
    }
    doc.end();
    return await pdfPromise;
}

async function uploadToS3(pdfData) {
    const params = {
        Bucket: 'amplify-ncc-staging-65406-deployment',
        Key: 'application.pdf',
        Body: pdfData,
        ContentType: 'application/pdf'
    };
    const result = await s3.upload(params).promise();
    return s3.getSignedUrl('getObject', {Bucket: params.Bucket, Key: params.Key});
}

async function getProgram(programId) {
    const params = {
        TableName: 'Program-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            id: programId
        }
    };
    const program = await dynamoDB.get(params).promise();
    return program.Item;
}

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

async function getParentInfo(parentId) {
    const params = {
        TableName: 'ParentInfo-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            id: parentId
        }
    };
    const parent = await dynamoDB.get(params).promise();
    return parent.Item;
}

async function getStudent(studentCPR) {
    const params = {
        TableName: 'Student-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            cpr: studentCPR
        }
    };
    const student = await dynamoDB.get(params).promise();
    return student.Item;
}

async function fetchImage(url) {
    const response = await fetch(url);
    return response.arrayBuffer();
}

