import React, { ReactElement, useEffect, useState } from "react";
import ViewAccount from "../components/account/ViewAccount";
import ViewParentInfo from "../components/account/ViewParentInfo";
import { PageComponent } from "../components/PageComponent";
import {
  BachelorProvider,
  useBachelorContext,
} from "../contexts/BachelorContexts";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../contexts/AppContexts";
import { MastersProvider } from "../contexts/MastersContexts";
import { NextPageWithLayout } from "./_app";
import { cn } from "../src/lib/utils";
import MasterInfoForm from "../components/account/masters/MasterInfoForm";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "toast",
        "footer",
        "pageTitles",
        "account",
        "signIn",
        "errors",
      ])),
    },
  };
};

const Page: NextPageWithLayout = () => {
  const { studentAsStudent: student } = useAppContext();
  const { t } = useTranslation("account");
  const { t: commonT } = useTranslation("common");

  const [isStudentInfo, setIsStudentInfo] = useState(true);
  const [type, setType] = useState<"bachelor" | "masters">("bachelor");

  const haveMaster = true; // student.applicantType.includes("masters")

  useEffect(() => {
    if (haveMaster) {
      setType("masters");
    }

    return () => {};
  }, [haveMaster]);

  return (
    <PageComponent title="Account" authRequired>
      <div className="flex flex-col gap-4 py-8 ">
        {haveMaster && (
          <div
            role="tablist"
            className={cn("w-full max-w-lg mx-auto tabs tabs-boxed")}
          >
            <button
              type="button"
              onClick={() => setType("bachelor")}
              role="tab"
              className={cn("tab", type === "bachelor" && "tab-active")}
            >
              {commonT("bachelor")}
            </button>
            <button
              type="button"
              onClick={() => setType("masters")}
              role="tab"
              className={cn("tab", type === "masters" && "tab-active")}
            >
              {commonT("masters")}
            </button>
          </div>
        )}

        {type === "bachelor" && (
          <div className="flex flex-col justify-center">
            <div className="mx-auto mb-6 tabs tabs-bordered">
              <a
                onClick={() => setIsStudentInfo(true)}
                className={`tab  ${isStudentInfo && " tab-active"}`}
              >
                {t("studentInfo")}
              </a>
              <a
                onClick={() => setIsStudentInfo(false)}
                className={`tab  ${!isStudentInfo && " tab-active"}`}
              >
                {t("parentsInfo")}
              </a>
            </div>
            {student && isStudentInfo && (
              <ViewAccount student={student}></ViewAccount>
            )}
            {student && student.ParentInfo && !isStudentInfo && (
              <ViewParentInfo parentInfo={student.ParentInfo}></ViewParentInfo>
            )}
          </div>
        )}

        {type === "masters" && <MasterInfoForm />}
      </div>
    </PageComponent>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <BachelorProvider>
      <MastersProvider>{page}</MastersProvider>
    </BachelorProvider>
  );
};

export default Page;
