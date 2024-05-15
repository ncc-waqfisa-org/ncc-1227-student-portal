import { API, Auth } from "aws-amplify";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

import * as yup from "yup";
import { GetStudentQuery, GetStudentQueryVariables } from "../../src/API";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { useEffect, useState } from "react";
import AppLoader from "./../App-loader";
import { useRouter } from "next/router";
import { getStudent } from "../../src/graphql/queries";
import { useTranslation } from "react-i18next";

import { useAuth } from "../../hooks/use-auth";

interface Props {
  // cpr: string;
  // email: string;
}

interface IVerifyEmail {
  code: string;
}

export const VerifyEmail = () => {
  const initialValues: IVerifyEmail = {
    code: "",
  };

  const { t } = useTranslation("signUp");
  const { t: tErrors } = useTranslation("errors");
  const { t: tToast } = useTranslation("toast");
  const { push, query } = useRouter();
  const { user } = useAuth();

  const { cpr: cprParam } = query;

  const cpr: string | null =
    user?.getSignInUserSession()?.getAccessToken().payload.username ??
    cprParam ??
    null;

  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(60);

  /* It replaces the characters after the first 3 characters of the email with *** */
  const partialEmail = email?.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2");

  /* A countdown timer. */
  useEffect(() => {
    if (countdown > 0) {
      var interval = setInterval(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [countdown]);

  /* Get's the cpr email. */
  useEffect(() => {
    setLoading(true);
    if (cpr) {
      getUserEmail(cpr)
        .then((userEmail) => {
          setEmail(userEmail);
        })
        .finally(() => setLoading(false));
    }

    return () => {};
  }, [cpr]);

  /**
   * When the user clicks the button, reset the countdown to 60 seconds.
   */
  function resetCountdown() {
    setCountdown(60);
  }

  /**
   * It resend the verification code to the user's email address
   */
  async function resendCode() {
    if (cpr) {
      await toast
        .promise(Auth.resendSignUp(cpr), {
          loading:
            tToast("sendingVerificationCode") ?? "Sending verification code...",
          success:
            tToast("verificationCodeHasBeenSent") ??
            "Verification code has been sent",
          error: (error) => {
            return `${error.message}`;
          },
        })
        .then(() => {})
        .catch((error) => {})
        .finally(() => {
          resetCountdown();
        });
    }
  }

  /**
   * It takes a CPR number as input, and returns the email address of the student with that CPR number
   * @param {string} cpr - The CPR number of the student.
   * @returns The email of the student with the given CPR number.
   */
  async function getUserEmail(cpr: string): Promise<string | null> {
    let queryInput: GetStudentQueryVariables = {
      cpr: cpr,
    };

    let res = (await API.graphql({
      query: getStudent,
      variables: queryInput,
    })) as GraphQLResult<GetStudentQuery>;

    return res.data?.getStudent?.email ?? null;
  }

  return loading ? (
    <AppLoader></AppLoader>
  ) : (
    <div className="flex flex-col gap-3">
      <h2 className="flex flex-wrap gap-1 items-center">
        {t("verificationCode")}
        <span className="text-goblin-500">{partialEmail}</span>
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
          code: yup.string().required(`${tErrors("requiredField")}`),
        })}
        onSubmit={(values, actions) => {
          if (cpr) {
            try {
              toast.promise(Auth.confirmSignUp(cpr, values.code), {
                loading: tToast("verifying") ?? "Verifying...",
                success: () => {
                  push("/signIn");
                  return tToast("accountVerified") ?? "Account verified!";
                },
                error: (error) => error.message,
              });
            } catch (error) {
              if (error instanceof Error) {
                toast.error(
                  error.message ??
                    tToast("errorVerifyingAccount") ??
                    "Error verifying account"
                );
              }
              toast.error(
                tToast("errorVerifyingAccount") ?? "Error verifying account"
              );
            }
            actions.setSubmitting(false);
          }
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
          <div dir="ltr" className="">
            <Form className="flex flex-wrap gap-3 items-start">
              {/* Code field */}
              <div className="flex flex-col">
                <Field
                  type="text"
                  name="code"
                  title="code"
                  placeholder="Code"
                  className={`input input-bordered input-primary ${
                    errors.code && "input-error"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.code}
                />
                <label className="label-text-alt text-error">
                  {errors.code && touched.code && errors.code}
                </label>
              </div>

              {/* Submit */}
              <button
                className="text-white btn btn-primary"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                {t("verify")}
              </button>
              <button
                className="text-white btn btn-accent"
                type="button"
                onClick={resendCode}
                disabled={countdown > 0}
              >
                {t("reSend")}
                {countdown > 0 && (
                  <span className="mx-2 countdown">
                    <span style={{ ["--value" as any]: countdown }}></span>
                  </span>
                )}
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
