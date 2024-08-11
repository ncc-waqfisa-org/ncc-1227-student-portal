// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PDFDocument } from "pdf-lib";

type Data = {
  message?: string;
  data?: any;
};

// TODO: scholarship id should be added
type InputData = {
  link: string; //TODO this should be replaced by the id and have to be taken from the scholarship
  studentSignature: string;
  guardianSignature: string;
};

// Get a Uint8Array from a URL
async function fetchPdfAsUint8Array(url: string): Promise<Uint8Array> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}

async function signPDF(
  link: string,
  studentSignature: string,
  guardianSignature: string
) {
  // Get the pdf buffer
  const pdfBufferUint8Array = await fetchPdfAsUint8Array(link);
  // Load the pdf
  const pdfDoc = await PDFDocument.load(pdfBufferUint8Array);

  // Load the signatures
  const signatureImage = await pdfDoc.embedPng(studentSignature!);
  const secondSignatureImage = await pdfDoc.embedPng(guardianSignature!);

  // Get the last page
  const pages = pdfDoc.getPages();
  const lastPage = pages[pages.length - 1];

  // Adjust these values based on the desired signature size and position
  const signatureWidth = 100;
  const signatureHeight = 50;
  const xPosition = 100; // Position from the left of the page
  const yPosition = 420; // Position from the bottom of the page
  // const xPosition = 70; // Position from the left of the page
  // const yPosition = 30; // Position from the bottom of the page

  // Put the first signature
  lastPage.drawImage(signatureImage, {
    x: xPosition,
    y: yPosition,
    width: signatureWidth,
    height: signatureHeight,
  });

  // Put the second signature
  lastPage.drawImage(secondSignatureImage, {
    x: xPosition,
    y: yPosition + 90,
    width: signatureWidth,
    height: signatureHeight,
  });

  // Get the pdf as Uint8Array
  const signedPdfBytes = await pdfDoc.save();

  // Save the signed PDF
  const blob = new Blob([signedPdfBytes], { type: "application/pdf" });

  return blob;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
  }

  const data: InputData = req.body;

  const blob = await signPDF(
    data.link,
    data.studentSignature,
    data.guardianSignature
  );

  const buffer = Buffer.from(await blob.arrayBuffer());

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=signed_contract.pdf"
  );
  res.end(buffer);
}
