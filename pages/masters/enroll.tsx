import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import { PageComponent } from "../../components/PageComponent";
import { useAuth } from "../../hooks/use-auth";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { CardInfoComponent } from "../../components/CardInfo";

import info from "public/svg/info.svg";
import { Skeleton } from "../../components/Skeleton";
import dayjs from "dayjs";
import arLocale from "dayjs/locale/ar";
import enLocale from "dayjs/locale/en";
import { NextPageWithLayout } from "../_app";
import {
  MastersProvider,
  useMastersContext,
} from "../../contexts/MastersContexts";

import { EnrollIntoMaster } from "../../components/account/masters/EnrollIntoMaster";
import { listAllBahrainUniversities } from "../../src/CustomAPI";
import { BahrainUniversities } from "../../src/API";

export const getServerSideProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;
  const universities = await listAllBahrainUniversities();

  return {
    props: {
      universities,
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

interface Props {
  universities: BahrainUniversities[];
}

const EnrollIntoMasters: NextPageWithLayout<Props> = ({ universities }) => {
  const { isSignedIn, isAuthedUserPending } = useAuth();
  const router = useRouter();

  const { signUpEnabled, isBatchPending, batch } = useMastersContext();

  useEffect(() => {
    if (!isSignedIn && !isAuthedUserPending) {
      router.replace("/");
    }

    return () => {};
  }, [isSignedIn, isAuthedUserPending, router]);

  return (
    <PageComponent title="MEnroll">
      {isBatchPending ? (
        <Skeleton className="w-full h-96 bg-slate-300/80" />
      ) : (
        <>
          {signUpEnabled ? (
            <div>
              <EnrollIntoMaster universities={universities} />
              {/* <MastersSignUpForm></MastersSignUpForm> */}
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
          )}
        </>
      )}
    </PageComponent>
  );
};

EnrollIntoMasters.getLayout = function getLayout(page: ReactElement) {
  return <MastersProvider>{page}</MastersProvider>;
};
export default EnrollIntoMasters;
