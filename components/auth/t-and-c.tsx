import { Formik, Form, Field } from "formik";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

import * as yup from "yup";

interface ITermsAndConditions {
  isLoading: boolean;
  submitTitle: string;
  onFormSubmit: (accepted: boolean) => void;
}

export const TermsAndConditions: FC<ITermsAndConditions> = ({
  isLoading,
  submitTitle,
  onFormSubmit,
}) => {
  let initialValues = {
    accepted: false,
  };
  const { t } = useTranslation("termsAndConditions");
  const { t: tErrors } = useTranslation("errors");

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={yup.object({
        accepted: yup
          .boolean()
          .isTrue("You have to accept the terms and conditions to continue.")
          .required(`${tErrors("requiredField")}`),
      })}
      onSubmit={async (values, actions) => {
        onFormSubmit(values.accepted);

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
        <Form className="container flex flex-col max-w-3xl gap-3 mx-auto">
          <h1 className="text-2xl font-semibold md:text-3xl">
            {t("termsAndConditions")}
          </h1>
          <div className="w-full h-[30rem] overflow-y-scroll p-6 border border-gray-300 rounded-2xl">
            <div className="mx-auto prose">
              <h3>{t("title")}</h3>
              <ul className="">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <li key={i}>{t(`b${i}`)}</li>
                ))}
              </ul>
            </div>
          </div>
          {/* Accepted */}
          <div className="flex flex-wrap items-center justify-start w-full gap-3">
            <label className="label">{t("acceptTerms")}</label>
            <Field
              dir="ltr"
              type="checkbox"
              name="accepted"
              title="accepted"
              placeholder="Accepted"
              className={`checkbox  checkbox-primary ${
                errors.accepted && "checkbox-error"
              }`}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.accepted ?? ""}
              checked={values.accepted}
            />
            <label className="label-text-alt text-error">
              {errors.accepted && touched.accepted && errors.accepted}
            </label>
          </div>

          {/* Submit */}
          <button
            className={`my-3 text-white btn btn-primary md:col-span-2`}
            type="submit"
            disabled={isSubmitting || !isValid || isLoading}
          >
            {isLoading && <span className="loading"></span>}
            {submitTitle}
          </button>
        </Form>
      )}
    </Formik>
  );
};
