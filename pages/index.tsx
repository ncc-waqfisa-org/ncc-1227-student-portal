import React, { useState, useEffect } from "react";
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
  const { studentAsStudent: student } = useAppContext();

  useEffect(() => {
    if (initialType === null) {
      const isMasterApplicant =
        student?.m_applicantType.includes(ApplicantType.MASTER) ?? false; //student.applicantType.includes("masters");

      if (isMasterApplicant) {
        setType("masters");
      } else {
        setType("bachelor"); // Default to "bachelor" if initialType is undefined
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
      <div className="flex flex-col gap-4">
        <div role="tablist" className="w-full max-w-lg mx-auto tabs tabs-boxed">
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

        <Dashboard type={type} />
      </div>
    </PageComponent>
  );
};

export default Home;
