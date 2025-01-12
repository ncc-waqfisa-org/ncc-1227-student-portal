import { PageComponent } from "../../../components/PageComponent";

import React, { ReactElement } from "react";
import Link from "next/link";
import {
  BachelorProvider,
  useBachelorContext,
} from "../../../contexts/BachelorContexts";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { ApplicationCard } from "../../../components/applications/ApplicationCard";
import { getStatusOrder } from "../../../src/HelperFunctions";
import { NewApplicationCard } from "../../../components/applications/NewApplicationCard";
import { Status } from "../../../src/API";
import { CardInfoComponent } from "../../../components/CardInfo";
import info from "public/svg/info.svg";
import dayjs from "dayjs";
import arLocale from "dayjs/locale/ar";
import enLocale from "dayjs/locale/en";
import { NextPageWithLayout } from "../../_app";
import { useAppContext } from "../../../contexts/AppContexts";
import { NoAvailableBatch } from "../../../components/NoAvailableBatch";
import { SkeletonApplicationCard } from "../../../components/applications/SkeletonApplicationCard";

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
        "errors",
      ])),
    },
  };
};

const Page: NextPageWithLayout = () => {
  const bachelorContext = useBachelorContext();
  const { studentAsStudent: student } = useAppContext();
  // const regDialog = useRef<HTMLDialogElement>(null);

  // end of batches rules
  // const student = bachelorContext.student?.getStudent as Student;
  // const student = appContext.student?.getStudent as Student;

  const activeApplications = bachelorContext.applications.filter(
    (app) =>
      (app.status === Status.APPROVED ||
        app.status === Status.ELIGIBLE ||
        app.status === Status.REVIEW ||
        app.status === Status.NOT_COMPLETED ||
        app.status === Status.REJECTED ||
        app.status === Status.WITHDRAWN) &&
      bachelorContext.batch?.batch === app.batch
  );

  const pastApplications = bachelorContext.applications.filter(
    (app) => (app.batch ?? 0) < (bachelorContext.batch?.batch ?? dayjs().year())
  );

  const { t } = useTranslation("applications");

  return (
    <PageComponent title={"BApplications"} authRequired>
      {bachelorContext.isBatchPending && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 [grid-auto-rows:1fr] py-8">
          <SkeletonApplicationCard />
          <SkeletonApplicationCard />
        </div>
      )}

      {!bachelorContext.batch && (
        <div className="flex justify-center py-4">
          <NoAvailableBatch type="bachelor" />
        </div>
      )}

      {bachelorContext.applications.length === 0 &&
        !bachelorContext.newApplicationsEnabled &&
        bachelorContext.batch && (
          <div className="flex flex-wrap justify-center gap-10">
            <CardInfoComponent
              icon={info}
              title={"الطلبات الجديدة"}
              description={`سيتم فتح التسجيل ${dayjs(
                bachelorContext.batch?.createApplicationStartDate
              )
                .locale(arLocale)
                .format("MMM DD, YYYY")}`}
            ></CardInfoComponent>
            <CardInfoComponent
              icon={info}
              title={"New applications"}
              description={`Registration will open in ${dayjs(
                bachelorContext.batch?.createApplicationStartDate
              )
                .locale(enLocale)
                .format("MMM DD, YYYY")}`}
            ></CardInfoComponent>
          </div>
        )}

      {student && (
        <div className="container mx-auto">
          {!bachelorContext.haveActiveApplication &&
            bachelorContext.newApplicationsEnabled && (
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
          {bachelorContext.haveActiveApplication &&
            "bachelorContext.haveActiveApplication"}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 [grid-auto-rows:1fr]">
            {!bachelorContext.haveActiveApplication &&
              bachelorContext.newApplicationsEnabled && (
                <Link href={"../bachelor/applications/new-application"}>
                  <NewApplicationCard></NewApplicationCard>
                </Link>
              )}
            {bachelorContext.haveActiveApplication &&
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
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <BachelorProvider>{page}</BachelorProvider>;
};

export default Page;
