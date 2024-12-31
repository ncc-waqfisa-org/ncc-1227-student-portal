import "yup-phone";
import React, { useState } from "react";

import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { DocType, uploadFile } from "../../../src/CustomAPI";

import { useMutation } from "@tanstack/react-query";
import {
  Income,
  MasterSignUpData,
  MasterSignUpFormSchema,
} from "../../../src/lib/masters/types";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import "yup-phone";
import { isValidPhoneNumber } from "react-phone-number-input";
import { cn } from "../../../src/lib/utils";
import { checkIfFilesAreTooBig } from "../../../src/HelperFunctions";

export default function MastersSignUpForm() {
  const router = useRouter();
  const { t } = useTranslation("signUp");
  const { t: tErrors } = useTranslation("errors");
  const { t: tToast } = useTranslation("toast");
  const [steps, setSteps] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const englishNumberRegex = /^[0-9]*$/;
  const passwordNoStartOrEndSpaceRegex = /^[\S]+.*[\S]+$/;
  const passwordNoSpaceRegex = /^\S+$/;

  const MAX_FILE_SIZE = 102400;

  const initialValues: MasterSignUpFormSchema = {
    cpr: "",
    cpr_doc: undefined,
    first_name: "",
    second_name: "",
    last_name: "",
    address: "",
    email: null,
    phone: null,
    gender: null,
    nationality: null,
    number_of_family_member: 0,
    graduation_year: "",
    universityID: "",
    old_program: "",
    isEmployed: false,
    place_of_employment: null,
    income: Income.LESS_THAN_1500,
    income_doc: undefined,
    guardian_cpr: "",
    guardian_full_name: "",
    guardian_cpr_doc: undefined,
    password: "",
    confirm_password: "",
  };

  const formValidationSchema = yup.object({
    // Personal data
    cpr: yup
      .string()
      .matches(englishNumberRegex, "Only English Numbers are allowed")
      .min(9, `${tErrors("cprShouldBe9")}`)
      .max(9, `${tErrors("cprShouldBe9")}`)
      .required(`${tErrors("requiredField")}`),
    cpr_doc: yup
      .mixed()
      .required("Required")
      .test(
        "is-valid-size",
        "Max allowed size is 2MB",
        (file) => checkIfFilesAreTooBig(file)
        // (value) => value && value.size <= MAX_FILE_SIZE
      ),

    first_name: yup.string().required(`${tErrors("requiredField")}`),
    second_name: yup.string().required(`${tErrors("requiredField")}`),
    last_name: yup.string().required(`${tErrors("requiredField")}`),
    address: yup.string().required(`${tErrors("requiredField")}`),
    email: yup
      .string()
      .email()
      .required(`${tErrors("requiredField")}`),
    phone: yup
      .string()
      .test((value) => (value ? isValidPhoneNumber(value.toString()) : false))
      .required(`${tErrors("requiredField")}`),
    gender: yup.string().required(`${tErrors("requiredField")}`),
    place_of_birth: yup.string().required(`${tErrors("requiredField")}`),
    nationality: yup.string().required(`${tErrors("requiredField")}`),
    number_of_family_member: yup
      .number()
      .required(`${tErrors("requiredField")}`),

    // Graduated from
    graduation_year: yup.string().required(`${tErrors("requiredField")}`),
    universityID: yup.string().required(`${tErrors("requiredField")}`),
    old_program: yup.string().required(`${tErrors("requiredField")}`),

    // Employment info
    isEmployed: yup.boolean().required(`${tErrors("requiredField")}`),
    place_of_employment: yup.string().required(`${tErrors("requiredField")}`),

    // Personal income or guardian income based on employment
    income: yup.string().required(`${tErrors("requiredField")}`),
    income_doc: yup
      .mixed()
      .required("Required")
      .test(
        "is-valid-size",
        "Max allowed size is 2MB",
        (file) => checkIfFilesAreTooBig(file)
        // (value) => value && value.size <= MAX_FILE_SIZE
      ),

    // Guardian data
    guardian_cpr: yup
      .string()
      .matches(englishNumberRegex, "Only English Numbers are allowed")
      .min(9, `${tErrors("cprShouldBe9")}`)
      .max(9, `${tErrors("cprShouldBe9")}`)
      .required(`${tErrors("requiredField")}`),
    guardian_full_name: yup.string().required(`${tErrors("requiredField")}`),
    guardian_cpr_doc: yup
      .mixed()
      .required("Required")
      .test(
        "is-valid-size",
        "Max allowed size is 2MB",
        (file) => checkIfFilesAreTooBig(file)
        // (value) => value && value.size <= MAX_FILE_SIZE
      ),

    password: yup
      .string()
      .min(8)
      .matches(passwordNoStartOrEndSpaceRegex, "No Spaces are allowed")
      .matches(passwordNoSpaceRegex, "No Spaces are allowed")
      .required(`${tErrors("requiredField")}`),
    confirmPassword: yup
      .string()
      .min(8)
      .matches(passwordNoStartOrEndSpaceRegex, "No Spaces are allowed")
      .matches(passwordNoSpaceRegex, "No Spaces are allowed")
      .oneOf([yup.ref("password"), null], `${tErrors("passwordMustMatch")}`)
      .required(`${tErrors("requiredField")}`),
  });

  const [masterSignUpData, setMasterSignUpData] =
    useState<MasterSignUpFormSchema>(initialValues);

  const signUpMutation = useMutation({
    mutationFn: (values: MasterSignUpData) => {
      return fetch(
        `https://ciuxdqxmol.execute-api.us-east-1.amazonaws.com/default/masters-sign-up`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            ...(router.locale && { "Accept-Language": router.locale }),
            "Content-Type": "application/json",
          },
        }
      );
    },
    async onSuccess(data) {
      if (data.ok) {
        const { message } = await data.json();

        toast.success(message);

        router.push({
          pathname: "/verify-email",
          query: { cpr: masterSignUpData.cpr },
        });
      } else {
        const { message } = await data.json();
        throw new Error(message);
      }
    },
    async onError(error) {
      throw new Error(error.message);
    },
  });

  async function signUpProcess(data: MasterSignUpFormSchema) {
    setIsLoading(true);

    if (data.cpr_doc == undefined) {
      throw new Error(
        `CODE:00003 ${
          tToast("cprDocumentIsMissing") ?? "Cpr document is missing"
        }`
      );
    }
    if (data.income_doc == undefined) {
      throw new Error(
        `CODE:00003 ${
          tToast("incomeDocumentIsMissing") ?? "Income document is missing"
        }`
      );
    }
    if (data.guardian_cpr_doc == undefined) {
      throw new Error(
        `CODE:00003 ${
          tToast("guardianCprDocumentIsMissing") ??
          "Guardian Cpr document is missing"
        }`
      );
    }

    /**
     * Upload all documents to S3 with the applicant CPR
     */
    const [cpr_doc, income_doc, guardian_cpr_doc] = await Promise.all([
      uploadFile(data.cpr_doc, DocType.CPR, data.cpr),
      uploadFile(data.income_doc, DocType.INCOME, data.cpr),
      uploadFile(data.guardian_cpr_doc, DocType.GUARDIAN, data.cpr),
    ]);

    if (cpr_doc == null) {
      throw new Error(
        `CODE:00003 ${
          tToast("cprDocumentFailedToUpload") ?? "Cpr document failed to upload"
        }`
      );
    }
    if (income_doc == null) {
      throw new Error(
        `CODE:00003 ${
          tToast("incomeDocumentFailedToUpload") ??
          "Income document failed to upload"
        }`
      );
    }
    if (guardian_cpr_doc == null) {
      throw new Error(
        `CODE:00003 ${
          tToast("guardianCprDocumentFailedToUpload") ??
          "Guardian Cpr document failed to upload"
        }`
      );
    }

    //* Call Sign up lambda
    await signUpMutation.mutateAsync({
      ...data,
      cpr_doc,
      income_doc,
      guardian_cpr_doc,
    });
  }

  return (
    <div className="flex flex-col items-center">
      <ul dir="ltr" className="relative mb-6 overflow-visible steps">
        <li
          onClick={() => steps > 1 && setSteps(1)}
          className={`step mr-6  ${steps >= 1 && "step-primary "} ${
            steps > 1 && " cursor-pointer"
          }`}
        >
          {t("applicantInfo")}
        </li>

        <li
          onClick={() => steps > 2 && setSteps(2)}
          className={`step  ${steps >= 2 && "step-primary"} ${
            steps > 2 && " cursor-pointer"
          }`}
        >
          {t("guardianInfo")}
        </li>
        <li
          onClick={() => steps > 3 && setSteps(3)}
          className={`step  ${steps >= 3 && "step-primary"} ${
            steps > 3 && " cursor-pointer"
          }`}
        >
          {t("termsAndConditions")}
        </li>
        <div className="absolute left-0 flex flex-col justify-center md:-left-8 top-1">
          <button
            type="button"
            disabled={steps <= 1}
            className={cn(
              "btn btn-square btn-sm btn-primary duration-500",
              steps <= 1 && "disabled opacity-0"
            )}
            onClick={() => setSteps((ov) => ov - 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-chevron-left"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>
      </ul>

      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        onSubmit={(values) => {
          console.log("🚀 ~ MastersSignUpForm ~ values:", values);

          signUpProcess(values);
        }}
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
          submitForm,
        }) => (
          <Form className="max-w-4xl mx-auto">
            <div
              className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-4",
                steps !== 1 && "hidden"
              )}
            >
              <Field
                type="text"
                name="cpr"
                title="cpr"
                placeholder="CPR"
                className={`input input-bordered input-primary ${
                  errors.cpr && touched.cpr && "input-error"
                }`}
                onChange={handleChange}
                value={values.cpr ?? ""}
              />

              <div className="flex justify-center lg:col-span-2">
                <button
                  type="button"
                  className="w-full max-w-xs btn btn-secondary"
                  onClick={() => setSteps((ov) => ov + 1)}
                >
                  {t("nextStep")}
                </button>
              </div>
            </div>
            <div
              className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-4",
                steps !== 2 && "hidden"
              )}
            >
              <div className="flex justify-center lg:col-span-2">
                <button
                  type="button"
                  className="w-full max-w-xs btn btn-secondary"
                  onClick={() => setSteps((ov) => ov + 1)}
                >
                  {t("nextStep")}
                </button>
              </div>
            </div>
            <div
              className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-4",
                steps !== 3 && "hidden"
              )}
            >
              <div className="flex justify-center lg:col-span-2">
                <button
                  type="submit"
                  className="w-full max-w-xs btn btn-secondary"
                  onClick={() => submitForm()}
                >
                  {t("nextStep")}
                </button>
              </div>
            </div>
            <div>{JSON.stringify(errors)}</div>
          </Form>
        )}
      </Formik>

      {/* {steps === 1 && (
        <CreateStudentForm
          student={masterSignUpData.student}
          password={masterSignUpData.password}
          submitTitle={t("nextStep")}
          onFormSubmit={(values) => {
            let temp: CreateStudentFormValues = {
              student: values.student,
              parentInfo: masterSignUpData.parentInfo,
              password: values.password,
              familyIncomeProofDocsFile: values.familyIncomeProofDocsFile,
              cprDoc: values.cprDoc,
            };

            setMasterSignUpData(temp);
            setSteps(2);
          }}
        ></CreateStudentForm>
      )}
      {steps === 2 && (
        <CreateParentsForm
          parentInfo={masterSignUpData.parentInfo}
          isLoading={isLoading}
          submitTitle={t("nextStep")}
          onFormSubmit={async (values) => {
            let temp: CreateStudentFormValues = {
              student: masterSignUpData.student,
              parentInfo: values,
              password: masterSignUpData.password,
              cprDoc: masterSignUpData.cprDoc,
              familyIncomeProofDocsFile:
                masterSignUpData.familyIncomeProofDocsFile,
            };

            setMasterSignUpData(temp);
            setSteps(3);
          }}
        ></CreateParentsForm>
      )}
      {steps === 3 && (
        <TermsAndConditions
          isLoading={signUpMutation.isPending || isLoading}
          submitTitle={t("register")}
          onFormSubmit={() =>
            toast.promise(
              signUpProcess(masterSignUpData).finally(() =>
                setIsLoading(false)
              ),
              {
                loading: t("processing"),
                success: t("processComplete"),
                error: (error) => `${error.message}`,
              }
            )
          }
        ></TermsAndConditions>
      )} */}
    </div>
  );
}
