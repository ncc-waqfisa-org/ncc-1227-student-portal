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
import { ApplicantType, BahrainUniversities } from "../src/API";
import { listAllBahrainUniversities } from "../src/CustomAPI";
import { BMTabs } from "../components/BMTabs";

export const getServerSideProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;
  const universities = await listAllBahrainUniversities();

  return {
    props: {
      universities,
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

interface Props {
  universities: BahrainUniversities[];
}

const Page: NextPageWithLayout<Props> = ({ universities }) => {
  const { studentAsStudent: student } = useAppContext();
  const { t } = useTranslation("account");
  const { t: commonT } = useTranslation("common");

  const [isStudentInfo, setIsStudentInfo] = useState(true);
  const [type, setType] = useState<"bachelor" | "masters">("bachelor");

  const haveMaster =
    student?.m_applicantType.includes(ApplicantType.MASTER) ?? false;
  const haveBachelor =
    student?.m_applicantType.includes(ApplicantType.STUDENT) ?? false;

  useEffect(() => {
    if (haveMaster) {
      setType("masters");
    }

    return () => {};
  }, [haveMaster]);

  return (
    <PageComponent title="Account" authRequired>
      <div className="flex flex-col gap-4 py-8 ">
        {/* Only showing the picker if the applicant have both master and bachelor */}
        {haveMaster && haveBachelor && (
          <BMTabs onChange={setType} type={type} />
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

        {type === "masters" && <MasterInfoForm universities={universities} />}
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
