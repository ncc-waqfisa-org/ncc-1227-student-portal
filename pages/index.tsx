import React from "react";
import { useRouter } from "next/router";
import { HomeComponent } from "../components/Home";
import { PageComponent } from "../components/PageComponent";
import { useAppContext } from "../contexts/AppContexts";
import { useAuth } from "../hooks/use-auth";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import { useQuery } from "@tanstack/react-query";
import { Scholarship } from "../src/API";
import { getStudentScholarships } from "../src/CustomAPI";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
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
  const comeBack: boolean = true;
  const router = useRouter();
  const auth = useAuth();
  const { haveActiveApplication } = useAppContext();
  const { t } = useTranslation("common");
  const { t: aPT } = useTranslation("applicationPage");

  const { data: scholarships } = useQuery<Scholarship[]>({
    queryKey: ["scholarships", auth.cpr],
    queryFn: () => (auth.cpr ? getStudentScholarships(auth.cpr) : []),
  });

  return (
    <PageComponent
      title="Home"
      header={
        <div className="mx-auto prose md:mx-0 md:mr-auto prose-p:text-white prose-headings:text-white">
          <div className="flex flex-col text-center md:text-start">
            <h1 className="mb-1 font-semibold rtl:md:border-r-8 ltr:md:border-l-8 md:pl-4">
              {/* Enroll for 2023 */}
              {t("enrollFor")} {new Date().getFullYear()}
            </h1>
            <p>{t("enrollForDescription")}</p>
            {!comeBack && (
              <div className="flex flex-col gap-3 mx-auto md:flex-row md:mx-0">
                <button
                  type="button"
                  className="w-full text-white md:w-auto btn btn-primary"
                  onClick={() => router.push("/applications")}
                >
                  {haveActiveApplication
                    ? t("trackApplications")
                    : t("enrollNow")}
                </button>
                {(scholarships?.length ?? 0) > 0 && (
                  <button
                    type="button"
                    className="w-full text-white md:w-auto btn btn-primary"
                    onClick={() => router.push("/scholarship")}
                  >
                    {aPT("goToScholarship")}
                  </button>
                )}
                {!auth.isSignedIn && (
                  <button
                    type="button"
                    className="w-full md:w-auto btn btn-outline btn-primary"
                    onClick={() => router.push("/signIn")}
                  >
                    {t("login")}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      }
    >
      <HomeComponent comeBack={comeBack}></HomeComponent>
    </PageComponent>
  );
};

export default Home;
