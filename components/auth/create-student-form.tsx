import { Formik, Form, Field } from "formik";
import {
  CreateStudentMutationVariables,
  Gender,
  Language,
  SchoolType,
} from "../../src/API";
import * as yup from "yup";
import "yup-phone";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import MultiUpload from "../MultiUpload";
import { useAuth } from "../../hooks/use-auth";
import { checkIfFilesAreTooBig } from "../../src/HelperFunctions";
import { Nationality, FamilyIncome } from "../../src/models";
import { PhoneNumberInput } from "../phone";
import { isValidPhoneNumber } from "react-phone-number-input";

interface ICreateStudentForm {
  student: CreateStudentMutationVariables;
  password: string;
  submitTitle: string;
  onFormSubmit: (values: {
    student: CreateStudentMutationVariables;
    password: string;
    familyIncomeProofDocsFile: File[];
    cprDoc: File | undefined;
  }) => void;
}

export const CreateStudentForm = (props: ICreateStudentForm) => {
  const { t } = useTranslation("account");
  const { t: tErrors } = useTranslation("errors");
  const { checkIfCprExist } = useAuth();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [cprAvailable, setCprAvailable] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [familyIncomeProofInvalid, setFamilyIncomeProofInvalid] =
    useState<boolean>(false);

  const [familyIncomeProofDocsFile, setFamilyIncomeProofDocsFile] = useState<
    File[]
  >([]);

  const [cprDoc, setCprDoc] = useState<File | undefined>(undefined);

  const englishNumberRegex = /^[0-9]*$/;
  const passwordNoStartOrEndSpaceRegex = /^[\S]+.*[\S]+$/;
  const passwordNoSpaceRegex = /^\S+$/;

  return (
    <Formik
      initialValues={{
        ...props.student.input,
        password: "",
        confirmPassword: "",
        familyIncomeProofDocsFile: [],
        cprDoc: undefined,
      }}
      validationSchema={yup.object({
        cpr: yup
          .string()
          .matches(englishNumberRegex, "Only English Numbers are allowed")
          .min(9, `${tErrors("cprShouldBe9")}`)
          .max(9, `${tErrors("cprShouldBe9")}`)
          .required(`${tErrors("requiredField")}`),
        cprDoc: yup.string().required(`${tErrors("requiredField")}`),
        fullName: yup.string().required(`${tErrors("requiredField")}`),
        email: yup
          .string()
          .email()
          .required(`${tErrors("requiredField")}`),
        phone: yup
          .string()
          // .string()
          .test((value) =>
            value ? isValidPhoneNumber(value.toString()) : false
          )
          // .phone()
          .required(`${tErrors("requiredField")}`),
        gender: yup.string().required(`${tErrors("requiredField")}`),
        schoolName: yup.string().required(`${tErrors("requiredField")}`),
        schoolType: yup.string().required(`${tErrors("requiredField")}`),
        specialization: yup.string().required(`${tErrors("requiredField")}`),
        address: yup.string().required(`${tErrors("requiredField")}`),
        placeOfBirth: yup.string().required(`${tErrors("requiredField")}`),
        familyIncome: yup.string().required(`${tErrors("requiredField")}`),
        familyIncomeProofDocsFile: yup.array(yup.string()),
        nationalityCategory: yup
          .string()
          .required(`${tErrors("requiredField")}`),
        // nationality: yup.string().required(`${tErrors("requiredField")}`),
        studentOrderAmongSiblings: yup
          .number()
          .required(`${tErrors("requiredField")}`),
        preferredLanguage: yup.string().required(`${tErrors("requiredField")}`),
        graduationDate: yup.date().required(`${tErrors("requiredField")}`),
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
      })}
      onSubmit={async (values, actions) => {
        props.onFormSubmit({
          student: {
            input: {
              cpr: values.cpr,
              cprDoc: values.cprDoc,
              fullName: values.fullName,
              email: values.email,
              phone: values.phone,
              gender: values.gender,
              schoolName: values.schoolName,
              schoolType: values.schoolType,
              specialization: values.specialization,
              placeOfBirth: values.placeOfBirth,
              nationality: values.nationalityCategory?.toString(),
              nationalityCategory: values.nationalityCategory,
              studentOrderAmongSiblings: values.studentOrderAmongSiblings,
              familyIncome: values.familyIncome,
              preferredLanguage: values.preferredLanguage,
              graduationDate: values.graduationDate,
              address: values.address,
              parentInfoID: props.student.input.parentInfoID,
              _version: props.student.input._version,
            },
            condition: props.student.condition,
          },
          password: values.password,
          familyIncomeProofDocsFile: familyIncomeProofDocsFile,
          cprDoc: cprDoc,
        });

        actions.setSubmitting(false);
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
        validateField,
      }) => (
        <Form className="container grid items-end max-w-3xl grid-cols-1 gap-3 mx-auto md:grid-cols-2">
          {/* CPR */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("studentCPR")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.cpr && touched.cpr && errors.cpr}
              </label>
              <label className="px-2 label-text-alt text-success">
                {cprAvailable && touched.cpr && !errors.cpr && t("available")}
              </label>
            </div>
            <Field
              dir="ltr"
              type="text"
              name="cpr"
              title="cpr"
              // placeholder="CPR"
              className={`input input-bordered input-primary ${
                errors.cpr && touched.cpr && "input-error"
              }`}
              onChange={handleChange}
              onBlur={(event: any) => {
                if (!errors.cpr) {
                  checkIfCprExist(values.cpr)
                    .then((res) => {
                      if (res) {
                        setFieldError("cpr", "CPR already in use");
                        setCprAvailable(false);
                      } else {
                        validateField("cpr");
                        setCprAvailable(true);
                      }
                    })
                    .catch((error) => {
                      // bugsnagClient.notify(error);
                      console.error(error);
                    });
                }
                handleBlur(event);
              }}
              value={values.cpr ?? ""}
            />
          </div>
          {/* cprDoc */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">
              {t("studentCPRdoc")}{" "}
              <span className="ml-1 mr-auto text-red-500">*</span>
            </label>
            <Field
              dir="ltr"
              type="file"
              accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,application/msword"
              id="cprDoc"
              name="cprDoc"
              title="cprDoc"
              placeholder="CPR Doc"
              className={`file-input file-input-bordered file-input-secondary bg-secondary text-secondary-content ${
                errors.cprDoc && touched.cprDoc && "input-error"
              }`}
              onChange={(event: any) => {
                let file: File | undefined = event.currentTarget.files[0];

                let isValid = checkIfFilesAreTooBig(file);
                if (isValid) {
                  setCprDoc(file);
                  handleChange(event);
                } else {
                  setFieldError("cprDoc", "File must not be more than 2MB");
                }
              }}
              onBlur={handleBlur}
              value={values.cprDoc ?? ""}
            />
            <label className="label-text-alt text-error">
              {errors.cprDoc && touched.cprDoc && errors.cprDoc}
            </label>
          </div>
          {/* FullName */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("fullName")}</label>
              <label className="text-error label">*</label>
              <label className="label-text-alt text-error">
                {errors.fullName && touched.fullName && errors.fullName}
              </label>
            </div>
            <Field
              dir="ltr"
              type="text"
              name="fullName"
              title="fullName"
              // placeholder="Full name"
              className={`input input-bordered input-primary ${
                errors.fullName && touched.fullName && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fullName}
            />
          </div>
          {/* Email */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("email")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.email && touched.email && errors.email}
              </label>
            </div>
            <Field
              dir="ltr"
              type="email"
              name="email"
              title="email"
              // placeholder={t("email")}
              className={`input input-bordered input-primary ${
                errors.email && touched.email && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
          </div>
          {/* Phone */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("phone")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.phone && touched.phone && errors.phone}
              </label>
            </div>

            <PhoneNumberInput
              dir="ltr"
              type="phone"
              name="phone"
              title="phone"
              placeholder={`${t("phone")} (+973)`}
              className={`input input-bordered input-primary ${
                errors.phone && touched.phone && "input-error"
              }`}
              onChange={(value) =>
                setFieldValue("phone", (value ?? "")?.toString())
              }
              onBlur={handleBlur}
              value={values.phone ?? ""}
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("gender")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.gender && touched.gender && errors.gender}
              </label>
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
                Select
              </option>
              <option value={Gender.MALE}>{t("male")}</option>
              <option value={Gender.FEMALE}>{t("female")}</option>
            </Field>
          </div>

          {/* address */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("studentAddress")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.address && touched.address && errors.address}
              </label>
            </div>
            <Field
              dir="ltr"
              type="text"
              name="address"
              title="address"
              // placeholder="Student Address"
              className={`input input-bordered input-primary ${
                errors.address && touched.address && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
            />
          </div>

          {/* schoolName */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("schoolName")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.schoolName && touched.schoolName && errors.schoolName}
              </label>
            </div>
            <Field
              dir="ltr"
              type="text"
              name="schoolName"
              title="schoolName"
              // placeholder="School name"
              className={`input input-bordered input-primary ${
                errors.schoolName && touched.schoolName && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.schoolName}
            />
          </div>

          {/* schoolType */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("schoolType")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.schoolType && touched.schoolType && errors.schoolType}
              </label>
            </div>
            <Field
              dir="ltr"
              as="select"
              name="schoolType"
              title="schoolType"
              placeholder="Preferred Language"
              className={`input input-bordered input-primary ${
                errors.schoolType && touched.schoolType && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.schoolType}
            >
              <option disabled selected value={undefined}>
                {t("select")}
              </option>
              <option value={SchoolType.PRIVATE}>
                {t(SchoolType.PRIVATE)}
              </option>
              <option value={SchoolType.PUBLIC}>{t(SchoolType.PUBLIC)}</option>
            </Field>
          </div>

          {/* specialization */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("specialization")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.specialization &&
                  touched.specialization &&
                  errors.specialization}
              </label>
            </div>
            <Field
              dir="ltr"
              type="text"
              name="specialization"
              title="specialization"
              // placeholder="Specialization"
              className={`input input-bordered input-primary ${
                errors.specialization && touched.specialization && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.specialization}
            />
          </div>
          {/* placeOfBirth */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("placeOfBirth")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.placeOfBirth &&
                  touched.placeOfBirth &&
                  errors.placeOfBirth}
              </label>
            </div>
            <Field
              dir="ltr"
              type="text"
              name="placeOfBirth"
              title="placeOfBirth"
              // placeholder="Place Of Birth"
              className={`input input-bordered input-primary ${
                errors.placeOfBirth && touched.placeOfBirth && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.placeOfBirth}
            />
          </div>

          {/* nationality */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("nationality")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.nationalityCategory &&
                  touched.nationalityCategory &&
                  errors.nationalityCategory}
              </label>
            </div>
            <Field
              dir="ltr"
              as="select"
              name="nationalityCategory"
              title="nationalityCategory"
              placeholder={t("nationality")}
              className={`input input-bordered input-primary ${
                errors.nationalityCategory &&
                touched.nationalityCategory &&
                "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.nationalityCategory}
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
          </div>

          {/* Student Order Among Siblings */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("studentOrderAmongSiblings")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.studentOrderAmongSiblings &&
                  touched.studentOrderAmongSiblings &&
                  errors.studentOrderAmongSiblings}
              </label>
            </div>
            <Field
              dir="ltr"
              type="number"
              name="studentOrderAmongSiblings"
              title="studentOrderAmongSiblings"
              // placeholder={t("studentOrderAmongSiblings")}
              className={`input input-bordered input-primary ${
                errors.studentOrderAmongSiblings &&
                touched.studentOrderAmongSiblings &&
                "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.studentOrderAmongSiblings}
            />
          </div>

          {/* preferredLanguage */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("preferredLanguage")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.preferredLanguage &&
                  touched.preferredLanguage &&
                  errors.preferredLanguage}
              </label>
            </div>
            <Field
              dir="ltr"
              as="select"
              name="preferredLanguage"
              title="preferredLanguage"
              placeholder="Preferred Language"
              className={`input input-bordered input-primary ${
                errors.preferredLanguage &&
                touched.preferredLanguage &&
                "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.preferredLanguage}
            >
              <option disabled selected value={undefined}>
                {t("select")}
              </option>
              <option value={Language.ARABIC}>العربية</option>
              <option value={Language.ENGLISH}>English</option>
            </Field>
          </div>

          {/* graduationDate */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("graduationDate")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.graduationDate &&
                  touched.graduationDate &&
                  errors.graduationDate}
              </label>
            </div>
            <Field
              type="date"
              name="graduationDate"
              title="graduationDate"
              // placeholder="Graduation Date"
              className={`input input-bordered input-primary ${
                errors.graduationDate && touched.graduationDate && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.graduationDate}
            />
          </div>

          {/* familyIncome */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("familyIncome")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.familyIncome &&
                  touched.familyIncome &&
                  errors.familyIncome}
              </label>
            </div>
            <Field
              dir="ltr"
              as="select"
              name="familyIncome"
              title="familyIncome"
              placeholder="Preferred Language"
              className={`input input-bordered input-primary ${
                errors.familyIncome && touched.familyIncome && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.familyIncome}
            >
              <option disabled selected value={undefined}>
                {t("select")}
              </option>
              <option value={FamilyIncome.LESS_THAN_1500}>
                {t("lessThan1500")}
              </option>
              <option value={FamilyIncome.MORE_THAN_1500}>
                {t("moreThan1500")}
              </option>
            </Field>
          </div>

          {/* Family income proofs */}
          <div className="justify-start md:col-span-2">
            <MultiUpload
              onFiles={(files) => {
                setFamilyIncomeProofDocsFile(files);
              }}
              single
              isInvalid={setFamilyIncomeProofInvalid}
              handleChange={handleChange}
              handleOnClear={() => {
                setFamilyIncomeProofDocsFile([]);
              }}
              value={values.familyIncomeProofDocsFile ?? ""}
              filedName={"familyIncomeProofDocsFile"}
              title={`${t("familyIncomeProof")} ${t("document")}`}
            ></MultiUpload>
            {/* <label className="whitespace-pre-wrap stat-desc">
              {t("IfYouWantToUploadMultiple")}
            </label> */}
          </div>

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
                {errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword}
              </label>
            </div>
            <div className="relative w-full">
              <Field
                dir="ltr"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                title="Confirm password"
                // placeholder="Confirm password"
                className={`input w-full input-bordered input-primary ${
                  errors.confirmPassword &&
                  touched.confirmPassword &&
                  "input-error"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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

          {/* Submit */}
          <button
            className="my-3 text-white md:col-span-2 btn btn-primary"
            type="submit"
            disabled={
              isSubmitting ||
              familyIncomeProofInvalid ||
              (familyIncomeProofDocsFile.length === 0 &&
                (props.student.input.familyIncomeProofDocs ?? []).length === 0)
            }
          >
            {props.submitTitle}
          </button>
        </Form>
      )}
    </Formik>
  );
};
