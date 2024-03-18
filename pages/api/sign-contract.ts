// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PDFDocument } from "pdf-lib";

type Data = {
  message?: string;
  data?: any;
};

// TODO: scholarship id should be added
type InputData = { studentSignature: string; guardianSignature: string };

// Get a Uint8Array from a URL
async function fetchPdfAsUint8Array(url: string): Promise<Uint8Array> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return new Uint8Array(buffer);
}

// TODO: get this url from the scholarship
const pdfUrl = "https://api.printnode.com/static/test/pdf/multipage.pdf";

async function signPDF(studentSignature: string, guardianSignature: string) {
  // Get the pdf buffer
  const pdfBufferUint8Array = await fetchPdfAsUint8Array(pdfUrl);
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
  const xPosition = 50; // Position from the left of the page
  // const xPosition = lastPage.getWidth() / 2 - signatureWidth / 2; //* Center horizontally
  const yPosition = 20; // Position from the bottom of the page

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
    y: yPosition + 60,
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

  const blob = await signPDF(data.studentSignature, data.guardianSignature);
  const buffer = Buffer.from(await blob.arrayBuffer());

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=signed_contract.pdf"
  );
  res.end(buffer);
}
