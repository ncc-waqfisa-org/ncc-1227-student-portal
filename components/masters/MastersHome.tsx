import { CardInfoComponent } from "./../CardInfo";
import logs from "public/svg/logs.svg";
import search from "public/svg/search.svg";
import check from "public/svg/check-dark.svg";
import info from "public/svg/info.svg";
import { useRouter } from "next/router";

import { useTranslation } from "react-i18next";
import { FC } from "react";
import { useAuth } from "../../hooks/use-auth";
import { ApplicantType, MasterScholarship, Scholarship } from "../../src/API";
import { useQuery } from "@tanstack/react-query";
import { getMasterScholarships } from "../../src/CustomAPI";
import dayjs from "dayjs";
import arLocale from "dayjs/locale/ar";
import enLocale from "dayjs/locale/en";
import { Skeleton } from "./../Skeleton";
import { useMastersContext } from "../../contexts/MastersContexts";
import { NoAvailableBatch } from "../NoAvailableBatch";
import { useAppContext } from "../../contexts/AppContexts";

export const MastersHomeComponent: FC = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const {
    batch,
    isBatchPending,
    signUpEnabled,
    haveActiveApplication,
    newApplicationsEnabled,
    editingApplicationsEnabled,
  } = useMastersContext();
  const { studentAsStudent: student } = useAppContext();

  const { cpr, isSignedIn } = useAuth();
  const { data: scholarships } = useQuery<MasterScholarship[]>({
    queryKey: ["MasterScholarships", cpr],
    queryFn: () => (cpr ? getMasterScholarships({ studentCPR: cpr }) : []),
    // queryFn: () => (cpr ? getStudentScholarships(cpr) : []),
  });

  const haveScholarships = (scholarships?.length ?? 0) > 0;

  const canApply =
    signUpEnabled ||
    newApplicationsEnabled ||
    (haveActiveApplication && editingApplicationsEnabled);
  const isRegistrationClosed = dayjs().isAfter(
    dayjs(batch?.signUpEndDate).endOf("day")
  );
  const registrationDate = dayjs(batch?.signUpStartDate);

  if (isBatchPending) {
    return (
      <div className="flex flex-col gap-10 mx-auto w-full max-w-4xl">
        <div className="grid gap-10 md:grid-cols-2">
          <Skeleton className="mx-auto w-full max-w-md h-72 rounded-2xl"></Skeleton>
          <Skeleton className="mx-auto w-full max-w-md h-72 rounded-2xl"></Skeleton>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Have scholarships or applications */}
      <div className="flex flex-wrap gap-10 justify-center">
        {haveScholarships && (
          <CardInfoComponent
            icon={check}
            title={t("scholarships")}
            description={t("trackApplicationDescription")}
            action={() => router.push("/masters/scholarship?type=masters")}
            actionTitle={t("myScholarships") ?? "My Scholarships"}
          ></CardInfoComponent>
        )}
        {haveActiveApplication && (
          <CardInfoComponent
            icon={search}
            title={t("trackApplication")}
            description={t("trackApplicationDescription")}
            action={() => router.push("/masters/applications?type=masters")}
            actionTitle={t("track") ?? "Track"}
          ></CardInfoComponent>
        )}
      </div>

      {/* Check if batch available */}
      {!isBatchPending && !batch ? (
        <div className="flex justify-center">
          <NoAvailableBatch type="masters" />
        </div>
      ) : (
        <div className="flex flex-col gap-10 mx-auto">
          {!canApply &&
            (isRegistrationClosed ? (
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
                  description={`سيتم فتح التسجيل في ${registrationDate
                    .locale(arLocale)
                    .format("MMM DD, YYYY")}`}
                ></CardInfoComponent>
                <CardInfoComponent
                  icon={info}
                  title={"Registration"}
                  description={`Registration will open in ${registrationDate
                    .locale(enLocale)
                    .format("MMM DD, YYYY")}`}
                ></CardInfoComponent>
              </div>
            ))}

          {canApply && (
            <div className="grid grid-cols-1 gap-10 items-stretch place-items-center mx-auto w-full max-w-4xl md:grid-cols-2">
              {!haveActiveApplication && (
                <CardInfoComponent
                  icon={logs}
                  title={t("applyForScholarshipMasters")}
                  description={t("applyForScholarshipDescription")}
                  action={() =>
                    router.push(
                      isSignedIn
                        ? student?.m_applicantType.includes(
                            ApplicantType.MASTER
                          )
                          ? "/masters/applications?type=masters"
                          : "/masters/enroll"
                        : "/masters/applications?type=masters"
                    )
                  }
                  actionTitle={t("enrollNow") ?? "Enroll Now"}
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

// const NoAvailableBatch = () => {
//   return (
//     <div className="flex flex-wrap gap-10 justify-center">
//       <CardInfoComponent
//         icon={info}
//         title={"Registration"}
//         description={"Registration for masters is not open"}
//       ></CardInfoComponent>
//       <CardInfoComponent
//         icon={info}
//         title={"التسجيل"}
//         description={"التسجيل للماجستير غير مفتوح"}
//       ></CardInfoComponent>
//     </div>
//   );
// };
