import { Formik, Form, Field } from "formik";
import { CreateParentInfoMutationVariables } from "../../src/API";
import * as yup from "yup";
import "yup-phone";
import { useTranslation } from "react-i18next";

interface ICreateParentsForm {
  parentInfo: CreateParentInfoMutationVariables;
  isLoading: boolean;
  submitTitle: string;
  onFormSubmit: (values: CreateParentInfoMutationVariables) => void;
}

export const CreateParentsForm = (props: ICreateParentsForm) => {
  const { t } = useTranslation("account");
  const { t: tErrors } = useTranslation("errors");
  return (
    <Formik
      initialValues={props.parentInfo.input}
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

        fatherFullName: yup.string(),
        fatherCPR: yup
          .string()
          .min(9, `${tErrors("cprShouldBe9")}`)
          .max(9, `${tErrors("cprShouldBe9")}`),
        motherFullName: yup.string(),
        motherCPR: yup
          .string()
          .min(9, `${tErrors("cprShouldBe9")}`)
          .max(9, `${tErrors("cprShouldBe9")}`),

        numberOfFamilyMembers: yup
          .number()
          .required(`${tErrors("requiredField")}`),
      })}
      onSubmit={async (values, actions) => {
        props.onFormSubmit({
          input: {
            id: props.parentInfo.input.id,
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
            _version: props.parentInfo.input._version,
          },
          condition: props.parentInfo.condition,
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
            <div className="flex items-center">
              <label className="label">{t("guardianName")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.guardianFullName &&
                  touched.guardianFullName &&
                  errors.guardianFullName}
              </label>
            </div>
            <Field
              dir="ltr"
              type="text"
              name="guardianFullName"
              title="guardianFullName"
              // placeholder="Guardian Full Name"
              className={`input input-bordered input-primary ${
                errors.guardianFullName && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.guardianFullName ?? ""}
            />
          </div>

          {/* relation */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("relation")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.relation && touched.relation && errors.relation}
              </label>
            </div>
            <Field
              dir="ltr"
              type="text"
              name="relation"
              title="relation"
              // placeholder="Relation"
              className={`input input-bordered input-primary ${
                errors.relation && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.relation}
            />
          </div>

          {/* Guardian CPR */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("guardianCPR")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.guardianCPR &&
                  touched.guardianCPR &&
                  errors.guardianCPR}
              </label>
            </div>
            <Field
              dir="ltr"
              type="text"
              name="guardianCPR"
              title="guardianCPR"
              // placeholder="Guardian CPR"
              className={`input input-bordered input-primary ${
                errors.guardianCPR && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.guardianCPR}
            />
          </div>

          {/* Address */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("address")}</label>
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
              // placeholder="Address"
              className={`input input-bordered input-primary ${
                errors.address && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
            />
          </div>

          {/* primaryMobile */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("primaryMobileNumber")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.primaryMobile &&
                  touched.primaryMobile &&
                  errors.primaryMobile}
              </label>
            </div>
            <Field
              dir="ltr"
              type="phone"
              name="primaryMobile"
              title="primaryMobile"
              placeholder={`${t("phone")} (+973)`}
              className={`input input-bordered input-primary ${
                errors.primaryMobile && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.primaryMobile}
            />
          </div>

          {/* secondaryMobile */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("secondaryMobileNumber")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.secondaryMobile &&
                  touched.secondaryMobile &&
                  errors.secondaryMobile}
              </label>
            </div>
            <Field
              dir="ltr"
              type="phone"
              name="secondaryMobile"
              title="secondaryMobile"
              placeholder={`${t("phone")} (+973)`}
              className={`input input-bordered input-primary ${
                errors.secondaryMobile && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.secondaryMobile}
            />
          </div>

          {/* Number Of Family Members */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("numberOfFamilyMembers")}</label>
              <label className="text-error label">*</label>{" "}
              <label className="label-text-alt text-error">
                {errors.numberOfFamilyMembers &&
                  touched.numberOfFamilyMembers &&
                  errors.numberOfFamilyMembers}
              </label>
            </div>
            <Field
              dir="ltr"
              type="text"
              name="numberOfFamilyMembers"
              title="numberOfFamilyMembers"
              // placeholder="Number Of Family Members"
              className={`input input-bordered input-primary ${
                errors.numberOfFamilyMembers && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.numberOfFamilyMembers}
            />
          </div>

          <div className="divider md:col-span-2"></div>

          {/* Father Full Name */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("fatherFullName")}</label>

              <label className="label-text-alt text-error">
                {errors.fatherFullName &&
                  touched.fatherFullName &&
                  errors.fatherFullName}
              </label>
            </div>
            <Field
              dir="ltr"
              type="text"
              name="fatherFullName"
              title="fatherFullName"
              // placeholder="Father Full Name"
              className={`input input-bordered input-primary ${
                errors.fatherFullName && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fatherFullName}
            />
          </div>

          {/* Father CPR */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("fatherCPR")}</label>

              <label className="label-text-alt text-error">
                {errors.fatherCPR && touched.fatherCPR && errors.fatherCPR}
              </label>
            </div>
            <Field
              dir="ltr"
              type="text"
              name="fatherCPR"
              title="fatherCPR"
              // placeholder="Father CPR"
              className={`input input-bordered input-primary ${
                errors.fatherCPR && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.fatherCPR}
            />
          </div>

          {/* Mother Full Name */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("motherFullName")}</label>

              <label className="label-text-alt text-error">
                {errors.motherFullName &&
                  touched.motherFullName &&
                  errors.motherFullName}
              </label>
            </div>
            <Field
              dir="ltr"
              type="text"
              name="motherFullName"
              title="motherFullName"
              // placeholder="Mother Full Name"
              className={`input input-bordered input-primary ${
                errors.motherFullName && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.motherFullName}
            />
          </div>

          {/* Mother CPR */}
          <div className="flex flex-col justify-start w-full">
            <div className="flex items-center">
              <label className="label">{t("motherCPR")}</label>

              <label className="label-text-alt text-error">
                {errors.motherCPR && touched.motherCPR && errors.motherCPR}
              </label>
            </div>
            <Field
              dir="ltr"
              type="text"
              name="motherCPR"
              title="motherCPR"
              // placeholder="Mother CPR"
              className={`input input-bordered input-primary ${
                errors.motherCPR && "input-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.motherCPR}
            />
          </div>

          {/* Submit */}
          <button
            className={`my-3 text-white btn btn-primary md:col-span-2 ${
              props.isLoading && "loading"
            }`}
            type="submit"
            disabled={isSubmitting || !isValid || props.isLoading}
          >
            {props.submitTitle}
          </button>
        </Form>
      )}
    </Formik>
  );
};
