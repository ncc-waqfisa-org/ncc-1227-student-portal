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
        // console.log({ values, actions });

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
              <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</h3>
              <p>
                A terms and conditions agreement outlines the website
                administrator’s rules regarding user behavior and provides
                information about the actions the website administrator can and
                will perform. Essentially, your terms and conditions text is a
                contract between your website and its users. In the event of a
                legal dispute, arbitrators will look at it to determine whether
                each party acted within their rights. Creating the best terms
                and conditions page possible will protect your business from the
                following: Abusive users: Terms and Conditions agreements allow
                you to establish what constitutes appropriate activity on your
                site or app, empowering you to remove abusive users and content
                that violates your guidelines. Intellectual property theft:
                Asserting your claim to the creative assets of your site in your
                terms and conditions will prevent ownership disputes and
                copyright infringement. Potential litigation: If a user lodges a
                legal complaint against your business, showing that they were
                presented with clear terms and conditions before they used your
                site will help you immensely in court. In short, terms and
                conditions give you control over your site and legal enforcement
                if users try to take advantage of your operations.
              </p>

              <h3>Is a Terms and Conditions Legally Required on My Website?</h3>
              <p>
                Technically, no. You aren’t legally required to have a terms and
                conditions agreement. However, having terms and conditions for
                websites is considered standard business practice in the US,
                Canada, the UK, and just about everywhere else — from South
                Africa to Australia. If you plan to grow your business or expand
                your user base, a simple website terms and conditions page will
                provide your site with an additional layer of legal protection.
              </p>
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
            className={`my-3 text-white btn btn-primary md:col-span-2 ${
              isLoading && "loading"
            }`}
            type="submit"
            disabled={isSubmitting || !isValid || isLoading}
          >
            {submitTitle}
          </button>
        </Form>
      )}
    </Formik>
  );
};
