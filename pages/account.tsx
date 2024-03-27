import React, { useState } from "react";
import ViewAccount from "../components/account/ViewAccount";
import ViewParentInfo from "../components/account/ViewParentInfo";
import { PageComponent } from "../components/PageComponent";
import { useAppContext } from "../contexts/AppContexts";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "footer",
        "pageTitles",
        "account",
        "signIn",
        "errors",
      ])),
    },
  };
};

export default function AccountPage() {
  const { studentAsStudent } = useAppContext();

  const [isStudentInfo, setIsStudentInfo] = useState(true);
  const { t } = useTranslation("account");

  return (
    <PageComponent title="Account" authRequired>
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
        {studentAsStudent && isStudentInfo && (
          <ViewAccount student={studentAsStudent}></ViewAccount>
        )}
        {studentAsStudent && studentAsStudent.ParentInfo && !isStudentInfo && (
          <ViewParentInfo
            parentInfo={studentAsStudent.ParentInfo}
          ></ViewParentInfo>
        )}
      </div>
    </PageComponent>
  );
}
