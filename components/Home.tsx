import { CardInfoComponent } from "./CardInfo";
import logs from "../public/svg/logs.svg";
import search from "../public/svg/search.svg";
import check from "../public/svg/check-dark.svg";
import info from "../public/svg/info.svg";
import { useRouter } from "next/router";
import { useAppContext } from "../contexts/AppContexts";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { useAuth } from "../hooks/use-auth";
import { Scholarship } from "../src/API";
import { useQuery } from "@tanstack/react-query";
import { getStudentScholarships } from "../src/CustomAPI";
import dayjs from "dayjs";
import arLocale from "dayjs/locale/ar";
import enLocale from "dayjs/locale/en";
import { Skeleton } from "./Skeleton";

interface Props {
  comeBack?: boolean;
}

export const HomeComponent: FC<Props> = ({ comeBack }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const {
    haveActiveApplication,
    batch,
    isBatchPending,
    signUpEnabled,
    newApplicationsEnabled,
    editingApplicationsEnabled,
  } = useAppContext();

  const { cpr } = useAuth();
  const { data: scholarships } = useQuery<Scholarship[]>({
    queryKey: ["scholarships", cpr],
    queryFn: () => (cpr ? getStudentScholarships(cpr) : []),
  });

  return (
    <div>
      {isBatchPending && (
        <div className="flex flex-col gap-10 mx-auto">
          <Skeleton className="mx-auto w-full max-w-md h-10"></Skeleton>
          <div className="grid gap-10 md:grid-cols-2">
            <Skeleton className="mx-auto w-full max-w-md h-72"></Skeleton>
            <Skeleton className="mx-auto w-full max-w-md h-72"></Skeleton>
          </div>
        </div>
      )}
      {!isBatchPending && (
        <div className="flex flex-col gap-10 mx-auto">
          <h1 className="text-3xl font-semibold text-center text-gray-900">
            {t("availableServices")}
          </h1>

          {
            !(
              signUpEnabled ||
              newApplicationsEnabled ||
              (haveActiveApplication && editingApplicationsEnabled) ||
              haveActiveApplication ||
              (scholarships?.length ?? 0) > 0
            ) &&
              (dayjs().isAfter(dayjs(batch?.signUpEndDate).endOf("day")) ? (
                <div className="flex flex-wrap gap-10 justify-center">
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
                <div className="flex flex-wrap gap-10 justify-center">
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
              ))
            // <div className="grid grid-cols-1 gap-10 place-items-center mx-auto w-full max-w-4xl md:grid-cols-2">
            //   <CardInfoComponent
            //     icon={info}
            //     title={"التسجيل"}
            //     description={`سيتم فتح التسجيل في ${dayjs(batch?.signUpStartDate)
            //       .locale(arLocale)
            //       .format("MMM DD, YYYY")}`}
            //   ></CardInfoComponent>
            //   <CardInfoComponent
            //     icon={info}
            //     title={"Registration"}
            //     description={`Registration will open in ${dayjs(
            //       batch?.signUpStartDate
            //     )
            //       .locale(enLocale)
            //       .format("MMM DD, YYYY")}`}
            //   ></CardInfoComponent>
            // </div>
          }

          {(signUpEnabled ||
            newApplicationsEnabled ||
            (haveActiveApplication && editingApplicationsEnabled) ||
            haveActiveApplication ||
            (scholarships?.length ?? 0) > 0) && (
            <div className="grid grid-cols-1 gap-10 place-items-center mx-auto w-full max-w-4xl md:grid-cols-2">
              {!haveActiveApplication && (
                <CardInfoComponent
                  icon={logs}
                  title={t("applyForScholarship")}
                  description={t("applyForScholarshipDescription")}
                  action={() => router.push("/applications")}
                  actionTitle={t("enrollNow") ?? "Enroll Now"}
                ></CardInfoComponent>
              )}
              {(scholarships?.length ?? 0) > 0 && (
                <CardInfoComponent
                  icon={check}
                  title={t("scholarships")}
                  description={t("trackApplicationDescription")}
                  action={() => router.push("/scholarship")}
                  actionTitle={t("myScholarships") ?? "My Scholarships"}
                ></CardInfoComponent>
              )}
              {haveActiveApplication && (
                <CardInfoComponent
                  icon={search}
                  title={t("trackApplication")}
                  description={t("trackApplicationDescription")}
                  action={() => router.push("/applications")}
                  actionTitle={t("track") ?? "Track"}
                ></CardInfoComponent>
              )}

              <CardInfoComponent
                icon={info}
                title={t("informationCenter")}
                description={t("informationCenterDescription")}
                action={() => router.push("/contact")}
                actionTitle={t("getInfo") ?? "Get Info"}
              ></CardInfoComponent>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
