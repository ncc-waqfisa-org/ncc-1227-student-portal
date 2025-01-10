import React, { FC, useState } from "react";
import logs from "public/svg/logs.svg";
import { useAppContext } from "../../../contexts/AppContexts";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import { uploadFile, DocType, updateStudentInDB } from "../../../src/CustomAPI";
import { checkIfFilesAreTooBig } from "../../../src/HelperFunctions";
import {
  Income,
  MasterEnrollFormSchema,
  MasterEnrollData,
} from "../../../src/lib/masters/types";
import { cn } from "../../../src/lib/utils";
import { PhoneNumberInput } from "../../phone";
import * as yup from "yup";
import "yup-phone";
import { ApplicantType, BahrainUniversities } from "../../../src/API";
import { CardInfoComponent } from "../../CardInfo";

export const EnrollIntoMaster = ({
  universities,
}: {
  universities: BahrainUniversities[];
}) => {
  const {
    student: studentAppsync,
    studentAsStudent: student,
    isStudentPending,
    syncStudent,
  } = useAppContext();
  const router = useRouter();
  const { t: tAC } = useTranslation("termsAndConditions");
  const { t: tCommon } = useTranslation("common");
  const { t: tErrors } = useTranslation("errors");
  const { t: tToast } = useTranslation("toast");
  const { t } = useTranslation("account");
  const [steps, setSteps] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const [docs, setDocs] = useState<{ [key: string]: File | null }>({
    income_doc: null,
    guardian_cpr_doc: null,
  });

  const englishNumberRegex = /^[0-9]*$/;

  const getNamePart = (
    fullName: string,
    part: "first" | "second" | "last"
  ): string => {
    const nameParts = fullName.trim().split(" ");

    switch (part) {
      case "first":
        return nameParts[0] || "";
      case "second":
        if (nameParts.length > 2) return nameParts[1];
        return "";
      case "last":
        if (nameParts.length === 2) return nameParts[1];
        if (nameParts.length >= 3) return nameParts[nameParts.length - 1];
        return "";
    }
  };

  const initialValues: MasterEnrollFormSchema = {
    first_name: student?.fullName ? getNamePart(student.fullName, "first") : "",
    second_name: student?.fullName
      ? getNamePart(student.fullName, "second")
      : "",
    last_name: student?.fullName ? getNamePart(student.fullName, "last") : "",
    graduation_year: "",
    universityID: undefined,
    old_program: "",
    isEmployed: false,
    place_of_employment: "",
    income: undefined,
    guardian_cpr: "",
    guardian_full_name: "",
    income_doc: undefined,
    guardian_cpr_doc: undefined,
    accepted: false,
  };

  const formValidationSchema = yup.object({
    // Personal data

    first_name: yup.string().required(`${tErrors("requiredField")}`),
    second_name: yup.string().required(`${tErrors("requiredField")}`),
    last_name: yup.string().required(`${tErrors("requiredField")}`),

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
    accepted: yup
      .boolean()
      .isTrue(`${tErrors("youHaveToAccept")}`)
      .required(`${tErrors("requiredField")}`),
  });

  const [masterSignUpData, setMasterSignUpData] =
    useState<MasterEnrollFormSchema>(initialValues);

  // isEmployed: boolean;

  // place_of_employment: string | null;

  // // Personal income or guardian income based on employment

  // income: Income | undefined;

  // income_doc: string;

  // // Guardian data

  // guardian_cpr: string;

  // guardian_full_name: string;

  // guardian_cpr_doc: string;

  const enrollMutation = useMutation({
    mutationFn: (values: MasterEnrollData) => {
      return updateStudentInDB({
        input: {
          _version: studentAppsync?.getStudent?._version,
          cpr: student?.cpr ?? "",
          m_firstName: values.first_name,
          m_secondName: values.second_name,
          m_lastName: values.last_name,
          m_graduationYear: values.graduation_year,
          m_universityID: values.universityID,
          m_oldProgram: values.old_program,
          m_isEmployeed: values.isEmployed,
          m_placeOfEmployment: values.place_of_employment,
          m_income: values.income,
          m_incomeDoc: values.income_doc,
          m_guardianCPR: values.guardian_cpr,
          m_guardianFullName: values.guardian_full_name,
          m_guardianCPRDoc: values.guardian_cpr_doc,
        },
      });
      //

      // TODO: sync student data using GraphQL

      //   return fetch(
      //     `https://ciuxdqxmol.execute-api.us-east-1.amazonaws.com/default/masters-sign-up`,
      //     {
      //       method: "POST",
      //       body: JSON.stringify(values),
      //       headers: {
      //         ...(router.locale && { "Accept-Language": router.locale }),
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
    },
    async onSuccess(data) {
      if (data?.updateStudent?.m_firstName) {
        syncStudent();

        toast.success(
          router.locale === "ar"
            ? "التحق في الماجستير بنجاح"
            : "Enrolled into masters successfully"
        );

        router.push({
          pathname: "/masters/applications",
          query: { cpr: student?.cpr },
        });
      } else {
        throw new Error(
          router.locale === "ar"
            ? "فشل في التسجيل في الماجستير"
            : "Failed to enroll into masters"
        );
      }
    },
    async onError(error) {
      console.log(error.message);
      toast.error(
        router.locale === "ar"
          ? "فشل في التسجيل في الماجستير"
          : "Failed to enroll into masters"
      );
      setIsLoading(false);
    },
    onSettled() {
      setIsLoading(false);
    },
  });

  async function signUpProcess(data: MasterEnrollFormSchema) {
    setIsLoading(true);

    if (student == undefined || student == null) {
      throw new Error(
        `CODE:00099 ${
          tToast("applicantDataMissing") ?? "Applicant data missing"
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
    const [income_doc, guardian_cpr_doc] = await Promise.all([
      uploadFile(docs.income_doc, DocType.INCOME, student.cpr),
      uploadFile(docs.guardian_cpr_doc, DocType.GUARDIAN, student.cpr),
    ]);

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

    const dataToSend: MasterEnrollData = {
      ...data,
      income_doc,
      guardian_cpr_doc,
    };

    setMasterSignUpData(data);

    await enrollMutation.mutateAsync(dataToSend);
  }

  return (
    <div className="flex flex-col items-center">
      {isStudentPending && (
        <div className="p-6 mx-auto my-8 w-full max-w-lg rounded-lg border border-gray-200 shadow-lg bg-white/30">
          <div className="flex flex-col gap-4">
            <div className="w-3/4 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-2/3 h-6 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      )}

      {!student && !isStudentPending && (
        <div className="p-6 mx-auto my-8 w-full max-w-lg rounded-lg border border-red-200 shadow-lg bg-white/30">
          <div className="flex flex-col gap-4 text-center">
            <div className="text-xl font-semibold text-error">
              Applicant details could not be fetched
            </div>
            <div className="text-xl font-semibold text-error" dir="rtl">
              لم نتمكن من جلب تفاصيل المقدم
            </div>
          </div>
        </div>
      )}

      {student && student.m_applicantType.includes(ApplicantType.MASTER) && (
        <div className="py-6">
          <CardInfoComponent
            icon={logs}
            title={tCommon("applyForScholarshipMasters")}
            description={tCommon("applyForScholarshipDescription")}
            action={() => router.push("/masters/applications?type=masters")}
            actionTitle={tCommon("applyNow") ?? "Apply Now"}
          />
        </div>
      )}

      {student && !student.m_applicantType.includes(ApplicantType.MASTER) && (
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
            setFieldError,
            setFieldValue,
          }) => {
            const firstStepHaveError =
              !!errors.first_name ||
              !!errors.second_name ||
              !!errors.last_name ||
              !!errors.graduation_year ||
              !!errors.universityID ||
              !!errors.old_program ||
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
              <Form className="flex flex-col justify-center mx-auto max-w-4xl">
                <ul dir="ltr" className="overflow-visible relative mb-6 steps">
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
                  <li className="flex absolute left-0 top-1 flex-col justify-center md:-left-8">
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
                  <div className="w-full">
                    <label className="label">{t("cpr")}</label>
                    <Field
                      title="cpr"
                      placeholder={t("cpr")}
                      className={`w-full input input-bordered input-primary disabled`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={student?.cpr}
                      disabled
                    />
                  </div>

                  <div className="w-full">
                    <label className="label">{t("email")}</label>
                    <Field
                      title="email"
                      placeholder={t("email")}
                      className={`w-full input input-bordered input-primary disabled`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={student?.email}
                      disabled
                    />
                  </div>

                  <div className="w-full">
                    <label className="label">{t("phone")}</label>
                    <Field
                      title="phone"
                      placeholder={t("phone")}
                      className={`w-full input input-bordered input-primary disabled`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={student?.phone}
                      disabled
                    />
                  </div>

                  <div className="w-full">
                    <label className="label">{t("nationality")}</label>
                    <Field
                      title="nationality"
                      placeholder={t("nationality")}
                      className={`w-full input input-bordered input-primary disabled`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={student?.nationalityCategory}
                      disabled
                    />
                  </div>

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

                  <FormSeparator title={t("graduationUniversity")} />
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

                      {universities?.map((uni, index) => (
                        <option key={`uni-${index}`} value={uni.id}>
                          {router.locale === "ar"
                            ? uni.universityNameAr
                            : uni.universityName}
                        </option>
                      ))}
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
                  <div className="container flex flex-col gap-3 mx-auto max-w-3xl">
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
                    <div className="flex flex-wrap gap-3 justify-start items-center w-full">
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
                      disabled={enrollMutation.isPending || isLoading}
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
                        <h3 className="font-semibold text-error text-md">
                          {t("applicantInfo")}
                        </h3>
                        <ul className="pl-5 list-disc">
                          {errors.first_name && (
                            <li className="text-error">
                              <strong>{t("firstName")}:</strong>{" "}
                              {errors.first_name}
                            </li>
                          )}
                          {errors.second_name && (
                            <li className="text-error">
                              <strong>{t("secondName")}:</strong>{" "}
                              {errors.second_name}
                            </li>
                          )}
                          {errors.last_name && (
                            <li className="text-error">
                              <strong>{t("lastName")}:</strong>{" "}
                              {errors.last_name}
                            </li>
                          )}

                          {errors.graduation_year && (
                            <li className="text-error">
                              <strong>{t("graduationYear")}:</strong>{" "}
                              {errors.graduation_year}
                            </li>
                          )}
                          {errors.universityID && (
                            <li className="text-error">
                              <strong>{t("university")}:</strong>{" "}
                              {errors.universityID}
                            </li>
                          )}
                          {errors.old_program && (
                            <li className="text-error">
                              <strong>{t("graduationProgram")}:</strong>{" "}
                              {errors.old_program}
                            </li>
                          )}
                          {errors.isEmployed && (
                            <li className="text-error">
                              <strong>{t("employment")}:</strong>{" "}
                              {errors.isEmployed}
                            </li>
                          )}
                          {values.isEmployed && (
                            <>
                              {errors.place_of_employment && (
                                <li className="text-error">
                                  <strong>{t("placeOfEmployment")}:</strong>{" "}
                                  {errors.place_of_employment}
                                </li>
                              )}
                              {errors.income && (
                                <li className="text-error">
                                  <strong>{t("income")}:</strong>{" "}
                                  {errors.income}
                                </li>
                              )}
                              {errors.income_doc && (
                                <li className="text-error">
                                  <strong>{t("incomeDoc")}:</strong>{" "}
                                  {errors.income_doc}
                                </li>
                              )}
                            </>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Step 2 Errors */}
                    {steps >= 2 && secondStepHaveError && (
                      <div className="mb-4">
                        <h3 className="font-semibold text-error text-md">
                          {t("guardianInfo")}
                        </h3>
                        <ul className="pl-5 list-disc">
                          {errors.guardian_full_name && (
                            <li className="text-error">
                              <strong>{t("guardianFullName")}:</strong>{" "}
                              {errors.guardian_full_name}
                            </li>
                          )}
                          {errors.guardian_cpr && (
                            <li className="text-error">
                              <strong>{t("guardianCpr")}:</strong>{" "}
                              {errors.guardian_cpr}
                            </li>
                          )}
                          {errors.guardian_cpr_doc && (
                            <li className="text-error">
                              <strong>{t("guardianCprDoc")}:</strong>{" "}
                              {errors.guardian_cpr_doc}
                            </li>
                          )}
                          {!values.isEmployed && (
                            <>
                              {errors.income && (
                                <li className="text-error">
                                  <strong>{t("income")}:</strong>{" "}
                                  {errors.income}
                                </li>
                              )}
                              {errors.income_doc && (
                                <li className="text-error">
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
                        <h3 className="font-semibold text-error text-md">
                          {t("termsAndConditions")}
                        </h3>
                        <ul className="pl-5 list-disc">
                          {errors.accepted && (
                            <li className="text-error">
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
      )}
    </div>
  );
};

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
    <div className="flex gap-4 items-center md:col-span-2">
      <div className="h-[1px] bg-zinc-300 flex-1"></div>
      <p>{title}</p>
      <div className="h-[1px] bg-zinc-300 flex-1"></div>
    </div>
  );
};
