import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SignUpForm from "../components/auth/sign-up-form";
import { PageComponent } from "../components/PageComponent";
import { useAuth } from "../hooks/use-auth";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { CardInfoComponent } from "../components/CardInfo";

import info from "../public/svg/info.svg";
import { useAppContext } from "../contexts/AppContexts";
import { Skeleton } from "../components/Skeleton";
import dayjs from "dayjs";
import arLocale from "dayjs/locale/ar";
import enLocale from "dayjs/locale/en";

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

  const { signUpEnabled, isBatchPending, batch } = useAppContext();

  useEffect(() => {
    if (auth.isSignedIn) {
      router.replace("/");
    }

    return () => {};
  }, [auth.isSignedIn, router]);

  return (
    <PageComponent title="SignUp">
      {isBatchPending ? (
        <Skeleton className="w-full h-96 bg-slate-300/80 " />
      ) : (
        <>
          {
            signUpEnabled ? (
              <div>
                <SignUpForm></SignUpForm>
              </div>
            ) : // if registration period is over
            dayjs().isAfter(dayjs(batch?.signUpEndDate).endOf("day")) ? (
              <div className="flex flex-wrap justify-center gap-10">
                <CardInfoComponent
                  icon={info}
                  title={"Registration"}
                  description={"Registration period is over"}
                ></CardInfoComponent>
                <CardInfoComponent
                  icon={info}
                  title={"التسجيل"}
                  description={"فترة التسجيل إنتهت"}
                ></CardInfoComponent>
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-10">
                <CardInfoComponent
                  icon={info}
                  title={"التسجيل"}
                  description={`سيتم فتح التسجيل في ${dayjs(
                    batch?.signUpStartDate
                  )
                    .locale(arLocale)
                    .format("MMM DD, YYYY")}`}
                ></CardInfoComponent>
                <CardInfoComponent
                  icon={info}
                  title={"Registration"}
                  description={`Registration will open in ${dayjs(
                    batch?.signUpStartDate
                  )
                    .locale(enLocale)
                    .format("MMM DD, YYYY")}`}
                ></CardInfoComponent>
              </div>
            )
            // <div className="flex flex-wrap justify-center gap-10">
            //   <CardInfoComponent
            //     icon={info}
            //     title={"Registration"}
            //     description={"Registration will open in June 2024"}
            //   ></CardInfoComponent>
            //   <CardInfoComponent
            //     icon={info}
            //     title={"التسجيل"}
            //     description={"سيتم فتح التسجيل في يونيو 2024"}
            //   ></CardInfoComponent>
            // </div>
          }
        </>
      )}
    </PageComponent>
  );
};

export default SignUpPage;
