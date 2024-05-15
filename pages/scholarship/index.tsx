import { PageComponent } from "../../components/PageComponent";

import React, { useEffect } from "react";
import { useAppContext } from "../../contexts/AppContexts";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { Scholarship, Status, Student } from "../../src/API";
import { MyScholarships } from "../../components/scholarship/MyScholarships";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudentScholarships } from "../../src/CustomAPI";
import { useAuth } from "../../hooks/use-auth";

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
