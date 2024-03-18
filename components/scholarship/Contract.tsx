import { useQuery } from "@tanstack/react-query";
import React, { FC, useEffect, useRef, useState } from "react";
import { Storage } from "aws-amplify";
import SignatureCanvas from "react-signature-canvas";
import { Application } from "../../src/API";
import { Skeleton } from "../Skeleton";
import Link from "next/link";
import Image from "next/image";
import PDFPreview from "./PDFViewer";
import { divide } from "lodash";

type TContract = {
  application: Application;
};

export const Contract: FC<TContract> = ({ application }) => {
  const studentSignatureRef = useRef<SignatureCanvas>(null);
  const guardianSignatureRef = useRef<SignatureCanvas>(null);

  const [studentSignature, setStudentSignature] = useState<string | null>(null);
  const [guardianSignature, setGuardianSignature] = useState<string | null>(
    null
  );

  // const [pdfBuffer, setPdfBuffer] = useState<Uint8Array | null>(null);
  // const [isPdfFetching, setIsPdfFetching] = useState<boolean>(true);
  // const [pdf, setPdf] = useState<Uint8Array | null>(null);

  // useEffect(() => {
  //   async function fetchPdfAsUint8Array(url: string): Promise<Uint8Array> {
  //     const response = await fetch(url);
  //     const buffer = await response.arrayBuffer();
  //     return new Uint8Array(buffer);
  //   }

  //   fetchPdfAsUint8Array(
  //     "https://api.printnode.com/static/test/pdf/multipage.pdf"
  //   )
  //     .then((buffer) => {
  //       console.log("done getting the pdf");
  //       setPdfBuffer(buffer);
  //     })
  //     .catch((err) => console.log(err))
  //     .finally(() => {
  //       setIsPdfFetching(false);
  //     });

  //   return () => {};
  // }, []);

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
    <div className="container flex flex-col gap-0 mx-auto max-w-3xl border rounded-lg bg-white">
      <div className="flex items-center justify-between  p-4">
        <p className="text-lg font-semibold">Review and Sign</p>
        {link && (
          <Link
            className="btn btn-md  bg-primary text-white rounded-md px-4"
            target="_blank"
            rel="stylesheet"
            href={link}
          >
            Review PDF
          </Link>
        )}
      </div>

      {link && (
        <div className="max-sm:hidden border-t py-4">
          <PDFPreview
            src={link}
            // src={"https://api.printnode.com/static/test/pdf/multipage.pdf"}
          />
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 w-full  border-t  p-4">
        <div className="flex flex-col w-full gap-3">
          <p>Student Signature</p>
          <div className=" bg-white border rounded-md   w-fit overflow-clip">
            <SignatureCanvas
              ref={studentSignatureRef}
              penColor="black"
              canvasProps={{
                // width: "500",
                // height: "300",
                width: "266",
                height: "166",
                className: "sigCanvas",
              }}
            />
          </div>
        </div>
        <div className="flex flex-col  gap-3">
          <p>Guardian Signature</p>
          <div className="  border rounded-md bg-white w-fit overflow-clip">
            <SignatureCanvas
              ref={guardianSignatureRef}
              penColor="black"
              canvasProps={{
                width: "266",
                height: "166",
                // width: "500",
                // height: "300",
                className: "sigCanvas",
              }}
            />
          </div>
        </div>
      </div>
      <div className="px-4 flex flex-col gap-3 mb-4">
        <div className="flex items-center">
          <input type="checkbox" id="terms" name="terms" required />
          <label htmlFor="terms" className="ml-2">
            I have read and agree to the terms in the contract
          </label>
        </div>
        <div
          className="btn w-fit"
          onClick={() => {
            const studentSignature = studentSignatureRef.current
              ?.getTrimmedCanvas()
              .toDataURL();
            const guardianSignature = guardianSignatureRef.current
              ?.getTrimmedCanvas()
              .toDataURL();

            fetch("/api/sign-contract", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                link,
                studentSignature,
                guardianSignature,
              }),
            }).then(async (res) => {
              const blob = await res.blob();
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "signed_contract.pdf";
              document.body.appendChild(a);
              a.click();
              a.remove();
            });

            // guardianSignatureRef.current?.getTrimmedCanvas().toDataURL();
            // signPDF(

            //   studentSignatureRef.current?.getTrimmedCanvas().toDataURL() ?? null,
            //   guardianSignatureRef.current?.getTrimmedCanvas().toDataURL() ?? null
            // );

            setStudentSignature(
              studentSignatureRef.current?.getTrimmedCanvas().toDataURL() ??
                null
            );
            setGuardianSignature(
              guardianSignatureRef.current?.getTrimmedCanvas().toDataURL() ??
                null
            );
          }}
        >
          Sign and Submit
        </div>
      </div>
      {/* <div>
        {studentSignature && (
          <Image width={400} height={300} src={studentSignature} alt={""} />
        )}
        {guardianSignature && (
          <Image width={400} height={300} src={guardianSignature} alt={""} />
        )}
      </div> */}
    </div>
  );
};
