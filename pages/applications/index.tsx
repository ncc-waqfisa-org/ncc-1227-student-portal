import { PageComponent } from "../../components/PageComponent";

import React, { useRef } from "react";
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
import { RegPeriod } from "../../components/reg-period";
import { Card } from "@aws-amplify/ui-react";
import dayjs from "dayjs";
import { FiAlertCircle } from "react-icons/fi";

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
  // const regDialog = useRef<HTMLDialogElement>(null);

  // end of batches rules
  const student = appContext.student?.getStudent as Student;

  const activeApplications = appContext.applications.filter(
    (app) =>
      app.status === Status.APPROVED ||
      app.status === Status.ELIGIBLE ||
      app.status === Status.REVIEW ||
      app.status === Status.NOT_COMPLETED ||
      app.status === Status.REJECTED
  );

  const pastApplications = appContext.applications.filter(
    (app) => app.status === Status.WITHDRAWN
  );

  const { t } = useTranslation("applications");

  return (
    <PageComponent title={"Applications"} authRequired>
      {appContext.applications.length === 0 &&
        !appContext.newApplicationsEnabled && (
          <div className="flex flex-wrap justify-center gap-10">
            <CardInfoComponent
              icon={info}
              title={"Registration"}
              description={"Registration period is over"}
            ></CardInfoComponent>
            <CardInfoComponent
              icon={info}
              title={"التسجيل"}
              description={"فترة التسجيل إنتهت"}
            ></CardInfoComponent>
          </div>
        )}
      {/* <div className="container mx-auto">
        <div className="max-w-xl">
          <RegPeriod />
        </div>
      </div> */}

      {/* {appContext.batch && (
        <div>
          <button
            className="btn btn-ghost"
            onClick={() => regDialog.current?.showModal()}
          >
            {`${getUpcomingBatchDate(appContext.batch).title}:
            ${getUpcomingBatchDate(appContext.batch).date}`}{" "}
            <span>
              {" "}
              <FiAlertCircle />{" "}
            </span>
          </button>
          <dialog ref={regDialog} className="modal">
            <div className="modal-box">
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold">Registration period</h3>
                <RegPeriod />
              </div>
              <div className="modal-action">
                <form method="dialog">
                  <button className="absolute btn btn-sm btn-circle btn-ghost right-2 top-2">
                    ✕
                  </button>
                </form>
              </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
      )} */}

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
              <p className="my-4 text-2xl stat-value">
                {t("activeApplications")}
              </p>
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
