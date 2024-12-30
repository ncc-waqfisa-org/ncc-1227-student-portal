import React from "react";
import { PageComponent } from "../../../components/PageComponent";
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
        "applications",
        "masters",
        "signIn",
      ])),
    },
  };
};

const Page = () => {
  return (
    <PageComponent title={"Applications"}>Masters applications</PageComponent>
  );
};

export default Page;
