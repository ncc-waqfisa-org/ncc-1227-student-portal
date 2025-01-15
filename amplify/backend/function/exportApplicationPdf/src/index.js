/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();
const s3 = new AWS.S3();
const pdfKit = require("pdfkit");

const {
  ApplicationTable: APPLICATION_TABLE,
  StudentTable: STUDENT_TABLE,
  UniversityTable: UNIVERSITY_TABLE,
  ProgramTable: PROGRAM_TABLE,
  ParentInfoTable: PARENT_INFO_TABLE,
  AdminTable: ADMIN_TABLE,
  S3Bucket: S3_BUCKET,
} = {
  ApplicationTable: "Application-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  StudentTable: "Student-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  UniversityTable: "University-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  ProgramTable: "Program-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  ParentInfoTable: "ParentInfo-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  AdminTable: "Admin-q4lah3ddkjdd3dwtif26jdkx6e-masterdev",
  S3Bucket: "amplify-ncc-masterdev-2e2e0-deployment",
};

const arabicLocal = {
  BAHRAINI: "بحريني",
  NON_BAHRAINI: "غير بحريني",
  PUBLIC: "حكومية",
  PRIVATE: "خاصة",
  LESS_THAN_1500: "أقل من ألف وخمسمائة دينار بحريني",
  MORE_THAN_1500: "أكثر من ألف وخمسمائة دينار بحريني",
  LESS_THAN_500: "أقل من خمسمائة دينار بحريني",
  BETWEEN_500_AND_700: "بين خمسمائة وسبعمائة دينار بحريني",
  OVER_1000: "أكثر من ألف دينار بحريني",
  REJECTED: "مرفوض",
  APPROVED: "مقبول",
  NOT_COMPLETED: "غير مكتمل",
  ELIGIBLE: "مؤهل",
  AWAITING_VERIFICATION: "في انتظار التحقق",
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  const isAdmin = await checkIsAdmin(event.headers?.authorization?.slice(7));
  if (!isAdmin) {
    return {
      statusCode: 403,
      body: JSON.stringify({ message: "Forbidden. You are not an admin" }),
    };
  }
  const applicationId = event.queryStringParameters?.applicationId;
  const lang = event.queryStringParameters?.lang || "en";
  if (!applicationId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing applicationId" }),
    };
  }
  try {
    const application = await getApplication(applicationId);
    if (!application) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Application not found" }),
      };
    }
    console.log("Application:", application);
    const program = application.programID
      ? await getProgram(application.programID)
      : null;
    console.log("Program:", program);
    const university = application.universityID
      ? await getUniversity(application.universityID)
      : null;
    console.log("University:", university);
    const student = await getStudent(application.studentCPR);

    const parent = await getParentInfo(student.parentInfoID);
    let pdfBuffer;
    if (lang === "ar") {
      pdfBuffer = await generateArabicPdf(
        application,
        program,
        university,
        parent,
        student
      );
    } else {
      pdfBuffer = await generatePdf(
        application,
        program,
        university,
        parent,
        student
      );
    }
    const pdfUrl = await uploadToS3(pdfBuffer);
    return {
      statusCode: 200,
      body: JSON.stringify({ url: pdfUrl }),
    };
  } catch (error) {
    console.error("Error exporting application", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error exporting application" }),
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
    body: JSON.stringify("Hello from Lambda!"),
  };
};

async function getApplication(applicationId) {
  const params = {
    TableName: APPLICATION_TABLE,
    Key: {
      id: applicationId,
    },
  };
  const { Item } = await dynamoDB.get(params).promise();
  return Item;
}

async function generatePdf(application, program, university, parent, student) {
  const logoUrl =
    "https://amplify-ncc-staging-65406-deployment.s3.amazonaws.com/waqfisa_logo.png";
  const imageBuffer = await fetchImage(logoUrl);
  const labelFontSize = 12;
  const valueFontSize = 10;

  // Generate PDF
  const doc = new pdfKit();
  // set the line height
  doc.lineGap(2);
  const pdfBuffer = [];
  doc.on("data", (chunk) => {
    pdfBuffer.push(chunk);
  });
  // Using a Promise to handle the asynchronous operation
  const pdfPromise = new Promise((resolve, reject) => {
    doc.on("end", () => {
      resolve(Buffer.concat(pdfBuffer));
    });
    doc.on("error", reject);
  });
  // Add logo, top center
  doc.image(imageBuffer, 240, 20, { width: 120 });

  // add a line under the title and logo
  doc.moveTo(25, 80).lineTo(600, 80).stroke();
  // add today's date under the line in dd/mm/yyyy format
  doc
    .font("./fonts/Almarai.ttf")
    .fontSize(8)
    .text(new Date().toLocaleDateString(), 20, 85);
  // take a gap
  doc.text(" ");
  // add a "to whom it may concern" text
  // doc.font('./fonts/Almarai.ttf').fontSize(14).text('To Whom It May Concern', {align: 'center', underline: true});
  // doc.text(' ');
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .fontSize(valueFontSize)
    .text(
      "This is to certify that the following student has applied for the Waqf Isa scholarship program. The application details are as follows:"
    );
  doc.text("Status: ", { continued: true });
  doc.text(application.status);
  doc.text("Batch: ", { continued: true });
  doc.text(application.batch);
  // take a gap
  doc.text(" ");

  doc
    .font("./fonts/Almarai-Bold.ttf")
    .fontSize(labelFontSize)
    .text("Student Details:");
  doc
    .font("./fonts/Almarai.ttf")
    .fontSize(valueFontSize)
    .text("Name: ", { continued: true });
  doc.text(application.studentName, { features: ["rtla"] });
  doc.text("CPR: ", { continued: true });
  doc.text(application.studentCPR);
  doc.text("Nationality: ", { continued: true });
  doc.text(application.nationalityCategory);
  doc.text("GPA: ", { continued: true });
  doc.text(application.gpa + "%");
  doc.text("Verified GPA: ", { continued: true });
  doc.text(
    application.verifiedGPA
      ? application.verifiedGPA + "%"
      : "Awaiting verification"
  );
  doc.text("School Name: ", { continued: true });
  doc.text(application.schoolName, { features: ["rtla"] });
  doc.text("School Type: ", { continued: true });
  doc.text(application.schoolType);
  doc.text("Address: ", { continued: true });
  doc.text(student.address, { features: ["rtla"] });

  doc.text("Email: ", { continued: true });
  doc.text(student.email);
  doc.text("Phone: ", { continued: true });
  doc.text(student.phone);
  // take a gap
  doc.text(" ");
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .fontSize(labelFontSize)
    .text("Parents Details:");

  doc
    .font("./fonts/Almarai.ttf")
    .fontSize(valueFontSize)
    .text("Guardian Name: ", { continued: true });
  doc.text(parent.guardianFullName, { features: ["rtla"] });
  doc.text("Guardian CPR: ", { continued: true });
  doc.text(parent.guardianCPR);
  if (parent.fatherFullName) {
    doc.text("Father Name: ", { continued: true });
    doc.text(parent.fatherFullName ?? "-", { features: ["rtla"] });
    doc.text("Father CPR: ", { continued: true });
    doc.text(parent.fatherCPR ?? "-");
  }

  if (parent.motherFullName) {
    doc.text("Mother Name: ", { continued: true });
    // align the text to the right
    doc.text(parent.motherFullName ?? "-", { features: ["rtla"] });

    doc.text("Mother CPR: ", { continued: true });
    doc.text(parent.motherCPR ?? "-");
  }

  doc.text("Family Income: ", { continued: true });
  doc.text(application.familyIncome);
  // take a gap
  doc.text(" ");
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .fontSize(labelFontSize)
    .text("Desired Program:");
  if (program) {
    doc
      .font("./fonts/Almarai.ttf")
      .fontSize(valueFontSize)
      .text(`${program.name} - ${university.name}`);
  } else {
    doc.font("./fonts/Almarai.ttf").fontSize(valueFontSize).text("N/A");
  }
  doc.text(" ");
  doc
    .font("./fonts/Almarai.ttf")
    .fontSize(valueFontSize)
    .text(`ID: ${application.id}`);

  doc.text(" ");
  doc.text(" ");
  // horizontal line
  doc.lineJoin("round").moveTo(20, 590).rect(20, 590, 580, 115).stroke();
  // vertical line in the middle between the student signature and the parent signature
  doc.moveTo(400, 590).lineTo(400, 705).stroke();
  doc.text("Comments", 30, 600);
  doc.text("Signatures", 420, 600);
  doc.moveTo(415, 650).lineTo(585, 650).stroke();
  doc.moveTo(415, 690).lineTo(585, 690).stroke();

  doc
    .font("./fonts/Almarai.ttf")
    .fontSize(8)
    .text(
      "This document is generated by Waqf Isa system. All rights reserved " +
        new Date().getFullYear(),
      20,
      710
    );

  // Finalize PDF file
  doc.end();
  // Wait for the PDF generation to finish and return the result
  return await pdfPromise;
}

async function generateArabicPdf(
  application,
  program,
  university,
  parent,
  student
) {
  const logoUrl =
    "https://amplify-ncc-staging-65406-deployment.s3.amazonaws.com/waqfisa_logo.png";
  const imageBuffer = await fetchImage(logoUrl);
  const labelFontSize = 12;
  const valueFontSize = 11;

  // Generate PDF
  const doc = new pdfKit();
  doc.lineGap(4);
  const pdfBuffer = [];
  doc.on("data", (chunk) => {
    pdfBuffer.push(chunk);
  });
  const pdfPromise = new Promise((resolve, reject) => {
    doc.on("end", () => {
      resolve(Buffer.concat(pdfBuffer));
    });
    doc.on("error", reject);
  });
  doc.image(imageBuffer, 240, 20, { width: 120 });
  doc.moveTo(20, 80).lineTo(600, 80).stroke();
  doc
    .font("./fonts/Almarai.ttf")
    .fontSize(10)
    .text(new Date().toLocaleDateString(), 20, 95, { features: ["rtla"] });
  doc.text(" ");
  // doc.font('./fonts/Almarai.ttf').fontSize(14).text('إلى من يهمه الأمر', {align: 'center', underline: true, features: ['rtla']});
  // doc.text(' ');
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .fontSize(valueFontSize)
    .text(
      "نشهد بأن الطالب التالي قد قدم طلب لبرنامج وقف عيسى. تفاصيل الطلب كما يلي:",
      { features: ["rtla"], align: "right" }
    );

  doc
    .font("./fonts/Almarai-Bold.ttf")
    .text("الحالة: ", { align: "right", features: ["rtla"], underline: true })
    .font("./fonts/Almarai.ttf")
    .text(arabicLocal[application.status], { align: "right" });
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .text("الدفعة: ", { align: "right", features: ["rtla"], underline: true })
    .font("./fonts/Almarai.ttf")
    .text(application.batch, { align: "right" });
  doc.text(" ");
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .fontSize(labelFontSize)
    .text("تفاصيل الطالب:", { features: ["rtla"], align: "right" });
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .fontSize(valueFontSize)
    .text("الاسم:", { align: "right", features: ["rtla"], underline: true })
    .font("./fonts/Almarai.ttf")
    .text(application.studentName, { align: "right", features: ["rtla"] });

  doc
    .font("./fonts/Almarai-Bold.ttf")
    .text("رقم البطاقة الذكية: ", {
      align: "right",
      features: ["rtla"],
      underline: true,
    })
    .font("./fonts/Almarai.ttf")
    .text(application.studentCPR, { align: "right" });
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .text("الجنسية: ", { align: "right", features: ["rtla"], underline: true })
    .font("./fonts/Almarai.ttf")
    .text(arabicLocal[application.nationalityCategory], { align: "right" });
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .text("المعدل: ", { align: "right", features: ["rtla"], underline: true })
    .font("./fonts/Almarai.ttf")
    .text(application.gpa + "%", { align: "right" });
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .text("المعدل الموثق: ", {
      align: "right",
      features: ["rtla"],
      underline: true,
    })
    .font("./fonts/Almarai.ttf")
    .text(
      application.verifiedGPA ? application.verifiedGPA : "في انتظار التحقق",
      { align: "right", features: ["rlta"] }
    );

  doc
    .font("./fonts/Almarai-Bold.ttf")
    .text("اسم المدرسة: ", {
      align: "right",
      features: ["rtla"],
      underline: true,
    })
    .font("./fonts/Almarai.ttf")
    .text(application.schoolName, { align: "right", features: ["rtla"] });
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .text("نوع المدرسة: ", {
      align: "right",
      features: ["rtla"],
      underline: true,
    })
    .font("./fonts/Almarai.ttf")
    .text(arabicLocal[application.schoolType], {
      align: "right",
      features: ["rtla"],
    });
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .text("العنوان: ", { align: "right", features: ["rtla"], underline: true })
    .font("./fonts/Almarai.ttf")
    .text(student.address, { align: "right", features: ["rtla"] });
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .text("البريد الإلكتروني: ", {
      align: "right",
      features: ["rtla"],
      underline: true,
    })
    .font("./fonts/Almarai.ttf")
    .text(student.email, { align: "right", features: ["rtla"] });
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .text("رقم الهاتف: ", {
      align: "right",
      features: ["rtla"],
      underline: true,
    })
    .font("./fonts/Almarai.ttf")
    .text(student.phone, { align: "right", features: ["rtla"] });
  doc.text(" ");
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .fontSize(labelFontSize)
    .text("تفاصيل الأهل:", { features: ["rtla"], align: "right" });

  doc
    .font("./fonts/Almarai-Bold.ttf")
    .text("اسم ولي الأمر: ", {
      align: "right",
      features: ["rtla"],
      underline: true,
    })
    .font("./fonts/Almarai.ttf")
    .text(parent.guardianFullName, { align: "right", features: ["rtla"] });
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .text("رقم البطاقة الذكية لولي الأمر: ", {
      align: "right",
      features: ["rtla"],
      underline: true,
    })
    .font("./fonts/Almarai.ttf")
    .text(parent.guardianCPR, { align: "right", features: ["rtla"] });

  if (parent.fatherFullName) {
    doc
      .font("./fonts/Almarai-Bold.ttf")
      .fontSize(valueFontSize)
      .text("اسم الأب: ", {
        align: "right",
        features: ["rtla"],
        underline: true,
      })
      .font("./fonts/Almarai.ttf")
      .text(parent.fatherFullName ?? "-", {
        align: "right",
        features: ["rtla"],
      });
    doc
      .font("./fonts/Almarai-Bold.ttf")
      .font("./fonts/Almarai-Bold.ttf")
      .text("رقم البطاقة الذكية للأب: ", {
        align: "right",
        features: ["rtla"],
        underline: true,
      })
      .font("./fonts/Almarai.ttf")
      .text(parent.fatherCPR ?? "-", { align: "right", features: ["rtla"] });
  }

  if (parent.motherFullName) {
    doc
      .font("./fonts/Almarai-Bold.ttf")
      .text("اسم الأم: ", {
        align: "right",
        features: ["rtla"],
        underline: true,
      })
      .font("./fonts/Almarai.ttf")
      .text(parent.motherFullName ?? "-", {
        align: "right",
        features: ["rtla"],
      });
    doc
      .font("./fonts/Almarai-Bold.ttf")
      .text("رقم البطاقة الذكية للأم: ", {
        align: "right",
        features: ["rtla"],
        underline: true,
      })
      .font("./fonts/Almarai.ttf")
      .text(parent.motherCPR ?? "-", { align: "right", features: ["rtla"] });
  }

  doc
    .font("./fonts/Almarai-Bold.ttf")
    .text("الدخل الشهري: ", {
      align: "right",
      features: ["rtla"],
      underline: true,
    })
    .font("./fonts/Almarai.ttf")
    .text(arabicLocal[application.familyIncome], {
      align: "right",
      features: ["rtla"],
    });
  doc.text(" ");
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .fontSize(labelFontSize)
    .text("البرنامج المطلوب:", { features: ["rtla"], align: "right" });
  if (program) {
    doc
      .font("./fonts/Almarai.ttf")
      .fontSize(valueFontSize)
      .text(`${program.nameAr} - ${university.nameAr}`, {
        align: "right",
        features: ["rtla"],
      });
  } else {
    doc
      .font("./fonts/Almarai.ttf")
      .fontSize(valueFontSize)
      .text("غير متوفر", { align: "right", features: ["rtla"] });
  }
  doc.text(" ");
  doc
    .font("./fonts/Almarai-Bold.ttf")
    .fontSize(valueFontSize)
    .text("الرقم: ", { align: "right", features: ["rtla"], underline: true })
    .font("./fonts/Almarai.ttf")
    .text(application.id, { align: "right" });
  doc.text(" ");
  doc.text(" ");
  // horizontal line
  doc.lineJoin("round").moveTo(20, 590).rect(20, 590, 580, 115).stroke();
  // vertical line in the middle between the student signature and the parent signature
  doc.moveTo(400, 590).lineTo(400, 705).stroke();
  doc.text("التعليقات", 330, 600);
  doc.text("التواقيع", 480, 600);
  doc.moveTo(415, 630).lineTo(585, 630).stroke();
  doc.moveTo(415, 670).lineTo(585, 670).stroke();

  doc
    .font("./fonts/Almarai.ttf")
    .fontSize(8)
    .text(
      "هذا المستند تم إنشاؤه بواسطة نظام وقف عيسى. جميع الحقوق محفوظة ",
      20,
      710
    );

  doc.end();
  return await pdfPromise;
}

async function uploadToS3(pdfBuffer) {
  const params = {
    Bucket: S3_BUCKET,
    Key: `applications/application-${Date.now()}.pdf`,
    Body: pdfBuffer,
    ContentType: "application/pdf",
  };
  await s3.upload(params).promise();
  return s3.getSignedUrl("getObject", {
    Bucket: params.Bucket,
    Key: params.Key,
  });
}

async function getProgram(programId) {
  const params = {
    TableName: PROGRAM_TABLE,
    Key: {
      id: programId,
    },
  };
  const { Item } = await dynamoDB.get(params).promise();
  return Item;
}

async function getUniversity(universityId) {
  const params = {
    TableName: UNIVERSITY_TABLE,
    Key: {
      id: universityId,
    },
  };
  const { Item } = await dynamoDB.get(params).promise();
  return Item;
}

async function getParentInfo(parentInfoId) {
  const params = {
    TableName: PARENT_INFO_TABLE,
    Key: {
      id: parentInfoId,
    },
  };
  const { Item } = await dynamoDB.get(params).promise();
  return Item;
}

async function getStudent(cpr) {
  const params = {
    TableName: STUDENT_TABLE,
    Key: {
      cpr: cpr,
    },
  };
  const { Item } = await dynamoDB.get(params).promise();
  return Item;
}

async function fetchImage(url) {
  const response = await fetch(url);
  return response.arrayBuffer();
}

async function checkIsAdmin(token) {
  try {
    const cognitoUser = await cognito.getUser({ AccessToken: token }).promise();
    const username = cognitoUser.Username;

    const params = {
      TableName: ADMIN_TABLE,
      Key: {
        cpr: username,
      },
    };
    const { Item } = await dynamoDB.get(params).promise();
    return Item !== undefined;
  } catch (error) {
    console.error("Error checking if user is admin", error);
    return false;
  }
}
