import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { RegPeriodDialog } from "./reg-period";

export const DashboardHeader = () => {
  const { t } = useTranslation("common");

  return (
    <div className="mx-auto prose md:mx-0 md:mr-auto prose-p:text-white prose-headings:text-white">
      <div className="flex flex-col text-center md:text-start">
        <h1 className="mb-1 font-semibold rtl:md:border-r-8 ltr:md:border-l-8 md:pl-4">
          {/* Enroll for [current year] */}
          {t("enrollFor")} {dayjs().year()}
        </h1>
        <p>{t("enrollForDescription")}</p>
      </div>
      <RegPeriodDialog className="py-2 leading-4 text-white h-fit btn-outline hover:bg-white/10 hover:border-white" />
    </div>
  );
};
