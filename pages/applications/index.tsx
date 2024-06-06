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
import { CardInfoComponent } from "../../components/CardInfo";
import info from "../../public/svg/info.svg";
import dayjs from "dayjs";
import arLocale from "dayjs/locale/ar";
import enLocale from "dayjs/locale/en";

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
        "signIn",
      ])),
    },
  };
};

export default function ApplicationsPage() {
  const appContext = useAppContext();
  // const regDialog = useRef<HTMLDialogElement>(null);

  // end of batches rules
  const student = appContext.student?.getStudent as Student;

  const activeApplications = appContext.applications.filter(
    (app) =>
      (app.status === Status.APPROVED ||
        app.status === Status.ELIGIBLE ||
        app.status === Status.REVIEW ||
        app.status === Status.NOT_COMPLETED ||
        app.status === Status.REJECTED ||
        app.status === Status.WITHDRAWN) &&
      appContext.batch?.batch === app.batch
  );

  const pastApplications = appContext.applications.filter(
    (app) => (app.batch ?? 0) < (appContext.batch?.batch ?? 0)
  );

  const { t } = useTranslation("applications");

  return (
    <PageComponent title={"Applications"} authRequired>
      {appContext.applications.length === 0 &&
        !appContext.newApplicationsEnabled && (
          <div className="flex flex-wrap justify-center gap-10">
            {/* <CardInfoComponent
              icon={info}
              title={"Registration"}
              description={"Registration period is over"}
            ></CardInfoComponent>
            <CardInfoComponent
              icon={info}
              title={"التسجيل"}
              description={"سيتم فتح التسجيل في يونيو 2024"}
            ></CardInfoComponent> */}
            <CardInfoComponent
              icon={info}
              title={"الطلبات الجديدة"}
              description={`سيتم فتح التسجيل ${dayjs(
                appContext.batch?.createApplicationStartDate
              )
                .locale(arLocale)
                .format("MMM DD, YYYY")}`}
            ></CardInfoComponent>
            <CardInfoComponent
              icon={info}
              title={"New applications"}
              description={`Registration will open in ${dayjs(
                appContext.batch?.createApplicationStartDate
              )
                .locale(enLocale)
                .format("MMM DD, YYYY")}`}
            ></CardInfoComponent>
          </div>
        )}

      {student && (
        <div className="container mx-auto">
          {!appContext.haveActiveApplication &&
            appContext.newApplicationsEnabled && (
              <div>
                <p className="my-4 text-2xl stat-value">
                  {t("newApplication")}
                </p>
              </div>
            )}
          {activeApplications.length > 0 && (
            <div>
              <p className="my-4 text-2xl stat-value">{t("myApplications")}</p>
            </div>
          )}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 [grid-auto-rows:1fr]">
            {!appContext.haveActiveApplication &&
              appContext.newApplicationsEnabled && (
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
