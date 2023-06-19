import { PageComponent } from "../components/PageComponent";

import { NextPage } from "next";
import { SignInForm } from "../components/auth/sign-in-form";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
        "signIn",
        "errors",
      ])),
    },
  };
};

interface Props {}

const SignInPage: NextPage<Props> = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.isSignedIn) {
      router.replace("/");
    }

    return () => {};
  }, [auth.isSignedIn, router]);

  return (
    <PageComponent title="SignIn">
      <SignInForm></SignInForm>
    </PageComponent>
  );
};

export default SignInPage;
