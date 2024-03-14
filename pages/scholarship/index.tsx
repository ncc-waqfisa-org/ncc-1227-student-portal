import { PageComponent } from "../../components/PageComponent";

import React from "react";
import Link from "next/link";
import { useAppContext } from "../../contexts/AppContexts";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { ApplicationCard } from "../../components/applications/ApplicationCard";
import { getStatusOrder } from "../../src/HelperFunctions";
import { NewApplicationCard } from "../../components/applications/NewApplicationCard";
import { Status, Student } from "../../src/API";
import { MyScholarships } from "../../components/scholarship/MyScholarships";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "footer",
        "pageTitles",
        "applications",
        "signIn",
      ])),
    },
  };
};

export default function ApplicationsPage() {
  const appContext = useAppContext();
  const { t } = useTranslation("applications");

  const student = appContext.student?.getStudent as Student;

  const approvedApplications = appContext.applications.filter(
    (app) => app.status === Status.APPROVED
  );

  return (
    <PageComponent title={"Scholarships"} authRequired>
      <div className="container mx-auto">
        {student && (
          <div className="container mx-auto">
            {approvedApplications.length > 0 && (
              <div>
                <p className="my-4 text-2xl stat-value">
                  {t("myScholarships")}
                </p>
              </div>
            )}
          </div>
        )}
        <MyScholarships applications={approvedApplications} />
      </div>
    </PageComponent>
  );
}
