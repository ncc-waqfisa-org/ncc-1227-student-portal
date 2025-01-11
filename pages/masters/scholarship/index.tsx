import { PageComponent } from "../../../components/PageComponent";

import React from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { MyMastersScholarships } from "../../../components/scholarship/MyMastersScholarships";

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
        "scholarships",
        "signIn",
      ])),
    },
  };
};

export default function MastersScholarshipsPage() {
  // const appContext = useAppContext();
  const { t } = useTranslation("scholarships");

  return (
    <PageComponent title={"MScholarships"} authRequired>
      <div className="container mx-auto">
        {
          <div className="container mx-auto">
            <div>
              <p className="my-4 text-2xl stat-value">
                {t("approvedApplications")}
              </p>
            </div>
          </div>
        }
        {<MyMastersScholarships />}
      </div>
    </PageComponent>
  );
}
