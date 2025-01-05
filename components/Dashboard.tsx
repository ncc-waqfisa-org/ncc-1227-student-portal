import React, { FC } from "react";

import { HomeComponent } from "../components/Home";

import { BachelorProvider } from "../contexts/BachelorContexts";
import { CardInfoComponent } from "./CardInfo";
import logs from "public/svg/logs.svg";
import info from "public/svg/info.svg";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import {
  MastersProvider,
  useMastersContext,
} from "../contexts/MastersContexts";
import dayjs from "dayjs";
import arLocale from "dayjs/locale/ar";
import enLocale from "dayjs/locale/en";
import { Skeleton } from "./Skeleton";

type TDashboard = {
  type: "masters" | "bachelor";
};

export const Dashboard: FC<TDashboard> = ({ type }) => {
  switch (type) {
    case "bachelor":
      return (
        <BachelorProvider>
          <BachelorDashboard />
        </BachelorProvider>
      );
    case "masters":
      return (
        <MastersProvider>
          <MastersDashboard />
        </MastersProvider>
      );
  }
};

const BachelorDashboard = () => {
  return <HomeComponent></HomeComponent>;
};

const MastersDashboard = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { signUpEnabled, newApplicationsEnabled, batch, isBatchPending } =
    useMastersContext();

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

  if (!isBatchPending && !batch) {
    return (
      <div className="flex flex-wrap gap-10 justify-center">
        <CardInfoComponent
          icon={info}
          title={"Registration"}
          description={"Registration for masters is not open"}
        ></CardInfoComponent>
        <CardInfoComponent
          icon={info}
          title={"التسجيل"}
          description={"التسجيل للماجستير غير مفتوح"}
        ></CardInfoComponent>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-10 place-items-center mx-auto w-full max-w-4xl md:grid-cols-2">
      {!(
        (signUpEnabled || newApplicationsEnabled)
        // TODO: inclued the master applications/scholarship
        //? Check if user has ongoing applications
        // (haveActiveApplication && editingApplicationsEnabled) ||
        // haveActiveApplication ||
        //? Check if user have ongoing scholarship
        // (scholarships?.length ?? 0) > 0
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
              description={`سيتم فتح التسجيل في ${dayjs(batch?.signUpStartDate)
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

      {signUpEnabled && (
        <>
          <CardInfoComponent
            icon={logs}
            title={t("applyForScholarshipMasters")}
            description={t("applyForScholarshipDescription")}
            action={() => router.push("/masters/applications?type=master")}
            actionTitle={t("enrollNow") ?? "Enroll Now"}
          ></CardInfoComponent>
          <CardInfoComponent
            icon={info}
            title={t("informationCenter")}
            description={t("informationCenterDescription")}
            action={() => router.push("/contact")}
            actionTitle={t("getInfo") ?? "Get Info"}
          ></CardInfoComponent>
        </>
      )}
    </div>
  );
};
