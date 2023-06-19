import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SignUpForm from "../components/auth/sign-up-form";
import { VerifyEmail } from "../components/auth/verify-email";
import { PageComponent } from "../components/PageComponent";
import { useAuth } from "../hooks/use-auth";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
  const { cpr } = router.query;

  useEffect(() => {
    if (auth.isSignedIn) {
      router.replace("/");
    }

    return () => {};
  }, [auth.isSignedIn, router]);

  return (
    <PageComponent title="SignUp">
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
    </PageComponent>
  );
};

export default SignUpPage;
