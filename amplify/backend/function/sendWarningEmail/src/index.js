/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT
 */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const { ConfidentialClientApplication } = require("@azure/msal-node");

const {
  StudentTable: STUDENT_TABLE,
  ApplicationTable: APPLICATION_TABLE,
  AttachmentTable: ATTACHMENT_TABLE,
  ProgramChoiceTable: PROGRAM_CHOICE_TABLE,
  S3Bucket: S3_BUCKET,
} = {
  StudentTable: "Student-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  ApplicationTable: "Application-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  AttachmentTable: "Attachment-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  ProgramChoiceTable: "ProgramChoice-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  S3Bucket: "amplify-ncc-masterdev-2e2e0-deployment",
};

const clientSecret = process.env.AZURE_APP_SECRET;
const clientId = process.env.AZURE_APP_ID;
const tenantId = process.env.AZURE_TENANT_ID;
const aadEndpoint =
  process.env.AAD_ENDPOINT || "https://login.microsoftonline.com";
const graphEndpoint =
  process.env.GRAPH_ENDPOINT || "https://graph.microsoft.com";

const nodeAuth = {
  clientId: clientId,
  clientSecret: clientSecret,
  authority: `${aadEndpoint}/${tenantId}`,
};

const msalConfig = {
  auth: nodeAuth,
};

const tokenRequest = {
  scopes: ["https://graph.microsoft.com/.default"],
};

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  try {
    const notCompletedApplications = await getNotCompletedApplications();
    const urlNotCompleted = await getStudentNotCompletedEmailsList(
      notCompletedApplications
    );
    const urlNoApp = await getSignedUpButNoApplicationStudents();
    return {
      statusCode: 200,
      body: JSON.stringify({
        notCompletedApplications: urlNotCompleted,
        noApplicationStudents: urlNoApp,
      }),
    };

    await sendWarningEmails(
      notCompletedApplications,
      msalConfig,
      tokenRequest,
      graphEndpoint
    );
    return {
      statusCode: 200,
      body: JSON.stringify("Process completed successfully"),
    };
  } catch (error) {
    console.error(`Error: ${error}`);
    return {
      statusCode: 500,
      body: JSON.stringify("An error occurred"),
    };
  }
};
async function uploadToS3(csv, batchValue, name) {
  const params = {
    Bucket: S3_BUCKET,
    Key: name + batchValue + ".csv",
    Body: csv,
  };
  await s3.upload(params).promise();
  // return the URL of the uploaded file
  return s3.getSignedUrl("getObject", {
    Bucket: params.Bucket,
    Key: params.Key,
  });
}
async function getStudent(cpr) {
  const params = {
    TableName: STUDENT_TABLE,
    Key: { cpr: cpr },
  };
  try {
    const student = await dynamoDB.get(params).promise();
    return {
      email: student.Item.email,
      name: student.Item.name,
      language: student.Item.preferredLanguage,
    };
  } catch (error) {
    console.error(`Error getting student: ${error}`);
    throw error;
  }
}

async function getAttachment(attachmentId) {
  const params = {
    TableName: ATTACHMENT_TABLE,
    Key: { id: attachmentId },
  };
  try {
    const attachment = await dynamoDB.get(params).promise();
    return attachment.Item;
  } catch (error) {
    console.error(`Error getting attachment: ${error}`);
    throw error;
  }
}

async function getNotCompletedApplications() {
  const batchValue = 2024;
  const params = {
    TableName: APPLICATION_TABLE,
    IndexName: "byStatus",
    KeyConditionExpression: "#status = :statusValue and #batch = :batchValue",
    ExpressionAttributeNames: {
      "#status": "status",
      "#batch": "batch",
    },
    ExpressionAttributeValues: {
      ":statusValue": "NOT_COMPLETED",
      ":batchValue": batchValue,
    },
  };
  try {
    const { Items } = await dynamoDB.query(params).promise();
    return Items;
  } catch (error) {
    console.error(`Error getting applications: ${error}`);
    throw error;
  }
}

async function getApplications() {
  const params = {
    TableName: APPLICATION_TABLE,
    IndexName: "byScore",
    KeyConditionExpression: "#batch = :batchValue AND score > :score",
    ExpressionAttributeNames: {
      "#batch": "batch",
    },
    ExpressionAttributeValues: {
      ":batchValue": new Date().getFullYear(),
      ":score": 0.0,
    },
    ScanIndexForward: false,
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

async function getStudents() {
  const params = {
    TableName: STUDENT_TABLE,
    // graduationDate is contained in the batch attribute
    FilterExpression: "#batch = :batchValue",
    ExpressionAttributeValues: {
      // ':startDate': startDate.toISOString(),
      // ':endDate': endDate.toISOString()
      ":batchValue": new Date().getFullYear(),
    },
    ExpressionAttributeNames: {
      "#batch": "batch",
    },
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

async function getProgramChoice(applicationId) {
  const params = {
    TableName: PROGRAM_CHOICE_TABLE,
    IndexName: "applicationID-index",
    KeyConditionExpression: "applicationID = :applicationID",
    ExpressionAttributeValues: {
      ":applicationID": applicationId,
    },
  };
  try {
    const programChoice = await dynamoDB.query(params).promise();
    return programChoice.Items[0];
  } catch (error) {
    console.error(`Error getting program choice: ${error}`);
    throw error;
  }
}

async function sendWarningEmails(
  notCompletedApplications,
  msalConfig,
  tokenRequest,
  graphEndpoint
) {
  for (const application of notCompletedApplications) {
    try {
      const { id, attachmentID, studentCPR } = application;
      const student = await getStudent(studentCPR);
      const attachment = await getAttachment(attachmentID);
      const programChoice = await getProgramChoice(id);
      const email = student.email;
      const name = student.name;
      const language = student.language;
      const missingDoc = [];

      if (!attachment?.schoolCertificate) missingDoc.push("School Certificate");
      if (!attachment?.transcriptDoc) missingDoc.push("Transcript");
      if (!programChoice?.acceptanceLetterDoc)
        missingDoc.push("Acceptance Letter");

      if (missingDoc.length > 0) {
        await sendWarningEmail(
          email,
          name,
          language,
          missingDoc,
          msalConfig,
          tokenRequest,
          graphEndpoint
        );
      }
    } catch (error) {
      console.error(`Error processing application ${application.id}: ${error}`);
    }
  }
}

async function sendWarningEmail(
  email,
  name,
  language,
  missingDoc,
  msalConfig,
  tokenRequest,
  graphEndpoint
) {
  const subject = "Reminder to upload remaining documents";
  const logo =
    "https://res.cloudinary.com/dedap3cb9/image/upload/v1688627927/logos/nccEmailLogo_mjrwyk.png";
  const message =
    language === "en"
      ? emailTemplate(logo, name, missingDoc)
      : emailTemplateArabic(logo, missingDoc);
  console.log(`Sending email to ${email}`);
  console.log(msalConfig, tokenRequest, graphEndpoint, subject, message, email);

  const cca = new ConfidentialClientApplication(msalConfig);
  try {
    const tokenInfo = await cca.acquireTokenByClientCredential(tokenRequest);
    const headers = {
      Authorization: `Bearer ${tokenInfo?.accessToken}`,
      "Content-Type": "application/json",
    };

    const body = JSON.stringify({
      message: {
        subject: subject,
        body: { contentType: "HTML", content: message },
        toRecipients: [{ emailAddress: { address: email } }],
      },
    });

    const response = await fetch(
      `${graphEndpoint}/v1.0/users/${process.env.OUTLOOK_USERNAME}/sendMail`,
      {
        method: "POST",
        headers,
        body,
      }
    );

    console.log(`Email sent to ${email}: ${response.status}`);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw error;
  }
}

function emailTemplate(logo, studentName, missingDoc) {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <div style="padding: 20px; font-family: Arial, sans-serif;">
                <img src="${logo}" alt="NCC Logo" style="display: block; margin: 0 auto;">
                <h2 style="text-align: center;">Reminder to upload remaining documents</h2>
                <p>Dear ${studentName},</p>
                <p>We are pleased to receive your application for the Isa bin Salman Education Charitable Trust scholarship for the academic year ${currentYear} - ${nextYear}.</p>
                ${
                  missingDoc.length > 0
                    ? `
                    <p>Please note that your application is <strong>incomplete</strong>. You can visit the website to review and update your application before the end of the registration period.</p>
                    <p>Missing documents:</p>
                    <ul>${missingDoc
                      .map((doc) => `<li>${doc}</li>`)
                      .join("")}</ul>
                `
                    : ""
                }
                <p>Please ensure all required documents are submitted before the registration deadline at midnight on June 12, 2024.</p>
                <p>Thank you for your cooperation and best of luck!</p>
                <a href="mailto:info@waqfisa.bh" style="display: block; margin: 0 auto; padding: 10px; background: #C98D4B; color: #FFF; text-align: center; width: 200px; text-decoration: none; border-radius: 5px;">Contact Support</a>
            </div>
        </body>
        </html>
    `;
}

function emailTemplateArabic(logo, missingDoc) {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const missingDocArabic = missingDoc.map((doc) => {
    switch (doc) {
      case "School Certificate":
        return "شهادة المدرسة";
      case "Transcript":
        return "السجل الأكاديمي";
      case "Acceptance Letter":
        return "رسالة القبول";
      default:
        return doc;
    }
  });
  return `
        <!DOCTYPE html>
        <html lang="ar" dir="rtl">
        <head>
            <meta charset="UTF-8">
        </head>
        <body>
            <div style="padding: 20px; font-family: Arial, sans-serif;">
                <img src="${logo}" alt="NCC Logo" style="display: block; margin: 0 auto;">
                <h2 style="text-align: center;">تذكير برفع المستندات المتبقية</h2>
                <p>عزيزي الطالب،</p>
                <p>يسرنا أن نستلم طلبكم للحصول على منحة مؤسسة عيسى بن سلمان للتعليم الخيري للسنة الأكاديمية ${currentYear} - ${nextYear}.</p>
                ${
                  missingDocArabic.length > 0
                    ? `
                    <p>يرجى ملاحظة أن طلبك <strong>غير مكتمل</strong>. يمكنك زيارة الموقع لمراجعة وتحديث طلبك قبل انتهاء فترة التسجيل.</p>
                    <p>المستندات المفقودة:</p>
                    <ul>${missingDocArabic
                      .map((doc) => `<li>${doc}</li>`)
                      .join("")}</ul>
                `
                    : ""
                }
                <p>يرجى التأكد من تقديم جميع المستندات المطلوبة قبل الموعد النهائي للتسجيل في منتصف الليل في 12 يونيو 2024.</p>
                <p>شكرا لتعاونكم وأطيب التمنيات!</p>
                <a href="mailto:info@waqfisa.bh" style="display: block; margin: 0 auto; padding: 10px; background: #C98D4B; color: #FFF; text-align: center; width: 200px; text-decoration: none; border-radius: 5px;">تواصل مع الدعم</a>
            </div>
        </body>
        </html>
    `;
}

async function getStudentNotCompletedEmailsList(notCompletedApplications) {
  const emails = [];
  for (const application of notCompletedApplications) {
    const student = await getStudent(application.studentCPR);
    emails.push(student.email);
  }
  const emailsCsv = emails.join("\n");
  const url = await uploadToS3(emailsCsv, 2024, "notCompletedApplications");
  return url;
}

async function getSignedUpButNoApplicationStudents() {
  const applications = await getApplications();
  const students = await getStudents();
  const noApplicationStudentsEmails = [];
  for (const student of students) {
    const application = applications.find(
      (app) => app.studentCPR === student.cpr
    );
    if (!application) {
      noApplicationStudentsEmails.push(student.email);
    }
  }
  // convert the list of emails to a CSV string
  const emailsCsv = noApplicationStudentsEmails.join("\n");
  // upload the CSV file to S3
  const url = await uploadToS3(emailsCsv, 2024, "noApplicationStudents");
  return url;
}
