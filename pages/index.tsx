import React, { useState } from "react";
import { PageComponent } from "../components/PageComponent";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { Dashboard } from "../components/Dashboard";
import { cn } from "../src/lib/utils";
import { DashboardHeader } from "../components/DashboardHeader";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

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
    },
  };
};

const Home = () => {
  const [type, setType] = useState<"bachelor" | "masters">("bachelor");
  const { t: commonT } = useTranslation("common");

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
