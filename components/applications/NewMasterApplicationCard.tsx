import React from "react";
import { useTranslation } from "react-i18next";
import cross from "../../public/svg/cross.svg";
import Image from "next/image";

export const NewMasterApplicationCard = () => {
  const { t } = useTranslation("applications");
  return (
    <div className="relative duration-200 hover:cursor-pointer hover:scale-105">
      <div className={`pt-6 shadow card bg-info`}>
        <div className="p-4 bg-white min-h-[15rem] pt-10 card gap-4 flex flex-col justify-between">
          {/* Status */}
          <div className="flex justify-between items-baseline">
            <h3 className="text-xl font-semibold">
              {t(`createNewApplication`)}
            </h3>
            {/* Submit Date */}
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          </div>
          {/* Programs */}
          <div>
            <div className="-mt-2 mb-2 text-sm stat-title">
              {t("selectedProgram")}
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-32 h-4 bg-gray-200 rounded"></div>
              <div className="w-40 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
          {/* Attachments */}
          <div className="p-3 rounded-xl border border-gray-200">
            <div className="flex gap-2 -mt-2 mb-2 text-sm stat-title">
              {t("requiredAttachments")}
            </div>

            <div className="flex flex-wrap gap-2">
              <div
                className={`badge  badge-ghost h-fit bg-[#e7e7e7] ${"opacity-50 !badge-outline"}`}
              >
                {t("CPR")}
              </div>
              <div
                className={`badge  badge-ghost h-fit bg-[#e7e7e7] ${"opacity-50 !badge-outline"}`}
              >
                {t("guardianCPR")}
              </div>
              <div
                className={`badge  badge-ghost h-fit bg-[#e7e7e7] ${"opacity-50 !badge-outline"}`}
              >
                {t("incomeDoc")}
              </div>
              <div
                className={`badge  badge-ghost h-fit bg-[#e7e7e7] ${"opacity-50 !badge-outline"}`}
              >
                {t("transcript")}
              </div>
              <div
                className={`badge  badge-ghost h-fit bg-[#e7e7e7] ${"opacity-50 !badge-outline"}`}
              >
                {t("universityCertificate")}
              </div>

              <div
                className={`badge  badge-ghost h-fit bg-[#e7e7e7] ${"opacity-50 !badge-outline"}`}
              >
                {t("acceptanceLetterDoc")}
              </div>
              <div
                className={`badge  badge-ghost h-fit bg-[#e7e7e7] ${"opacity-50 !badge-outline"}`}
              >
                {t("toeflIELTSCertificate")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex absolute top-2 left-2 justify-center items-center w-12 h-12 rounded-full border-2 border-white bg-info`}
      >
        <Image
          className="object-contain w-5 rotate-45 aspect-square"
          src={cross}
          alt="icon"
        ></Image>
      </div>
    </div>
  );
};
