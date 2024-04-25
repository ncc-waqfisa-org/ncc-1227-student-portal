import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { FC, useRef, useState } from "react";
import { Storage } from "aws-amplify";
import SignatureCanvas from "react-signature-canvas";
import { Scholarship } from "../../src/API";
import { Skeleton } from "../Skeleton";
import Link from "next/link";
import PDFPreview from "./PDFViewer";
import { Form, Formik } from "formik";

import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { cn } from "../../src/lib/utils";

import { useAuth } from "../../hooks/use-auth";
import toast from "react-hot-toast";

type TContract = {
  scholarship: Scholarship;
};
type TContractForm = {
  studentSignature: string | null;
  guardianSignature: string | null;
  terms: boolean;
};

export const Contract: FC<TContract> = ({ scholarship }) => {
  const initialValues: TContractForm = {
    studentSignature: null,
    guardianSignature: null,
    terms: false,
  };
  const studentSignatureRef = useRef<SignatureCanvas>(null);
  const guardianSignatureRef = useRef<SignatureCanvas>(null);

  const [studentSignature, setStudentSignature] = useState<string | null>(null);
  const [guardianSignature, setGuardianSignature] = useState<string | null>(
    null
  );
  const { t } = useTranslation("scholarships");
  const { t: tErrors } = useTranslation("errors");
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const token = user?.getSignInUserSession()?.getAccessToken().getJwtToken();

  const { data: link, isPending: isLinkPending } = useQuery<string | null>({
    queryKey: [`applicationLink`],
    queryFn: () => Storage.get(scholarship.unsignedContractDoc ?? ""),
  });

  // The URL for the PDF file from the public folder
  if (isLinkPending) {
    return (
      <div className="max-w-3xl mx-auto">
        <Skeleton className="w-full h-96 bg-slate-300/80" />
      </div>
    );
  }

  return (
    <div className="container flex flex-col max-w-3xl gap-0 mx-auto bg-white border rounded-lg">
      <div className="flex items-center justify-between p-4">
        <p className="text-lg font-semibold">{t("reviewAndSign")}</p>
        {link && (
          <Link
            className="px-4 text-white rounded-md btn btn-md bg-primary"
            target="_blank"
            rel="stylesheet"
            href={link}
          >
            {t("reviewPDF")}
          </Link>
        )}
      </div>

      {/* {link && (
        <div className="py-4 border-t max-sm:hidden">
          <PDFPreview src={link} />
        </div>
      )} */}
      {link && (
        <div className="py-4 border-t ">
          {/* <div className="py-4 border-t sm:hidden"> */}
          <Link
            className="flex flex-col items-center gap-3 p-6 mx-auto font-mono duration-200 border rounded-md hover:bg-secondary/10 w-fit"
            href={link}
            target="_blank"
          >
            <FileIcon />
            <p>{t("contractDocumentPdf")}</p>
          </Link>
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
          studentSignature: yup
            .string()
            .required(`${tErrors("requiredField")}`),
          guardianSignature: yup
            .string()
            .required(`${tErrors("requiredField")}`),
          terms: yup.boolean().isTrue(`${tErrors("terms")}`),
        })}
        onSubmit={async (values, actions) => {
          {
            const dataToCall = {
              scholarshipId: scholarship.id,
              studentSignature,
              guardianSignature,
            };

            await toast
              .promise(
                fetch(
                  "https://ve2qneezfb.execute-api.us-east-1.amazonaws.com/default/scholarships/sign",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      ...(token && { Authorization: `Bearer ${token}` }),
                    },
                    body: JSON.stringify(dataToCall),
                  }
                ),
                {
                  loading: t("processing"),
                  success: t("submittedSuccessfully"),
                  error: (error) => `${error.message}`,
                }
              )
              .then(async (res) => {
                const data = await res.json();

                queryClient.invalidateQueries({ queryKey: ["scholarships"] });
                queryClient.invalidateQueries({
                  queryKey: [`scholarships/${scholarship.id}`],
                });
              });
          }
          actions.setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          handleBlur,
          isSubmitting,
          isValid,
        }) => (
          <Form className="flex flex-col items-start gap-3">
            <div className="flex flex-wrap justify-center w-full gap-6 p-4 border-t sm:justify-between">
              <div className="flex flex-col gap-3 w-fit">
                <div className="flex items-center justify-between gap-1">
                  <p>{t("studentSignature")}</p>
                  <div
                    onClick={() => {
                      setFieldValue("studentSignature", "");
                      studentSignatureRef.current?.clear();
                    }}
                    className="flex items-center gap-1 btn hover:bg-warning/30 btn-ghost btn-xs"
                  >
                    <XIcon size={18} /> <p>{t("clear")}</p>
                  </div>
                </div>
                <div
                  className={cn(
                    " bg-white border rounded-md   w-fit overflow-clip",
                    errors.studentSignature && "border-error"
                  )}
                >
                  <SignatureCanvas
                    ref={studentSignatureRef}
                    onEnd={() => {
                      const signature =
                        studentSignatureRef.current
                          ?.getTrimmedCanvas()
                          .toDataURL() ?? null;

                      setFieldValue("studentSignature", signature);

                      setStudentSignature(signature);
                    }}
                    penColor="black"
                    canvasProps={{
                      width: "266",
                      height: "166",
                      className: "sigCanvas",
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-1">
                  <p>{t("guardianSignature")}</p>
                  <div
                    onClick={() => {
                      setFieldValue("guardianSignature", "");
                      guardianSignatureRef.current?.clear();
                    }}
                    className="flex items-center gap-1 btn hover:bg-warning/30 btn-ghost btn-xs"
                  >
                    <XIcon size={18} /> <p>{t("clear")}</p>
                  </div>
                </div>
                <div
                  className={cn(
                    "  border rounded-md bg-white w-fit overflow-clip",
                    errors.guardianSignature && "border-error"
                  )}
                >
                  <SignatureCanvas
                    ref={guardianSignatureRef}
                    onEnd={() => {
                      const signature =
                        guardianSignatureRef.current
                          ?.getTrimmedCanvas()
                          .toDataURL() ?? null;

                      setFieldValue("guardianSignature", signature);

                      setGuardianSignature(signature);
                    }}
                    penColor="black"
                    canvasProps={{
                      width: "266",
                      height: "166",
                      className: "sigCanvas",
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 px-4 mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  checked={values.terms}
                />
                <label
                  htmlFor="terms"
                  className={cn("ml-2", errors.terms && "text-error")}
                >
                  {t("terms")}
                </label>
              </div>
              {/* Submit */}
              <button
                disabled={isSubmitting || !isValid}
                className={cn("btn w-fit")}
              >
                {isSubmitting && <span className="loading"></span>}
                {t("signAndContinue")}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

function FileIcon(props: { size?: number; className?: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}

function XIcon(props: { size?: number; className?: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width={props.size ?? 24}
      height={props.size ?? 24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
