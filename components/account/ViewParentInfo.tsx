import React from "react";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import "yup-phone";

import { ParentInfo, UpdateParentInfoMutationVariables } from "../../src/API";
import { updateParentInfoInDB } from "../../src/CustomAPI";
import { useAppContext } from "../../contexts/AppContexts";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

interface FormValues {
  guardianFullName: string | null | undefined;
  relation: string | null | undefined;
  guardianCPR: string | null | undefined;
  primaryMobile: string | null | undefined;
  secondaryMobile: string | null | undefined;
  fatherFullName: string | null | undefined;
  fatherCPR: string | null | undefined;
  motherFullName: string | null | undefined;
  motherCPR: string | null | undefined;
  numberOfFamilyMembers: number | null | undefined;
  address: string | null | undefined;
}

interface Props {
  parentInfo: ParentInfo;
}

export default function ViewParentInfo({ parentInfo }: Props) {
  const { syncStudent } = useAppContext();
  const { t } = useTranslation("account");
  const { t: tErrors } = useTranslation("errors");

  let initialValues: FormValues = {
    guardianFullName: parentInfo.guardianFullName,
    relation: parentInfo.relation,
    guardianCPR: parentInfo.guardianCPR,
    primaryMobile: parentInfo.primaryMobile,
    secondaryMobile: parentInfo.secondaryMobile,
    fatherFullName: parentInfo.fatherFullName,
    fatherCPR: parentInfo.fatherCPR,
    motherFullName: parentInfo.motherFullName,
    motherCPR: parentInfo.motherCPR,
    numberOfFamilyMembers: parentInfo.numberOfFamilyMembers,
    address: parentInfo.address,
  };

  async function updateProcess(inputs: UpdateParentInfoMutationVariables) {
    return await updateParentInfoInDB(inputs).then(async (value) => {
      if (value === undefined) {
        throw new Error("Failed to update");
      }
      await syncStudent();

      return value;
    });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yup.object({
        guardianFullName: yup.string().required(`${tErrors("requiredField")}`),
        relation: yup.string().required(`${tErrors("requiredField")}`),
        guardianCPR: yup
          .string()
          .min(9, `${tErrors("cprShouldBe9")}`)
          .max(9, `${tErrors("cprShouldBe9")}`)
          .required(`${tErrors("requiredField")}`),
        address: yup.string().required(`${tErrors("requiredField")}`),

        primaryMobile: yup
          .string()
          .phone()
          .required(`${tErrors("requiredField")}`),
        secondaryMobile: yup
          .string()
          .phone()
          .required(`${tErrors("requiredField")}`),

        fatherFullName: yup.string().nullable(),
        fatherCPR: yup
          .string()
          .min(9, `${tErrors("cprShouldBe9")}`)
          .max(9, `${tErrors("cprShouldBe9")}`)
          .nullable(),
        motherFullName: yup.string().nullable(),
        motherCPR: yup
          .string()
          .min(9, `${tErrors("cprShouldBe9")}`)
          .max(9, `${tErrors("cprShouldBe9")}`)
          .nullable(),
        numberOfFamilyMembers: yup
          .number()
          .required(`${tErrors("requiredField")}`),
      })}
      onSubmit={async (values, actions) => {
        let updateVars: UpdateParentInfoMutationVariables = {
          input: {
            id: parentInfo.id,
            guardianFullName: values.guardianFullName,
            relation: values.relation,
            guardianCPR: values.guardianCPR,
            primaryMobile: values.primaryMobile,
            secondaryMobile: values.secondaryMobile,
            fatherFullName: values.fatherFullName,
            fatherCPR: values.fatherCPR,
            motherFullName: values.motherFullName,
            motherCPR: values.motherCPR,
            numberOfFamilyMembers: values.numberOfFamilyMembers,
            address: values.address,
            _version: parentInfo._version,
          },
        };

        await toast.promise(updateProcess(updateVars), {
          loading: "Updating...",
          success: "Updated successfully",
          error: (err) => {
            return `${err.message}`;
          },
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
        isValid,
      }) => (
        <Form className="container grid max-w-3xl grid-cols-1 gap-3 mx-auto md:grid-cols-2">
          {/* guardianFullName */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("guardianName")}</label>
            <Field
              dir="ltr"
              type="text"
              name="guardianFullName"
              title="guardianFullName"
              className={`input input-bordered input-primary ${
                errors.guardianFullName && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.guardianFullName ?? ""}
            />
            <label className="label-text-alt text-error">
              {errors.guardianFullName &&
                touched.guardianFullName &&
                errors.guardianFullName}
            </label>
          </div>

          {/* relation */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("relation")}</label>
            <Field
              dir="ltr"
              type="text"
              name="relation"
              title="relation"
              className={`input input-bordered input-primary ${
                errors.relation && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.relation}
            />
            <label className="label-text-alt text-error">
              {errors.relation && touched.relation && errors.relation}
            </label>
          </div>

          {/* Guardian CPR */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("guardianCPR")}</label>
            <Field
              dir="ltr"
              type="text"
              name="guardianCPR"
              title="guardianCPR"
              className={`input input-bordered input-primary ${
                errors.guardianCPR && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.guardianCPR}
            />
            <label className="label-text-alt text-error">
              {errors.guardianCPR && touched.guardianCPR && errors.guardianCPR}
            </label>
          </div>

          {/* Address */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("address")}</label>
            <Field
              dir="ltr"
              type="text"
              name="address"
              title="address"
              className={`input input-bordered input-primary ${
                errors.address && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
            />
            <label className="label-text-alt text-error">
              {errors.address && touched.address && errors.address}
            </label>
          </div>

          {/* primaryMobile */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("primaryMobileNumber")}</label>
            <Field
              dir="ltr"
              type="phone"
              name="primaryMobile"
              title="primaryMobile"
              className={`input input-bordered input-primary ${
                errors.primaryMobile && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.primaryMobile}
            />
            <label className="label-text-alt text-error">
              {errors.primaryMobile &&
                touched.primaryMobile &&
                errors.primaryMobile}
            </label>
          </div>

          {/* secondaryMobile */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("secondaryMobileNumber")}</label>
            <Field
              dir="ltr"
              type="phone"
              name="secondaryMobile"
              title="secondaryMobile"
              className={`input input-bordered input-primary ${
                errors.secondaryMobile && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.secondaryMobile}
            />
            <label className="label-text-alt text-error">
              {errors.secondaryMobile &&
                touched.secondaryMobile &&
                errors.secondaryMobile}
            </label>
          </div>

          {/* Number Of Family Members */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("numberOfFamilyMembers")}</label>
            <Field
              dir="ltr"
              type="text"
              name="numberOfFamilyMembers"
              title="numberOfFamilyMembers"
              className={`input input-bordered input-primary ${
                errors.numberOfFamilyMembers && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.numberOfFamilyMembers}
            />
            <label className="label-text-alt text-error">
              {errors.numberOfFamilyMembers &&
                touched.numberOfFamilyMembers &&
                errors.numberOfFamilyMembers}
            </label>
          </div>

          <div className="divider md:col-span-2"></div>

          {/* Father Full Name */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("fatherFullName")}</label>
            <Field
              dir="ltr"
              type="text"
              name="fatherFullName"
              title="fatherFullName"
              className={`input input-bordered input-primary ${
                errors.fatherFullName && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fatherFullName}
            />
            <label className="label-text-alt text-error">
              {errors.fatherFullName &&
                touched.fatherFullName &&
                errors.fatherFullName}
            </label>
          </div>

          {/* Father CPR */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("fatherCPR")}</label>
            <Field
              dir="ltr"
              type="text"
              name="fatherCPR"
              title="fatherCPR"
              className={`input input-bordered input-primary ${
                errors.fatherCPR && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fatherCPR}
            />
            <label className="label-text-alt text-error">
              {errors.fatherCPR && touched.fatherCPR && errors.fatherCPR}
            </label>
          </div>

          <div className="md:col-span-2 divider"></div>

          {/* Mother Full Name */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("motherFullName")}</label>
            <Field
              dir="ltr"
              type="text"
              name="motherFullName"
              title="motherFullName"
              className={`input input-bordered input-primary ${
                errors.motherFullName && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.motherFullName}
            />
            <label className="label-text-alt text-error">
              {errors.motherFullName &&
                touched.motherFullName &&
                errors.motherFullName}
            </label>
          </div>

          {/* Mother CPR */}
          <div className="flex flex-col justify-start w-full">
            <label className="label">{t("motherCPR")}</label>
            <Field
              dir="ltr"
              type="text"
              name="motherCPR"
              title="motherCPR"
              className={`input input-bordered input-primary ${
                errors.motherCPR && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.motherCPR}
            />
            <label className="label-text-alt text-error">
              {errors.motherCPR && touched.motherCPR && errors.motherCPR}
            </label>
          </div>

          {/* Submit */}
          <button
            className={`my-3 text-white btn btn-primary md:col-span-2 ${
              isSubmitting && "loading"
            }`}
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            {t("update")}
          </button>
        </Form>
      )}
    </Formik>
  );
}
