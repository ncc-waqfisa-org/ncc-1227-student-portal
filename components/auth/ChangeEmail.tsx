import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GetStudentQueryVariables, GetStudentQuery } from "../../src/API";
import { API } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import * as yup from "yup";
import { getStudent } from "../../src/graphql/queries";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/use-auth";
import { Skeleton } from "../Skeleton";

// end-point: https://sb87s08fch.execute-api.us-east-1.amazonaws.com/default/email

type TChangeEmail = {
  // cpr: string;
  // email: string;
};

type TNewEmail = {
  email: string;
};

export const ChangeEmail: FC<TChangeEmail> = () => {
  const initialValues: TNewEmail = {
    email: "",
  };

  const { t } = useTranslation("signUp");
  const { t: tErrors } = useTranslation("errors");
  const { push, query } = useRouter();
  const { user } = useAuth();

  const { cpr: cprParam } = query;

  const [email, setEmail] = useState<string | null>(null);

  function getUserToken() {
    const token = user?.getSignInUserSession()?.getAccessToken();

    return token;
  }

  const cpr: string | null =
    getUserToken()?.payload.username ?? cprParam ?? null;

  // async function getUserEmail(): Promise<string | null> {
  //   if (cpr) {
  //     let queryInput: GetStudentQueryVariables = {
  //       cpr: cpr,
  //     };

  //     let res = (await API.graphql({
  //       query: getStudent,
  //       variables: queryInput,
  //     })) as GraphQLResult<GetStudentQuery>;

  //     return res.data?.getStudent?.email ?? null;
  //   } else {
  //     return null
  //   }

  // }

  async function callLambdaFunction({ email }: { email: string }) {
    return fetch("/api/changeEmail", {
      method: "PUT",
      body: JSON.stringify({
        cpr: cpr,
        newEmail: email,
        token: getUserToken()?.getJwtToken(),
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        return data.message;
      } else {
        throw new Error(data.message);
      }
    });
  }

  useEffect(() => {
    getUserEmail().then((data) => setEmail(data));

    async function getUserEmail(): Promise<string | null> {
      if (cpr) {
        let queryInput: GetStudentQueryVariables = {
          cpr: cpr,
        };

        let res = (await API.graphql({
          query: getStudent,
          variables: queryInput,
        })) as GraphQLResult<GetStudentQuery>;

        return res.data?.getStudent?.email ?? null;
      } else {
        return null;
      }
    }

    return () => {};
  }, [cpr]);

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={yup.object({
          email: yup.string().required(`${tErrors("requiredField")}`),
        })}
        onSubmit={(values, actions) => {
          if (cpr) {
            try {
              toast.promise(callLambdaFunction({ email: values.email }), {
                loading: "Processing...",
                success: (message) => {
                  push(`/verify-email${cpr ? `?cpr=${cpr}` : ""}`);
                  return message;
                },
                error: (err) => err.message,
              });
            } catch (error) {
              toast.error("Error changing email");
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
          <div dir="ltr" className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-1">
              <p>Change</p>

              {!cpr ? (
                <Skeleton className="w-full h-6 max-w-xs rounded-md bg-slate-300" />
              ) : (
                <span className="text-secondary">{email}</span>
              )}
              <p>to :</p>
            </div>
            <Form className="flex items-start gap-3">
              {/* Email field */}
              <div className="flex flex-col">
                <Field
                  type="text"
                  name="email"
                  title="email"
                  placeholder="Email"
                  className={`input input-bordered input-primary ${
                    errors.email && "input-error"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <label className="label-text-alt text-error">
                  {errors.email && touched.email && errors.email}
                </label>
              </div>

              {/* Submit */}
              <button
                className="text-white btn btn-primary"
                type="submit"
                disabled={isSubmitting || !isValid}
              >
                {t("change")}
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};
