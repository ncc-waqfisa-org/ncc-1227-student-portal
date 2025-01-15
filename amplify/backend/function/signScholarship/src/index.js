const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3({
  region: "us-east-1",
});
const { PDFDocument } = require("pdf-lib");
const cognito = new AWS.CognitoIdentityServiceProvider();

const { ScholarshipTable: SCHOLARSHIP_TABLE, S3Bucket: S3_BUCKET } = {
  ScholarshipTable: "Scholarship-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  S3Bucket: "ncc1227bucket2e2e0-masterdev",
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const { scholarshipId, studentSignature, guardianSignature } = JSON.parse(
    event.body
  );
  if (!scholarshipId || !studentSignature || !guardianSignature) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message:
          "Missing required parameters, scholarshipId, studentSignature, guardianSignature",
      }),
    };
  }
  const token = event.headers.authorization.slice(7);
  const cognitoUser = await cognito.getUser({ AccessToken: token }).promise();

  const scholarship = await getScholarship(scholarshipId);
  if (!scholarship) {
    return {
      statusCode: 404,
      body: JSON.stringify({ message: "Scholarship not found" }),
    };
  }

  if (cognitoUser.Username !== scholarship.studentCPR) {
    return {
      statusCode: 403,
      body: JSON.stringify({
        message: "You are not allowed to sign this scholarship",
      }),
    };
  }
  if (scholarship.status !== "APPROVED") {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Scholarship has not been approved" }),
    };
  }

  const key = "public/" + scholarship.unsignedContractDoc;
  const link = s3.getSignedUrl("getObject", {
    Bucket: "ncc1227bucket65406-staging",
    Key: key,
  });

  const signedPdf = await signPDF(link, studentSignature, guardianSignature);
  const { signedPdfUrl, signedPdfKey } = await uploadToS3(
    signedPdf,
    scholarship.studentCPR
  );
  const {
    studentSignatureUrl,
    guardianSignatureUrl,
    studentSignatureKey,
    guardianSignatureKey,
  } = await uploadSignaturesToS3(
    studentSignature,
    guardianSignature,
    scholarship.studentCPR
  );

  await updateScholarship(
    scholarshipId,
    signedPdfKey,
    studentSignatureKey,
    guardianSignatureKey
  );

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify({
      message: "Scholarship signed",
      signedPdfUrl: signedPdfUrl,
      studentSignatureUrl: studentSignatureUrl,
      guardianSignatureUrl: guardianSignatureUrl,
    }),
  };
};

async function signPDF(link, studentSignature, guardianSignature) {
  // Get the pdf buffer
  const pdfBufferUint8Array = await fetchPdfAsUint8Array(link);
  // Load the pdf
  const pdfDoc = await PDFDocument.load(pdfBufferUint8Array);

  // Load the signatures
  const signatureImage = await pdfDoc.embedPng(studentSignature);
  const secondSignatureImage = await pdfDoc.embedPng(guardianSignature);

  // Get the last page
  const pages = pdfDoc.getPages();
  const lastPage = pages[pages.length - 1];

  // Adjust these values based on the desired signature size and position
  const signatureWidth = 100;
  const signatureHeight = 50;
  const xPosition = 70; // Position from the left of the page
  const yPosition = 30 * 14; // Position from the bottom of the page

  // Put the first signature
  lastPage.drawImage(signatureImage, {
    x: xPosition,
    y: yPosition + 90,
    width: signatureWidth,
    height: signatureHeight,
  });

  // Put the second signature
  lastPage.drawImage(secondSignatureImage, {
    x: xPosition,
    y: yPosition,
    width: signatureWidth,
    height: signatureHeight,
  });

  // Get the pdf as Uint8Array
  const signedPdfBytes = await pdfDoc.save();

  // Save the signed PDF
  const blob = new Blob([signedPdfBytes], { type: "application/pdf" });
  // convert the blob to a buffer
  const buffer = Buffer.from(await blob.arrayBuffer());
  return buffer;
}

async function uploadToS3(pdf, studentCPR) {
  const pdfKey =
    "Student" +
    studentCPR +
    "/" +
    studentCPR +
    "#SIGNED_SCHOLARSHIP" +
    new Date().getTime() +
    ".pdf";

  const params = {
    Bucket: S3_BUCKET,
    Key: `public/${pdfKey}`,
    Body: pdf,
  };

  await s3.upload(params).promise();
  return {
    signedPdfUrl: s3.getSignedUrl("getObject", {
      Bucket: params.Bucket,
      Key: params.Key,
    }),
    signedPdfKey: pdfKey,
  };
}

async function uploadSignaturesToS3(
  studentSignature,
  guardianSignature,
  studentCPR
) {
  // Decode base64-encoded image data
  const studentSignatureData = Buffer.from(
    studentSignature.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );
  const guardianSignatureData = Buffer.from(
    guardianSignature.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  const studentKey = `Student${studentCPR}/${studentCPR}#STUDENT_SIGNATURE${new Date().getTime()}.png`;
  const guardianKey = `Student${studentCPR}/${studentCPR}#GUARDIAN_SIGNATURE${new Date().getTime()}.png`;

  const studentSignatureParams = {
    Bucket: S3_BUCKET,
    Key: `public/${studentKey}`,
    Body: studentSignatureData,
    ContentType: "image/png",
  };
  const guardianSignatureParams = {
    Bucket: S3_BUCKET,
    Key: `public/${guardianKey}`,
    Body: guardianSignatureData,
    ContentType: "image/png",
  };

  try {
    await Promise.all([
      s3.upload(studentSignatureParams).promise(),
      s3.upload(guardianSignatureParams).promise(),
    ]);
    // return the URL of the uploaded file
    return {
      studentSignatureUrl: s3.getSignedUrl("getObject", {
        Bucket: studentSignatureParams.Bucket,
        Key: studentSignatureParams.Key,
      }),
      guardianSignatureUrl: s3.getSignedUrl("getObject", {
        Bucket: guardianSignatureParams.Bucket,
        Key: guardianSignatureParams.Key,
      }),
      studentSignatureKey: studentKey,
      guardianSignatureKey: guardianKey,
    };
  } catch (error) {
    console.error("Error uploading signatures:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}

async function updateScholarship(
  scholarshipId,
  signedPdfKey,
  studentSignature,
  guardianSignature
) {
  const params = {
    TableName: SCHOLARSHIP_TABLE,
    Key: {
      id: scholarshipId,
    },
    UpdateExpression:
      "set #signedContractDoc = :signedContractDoc, studentSignature = :studentSignature, guardianSignature = :guardianSignature",
    ExpressionAttributeNames: {
      "#signedContractDoc": "signedContractDoc",
    },
    ExpressionAttributeValues: {
      ":signedContractDoc": signedPdfKey,
      ":studentSignature": studentSignature,
      ":guardianSignature": guardianSignature,
    },
  };
  await dynamoDB.update(params).promise();
}

async function fetchPdfAsUint8Array(link) {
  const response = await fetch(link);
  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

async function getScholarship(scholarshipId) {
  const params = {
    TableName: SCHOLARSHIP_TABLE,
    Key: {
      id: scholarshipId,
    },
  };
  const { Item } = await dynamoDB.get(params).promise();
  return Item;
}
