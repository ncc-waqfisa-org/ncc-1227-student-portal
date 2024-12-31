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
  const { signUpEnabled, newApplicationsEnabled, batch } = useMastersContext();
  return (
    <div className="grid w-full max-w-4xl grid-cols-1 gap-10 mx-auto place-items-center md:grid-cols-2">
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
