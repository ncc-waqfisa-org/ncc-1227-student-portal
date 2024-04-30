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

  const { signUpEnabled } = useAppContext();

  const { cpr } = router.query;

  useEffect(() => {
    if (auth.isSignedIn) {
      router.replace("/");
    }

    return () => {};
  }, [auth.isSignedIn, router]);

  return (
    <PageComponent title="SignUp">
      {signUpEnabled ? (
        <>
          {!cpr && (
            <div>
              <SignUpForm></SignUpForm>
            </div>
          )}
          {cpr && (
            <div>
              <VerifyEmail cpr={`${cpr}`}></VerifyEmail>
            </div>
          )}
        </>
      ) : (
        // if registration period is over
        <div className="flex flex-wrap gap-10 justify-center">
          <CardInfoComponent
            icon={info}
            title={"Registration"}
            description={"Registration will open in June 2024"}
          ></CardInfoComponent>
          <CardInfoComponent
            icon={info}
            title={"التسجيل"}
            description={"سيتم فتح التسجيل في يونيو 2024"}
          ></CardInfoComponent>
        </div>
        // <div className="flex flex-wrap gap-10 justify-center">
        //   <CardInfoComponent
        //     icon={info}
        //     title={"Registration"}
        //     description={"Registration period is over"}
        //   ></CardInfoComponent>
        //   <CardInfoComponent
        //     icon={info}
        //    title={"قريباً"}
        //       description={"عد في يونيو للتسجيل"}
        //   ></CardInfoComponent>
        // </div>
      )}
    </PageComponent>
  );
};

export default SignUpPage;
