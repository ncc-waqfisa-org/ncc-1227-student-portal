import React from "react";
import { VerifyEmail } from "../components/auth/verify-email";
import { PageComponent } from "../components/PageComponent";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "toast",
        "footer",
        "pageTitles",
        "signUp",
        "account",
        "termsAndConditions",
        "signIn",
        "errors",
      ])),
    },
  };
};
const VerifyEmailPage = () => {
  return (
    <PageComponent title="VerifyEmail">
      <VerifyEmail />
    </PageComponent>
  );
};

export default VerifyEmailPage;
