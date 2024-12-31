import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PageComponent } from "../components/PageComponent";
import { useAuth } from "../hooks/use-auth";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { CardInfoComponent } from "../components/CardInfo";
import logs from "public/svg/logs.svg";
import { useTranslation } from "react-i18next";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "toast",
        "footer",
        "pageTitles",
        "signUp",
        "account",
        "termsAndConditions",
        "signIn",
        "errors",
      ])),
    },
  };
};

interface Props {}

const SignUpPage: NextPage<Props> = () => {
  const auth = useAuth();
  const router = useRouter();
  const { type } = router.query;
  const [showCards, setShowCards] = useState(false);
  const { t } = useTranslation("common");

  useEffect(() => {
    if (auth.isSignedIn) {
      router.replace("/");
    } else if (type === "master") {
      router.replace("/masters/signup");
    } else if (type === "bachelor") {
      router.replace("/bachelor/signup");
    } else {
      setShowCards(true);
    }

    return () => {};
  }, [auth.isSignedIn, router, type]);

  return (
    <PageComponent title="SignUp">
      {showCards && (
        <div className="grid w-full max-w-4xl grid-cols-1 gap-10 mx-auto place-items-center md:grid-cols-2">
          <CardInfoComponent
            icon={logs}
            title={t("signUpToMasters")}
            description={""}
            action={() => router.push("/masters/signup")}
            actionTitle={t("enrollNow") ?? "Sign up to Masters"}
          ></CardInfoComponent>
          <CardInfoComponent
            icon={logs}
            title={t("signUpToBachelor")}
            description={""}
            action={() => router.push("/bachelor/signup")}
            actionTitle={t("enrollNow") ?? "Sign up to Bachelor"}
          ></CardInfoComponent>
        </div>
      )}
    </PageComponent>
  );
};

export default SignUpPage;
