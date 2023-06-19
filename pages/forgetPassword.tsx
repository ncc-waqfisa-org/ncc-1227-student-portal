import { GetStaticProps, NextPage } from "next";
import { PageComponent } from "../components/PageComponent";
import { Formik, Form, Field } from "formik";

import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useAuth } from "../hooks/use-auth";
import { useState } from "react";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "errors",
        "signIn",
      ])),
    },
  };
};

interface Props {}

interface IForgetPasswordForm {
  cpr: string;
}
interface IForgetPasswordOTPForm {
  otp: string;
  newPassword: string;
}

const ForgetPassword: NextPage<Props> = () => {
  const { t } = useTranslation("signIn");
  const { t: tErrors } = useTranslation("errors");
  const auth = useAuth();
  const initialValues: IForgetPasswordForm = {
    cpr: "",
  };
  const initialValuesOTP: IForgetPasswordOTPForm = {
    otp: "",
    newPassword: "",
  };

  const [showOTP, setShowOTP] = useState(false);
  const [cpr, setCpr] = useState("");

  const router = useRouter();

  return (
    <div>
      <PageComponent title={t("forgetPassword")}>
        <div className="container max-w-sm mx-auto">
          {!showOTP && (
            <Formik
              initialValues={initialValues}
              validationSchema={yup.object({
                cpr: yup
                  .string()
                  .min(9)
                  .max(9)
                  .required(`${tErrors("requiredField")}`),
              })}
              onSubmit={async (values, actions) => {
                await auth.sendForgetPassword(values.cpr).then((isSent) => {
                  if (isSent) {
                    setCpr(values.cpr);
                    setShowOTP(isSent);
                  }
                });
              }}
            >
              {({ errors, touched, isSubmitting, isValid }) => (
                <Form className="flex flex-col gap-3 p-4">
                  <div className="flex flex-col">
                    <label className="label">{t("cpr")}</label>
                    <Field
                      name="cpr"
                      type="text"
                      className={`input input-bordered input-primary ${
                        errors.cpr && "input-error"
                      }`}
                    />
                    <label className="label-text-alt text-error">
                      {errors.cpr && touched.cpr && errors.cpr}
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary ${isSubmitting && "loading"}`}
                    disabled={isSubmitting || !isValid}
                  >
                    {t("sendResetEmail")}
                  </button>
                </Form>
              )}
            </Formik>
          )}

          {showOTP && (
            <Formik
              initialValues={initialValuesOTP}
              validationSchema={yup.object({
                otp: yup
                  .string()
                  .min(6)
                  .max(6)
                  .required(`${tErrors("requiredField")}`),
                newPassword: yup
                  .string()
                  .min(6)
                  .required(`${tErrors("requiredField")}`),
              })}
              onSubmit={async (values, actions) => {
                actions.setSubmitting(true);
                await auth
                  .verifyForgetPassword(cpr, values.otp, values.newPassword)
                  .then((isPasswordUpdated) => {
                    actions.setSubmitting(false);
                    if (isPasswordUpdated) {
                      router.replace("/signIn");
                    }
                  });
              }}
            >
              {({ errors, touched, isSubmitting, isValid }) => (
                <Form className="flex flex-col gap-3 p-4">
                  <div className="flex flex-col">
                    <label className="label">{t("cpr")}</label>
                    <Field
                      name="cpr"
                      type="text"
                      disabled
                      className={`input input-bordered input-primary`}
                      value={cpr}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="label">{t("otp")}</label>
                    <Field
                      name="otp"
                      type="text"
                      className={`input input-bordered input-primary ${
                        errors.otp && "input-error"
                      }`}
                    />
                    <label className="label-text-alt text-error">
                      {errors.otp && touched.otp && errors.otp}
                    </label>
                  </div>
                  <div className="flex flex-col">
                    <label className="label">{t("newPassword")}</label>
                    <Field
                      name="newPassword"
                      type="text"
                      className={`input input-bordered input-primary ${
                        errors.newPassword && "input-error"
                      }`}
                    />
                    <label className="label-text-alt text-error">
                      {errors.newPassword &&
                        touched.newPassword &&
                        errors.newPassword}
                    </label>
                  </div>

                  <button
                    type="submit"
                    className={`btn btn-primary ${isSubmitting && "loading"}`}
                    disabled={isSubmitting || !isValid}
                  >
                    {t("verify")}
                  </button>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </PageComponent>
    </div>
  );
};

export default ForgetPassword;
