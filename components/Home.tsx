import { CardInfoComponent } from "./CardInfo";
import logs from "public/svg/logs.svg";
import search from "public/svg/search.svg";
import check from "public/svg/check-dark.svg";
import info from "public/svg/info.svg";
import { useRouter } from "next/router";
import { useBachelorContext } from "../contexts/BachelorContexts";
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
import ErrorComponent from "./ErrorComponent";

export const HomeComponent: FC = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const {
    haveActiveApplication,
    batch,
    isBatchPending,
    signUpEnabled,
    newApplicationsEnabled,
    editingApplicationsEnabled,
  } = useBachelorContext();

  const { cpr } = useAuth();
  const { data: scholarships } = useQuery<Scholarship[]>({
    queryKey: ["scholarships", cpr],
    queryFn: () => (cpr ? getStudentScholarships(cpr) : []),
  });

  return (
    <div>
      {isBatchPending && (
        <div className="flex flex-col gap-10 mx-auto">
          <Skeleton className="w-full h-10 max-w-md mx-auto"></Skeleton>
          <div className="grid gap-10 md:grid-cols-2">
            <Skeleton className="w-full max-w-md mx-auto h-72"></Skeleton>
            <Skeleton className="w-full max-w-md mx-auto h-72"></Skeleton>
          </div>
        </div>
      )}
      {!isBatchPending && !batch && (
        <div>
          <ErrorComponent />
        </div>
      )}
      {!isBatchPending && batch && (
        <div className="flex flex-col gap-10 mx-auto">
          {!(
            signUpEnabled ||
            newApplicationsEnabled ||
            (haveActiveApplication && editingApplicationsEnabled) ||
            haveActiveApplication ||
            (scholarships?.length ?? 0) > 0
          ) &&
            (dayjs().isAfter(dayjs(batch?.signUpEndDate).endOf("day")) ? (
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
              <div className="flex flex-wrap justify-center gap-10 ">
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
            ))}

          {(signUpEnabled ||
            newApplicationsEnabled ||
            (haveActiveApplication && editingApplicationsEnabled) ||
            haveActiveApplication ||
            (scholarships?.length ?? 0) > 0) && (
            <div className="grid w-full max-w-4xl grid-cols-1 gap-10 mx-auto place-items-center md:grid-cols-2">
              {!haveActiveApplication && (
                <CardInfoComponent
                  icon={logs}
                  title={t("applyForScholarship")}
                  description={t("applyForScholarshipDescription")}
                  action={() =>
                    router.push("/bachelor/applications?type=bachelor")
                  }
                  actionTitle={t("enrollNow") ?? "Enroll Now"}
                ></CardInfoComponent>
              )}
              {(scholarships?.length ?? 0) > 0 && (
                <CardInfoComponent
                  icon={check}
                  title={t("scholarships")}
                  description={t("trackApplicationDescription")}
                  action={() =>
                    router.push("/bachelor/scholarship?type=bachelor")
                  }
                  actionTitle={t("myScholarships") ?? "My Scholarships"}
                ></CardInfoComponent>
              )}
              {haveActiveApplication && (
                <CardInfoComponent
                  icon={search}
                  title={t("trackApplication")}
                  description={t("trackApplicationDescription")}
                  action={() =>
                    router.push("/bachelor/applications?type=bachelor")
                  }
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
