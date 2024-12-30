import { PageComponent } from "../../components/PageComponent";

import React from "react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { MyScholarships } from "../../components/scholarship/MyScholarships";

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

export default function ScholarshipsPage() {
  // const appContext = useAppContext();
  const { t } = useTranslation("scholarships");

  return (
    <PageComponent title={"Scholarships"} authRequired>
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
        {<MyScholarships />}
      </div>
    </PageComponent>
  );
}
