import React, { FC, ReactElement } from "react";
import { ApplicationForm } from "../../../components/applications/ApplicationForm";
import { PageComponent } from "../../../components/PageComponent";
import { GetServerSideProps } from "next";
import {
  listAllMasterUniversities,
  listAllPrograms,
} from "../../../src/CustomAPI";
import { Program, University } from "../../../src/API";
import {
  BachelorProvider,
  useBachelorContext,
} from "../../../contexts/BachelorContexts";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import arLocale from "dayjs/locale/ar";
import enLocale from "dayjs/locale/en";

import { CardInfoComponent } from "../../../components/CardInfo";
import info from "public/svg/info.svg";
import dayjs from "dayjs";
import { NextPageWithLayout } from "../../_app";
import {
  MastersProvider,
  useMastersContext,
} from "../../../contexts/MastersContexts";
import { NoAvailableBatch } from "../../../components/NoAvailableBatch";
// import { MastersApplicationForm } from "../../../components/applications/MastersApplicationForm";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;
  const universities = await listAllMasterUniversities();
  // const programs = await listAllPrograms();

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
  // TODO: Update to MastersUnivirsity
  universities: University[];
}

const NewApplicationPage: NextPageWithLayout<Props> = (props) => {
  const { haveActiveApplication, newApplicationsEnabled, batch } =
    useMastersContext();

  const { t } = useTranslation("applicationPage");

  return (
    <PageComponent title={t("MNewApplication")} authRequired>
      {newApplicationsEnabled ? (
        <div>
          {!haveActiveApplication && (
            // <MastersApplicationForm
            //   universities={props.universities}
            // ></MastersApplicationForm>
            <></>
          )}
          {haveActiveApplication && (
            <div className="rounded-2xl bg-zinc-200 text-zinc-500 flex flex-col p-4 border border-zinc-300 text-center justify-center items-center min-h-[5rem]">
              <div>{t("youAlreadyHaveAnActiveApplication")}</div>
              <Link href="/applications" className="link link-primary">
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
        <div className="flex flex-wrap justify-center gap-10">
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
        <div className="flex flex-wrap justify-center gap-10">
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
    </PageComponent>
  );
};

NewApplicationPage.getLayout = function getLayout(page: ReactElement) {
  return <MastersProvider>{page}</MastersProvider>;
};

export default NewApplicationPage;
