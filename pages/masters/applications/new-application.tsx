import React, { ReactElement } from "react";
import { PageComponent } from "../../../components/PageComponent";
import { GetServerSideProps } from "next";
import { listAllMasterAppliedUniversities } from "../../../src/CustomAPI";
import { ApplicantType, MasterAppliedUniversities } from "../../../src/API";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import arLocale from "dayjs/locale/ar";
import enLocale from "dayjs/locale/en";
import logs from "public/svg/logs.svg";

import { CardInfoComponent } from "../../../components/CardInfo";
import info from "public/svg/info.svg";
import dayjs from "dayjs";
import { NextPageWithLayout } from "../../_app";
import {
  MastersProvider,
  useMastersContext,
} from "../../../contexts/MastersContexts";
import { NoAvailableBatch } from "../../../components/NoAvailableBatch";
import { MastersApplicationForm } from "../../../components/applications/MastersApplicationForm";
import { useAppContext } from "../../../contexts/AppContexts";
import { useRouter } from "next/router";
import { Skeleton } from "../../../components/Skeleton";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;
  const universities = await listAllMasterAppliedUniversities();

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "toast",
        "footer",
        "pageTitles",
        "applicationPage",
        "signIn",
        "errors",
      ])),
      universities: universities,
    },
  };
};

interface Props {
  universities: MasterAppliedUniversities[];
}

const NewApplicationPage: NextPageWithLayout<Props> = (props) => {
  const { haveActiveApplication, newApplicationsEnabled, batch } =
    useMastersContext();

  const router = useRouter();

  const { studentAsStudent: student, isStudentPending } = useAppContext();

  const { t } = useTranslation("applicationPage");
  const { t: tCommon } = useTranslation("common");

  const isMasterApplicant = student?.m_applicantType.includes(
    ApplicantType.MASTER
  );

  return (
    <PageComponent title={t("MNewApplication")} authRequired>
      {isStudentPending && (
        <Skeleton className="mx-auto w-full max-w-md h-72 rounded-2xl"></Skeleton>
      )}

      {!isMasterApplicant && !isStudentPending && (
        <div className="flex justify-center py-10">
          <CardInfoComponent
            icon={logs}
            title={tCommon("applyForScholarshipMasters")}
            description={tCommon("applyForScholarshipDescription")}
            action={() => router.push("/masters/enroll")}
            actionTitle={tCommon("enrollNow") ?? "Enroll Now"}
          ></CardInfoComponent>
        </div>
      )}

      {isMasterApplicant && !isStudentPending && (
        <div className=" py-3">
          {newApplicationsEnabled ? (
            <div>
              {!haveActiveApplication && (
                <MastersApplicationForm
                  universities={props.universities}
                ></MastersApplicationForm>
                // <></>
              )}
              {haveActiveApplication && (
                <div className="rounded-2xl bg-zinc-200 text-zinc-500 flex flex-col p-4 border border-zinc-300 text-center justify-center items-center min-h-[5rem]">
                  <div>{t("youAlreadyHaveAnActiveApplication")}</div>
                  <Link
                    href="/masters/applications"
                    className="link link-primary"
                  >
                    {t("goToApplications")}
                  </Link>
                </div>
              )}
            </div>
          ) : !batch ? (
            <NoAvailableBatch type="masters" />
          ) : dayjs().isAfter(
              dayjs(batch?.createApplicationEndDate).endOf("day")
            ) ? (
            <div className="flex flex-wrap gap-10 justify-center">
              <CardInfoComponent
                icon={info}
                title={"Applying"}
                description={"Applying period is over"}
              ></CardInfoComponent>
              <CardInfoComponent
                icon={info}
                title={"التقديم"}
                description={"فترة التقديم إنتهت"}
              ></CardInfoComponent>
            </div>
          ) : (
            <div className="flex flex-wrap gap-10 justify-center">
              <CardInfoComponent
                icon={info}
                title={"التقديم"}
                description={`سيتم فتح التقديم في ${dayjs(
                  batch?.createApplicationStartDate
                )
                  .locale(arLocale)
                  .format("MMM DD, YYYY")}`}
              ></CardInfoComponent>
              <CardInfoComponent
                icon={info}
                title={"Applying"}
                description={`Applying will open in ${dayjs(
                  batch?.createApplicationStartDate
                )
                  .locale(enLocale)
                  .format("MMM DD, YYYY")}`}
              ></CardInfoComponent>
            </div>
          )}
        </div>
      )}
    </PageComponent>
  );
};

NewApplicationPage.getLayout = function getLayout(page: ReactElement) {
  return <MastersProvider>{page}</MastersProvider>;
};

export default NewApplicationPage;
