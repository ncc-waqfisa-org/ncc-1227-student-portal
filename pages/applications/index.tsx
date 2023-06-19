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

  const student = appContext.student?.getStudent as Student;

  const activeApplications = appContext.applications.filter(
    (app) =>
      app.status === Status.APPROVED ||
      app.status === Status.ELIGIBLE ||
      app.status === Status.REVIEW ||
      app.status === Status.NOT_COMPLETED
  );

  const pastApplications = appContext.applications.filter(
    (app) => app.status === Status.REJECTED || app.status === Status.WITHDRAWN
  );

  const { t } = useTranslation("applications");

  return (
    <PageComponent title={"Applications"} authRequired>
      {student && (
        <div className="container mx-auto">
          {!appContext.haveActiveApplication && (
            <div>
              <p className="my-4 text-2xl stat-value">{t("newApplication")}</p>
            </div>
          )}
          {activeApplications.length > 0 && (
            <div>
              <p className="my-4 text-2xl stat-value">
                {t("activeApplications")}
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 [grid-auto-rows:1fr]">
            {!appContext.haveActiveApplication && (
              <Link href={"../applications/new-application"}>
                <NewApplicationCard></NewApplicationCard>
              </Link>
            )}
            {appContext.haveActiveApplication &&
              activeApplications
                .sort((a, b) => {
                  if (a.status && b.status) {
                    if (getStatusOrder(b.status) > getStatusOrder(a.status))
                      return 1;
                    if (getStatusOrder(b.status) < getStatusOrder(a.status))
                      return -1;
                  }
                  return 0;
                })
                .map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                    student={student}
                  />
                ))}
          </div>
          {pastApplications.length > 0 && (
            <div>
              <p className="my-4 text-2xl stat-value">
                {t("pastApplications")}
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 [grid-auto-rows:1fr]">
            {pastApplications.length > 0 &&
              pastApplications
                .sort((a, b) => {
                  if (a.status && b.status) {
                    if (getStatusOrder(b.status) > getStatusOrder(a.status))
                      return 1;
                    if (getStatusOrder(b.status) < getStatusOrder(a.status))
                      return -1;
                  }
                  return 0;
                })
                .map((application) => (
                  <ApplicationCard
                    key={application.id}
                    application={application}
                    student={student}
                  />
                ))}
          </div>
        </div>
      )}
    </PageComponent>
  );
}
