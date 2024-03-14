import { useQuery } from "@tanstack/react-query";
import React, { FC, useRef, useState } from "react";
import { Storage } from "aws-amplify";
import SignatureCanvas from "react-signature-canvas";
import { Application } from "../../src/API";
import { Skeleton } from "../Skeleton";
import Link from "next/link";
import Image from "next/image";
import { PDFDocument } from "pdf-lib";
import { useAuth } from "../../hooks/use-auth";
import { Button } from "@aws-amplify/ui-react";

type TContract = {
  application: Application;
};

export const Contract: FC<TContract> = ({ application }) => {
  const studentSignatureRef = useRef<SignatureCanvas>(null);
  const guardianSignatureRef = useRef<SignatureCanvas>(null);

  const { user } = useAuth();

  const [studentSignature, setStudentSignature] = useState<string | null>(null);
  const [guardianSignature, setGuardianSignature] = useState<string | null>(
    null
  );

  //   let link = await Storage.get(key);

  const { data: link, isPending: isLinkPending } = useQuery<string | null>({
    queryKey: [`applicationLink`],
    queryFn: () =>
      Storage.get(application.programs?.items[0]?.acceptanceLetterDoc ?? ""),
  });

  // The URL for the PDF file from the public folder
  if (isLinkPending) {
    return (
      <div>
        <Skeleton className="w-full h-96 bg-slate-300/80" />
      </div>
    );
  }

  return (
    <div className="container flex flex-col gap-6 mx-auto">
      <div className="p-20 bg-slate-200">
        <p>
          Please review the PDF below and sign it if everything is fine and you
          agree on it.
        </p>
        <Link
          className="btn"
          target="_blank"
          rel="stylesheet"
          href="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
        >
          PDF
        </Link>
      </div>
      <div>
        <div className="flex items-center">
          <input type="checkbox" id="terms" name="terms" required />
          <label htmlFor="terms" className="ml-2">
            I have read and agree to the terms in the contract
          </label>
        </div>
      </div>
      <div className="flex flex-wrap justify-center w-full gap-6 md:grid-cols-2">
        <div className="flex flex-col w-full max-w-sm gap-3">
          <p>Student Signature</p>
          <div className="h-40 bg-white border rounded-md border-secondary overflow-clip">
            <SignatureCanvas
              ref={studentSignatureRef}
              penColor="black"
              canvasProps={{
                width: "500",
                height: "300",
                className: "sigCanvas",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col w-full max-w-sm gap-3">
          <p>Guardian Signature</p>
          <div className="h-40 bg-white border rounded-md border-secondary overflow-clip">
            <SignatureCanvas
              ref={guardianSignatureRef}
              penColor="black"
              canvasProps={{
                width: "500",
                height: "300",
                className: "sigCanvas",
              }}
            />
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          setStudentSignature(
            studentSignatureRef.current?.getTrimmedCanvas().toDataURL() ?? null
          );
          setGuardianSignature(
            guardianSignatureRef.current?.getTrimmedCanvas().toDataURL() ?? null
          );
        }}
      >
        CLICk
      </div>
      <div>
        {studentSignature && (
          <Image width={400} height={300} src={studentSignature} alt={""} />
        )}
        {guardianSignature && (
          <Image width={400} height={300} src={guardianSignature} alt={""} />
        )}
      </div>
    </div>
  );
};

async function signPDF(
  pdfBuffer: ArrayBuffer,
  signaturePngBuffer: ArrayBuffer
) {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const signatureImage = await pdfDoc.embedPng(signaturePngBuffer);

  const pages = pdfDoc.getPages();
  const lastPage = pages[pages.length - 1];

  // Adjust these values based on the desired signature size and position
  const signatureWidth = 100;
  const signatureHeight = 50;
  const xPosition = lastPage.getWidth() / 2 - signatureWidth / 2; // Center horizontally
  const yPosition = 10; // Position from the bottom of the page

  lastPage.drawImage(signatureImage, {
    x: xPosition,
    y: yPosition,
    width: signatureWidth,
    height: signatureHeight,
  });

  const signedPdfBytes = await pdfDoc.save();

  // Save the signed PDF
  const blob = new Blob([signedPdfBytes], { type: "application/pdf" });
  console.log(blob);
}
