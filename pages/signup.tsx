import { NextPage } from "next";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useState } from "react";
import { PageComponent } from "../components/PageComponent";
import { useAuth } from "../hooks/use-auth";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { CardInfoComponent } from "../components/CardInfo";
import logs from "public/svg/logs.svg";
import info from "public/svg/info.svg";
import { useTranslation } from "react-i18next";
import { NextPageWithLayout } from "./_app";
import {
  BachelorProvider,
  useBachelorContext,
} from "../contexts/BachelorContexts";
import {
  MastersProvider,
  useMastersContext,
} from "../contexts/MastersContexts";
import { NoAvailableBatch } from "../components/NoAvailableBatch";

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

// interface NoAvailableBatchProps {
//   type: "masters" | "bachelor";
// }

// const NoAvailableBatch = ({ type }: NoAvailableBatchProps) => {
//   const { locale } = useRouter();
//   const isArabic = locale === "ar";

//   return (
//     <>
//       {type === "masters" && (
//         <CardInfoComponent
//           icon={info}
//           title={isArabic ? "التسجيل" : "Registration"}
//           description={
//             isArabic
//               ? "التسجيل للماجستير غير مفتوح"
//               : "Registration for masters is not open"
//           }
//         ></CardInfoComponent>
//       )}
//       {type === "bachelor" && (
//         <CardInfoComponent
//           icon={info}
//           title={isArabic ? "التسجيل" : "Registration"}
//           description={
//             isArabic
//               ? "التسجيل للبكلريوس غير مفتوح"
//               : "Registration for bachelor is not open"
//           }
//         ></CardInfoComponent>
//       )}
//     </>
//   );
// };

const SignUpPage: NextPageWithLayout<Props> = () => {
  const auth = useAuth();
  const router = useRouter();
  const { type } = router.query;
  const [showCards, setShowCards] = useState(false);
  const { t } = useTranslation("common");

  const { signUpEnabled } = useBachelorContext();
  const { signUpEnabled: signUpEnabledMasters } = useMastersContext();

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
          {signUpEnabled ? (
            <CardInfoComponent
              icon={logs}
              title={t("signUpToBachelor")}
              description={""}
              action={() => router.push("/bachelor/signup")}
              actionTitle={t("enrollNow") ?? "Sign up to Bachelor"}
            ></CardInfoComponent>
          ) : (
            <NoAvailableBatch type="bachelor" />
          )}
          {signUpEnabledMasters ? (
            <CardInfoComponent
              icon={logs}
              title={t("signUpToMasters")}
              description={""}
              action={() => router.push("/masters/signup")}
              actionTitle={t("enrollNow") ?? "Sign up to Masters"}
            ></CardInfoComponent>
          ) : (
            <NoAvailableBatch type="masters" />
          )}
        </div>
      )}
    </PageComponent>
  );
};

SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BachelorProvider>
      <MastersProvider>{page}</MastersProvider>
    </BachelorProvider>
  );
};

export default SignUpPage;
