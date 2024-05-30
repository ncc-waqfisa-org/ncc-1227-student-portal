/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT
 */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */


const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const {ConfidentialClientApplication} = require("@azure/msal-node");

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
    if (event.Records[0].eventName !== 'INSERT') {
        return {
            statusCode: 200,
            body: JSON.stringify({message: 'Passing over non-insert event'})
        };
    }

    try {
        console.log(`EVENT: ${JSON.stringify(event)}`);
        // get the email from dynamodb event
        const cpr = event.Records[0].dynamodb.NewImage.studentCPR.S;
        const student = await getStudent(cpr);
        const email = student.email;
        const language = student.language;
        const studentName = event.Records[0].dynamodb.NewImage.studentName.S;
        const attachmentId = event.Records[0].dynamodb.NewImage.applicationAttachmentId.S;
        const attachment = await getAttachment(attachmentId);
        const programChoice = await getProgramChoice(event.Records[0].dynamodb.NewImage.id.S);
        console.log(`Attachment: ${JSON.stringify(attachment)}`);
        const schoolCertificate = attachment.schoolCertificate;
        const transcript = attachment.transcriptDoc;
        const acceptanceLetter = programChoice.acceptanceLetterDoc;
        const university = await getUniversity(event.Records[0].dynamodb.NewImage.universityID.S);
        const missingDoc = [];
        if (!schoolCertificate) {
            missingDoc.push('School Certificate');
        }
        if (!transcript) {
            missingDoc.push('Transcript');
        }
        if (!acceptanceLetter) {
            if(!university.isException) {
                missingDoc.push('Acceptance Letter');
            }
        }


        console.log(`Email: ${email}`);

        const logo =
            "https://res.cloudinary.com/dedap3cb9/image/upload/v1688627927/logos/nccEmailLogo_mjrwyk.png";
        const cca = new ConfidentialClientApplication(msalConfig);
        const tokenInfo = await cca.acquireTokenByClientCredential(tokenRequest);
        const headers = new Headers();
        const bearer = `Bearer ${tokenInfo?.accessToken}`;
        headers.append("Authorization", bearer);
        headers.append("Content-Type", "application/json");

        const body = JSON.stringify({
            message: {
                subject: "Waqf Isa Application Submission",
                body: {
                    contentType: "HTML",
                    content: language === 'ARABIC' ? emailTemplateArabic(logo, missingDoc) : emailTemplate(logo, studentName, missingDoc),
                },
                toRecipients: [
                    {
                        emailAddress: {
                            address: email,
                        },
                    },
                ],
            },
            saveToSentItems: "false",
        });

        const options = {
            method: "POST",
            headers,
            body,
        };

        const response = await fetch(`${graphEndpoint}/v1.0/users/${process.env.OUTLOOK_USERNAME}/sendMail`, options);
        console.log(`RESPONSE: ${JSON.stringify(response)}`);

        return {
            statusCode: 200,
            body: JSON.stringify({message: "Email sent"}),
        };
    }
    catch (error) {
        console.error('Error sending email', error);
        return {
            statusCode: 500,
            body: JSON.stringify({message: 'Error sending email'})
        };
    }
};

async function getAttachment(attachmentId) {
    const params = {
        TableName: 'Attachment-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            id: attachmentId
        }
    };

    const attachment = await dynamoDB.get(params).promise();
    return attachment.Item;

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


async function getStudent(cpr) {
    const params = {
        TableName: 'Student-cw7beg2perdtnl7onnneec4jfa-staging',
        Key: {
            cpr: cpr
        }
    };

    const student = await dynamoDB.get(params).promise();
    const result = {
        email: student.Item.email,
        name: student.Item.name,
        language: student.Item.preferredLanguage
    }
    return result;
}

function emailTemplate(logo, studentName, missingDoc) {
    return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html lang="en">
  
    <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    </head>
    <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0"> 
    Application submitted
    <div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
    </div>
  
    <body style="background-color:rgb(255,251,235);padding-top:2.5rem;padding-bottom:2.5rem;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">
      <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%" style="margin-left:auto;margin-right:auto;max-width:36rem;border-radius:0.75rem;background-color:rgb(255,255,255);padding:2.5rem;box-shadow:0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0,0,0,0.1), 0 1px 2px -1px rgb(0,0,0,0.1)">
        <tbody>
          <tr>
            <td><img alt="Ncc" src="${logo}" style="margin-left:auto;margin-right:auto;max-width:12rem;display:block;outline:none;border:none;text-decoration:none" />
              <p style="margin-left:auto;margin-right:auto;width:100%;padding-top:2.5rem;text-align:center;font-size:18px;line-height:24px;font-weight:600;color:rgb(31,41,55);margin:16px 0"> Application submitted</p>
              <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="width:100%;border-radius:5px;background-color:rgb(249,250,251);padding:0.75rem;max-width:37.5em;border:1px solid #eee">
                <tr style="width:100%">
                  <td>
                    <p style="font-size:16px;line-height:24px;font-weight:600;color:rgb(31,41,55);margin:16px 0;text-align:left">Dear diligent student,</p>
                    <p style="color:rgb(107,114,128);font-size:14px;line-height:24px;margin:16px 0;text-align:left">We are pleased to receive your application for the Isa bin Salman Education Charitable Trust
scholarship for the academic year ${new Date().getFullYear()} - ${new Date().getFullYear() + 1}.</p>
                    ${missingDoc.length > 0 ? `<p style="color:rgb(107,114,128);font-size:14px;line-height:24px;margin:16px 0;text-align:left">Please note that your application is <b>incomplete</b>. You can visit the website to review and update
your application before the end of the registration period.</p>
                    <p style="color:rgb(107,114,128);font-size:14px;line-height:24px;margin:16px 0;text-align:left">Missing documents:</p>
                    <ul style="color:rgb(107,114,128);font-size:14px;line-height:24px;margin:16px 0;text-align:left">   
                    ${missingDoc.map(doc => `<li>${doc}</li>`).join('')}
                </ul>` : `<p style="color:rgb(107,114,128);font-size:14px;line-height:24px;margin:16px 0;text-align:left">Please note that your application is 
        <b> completed</b>  and is under review. You will be provided with the
        latest updates after the completion of the registration period.</p>`}
                      
                    
       <p  style="color:rgb(107,114,128);font-size:14px;line-height:24px;margin:16px 0;text-align:left" >We thank you for your cooperation and wish you good luck!
 </p>
                  </td>
                </tr>
              </table>
              <hr style="margin-top:1.5rem;margin-bottom:1.5rem;width:100%;border:none;border-top:1px solid #eaeaea" /><a href="mailto:info@waqfisa.bh" target="_blank" style="margin-left:auto;margin-right:auto;display:inline-block;width:100%;border-radius:0.375rem;background-color:rgb(201, 141, 75);color:#fff;font-size:16px;font-weight:bold;text-decoration:none;text-align:center;padding:0px 0px;line-height:100%;max-width:100%"><span></span><span style="color:#fff;font-size:16px;font-weight:bold;text-decoration:none;text-align:center;display:inline-block;padding:10px 0px;max-width:100%;line-height:120%;text-transform:none;mso-padding-alt:0px;mso-text-raise:0">Contact Support</span><span></span></a>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  
  </html>
`;
}




function emailTemplateArabic(logo, missingDoc) {
    const nextYear = new Date().getFullYear() + 1;
    const currentYear = new Date().getFullYear();
    const missingDocArabic = missingDoc.map(doc => {
        switch (doc) {
            case 'School Certificate':
                return 'شهادة المدرسة';
            case 'Transcript':
                return 'السجل الأكاديمي';
            case 'Acceptance Letter':
                return 'رسالة القبول';
            default:
                return '';
        }
    });
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html lang="ar" dir="rtl">
  
    <head>
      <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    </head>
    <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">
    Application submitted
    <div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
    </div>
  
    <body style="background-color:rgb(255,251,235);padding-top:2.5rem;padding-bottom:2.5rem;font-family:ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, &quot;Helvetica Neue&quot;, Arial, &quot;Noto Sans&quot;, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Noto Color Emoji&quot;">
      <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%" style="margin-left:auto;margin-right:auto;max-width:36rem;border-radius:0.75rem;background-color:rgb(255,255,255);padding:2.5rem;box-shadow:0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0,0,0,0.1), 0 1px 2px -1px rgb(0,0,0,0.1)">
        <tbody>
          <tr>
            <td><img alt="Ncc" src="${logo}" style="margin-left:auto;margin-right:auto;max-width:12rem;display:block;outline:none;border:none;text-decoration:none" />
            <p style="margin-left:auto;margin-right:auto;width:100%;padding-top:2.5rem;text-align:center;font-size:18px;line-height:24px;font-weight:600;color:rgb(31,41,55);margin:16px 0"> تم تقديم الطلب</p>
                <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="width:100%;border-radius:5px;background-color:rgb(249,250,251);padding:0.75rem;max-width:37.5em;border:1px solid #eee">
                    <tr style="width:100%">
                    <td>
                        <p style="font-size:16px;line-height:24px;font-weight:600;color:rgb(31,41,55);margin:16px 0;text-align:right">،عزيزي الطالب المجتهد</p>
                        <p style="color:rgb(107,114,128);font-size:14px;line-height:24px;margin:16px 0;text-align:right; direction: rtl"> يسعدنا تقديمك على بعثة وقف عيسى بن سلمان التعليمي الخيري للعام الأكاديمي ${nextYear} - ${currentYear}
                        .
                        </p>
                        </p>
                        ${missingDoc.length > 0 ? `<p style="color:rgb(107,114,128);font-size:14px;line-height:24px;margin:16px 0;text-align:right">
                        يرجى التنويه بأن طلبك 
                        <b>غير مكتمل</b>.
                         يمكنك زيارة الموقع الإلكتروني لمراجعة طلبك وتحديثه قبل نهاية فترة التسجيل
                        </p>
                        <p style="color:rgb(107,114,128);font-size:14px;line-height:24px;margin:16px 0;text-align:right;font-weight:600">:المستندات المفقودة</p>
                        <ul style="color:rgb(107,114,128);font-size:14px;line-height:24px;margin:16px 0;text-align:right">   
                        ${missingDocArabic.map(doc => `<li style="direction:rtl;margin-right: 10px">${doc}</li>`).join('')}
                        </ul>` : `<p style="color:rgb(107,114,128);font-size:14px;line-height:24px;margin:16px 0;text-align:right; direction: rtl">يرجى التنويه بأن طلبك
                        <b>مكتمل</b> 
                        وقيد المراجعة.
                        وسيتم تزويدكم بآخر التطورات بعد استكمال فترة التسجيل.
                         </p>`}
                        
                        
                        <p  style="color:rgb(107,114,128);font-size:14px;line-height:24px;margin:16px 0;text-align:right" >.شاكرين لكم حسن تعاونكم ونتمنى لكم حظًا جميلاً </p>
                    </td>
                    </tr>
                </table>
                 <hr style="margin-top:1.5rem;margin-bottom:1.5rem;width:100%;border:none;border-top:1px solid #eaeaea" /><a href="mailto:info@waqfisa.bh" target="_blank" style="margin-left:auto;margin-right:auto;display:inline-block;width:100%;border-radius:0.375rem;background-color:rgb(201, 141, 75);color:#fff;font-size:16px;font-weight:bold;text-decoration:none;text-align:center;padding:0px 0px;line-height:100%;max-width:100%"><span></span><span style="color:#fff;font-size:16px;font-weight:bold;text-decoration:none;text-align:center;display:inline-block;padding:10px 0px;max-width:100%;line-height:120%;text-transform:none;mso-padding-alt:0px;mso-text-raise:0">تواصل معنا</span><span></span></a>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  
  </html>
`;
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



   
