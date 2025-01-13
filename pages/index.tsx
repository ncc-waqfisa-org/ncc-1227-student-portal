import React, { useState, useEffect, useMemo } from "react";
import { PageComponent } from "../components/PageComponent";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetServerSideProps } from "next";
import { Dashboard } from "../components/Dashboard";
import { cn } from "../src/lib/utils";
import { DashboardHeader } from "../components/DashboardHeader";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AppContexts";
import { ApplicantType } from "../src/API";
import { BMTabs } from "../components/BMTabs";
import { useAuth } from "../hooks/use-auth";

interface HomeProps {
  type: "bachelor" | "masters" | null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale, query } = ctx;
  let typeFromParams = query.type || null;

  // making sure it's only "bachelor" | "masters"
  if (typeFromParams !== "bachelor" && typeFromParams !== "masters") {
    typeFromParams = null;
  }

  query.type = typeFromParams ?? undefined;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "toast",
        "applicationPage",
        "footer",
        "pageTitles",
        "signIn",
        "errors",
      ])),
      type: typeFromParams,
    },
  };
};

const Home = ({ type: initialType }: HomeProps) => {
  const [type, setType] = useState<"bachelor" | "masters">(
    initialType ?? "bachelor"
  );
  const { t: commonT } = useTranslation("common");
  const { push, pathname, query } = useRouter();
  const { studentAsStudent: student, isStudentPending } = useAppContext();
  const { isSignedIn, isAuthedUserPending } = useAuth();

  const haveBachelor = useMemo(
    () => student?.m_applicantType.includes(ApplicantType.STUDENT) ?? false,
    [student]
  );

  useEffect(() => {
    if (!isStudentPending && !isAuthedUserPending) {
      if (initialType === null) {
        const isMasterApplicant =
          student?.m_applicantType.includes(ApplicantType.MASTER) ?? false;

        console.log(`isMasterApplicant ${isMasterApplicant}`);

        if (isMasterApplicant) {
          setType("masters");
        } else {
          setType("bachelor"); // Default to "bachelor" if initialType is undefined
        }
      }

      if (isSignedIn && !haveBachelor) {
        setType("masters");
      }
    }
  }, [initialType, student]);

  useEffect(() => {
    push(
      {
        pathname: pathname,
        query: { ...query, type },
      },
      undefined,
      { shallow: true }
    );
  }, [type]);

  useEffect(() => {
    const typeFromParams = query.type as "bachelor" | "masters";
    if (typeFromParams) {
      setType(typeFromParams);
    }
  }, [query]);

  return (
    <PageComponent
      title="Home"
      header={
        <div>
          <DashboardHeader />
        </div>
      }
    >
      <div className="flex flex-col gap-4 py-6 md:py-10">
        {/* Only showing the picker if the applicant is bachelor or not signed in */}
        {((!isAuthedUserPending && !isSignedIn) || haveBachelor) && (
          <BMTabs onChange={setType} type={type} />
        )}

        <Dashboard type={type} />
      </div>
    </PageComponent>
  );
};

export default Home;
