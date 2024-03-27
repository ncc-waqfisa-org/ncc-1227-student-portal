import React from "react";
import { ChangeEmail } from "../components/auth/ChangeEmail";
import { PageComponent } from "../components/PageComponent";

import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
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

const ChangeEmailPage = () => {
  return (
    <PageComponent title="ChangeEmail">
      <ChangeEmail />
    </PageComponent>
  );
};

export default ChangeEmailPage;
