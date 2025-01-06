import "yup-phone";
import React, { FC, useState } from "react";

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
import { PhoneNumberInput } from "../../phone";
import { Gender, Nationality } from "../../../src/API";
import { TermsAndConditions } from "../t-and-c";

export default function MastersSignUpForm() {
  const router = useRouter();
  const { t: tAC } = useTranslation("termsAndConditions");
  const { t: tErrors } = useTranslation("errors");
  const { t: tToast } = useTranslation("toast");
  const { t } = useTranslation("account");
  const [steps, setSteps] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const englishNumberRegex = /^[0-9]*$/;
  const passwordNoStartOrEndSpaceRegex = /^[\S]+.*[\S]+$/;
  const passwordNoSpaceRegex = /^\S+$/;

  const [docs, setDocs] = useState<{ [key: string]: File | null }>({
    cpr_doc: null,
    income_doc: null,
    guardian_cpr_doc: null,
  });

  const initialValues: MasterSignUpFormSchema = {
    cpr: "",
    first_name: "",
    second_name: "",
    last_name: "",
    address: "",
    email: "",
    phone: "",
    gender: undefined,
    nationality: undefined,
    number_of_family_member: 1,
    graduation_year: "",
    universityID: undefined,
    old_program: "",
    isEmployed: false,
    place_of_employment: "",
    income: undefined,
    guardian_cpr: "",
    guardian_full_name: "",
    cpr_doc: undefined,
    income_doc: undefined,
    guardian_cpr_doc: undefined,
    password: "",
    confirm_password: "",
    accepted: false,
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
      .required(`${tErrors("requiredField")}`)
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
      .email(`${tErrors("invalidEmail")}`)
      .required(`${tErrors("requiredField")}`),
    phone: yup
      .string()

      .test("is-valid-phone", `${tErrors("invalidPhone")}`, (value) =>
        value ? isValidPhoneNumber(value.toString()) : false
      )
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
    place_of_employment: yup.string().when("isEmployed", {
      is: true, // condition
      then: yup.string().required(`${tErrors("requiredField")}`), // required if isEmployed is true
      otherwise: yup.string().notRequired(), // optional if isEmployed is false
    }),

    // Personal income or guardian income based on employment
    income: yup.string().required(`${tErrors("requiredField")}`),
    income_doc: yup
      .mixed()
      .required(`${tErrors("requiredField")}`)
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
      .required(`${tErrors("requiredField")}`)
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
    confirm_password: yup
      .string()
      .min(8)
      .matches(passwordNoStartOrEndSpaceRegex, "No Spaces are allowed")
      .matches(passwordNoSpaceRegex, "No Spaces are allowed")
      .oneOf([yup.ref("password"), null], `${tErrors("passwordMustMatch")}`)
      .required(`${tErrors("requiredField")}`),
    accepted: yup
      .boolean()
      .isTrue(`${tErrors("youHaveToAccept")}`)
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
    onSettled() {
      setIsLoading(false);
    },
  });

  async function signUpProcess(data: MasterSignUpFormSchema) {
    setIsLoading(true);

    if (data.cpr_doc == undefined || docs.cpr_doc == undefined) {
      throw new Error(
        `CODE:00003 ${
          tToast("cprDocumentIsMissing") ?? "Cpr document is missing"
        }`
      );
    }
    if (data.income_doc == undefined || docs.income_doc == undefined) {
      throw new Error(
        `CODE:00003 ${
          tToast("incomeDocumentIsMissing") ?? "Income document is missing"
        }`
      );
    }
    if (
      data.guardian_cpr_doc == undefined ||
      docs.guardian_cpr_doc == undefined
    ) {
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
      uploadFile(docs.cpr_doc, DocType.CPR, data.cpr),
      uploadFile(docs.income_doc, DocType.INCOME, data.cpr),
      uploadFile(docs.guardian_cpr_doc, DocType.GUARDIAN, data.cpr),
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

    const dataToSend: MasterSignUpData = {
      ...data,
      cpr_doc,
      income_doc,
      guardian_cpr_doc,
    };

    setMasterSignUpData(data);

    await signUpMutation.mutateAsync(dataToSend);
  }

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={formValidationSchema}
        validateOnMount
        onSubmit={(values) => {
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
          isValid,
        }) => {
          const firstStepHaveError =
            !!errors.cpr ||
            !!errors.first_name ||
            !!errors.second_name ||
            !!errors.last_name ||
            !!errors.address ||
            !!errors.email ||
            !!errors.phone ||
            !!errors.gender ||
            !!errors.place_of_birth ||
            !!errors.nationality ||
            !!errors.number_of_family_member ||
            !!errors.graduation_year ||
            !!errors.universityID ||
            !!errors.old_program ||
            !!errors.password ||
            !!errors.confirm_password ||
            (values.isEmployed ? !!errors.place_of_employment : false) ||
            (values.isEmployed ? !!errors.income : false) ||
            (values.isEmployed ? !!errors.income_doc : false);

          const secondStepHaveError =
            !!errors.guardian_full_name ||
            !!errors.guardian_cpr ||
            (!values.isEmployed ? !!errors.income : false) ||
            (!values.isEmployed ? !!errors.income_doc : false) ||
            !!errors.guardian_cpr_doc;

          const thirdStepHaveError = !!errors.accepted;
          return (
            <Form className="flex flex-col justify-center max-w-4xl mx-auto">
              <ul dir="ltr" className="relative mb-6 overflow-visible steps">
                <li
                  onClick={() => steps > 1 && setSteps(1)}
                  className={cn(
                    "step mr-6",
                    steps > 1 && "cursor-pointer",
                    steps >= 1 && "step-primary",
                    steps > 1 &&
                      firstStepHaveError &&
                      "step-error after:!text-white after:ring after:ring-error after:ring-offset-2"
                  )}
                >
                  {t("applicantInfo")}
                </li>

                <li
                  onClick={() => steps > 2 && setSteps(2)}
                  className={cn(
                    "step",
                    steps > 2 && "cursor-pointer",
                    steps >= 2 && "step-primary",
                    steps > 2 &&
                      secondStepHaveError &&
                      "step-error after:!text-white after:ring after:ring-error after:ring-offset-2"
                  )}
                >
                  {t("guardianInfo")}
                </li>
                <li
                  onClick={() => steps > 3 && setSteps(3)}
                  className={cn(
                    "step ",
                    steps > 3 && "cursor-pointer",
                    steps >= 3 && "step-primary",
                    steps > 3 &&
                      thirdStepHaveError &&
                      "step-error after:!text-white after:ring after:ring-error after:ring-offset-2"
                  )}
                >
                  {t("termsAndConditions")}
                </li>
                <li className="absolute left-0 flex flex-col justify-center top-1 md:-left-8">
                  <button
                    title={t("back") ?? "Back"}
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
                </li>
              </ul>
              <div
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-4",
                  steps !== 1 && "hidden"
                )}
              >
                <LabelField
                  title={t("cpr")}
                  fieldName={"cpr"}
                  value={values.cpr}
                  errors={errors.cpr}
                  touched={touched.cpr}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldError={setFieldError}
                  setFieldValue={setFieldValue}
                />
                <LabelField
                  title={t("cprDoc")}
                  value={values.cpr_doc}
                  errors={errors.cpr_doc}
                  touched={touched.cpr_doc}
                  fieldName={"cpr_doc"}
                  type="file"
                  onFile={(file) =>
                    setDocs({
                      ...docs,
                      cpr_doc: file,
                    })
                  }
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldError={setFieldError}
                  setFieldValue={setFieldValue}
                />
                {/* User Name */}
                <div className="grid grid-cols-1 gap-4 md:col-span-2 md:grid-cols-3">
                  <LabelField
                    title={t("firstName")}
                    fieldName={"first_name"}
                    value={values.first_name}
                    errors={errors.first_name}
                    touched={touched.first_name}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldError={setFieldError}
                    setFieldValue={setFieldValue}
                  />
                  <LabelField
                    title={t("secondName")}
                    fieldName={"second_name"}
                    value={values.second_name}
                    errors={errors.second_name}
                    touched={touched.second_name}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldError={setFieldError}
                    setFieldValue={setFieldValue}
                  />
                  <LabelField
                    title={t("lastName")}
                    fieldName={"last_name"}
                    value={values.last_name}
                    errors={errors.last_name}
                    touched={touched.last_name}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldError={setFieldError}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <div className="md:col-span-2">
                  <LabelField
                    title={t("address")}
                    value={values.address}
                    errors={errors.address}
                    touched={touched.address}
                    fieldName={"address"}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldError={setFieldError}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <LabelField
                  title={t("email")}
                  value={values.email}
                  errors={errors.email}
                  touched={touched.email}
                  fieldName={"email"}
                  type={"email"}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldError={setFieldError}
                  setFieldValue={setFieldValue}
                />
                <LabelField
                  title={t("phone")}
                  value={values.phone}
                  errors={errors.phone}
                  touched={touched.phone}
                  fieldName={"phone"}
                  type={"phone"}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldError={setFieldError}
                  setFieldValue={setFieldValue}
                />
                <div className="flex flex-col justify-start w-full">
                  <div className="flex items-center">
                    <label className="label">{t("gender")}</label>
                    <label className="text-error label">*</label>{" "}
                  </div>
                  <Field
                    dir="ltr"
                    as="select"
                    name="gender"
                    title="gender"
                    // placeholder="Gender"
                    className={`input input-bordered input-primary ${
                      errors.gender && touched.gender && "input-error"
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                  >
                    <option disabled selected value={undefined}>
                      {t("select")}
                    </option>
                    <option value={Gender.MALE}>{t("male")}</option>
                    <option value={Gender.FEMALE}>{t("female")}</option>
                  </Field>
                  <label className="pt-2 label-text-alt text-error">
                    {errors.gender && touched.gender && errors.gender}
                  </label>
                </div>

                <LabelField
                  title={t("placeOfBirth")}
                  value={values.place_of_birth}
                  errors={errors.place_of_birth}
                  touched={touched.place_of_birth}
                  fieldName={"place_of_birth"}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldError={setFieldError}
                  setFieldValue={setFieldValue}
                />

                <div className="flex flex-col justify-start w-full">
                  <div className="flex items-center">
                    <label className="label">{t("nationality")}</label>
                    <label className="text-error label">*</label>{" "}
                  </div>
                  <Field
                    dir="ltr"
                    as="select"
                    name="nationality"
                    title="nationality"
                    placeholder={t("nationality")}
                    className={`input input-bordered input-primary ${
                      errors.nationality && touched.nationality && "input-error"
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.nationality}
                  >
                    <option disabled selected value={undefined}>
                      {t("select")}
                    </option>
                    <option value={Nationality.BAHRAINI}>
                      {t(Nationality.BAHRAINI)}
                    </option>
                    <option value={Nationality.NON_BAHRAINI}>
                      {t(Nationality.NON_BAHRAINI)}
                    </option>
                  </Field>
                  <label className="pt-2 label-text-alt text-error">
                    {errors.nationality &&
                      touched.nationality &&
                      errors.nationality}
                  </label>
                </div>

                <div className="flex flex-col justify-start w-full">
                  <div className="flex items-center">
                    <label className="label">
                      {t("numberOfFamilyMembers")}
                    </label>
                    <label className="text-error label">*</label>{" "}
                  </div>
                  <Field
                    dir="ltr"
                    type="text"
                    name="number_of_family_member"
                    title="number_of_family_member"
                    className={`input input-bordered input-primary ${
                      errors.number_of_family_member && "input-error"
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.number_of_family_member}
                  />
                  <label className="pt-2 label-text-alt text-error">
                    {errors.number_of_family_member &&
                      touched.number_of_family_member &&
                      errors.number_of_family_member}
                  </label>
                </div>

                <FormSeparator title={t("graduation")} />
                <div className="flex flex-col justify-start w-full">
                  <div className="flex items-center">
                    <label className="label">{t("university")}</label>
                    <label className="text-error label">*</label>{" "}
                  </div>
                  <Field
                    dir="ltr"
                    as="select"
                    name="universityID"
                    title="universityID"
                    placeholder={t("university")}
                    className={`input input-bordered input-primary ${
                      errors.universityID &&
                      touched.universityID &&
                      "input-error"
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.universityID}
                  >
                    <option disabled selected value={undefined}>
                      {t("select")}
                    </option>
                    <option value={"UOB"}>UOB</option>
                    <option value={"polytechnic"}>Polytechnic</option>
                  </Field>
                  <label className="pt-2 label-text-alt text-error">
                    {errors.universityID &&
                      touched.universityID &&
                      errors.universityID}
                  </label>
                </div>
                <div className="flex flex-col justify-start w-full">
                  <div className="flex items-center">
                    <label className="label">{t("graduationDate")}</label>
                    <label className="text-error label">*</label>{" "}
                  </div>
                  <Field
                    dir="ltr"
                    type="text"
                    name="graduation_year"
                    title="graduation_year"
                    placeholder={t("graduationDate")}
                    className={`input input-bordered input-primary ${
                      errors.graduation_year &&
                      touched.graduation_year &&
                      "input-error"
                    }`}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.graduation_year}
                  />
                  <label className="pt-2 label-text-alt text-error">
                    {errors.graduation_year &&
                      touched.graduation_year &&
                      errors.graduation_year}
                  </label>
                </div>

                <LabelField
                  title={t("graduationProgram")}
                  value={values.old_program}
                  errors={errors.old_program}
                  touched={touched.old_program}
                  fieldName={"old_program"}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldError={setFieldError}
                  setFieldValue={setFieldValue}
                />

                <FormSeparator title={t("employment")} />
                <div className="flex flex-col justify-start w-full">
                  <div className="flex items-center">
                    <label className="label">{t("employment")}</label>
                    <label className="text-error label">*</label>{" "}
                  </div>
                  <Field
                    dir="ltr"
                    as="select"
                    name="isEmployed"
                    title="employment"
                    placeholder={t("employment")}
                    className={`input input-bordered input-primary ${
                      errors.isEmployed && touched.isEmployed && "input-error"
                    }`}
                    onChange={(v: any) => {
                      setFieldValue(
                        "isEmployed",
                        v.currentTarget.value === "true"
                      );
                    }}
                    onBlur={handleBlur}
                    value={values.isEmployed.toString()}
                  >
                    <option disabled selected value={undefined}>
                      {t("select")}
                    </option>
                    <option value={"true"}>{t("employed")}</option>
                    <option value={"false"}>{t("unemployed")}</option>
                  </Field>
                  <label className="pt-2 label-text-alt text-error">
                    {errors.isEmployed &&
                      touched.isEmployed &&
                      errors.isEmployed}
                  </label>
                </div>

                {values.isEmployed && (
                  <>
                    <LabelField
                      title={t("placeOfEmployment")}
                      value={values.place_of_employment}
                      errors={errors.place_of_employment}
                      touched={touched.place_of_employment}
                      fieldName={"place_of_employment"}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldError={setFieldError}
                      setFieldValue={setFieldValue}
                    />
                    <div className="flex flex-col justify-start w-full">
                      <div className="flex items-center">
                        <label className="label">{t("income")}</label>
                        <label className="text-error label">*</label>{" "}
                      </div>

                      <Field
                        dir="ltr"
                        as="select"
                        name="income"
                        title="income"
                        placeholder="Personal Income"
                        className={`input input-bordered input-primary ${
                          errors.income && touched.income && "input-error"
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.income}
                      >
                        <option disabled selected value={undefined}>
                          {t("select")}
                        </option>
                        <option value={Income.LESS_THAN_1500}>
                          {t("lessThan1500")}
                        </option>
                        <option value={Income.MORE_THAN_1500}>
                          {t("moreThan1500")}
                        </option>
                      </Field>
                      <label className="label-text-alt text-error">
                        {errors.income && touched.income && errors.income}
                      </label>
                    </div>
                    <LabelField
                      title={t("incomeDoc")}
                      value={values.income_doc}
                      errors={errors.income_doc}
                      touched={touched.income_doc}
                      fieldName={"income_doc"}
                      type="file"
                      onFile={(file) =>
                        setDocs({
                          ...docs,
                          income_doc: file,
                        })
                      }
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldError={setFieldError}
                      setFieldValue={setFieldValue}
                    />
                  </>
                )}

                <FormSeparator title={t("password")} />

                {/* Password */}
                <div className="flex flex-col justify-start w-full">
                  <div className="flex items-center">
                    <label className="label">{t("password")}</label>
                    <label className="text-error label">*</label>{" "}
                    <label className="label-text-alt text-error">
                      {errors.password && touched.password && errors.password}
                    </label>
                  </div>
                  <div className="relative w-full">
                    <Field
                      dir="ltr"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      title="password"
                      // placeholder="Password"
                      className={`input w-full input-bordered input-primary ${
                        errors.password && touched.password && "input-error"
                      }`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-sm leading-5 hover:cursor-pointer"
                    >
                      <svg
                        className={`h-6  text-gray-700 ${
                          showPassword ? "hidden" : "block"
                        } `}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                        ></path>
                      </svg>

                      <svg
                        className={`h-6  text-gray-700 ${
                          showPassword ? "block" : "hidden"
                        }`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="currentColor"
                          d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col justify-start w-full">
                  <div className="flex items-center">
                    <label className="label">{t("confirmPassword")}</label>
                    <label className="text-error label">*</label>{" "}
                    <label className="label-text-alt text-error">
                      {errors.confirm_password &&
                        touched.confirm_password &&
                        errors.confirm_password}
                    </label>
                  </div>
                  <div className="relative w-full">
                    <Field
                      dir="ltr"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      title="Confirm password"
                      // placeholder="Confirm password"
                      className={`input w-full input-bordered input-primary ${
                        errors.confirm_password &&
                        touched.confirm_password &&
                        "input-error"
                      }`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.confirm_password}
                    />
                    <div
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-sm leading-5 hover:cursor-pointer"
                    >
                      <svg
                        className={`h-6  text-gray-700 ${
                          showConfirmPassword ? "hidden" : "block"
                        } `}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill="currentColor"
                          d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                        ></path>
                      </svg>

                      <svg
                        className={`h-6  text-gray-700 ${
                          showConfirmPassword ? "block" : "hidden"
                        }`}
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="currentColor"
                          d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* ------------------------------- NEXT BUTTON ------------------------------ */}

                <div className="flex justify-center pt-8 md:col-span-2">
                  <button
                    type="button"
                    className="w-full max-w-xs btn btn-primary"
                    onClick={() => setSteps((ov) => ov + 1)}
                    disabled={firstStepHaveError}
                  >
                    {t("nextStep")}
                  </button>
                </div>
              </div>
              <div
                className={cn(
                  "grid grid-cols-1 md:grid-cols-2 gap-4",
                  steps !== 2 && "hidden"
                )}
              >
                <div className="md:col-span-2">
                  <LabelField
                    title={t("guardianFullName")}
                    value={values.guardian_full_name}
                    errors={errors.guardian_full_name}
                    touched={touched.guardian_full_name}
                    fieldName={"guardian_full_name"}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldError={setFieldError}
                    setFieldValue={setFieldValue}
                  />
                </div>
                <LabelField
                  title={t("guardianCpr")}
                  value={values.guardian_cpr}
                  errors={errors.guardian_cpr}
                  touched={touched.guardian_cpr}
                  fieldName={"guardian_cpr"}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldError={setFieldError}
                  setFieldValue={setFieldValue}
                />
                <LabelField
                  value={values.guardian_cpr_doc}
                  errors={errors.guardian_cpr_doc}
                  touched={touched.guardian_cpr_doc}
                  title={t("guardianCprDoc")}
                  fieldName={"guardian_cpr_doc"}
                  type="file"
                  onFile={(file) =>
                    setDocs({
                      ...docs,
                      guardian_cpr_doc: file,
                    })
                  }
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  setFieldError={setFieldError}
                  setFieldValue={setFieldValue}
                />

                {!values.isEmployed && (
                  <>
                    <div className="flex flex-col justify-start w-full">
                      <div className="flex items-center">
                        <label className="label">{t("income")}</label>
                        <label className="text-error label">*</label>{" "}
                      </div>

                      <Field
                        dir="ltr"
                        as="select"
                        name="income"
                        title="income"
                        placeholder="Personal Income"
                        className={`input input-bordered input-primary ${
                          errors.income && touched.income && "input-error"
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.income}
                      >
                        <option disabled selected value={undefined}>
                          {t("select")}
                        </option>
                        <option value={Income.LESS_THAN_1500}>
                          {t("lessThan1500")}
                        </option>
                        <option value={Income.MORE_THAN_1500}>
                          {t("moreThan1500")}
                        </option>
                      </Field>
                      <label className="label-text-alt text-error">
                        {errors.income && touched.income && errors.income}
                      </label>
                    </div>
                    <LabelField
                      title={t("incomeDoc")}
                      value={values.income_doc}
                      errors={errors.income_doc}
                      touched={touched.income_doc}
                      fieldName={"income_doc"}
                      type="file"
                      onFile={(file) =>
                        setDocs({
                          ...docs,
                          income_doc: file,
                        })
                      }
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      setFieldError={setFieldError}
                      setFieldValue={setFieldValue}
                    />
                  </>
                )}

                <div className="flex justify-center md:col-span-2">
                  <button
                    type="button"
                    className="w-full max-w-xs btn btn-primary"
                    onClick={() => setSteps((ov) => ov + 1)}
                    disabled={secondStepHaveError}
                  >
                    {t("nextStep")}
                  </button>
                </div>
              </div>
              <div
                className={cn(
                  // "grid grid-cols-1 md:grid-cols-2 gap-4",
                  steps !== 3 && "hidden"
                )}
              >
                <div className="container flex flex-col max-w-3xl gap-3 mx-auto">
                  <h1 className="text-2xl font-semibold md:text-3xl">
                    {tAC("termsAndConditions")}
                  </h1>
                  <div className="w-full h-[30rem] overflow-y-scroll p-6 border border-gray-300 rounded-2xl">
                    <div className="mx-auto prose">
                      <h3>{tAC("title")}</h3>
                      <ul className="">
                        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                          <li key={i}>{tAC(`b${i}`)}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  {/* Accepted */}
                  <div className="flex flex-wrap items-center justify-start w-full gap-3">
                    <label
                      className={cn(
                        "label",
                        errors.accepted && touched.accepted && "text-error"
                      )}
                    >
                      {tAC("acceptTerms")}
                    </label>
                    <Field
                      dir="ltr"
                      type="checkbox"
                      name="accepted"
                      title="accepted"
                      placeholder="Accepted"
                      className={cn(
                        "checkbox checkbox-primary",
                        errors.accepted && "checkbox-error"
                      )}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.accepted ?? ""}
                      checked={values.accepted}
                    />
                  </div>
                  <label className="label-text-alt text-error">
                    {errors.accepted && touched.accepted && errors.accepted}
                  </label>

                  {/* Submit */}
                  <button
                    className={`my-3 text-white btn btn-primary md:col-span-2`}
                    type="submit"
                    disabled={signUpMutation.isPending || isLoading}
                  >
                    {isLoading && <span className="loading"></span>}
                    {t("submit")}
                  </button>
                </div>
              </div>

              {((firstStepHaveError && steps >= 1) ||
                (secondStepHaveError && steps >= 2) ||
                (thirdStepHaveError && steps >= 3)) && (
                <div className="flex flex-col gap-2 pt-8 error-list">
                  <h2 className="text-lg font-bold">{t("formErrors")}</h2>

                  {/* Step 1 Errors */}
                  {steps >= 1 && firstStepHaveError && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-red-600 text-md">
                        {t("applicantInfo")}
                      </h3>
                      <ul className="pl-5 list-disc">
                        {errors.cpr && (
                          <li className="text-red-600">
                            <strong>{t("cpr")}:</strong> {errors.cpr}
                          </li>
                        )}
                        {errors.cpr_doc && (
                          <li className="text-red-600">
                            <strong>{t("cprDoc")}:</strong> {errors.cpr_doc}
                          </li>
                        )}
                        {errors.first_name && (
                          <li className="text-red-600">
                            <strong>{t("firstName")}:</strong>{" "}
                            {errors.first_name}
                          </li>
                        )}
                        {errors.second_name && (
                          <li className="text-red-600">
                            <strong>{t("secondName")}:</strong>{" "}
                            {errors.second_name}
                          </li>
                        )}
                        {errors.last_name && (
                          <li className="text-red-600">
                            <strong>{t("lastName")}:</strong> {errors.last_name}
                          </li>
                        )}
                        {errors.address && (
                          <li className="text-red-600">
                            <strong>{t("address")}:</strong> {errors.address}
                          </li>
                        )}
                        {errors.email && (
                          <li className="text-red-600">
                            <strong>{t("email")}:</strong> {errors.email}
                          </li>
                        )}
                        {errors.phone && (
                          <li className="text-red-600">
                            <strong>{t("phone")}:</strong> {errors.phone}
                          </li>
                        )}
                        {errors.gender && (
                          <li className="text-red-600">
                            <strong>{t("gender")}:</strong> {errors.gender}
                          </li>
                        )}
                        {errors.place_of_birth && (
                          <li className="text-red-600">
                            <strong>{t("placeOfBirth")}:</strong>{" "}
                            {errors.place_of_birth}
                          </li>
                        )}
                        {errors.nationality && (
                          <li className="text-red-600">
                            <strong>{t("nationality")}:</strong>{" "}
                            {errors.nationality}
                          </li>
                        )}
                        {errors.number_of_family_member && (
                          <li className="text-red-600">
                            <strong>{t("numberOfFamilyMembers")}:</strong>{" "}
                            {errors.number_of_family_member}
                          </li>
                        )}
                        {errors.graduation_year && (
                          <li className="text-red-600">
                            <strong>{t("graduationYear")}:</strong>{" "}
                            {errors.graduation_year}
                          </li>
                        )}
                        {errors.universityID && (
                          <li className="text-red-600">
                            <strong>{t("university")}:</strong>{" "}
                            {errors.universityID}
                          </li>
                        )}
                        {errors.old_program && (
                          <li className="text-red-600">
                            <strong>{t("graduationProgram")}:</strong>{" "}
                            {errors.old_program}
                          </li>
                        )}
                        {errors.isEmployed && (
                          <li className="text-red-600">
                            <strong>{t("employment")}:</strong>{" "}
                            {errors.isEmployed}
                          </li>
                        )}
                        {values.isEmployed && (
                          <>
                            {errors.place_of_employment && (
                              <li className="text-red-600">
                                <strong>{t("placeOfEmployment")}:</strong>{" "}
                                {errors.place_of_employment}
                              </li>
                            )}
                            {errors.income && (
                              <li className="text-red-600">
                                <strong>{t("income")}:</strong> {errors.income}
                              </li>
                            )}
                            {errors.income_doc && (
                              <li className="text-red-600">
                                <strong>{t("incomeDoc")}:</strong>{" "}
                                {errors.income_doc}
                              </li>
                            )}
                          </>
                        )}
                        {errors.password && (
                          <li className="text-red-600">
                            <strong>{t("password")}:</strong> {errors.password}
                          </li>
                        )}
                        {errors.confirm_password && (
                          <li className="text-red-600">
                            <strong>{t("confirmPassword")}:</strong>{" "}
                            {errors.confirm_password}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Step 2 Errors */}
                  {steps >= 2 && secondStepHaveError && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-red-600 text-md">
                        {t("guardianInfo")}
                      </h3>
                      <ul className="pl-5 list-disc">
                        {errors.guardian_full_name && (
                          <li className="text-red-600">
                            <strong>{t("guardianFullName")}:</strong>{" "}
                            {errors.guardian_full_name}
                          </li>
                        )}
                        {errors.guardian_cpr && (
                          <li className="text-red-600">
                            <strong>{t("guardianCpr")}:</strong>{" "}
                            {errors.guardian_cpr}
                          </li>
                        )}
                        {errors.guardian_cpr_doc && (
                          <li className="text-red-600">
                            <strong>{t("guardianCprDoc")}:</strong>{" "}
                            {errors.guardian_cpr_doc}
                          </li>
                        )}
                        {!values.isEmployed && (
                          <>
                            {errors.income && (
                              <li className="text-red-600">
                                <strong>{t("income")}:</strong> {errors.income}
                              </li>
                            )}
                            {errors.income_doc && (
                              <li className="text-red-600">
                                <strong>{t("incomeDoc")}:</strong>{" "}
                                {errors.income_doc}
                              </li>
                            )}
                          </>
                        )}
                      </ul>
                    </div>
                  )}

                  {/* Step 3 Errors */}
                  {steps >= 3 && thirdStepHaveError && (
                    <div className="mb-4">
                      <h3 className="font-semibold text-red-600 text-md">
                        {t("termsAndConditions")}
                      </h3>
                      <ul className="pl-5 list-disc">
                        {errors.accepted && (
                          <li className="text-red-600">
                            <strong>{tAC("termsAndConditions")}:</strong>{" "}
                            {errors["accepted"]}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

type TLabelField = {
  title: string;
  fieldName: string;
  type?: string;
  value: any;
  errors: any;
  touched: any;
  handleChange: {
    (e: React.ChangeEvent<any>): void;
    <T = string | React.ChangeEvent<any>>(
      field: T
    ): T extends React.ChangeEvent<any>
      ? void
      : (e: string | React.ChangeEvent<any>) => void;
  };
  handleBlur: {
    (e: React.FocusEvent<any>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  setFieldError: (field: string, message: string | undefined) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  onFile?: (file: File) => void;
};

const LabelField: FC<TLabelField> = ({
  errors,
  touched,
  value,
  handleChange,
  handleBlur,
  title,
  type = "text",
  fieldName,
  setFieldError,
  setFieldValue,
  onFile,
}) => {
  return (
    <div className="flex flex-col justify-start w-full">
      <div className="flex items-center">
        <label className="label">{title}</label>
        <label className="text-error label">*</label>{" "}
      </div>

      {type === "phone" && (
        <PhoneNumberInput
          type={type}
          name={fieldName}
          title={fieldName}
          placeholder={title}
          className={cn(
            "input input-bordered input-primary",
            errors && touched && "input-error"
          )}
          onChange={(val) => setFieldValue(fieldName, (val ?? "")?.toString())}
          onBlur={handleBlur}
          value={value}
        />
      )}
      {type !== "phone" && (
        <Field
          className={cn(
            type === "file"
              ? "file-input file-input-bordered file-input-primary"
              : "input input-bordered input-primary",

            errors && touched && "input-error"
          )}
          type={type}
          name={fieldName}
          title={fieldName}
          placeholder={title}
          onBlur={handleBlur}
          value={value}
          onChange={(e: any) => {
            if (type === "file") {
              const reader = new FileReader();
              const file: File = e.target.files[0];

              reader.onload = () => {
                if (reader.readyState === 2) {
                  // Check file size (2MB = 2 * 1024 * 1024 bytes)
                  if (file.size > 2 * 1024 * 1024) {
                    setFieldError(fieldName, "File size must be less than 2MB");
                    return;
                  }

                  // Check file type
                  const allowedTypes = [
                    "image/jpeg", // Allow JPEG images
                    "image/png", // Allow PNG images
                    "application/pdf", // Allow PDFs
                    "application/msword", // Allow old Word documents (.doc)
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // Allow modern Word documents (.docx)
                  ];

                  if (!allowedTypes.includes(file.type)) {
                    setFieldError(
                      fieldName,
                      "File must be an image, PDF or DOC"
                    );
                    return;
                  }

                  onFile && onFile(file);
                }
              };

              if (file) {
                reader.readAsDataURL(file);
              }
            }

            handleChange(e);
          }}
        />
      )}
      <label className="pt-2 label-text-alt text-error">
        {errors && touched && errors}
      </label>
    </div>
  );
};

export const FormSeparator = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center gap-4 md:col-span-2">
      <div className="h-[1px] bg-zinc-300 flex-1"></div>
      <p>{title}</p>
      <div className="h-[1px] bg-zinc-300 flex-1"></div>
    </div>
  );
};
