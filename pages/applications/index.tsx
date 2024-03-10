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
import { Batch, Status, Student } from "../../src/API";
import dayjs from "dayjs";
import { useQuery } from "@tanstack/react-query";
import { getCurrentBatch } from "../../src/CustomAPI";
import { API } from "aws-amplify";
import { Button } from "@aws-amplify/ui-react";
import { Skeleton } from "../../components/Skeleton";

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

  // const { data: batch } = useQuery<Batch | null>({
  //   queryKey: ["currentBatch"],
  //   queryFn: () =>
  //     getCurrentBatch().then((value) => {
  //       const currentBatch =
  //         (value?.listBatches?.items ?? []).length > 0
  //           ? (value?.listBatches?.items[0] as Batch)
  //           : null;

  //       console.log(currentBatch);
  //       return currentBatch;
  //     }),
  // });

  // Follow the batches rules

  // const newApplicationsAllowed = !batch
  //   ? false
  //   : dayjs().isBefore(dayjs(batch.createApplicationEndDate)) &&
  //     dayjs().isAfter(dayjs(batch.createApplicationStartDate));

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
