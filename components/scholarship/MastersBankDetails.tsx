import React, { FC, useState } from "react";
import {
  MasterScholarship,
  UpdateMasterScholarshipMutationVariables,
  UpdateScholarshipMutationVariables,
} from "../../src/API";
import { Formik, Form, Field } from "formik";
import MultiUpload from "../MultiUpload";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import {
  DocType,
  updateMasterScholarshipInDB,
  updateScholarshipInDB,
  uploadFile,
} from "../../src/CustomAPI";
import { useAuth } from "../../hooks/use-auth";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "../../src/lib/utils";

type TBankDetails = {
  scholarship: MasterScholarship;
};

export const MastersBankDetails: FC<TBankDetails> = ({ scholarship }) => {
  const [IBANLetterDocsFile, setIBANLetterDocsFile] = useState<File[]>([]);
  const [IBANLetterInvalid, setIBANLetterInvalid] = useState(
    IBANLetterDocsFile.length === 0
  );
  const initialValues = {
    bankName: scholarship.bankName || "",
    IBAN: scholarship.IBAN || "",
    IBANLetterDoc: [],
    IBANLetterInvalid: IBANLetterInvalid,
  };

  const { t } = useTranslation("scholarships");
  const { t: tErrors } = useTranslation("errors");
  const { t: tToast } = useTranslation("toast");
  const queryClient = useQueryClient();

  const { cpr } = useAuth();

  const updateMasterBankDetailsMutation = useMutation({
    mutationFn: (values: {
      bankName: string;
      IBAN: string;
      IBANLetterDoc: string;
    }) => {
      const vars: UpdateMasterScholarshipMutationVariables = {
        input: {
          id: scholarship.id,
          _version: scholarship._version,
          ...values,
        },
      };
      return updateMasterScholarshipInDB(vars);
    },
    async onSuccess(data) {
      if (data) {
        queryClient.invalidateQueries({
          queryKey: ["mastersScholarships", scholarship.studentCPR],
        });
        queryClient.invalidateQueries({
          queryKey: [`masters/scholarships/${scholarship.id}`],
        });
      } else {
        throw Error(`EB0001 ${tToast("failedToSubmit") ?? "Failed to submit"}`);
      }
    },
    async onError(error) {
      toast.error(error.message, { duration: 6000 });
    },
  });

  async function handleBankDetailsSubmit(values: {
    bankName: string;
    IBAN: string;
  }) {
    if (!cpr) {
      throw Error(`EB0002 ${tToast("failedToSubmit") ?? "Failed to submit"}`);
    }

    const ibanLetterDocStorage = await uploadFile(
      IBANLetterDocsFile[0],
      DocType.BANK_LETTER,
      cpr
    );

    if (!ibanLetterDocStorage) {
      throw Error(
        `EB0003 ${
          tToast("failedToUploadFiles") ?? "Failed to upload the document"
        }`
      );
    }

    const dataToCall = {
      bankName: values.bankName,
      IBAN: values.IBAN,
      IBANLetterDoc: ibanLetterDocStorage,
    };

    if (ibanLetterDocStorage) {
      await updateMasterBankDetailsMutation.mutateAsync(dataToCall);
    }
  }

  return (
    <div className="flex flex-col gap-4 mx-auto max-w-3xl">
      <h3 className="text-xl font-medium">{t("bankDetailsForApplicant")}</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          try {
            await toast.promise(handleBankDetailsSubmit(values), {
              loading: t("processing"),
              success: t("submittedSuccessfully"),
              error: (error) => `${error.message}`,
            });
          } catch (error) {
            if (error instanceof Error) {
              toast.error(`Error: ${error.message}`);
            } else {
              toast.error("Something went wrong");
            }
          }
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object({
          bankName: yup.string().required(`${tErrors("requiredField")}`),
          IBAN: yup.string().required(`${tErrors("requiredField")}`),
          // IBANLetterDoc: yup.array(yup.string()),
          IBANLetterInvalid: yup.boolean().isFalse(`${tErrors("invalid")}`),
        })}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          setFieldError,
          setFieldValue,
          validateField,
        }) => (
          <Form className="grid gap-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col justify-start w-full">
                <div className="flex items-center">
                  <label className="label">{t("bankName")}</label>
                  <label className="text-error label">*</label>{" "}
                  <label className="label-text-alt text-error">
                    {errors.bankName && touched.bankName && errors.bankName}
                  </label>
                </div>
                <Field
                  dir="ltr"
                  type="text"
                  name="bankName"
                  title="bankName"
                  className={`input input-bordered input-primary ${
                    errors.bankName && touched.bankName && "input-error"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bankName}
                />
              </div>
              <div className="flex flex-col justify-start w-full">
                <div className="flex items-center">
                  <label className="label">{t("IBAN")}</label>
                  <label className="text-error label">*</label>{" "}
                  <label className="label-text-alt text-error">
                    {errors.IBAN && touched.IBAN && errors.IBAN}
                  </label>
                </div>
                <Field
                  dir="ltr"
                  type="text"
                  name="IBAN"
                  title="IBAN"
                  className={`input input-bordered input-primary ${
                    errors.IBAN && touched.IBAN && "input-error"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.IBAN}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <MultiUpload
                single
                required
                onFiles={setIBANLetterDocsFile}
                isInvalid={(isInvalid) => {
                  setFieldValue("IBANLetterInvalid", isInvalid);
                  setIBANLetterInvalid(isInvalid);
                }}
                handleChange={handleChange}
                handleOnClear={() => {
                  setIBANLetterDocsFile([]);
                }}
                value={values.IBANLetterDoc ?? ""}
                filedName={"IBANLetterDoc"}
                title={`${t("ibanLetter")} ${t("document")}`}
              ></MultiUpload>
              <p className="stat-desc">{t("proofOfIBANLetter")}</p>
            </div>

            <button
              className={cn("my-3 text-white btn btn-primary")}
              type="submit"
              disabled={
                updateMasterBankDetailsMutation.isPending ||
                isSubmitting ||
                IBANLetterDocsFile.length === 0
              }
            >
              {(updateMasterBankDetailsMutation.isPending || isSubmitting) && (
                <span className="loading"></span>
              )}
              {t("submit")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
