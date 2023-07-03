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
            {/* <p>info@waqfisa.bh</p> */}
            <a href="mailto:info@waqfisa.bh">info@waqfisa.bh</a>
          </div>
          <div>
            <h4>{t("phone")}</h4>
            {/* <p>17444444</p> */}
            <a href="tel:+97317444444">17444444</a>
          </div>
        </div>
      </PageComponent>
    </div>
  );
};

export default ContactPage;
