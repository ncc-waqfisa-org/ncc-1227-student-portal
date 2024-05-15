import React from "react";
import { PageComponent } from "../components/PageComponent";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "toast",
        "footer",
        "pageTitles",
        "signIn",
        "contacts",
        "errors",
      ])),
    },
  };
};

const ContactPage = () => {
  const { t } = useTranslation("contacts");

  return (
    <div>
      <PageComponent title={"ContactUs"}>
        <div className="mx-auto prose text-center divide-y">
          <div>
            <h4>{t("email")}</h4>
            <a href="mailto:info@waqfisa.bh">info@waqfisa.bh</a>
          </div>
        </div>
      </PageComponent>
    </div>
  );
};

export default ContactPage;
