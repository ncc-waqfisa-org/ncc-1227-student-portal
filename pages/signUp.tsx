import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SignUpForm from "../components/auth/sign-up-form";
import { VerifyEmail } from "../components/auth/verify-email";
import { PageComponent } from "../components/PageComponent";
import { useAuth } from "../hooks/use-auth";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { CardInfoComponent } from "../components/CardInfo";

import info from "../public/svg/info.svg";
import { useAppContext } from "../contexts/AppContexts";
import dayjs from "dayjs";
import { Skeleton } from "../components/Skeleton";
import { ChangeEmail } from "../components/auth/ChangeEmail";

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
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

  const { signUpEnabled, isBatchPending } = useAppContext();

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
          {signUpEnabled ? (
            <div>
              <SignUpForm></SignUpForm>
            </div>
          ) : (
            // <>
            //   {!cpr && (
            //     <div>
            //       <SignUpForm></SignUpForm>
            //     </div>
            //   )}
            //   {cpr && action === undefined && (
            //     <div>
            //       <VerifyEmail cpr={`${cpr}`}></VerifyEmail>
            //     </div>
            //   )}
            //   {cpr && action === "changeEmail" && (
            //     <div>
            //       <ChangeEmail cpr={`${cpr}`}></ChangeEmail>
            //     </div>
            //   )}
            // </>
            // if registration period is over
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
          )}
        </>
      )}
    </PageComponent>
  );
};

export default SignUpPage;
