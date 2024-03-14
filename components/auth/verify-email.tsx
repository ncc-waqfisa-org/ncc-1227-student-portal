import { API, Auth, graphqlOperation } from "aws-amplify";
import { Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

import * as yup from "yup";
import {
  GetStudentQuery,
  GetStudentQueryVariables,
  ListStudentsQuery,
} from "../../src/API";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { useEffect, useState } from "react";
import AppLoader from "./../App-loader";
import { useRouter } from "next/router";
import { getStudent } from "../../src/graphql/queries";
import { useTranslation } from "react-i18next";

import { Button } from "@aws-amplify/ui-react";

interface Props {
  cpr: string;
  // email: string;
}

interface IVerifyEmail {
  code: string;
}

export const VerifyEmail = ({ cpr }: Props) => {
  const initialValues: IVerifyEmail = {
    code: "",
  };

  const { t } = useTranslation("signUp");
  const { t: tErrors } = useTranslation("errors");
  const { push } = useRouter();

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
    getUserEmail(cpr)
      .then((userEmail) => {
        setEmail(userEmail);
      })
      .finally(() => setLoading(false));

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
    await toast
      .promise(Auth.resendSignUp(cpr), {
        loading: "Sending verification code...",
        success: "Verification code has been sent",
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

  /**
   * Call an AWS Lambda function using the SDK
   */
  async function callLambdaFunction() {
    console.log("called");
    try {
      // const response = await API.post(
      //   "d8m1yp9dff",
      //   "/updateStudentEmail-staging",
      //   {
      //     body: { cpr: "000000002", newEmail: "mukhtar.fthm@gmail.com" },
      //   }
      // )
      const response = await fetch("/api/changeEmail", {
        method: "POST",
        body: JSON.stringify({
          cpr: "000000002",
          newEmail: "mukhtar.fthm@gmail.com",
        }),
      })
        .then((val) => {
          console.log(val);

          return val.json();
        })
        .catch((err) => {
          console.log(err);
          return null;
        });

      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  return loading ? (
    <AppLoader></AppLoader>
  ) : (
    <div>
      {/* <Button onClick={() => callLambdaFunction()}>click me</Button> */}
      <h2>
        {t("verificationCode")}{" "}
        <span className="text-goblin-500">{partialEmail}</span>
      </h2>

      <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
          code: yup.string().required(`${tErrors("requiredField")}`),
        })}
        onSubmit={(values, actions) => {
          try {
            toast.promise(Auth.confirmSignUp(cpr, values.code), {
              loading: "Verifying...",
              success: () => {
                push("/signIn");
                return <b>Account verified!</b>;
              },
              error: <b>Could not verify account.</b>,
            });
          } catch (error) {
            toast.error("Error verifying account");
          }
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
          <div dir="ltr">
            <Form className="flex items-start gap-3 p-4">
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
