import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";
import { Application, Status, Student } from "../../src/API";
import { useTranslation } from "react-i18next";

import cross from "../../public/svg/cross.svg";
import glasses from "../../public/svg/glasses.svg";
import { useRouter } from "next/router";

interface IApplicationCard {
  student: Student;
  application: Application;
}

export const ApplicationCard: FC<IApplicationCard> = ({
  application,
  student,
}) => {
  const { locale } = useRouter();
  const { t } = useTranslation("applications");

  const primaryProgram = application?.programs?.items[0];
  // const secondaryProgram = application?.programs?.items.sort(
  //   (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
  // )[1];

  return (
    <div className="relative duration-200 hover:cursor-pointer hover:scale-105">
      <Link
        href={`../applications/${application.id}`}
        className={`pt-6 shadow card  ${
          (application.status === Status.REVIEW ||
            application.status === Status.ELIGIBLE) &&
          // application.status === Status.APPROVED ||
          // application.status === Status.NOT_COMPLETED
          "bg-warning"
        } ${application.status === Status.REJECTED && "bg-error"} ${
          application.status === Status.APPROVED && "bg-success"
        } ${
          (application.status === Status.WITHDRAWN ||
            application.status === Status.NOT_COMPLETED) &&
          "bg-neutral"
        }`}
        key={application.id}
      >
        <div className="p-4 bg-white min-h-[15rem] pt-10 card gap-4 flex flex-col justify-between">
          {/* Status */}
          <div className="flex flex-wrap items-baseline justify-between">
            <h3 className="text-xl font-semibold">
              {t(
                `${
                  application.status === Status.ELIGIBLE ||
                  application.status === Status.REVIEW
                    ? // application.status === Status.APPROVED ||
                      // application.status === Status.NOT_COMPLETED
                      Status.REVIEW
                    : application.status
                }`
              )}
            </h3>
            {/* Submit Date */}
            <div className=" stat-desc">
              {t("submitDate")}{" "}
              {Intl.DateTimeFormat(locale).format(
                new Date(application.createdAt)
              )}
            </div>
          </div>
          {/* Programs */}
          <div>
            <div className="mb-2 -mt-2 text-sm stat-title">
              {t("selectedPrograms")}
            </div>
            {application.programs?.items.map((program) => (
              <div key={program?.id} className="whitespace-pre-wrap stat-desc">
                {program?.choiceOrder}
                {"- "}
                {locale == "ar"
                  ? `${program?.program?.nameAr ?? "-"}-${
                      program?.program?.university?.nameAr ?? "-"
                    }`
                  : `${program?.program?.name}-${program?.program?.university?.name}`}
              </div>
            ))}
          </div>
          {/* Attachments */}
          <div className="p-3 border border-gray-200 rounded-xl">
            <div className="flex gap-2 mb-2 -mt-2 text-sm stat-title ">
              {t("uploadedAttachments")}{" "}
              {(student.cprDoc === (undefined || null) ||
                (student.familyIncomeProofDocs ?? [])?.length === 0 ||
                application.attachment?.transcriptDoc === (undefined || null) ||
                application.attachment?.schoolCertificate ===
                  (undefined || null) ||
                primaryProgram?.acceptanceLetterDoc ===
                  (undefined || null)) && (
                <span className="text-error">{t("notCompleted")}</span>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              <div
                className={`badge  badge-ghost h-fit bg-[#e7e7e7] border-0 ${
                  !student.cprDoc && "badge-error !badge-outline !border"
                }`}
              >
                {t("CPR")}
              </div>
              <div
                className={`badge  badge-ghost h-fit bg-[#e7e7e7] border-0 ${
                  (student.familyIncomeProofDocs ?? [])?.length === 0 &&
                  "badge-error !badge-outline !border"
                }`}
              >
                {t("familyIncomeProofDocs")}
              </div>
              <div
                className={`badge  badge-ghost h-fit bg-[#e7e7e7] border-0 ${
                  !application.attachment?.transcriptDoc &&
                  "badge-error !badge-outline !border"
                }`}
              >
                {t("transcript")}
              </div>
              <div
                className={`badge  badge-ghost h-fit bg-[#e7e7e7] border-0 ${
                  !application.attachment?.schoolCertificate &&
                  "badge-error !badge-outline !border"
                }`}
              >
                {t("schoolCertificate")}
              </div>
              <div
                className={`badge  badge-ghost h-fit bg-[#e7e7e7] border-0 ${
                  !primaryProgram?.acceptanceLetterDoc &&
                  "badge-error !badge-outline !border"
                }`}
              >
                {t("acceptanceLetter")}
              </div>
              {/* <div
                className={`badge  badge-ghost h-fit bg-[#e7e7e7] border-0 ${
                  !secondaryProgram?.acceptanceLetterDoc &&
                  "badge-error !badge-outline !border"
                }`}
              >
                {t("secondaryProgramAcceptanceLetter")}
              </div> */}
            </div>
          </div>
        </div>
      </Link>
      <div
        className={`absolute flex items-center justify-center w-12 h-12 border-2 border-white rounded-full top-2 left-2 ${
          (application.status === Status.REVIEW ||
            application.status === Status.ELIGIBLE) &&
          // application.status === Status.APPROVED ||
          // application.status === Status.NOT_COMPLETED
          "bg-warning"
        } ${application.status === Status.REJECTED && "bg-error"} ${
          (application.status === Status.WITHDRAWN ||
            application.status === Status.NOT_COMPLETED) &&
          "bg-neutral"
        } ${application.status === Status.APPROVED && "bg-success"}`}
      >
        {(application.status === Status.REVIEW ||
          application.status === Status.ELIGIBLE ||
          application.status === Status.NOT_COMPLETED ||
          application.status === Status.REJECTED ||
          application.status === Status.APPROVED) && (
          <Image
            className="object-contain w-5 aspect-square"
            src={glasses}
            alt="icon"
          ></Image>
        )}
        {application.status === Status.WITHDRAWN && (
          <Image
            className="object-contain w-4 aspect-square"
            src={cross}
            alt="icon"
          ></Image>
        )}
      </div>
    </div>
  );
};
