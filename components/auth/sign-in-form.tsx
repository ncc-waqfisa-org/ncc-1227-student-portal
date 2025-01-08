import { Field, Form, Formik } from "formik";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useAuth } from "../../hooks/use-auth";
import { useRouter } from "next/router";

interface ISignInForm {
  cpr: string;
  password: string;
}

export const SignInForm: React.FC = () => {
  const auth = useAuth();
  const { t } = useTranslation("signIn");
  const { t: tErrors } = useTranslation("errors");
  const router = useRouter();
  const { type } = router.query;
  console.log(type);

  const initialValues: ISignInForm = {
    cpr: "",
    password: "",
  };

  return (
    <div className="flex flex-col items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
          cpr: yup
            .string()
            .min(9)
            .max(9)
            .required(`${tErrors("requiredField")}`),
          password: yup.string().required(`${tErrors("requiredField")}`),
        })}
        onSubmit={async (values, actions) => {
          await auth.signIn(values.cpr, values.password);
          actions.setSubmitting(false);
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
            <div className="flex flex-col">
              <label className="label">{t("password")}</label>
              <Field
                name="password"
                type="password"
                className={`input input-bordered input-primary ${
                  errors.cpr && "input-error"
                }`}
              />
              <label className="label-text-alt text-error">
                {errors.password && touched.password && errors.password}
              </label>
            </div>
            <button
              type="submit"
              className={`btn btn-primary`}
              disabled={isSubmitting || !isValid}
            >
              {isSubmitting && <span className="loading"></span>}
              {t("signIn")}
            </button>
          </Form>
        )}
      </Formik>

      <Link
        dir="ltr"
        className="my-3 link link-secondary"
        href="/forgetPassword"
      >
        {t("forgetPassword")}
      </Link>
      <Link
        dir="ltr"
        className="link link-secondary"
        href={
          type === "masters"
            ? "/masters/signup"
            : type === "bachelor"
            ? "/bachelor/signup"
            : "/signup"
        }
      >
        {t("newUser")}
      </Link>
    </div>
  );
};
