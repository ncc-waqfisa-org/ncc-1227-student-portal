import React, { FC } from "react";
import { ApplicationForm } from "../../components/applications/ApplicationForm";
import { PageComponent } from "../../components/PageComponent";
import { GetServerSideProps } from "next";
import { listAllPrograms } from "../../src/CustomAPI";
import { Program } from "../../src/API";
import { useAppContext } from "../../contexts/AppContexts";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import dayjs from "dayjs";
import { CardInfoComponent } from "../../components/CardInfo";
import info from "public/svg/info.svg";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;
  const programs = await listAllPrograms();

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "footer",
        "pageTitles",
        "applicationPage",
        "signIn",
        "errors",
      ])),
      programs: programs,
    },
  };
};

interface Props {
  programs: Program[];
}

const NewApplicationPage: FC<Props> = (props) => {
  const { haveActiveApplication, newApplicationsEnabled } = useAppContext();

  const { t } = useTranslation("applicationPage");
  return (
    <PageComponent title={t("newApplication")} authRequired>
      {newApplicationsEnabled ? (
        <div>
          {!haveActiveApplication && (
            <ApplicationForm programs={props.programs}></ApplicationForm>
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
      ) : (
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
      )}
    </PageComponent>
  );
};

export default NewApplicationPage;
