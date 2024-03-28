import React from "react";
import { useTranslation } from "react-i18next";
import { Application, Status } from "../../src/API";
import GetStorageLinkComponent from "../get-storage-link-component";
import { useRouter } from "next/router";
import Link from "next/link";
import { cn } from "../../src/lib/utils";

interface Props {
  application: Application;
}

export default function ViewApplication({ application }: Props) {
  const { t } = useTranslation("applicationPage");
  const { locale } = useRouter();

  const primaryProgram = application.programs?.items[0];
  console.log("🚀 ~ ViewApplication ~ primaryProgram:", primaryProgram);
  // const secondaryProgram = application.programs?.items?.sort(
  //   (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
  // )[1];

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>{t("field")}</th>
            <th>{t("value")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t("submitDate")}</td>
            <td>
              {Intl.DateTimeFormat(locale, {
                timeStyle: "short",
                dateStyle: "medium",
              }).format(new Date(application.createdAt))}
            </td>
          </tr>

          <tr>
            <td>{t("Status")}</td>
            <td className="flex items-baseline gap-4 flex-wrap">
              <div
                className={cn(
                  "badge badge-warning w-fit",
                  application.status === Status.REJECTED &&
                    "!badge-error text-white",
                  application.status === Status.APPROVED && "!badge-success"
                )}
              >
                {t(
                  `${
                    application.status === Status.ELIGIBLE ||
                    application.status === Status.REVIEW
                      ? Status.REVIEW
                      : application.status
                  }`
                )}
              </div>
              {application.status === Status.APPROVED && (
                <div className="w-fit">
                  <Link
                    className="btn btn-ghost btn-sm text-success brightness-75 hover:bg-success/20"
                    href={`/scholarship`}
                  >
                    {t("goToScholarship")}
                  </Link>
                </div>
              )}
            </td>
          </tr>

          <tr>
            <td>{t("GPA")}</td>
            <td>{application.gpa}</td>
          </tr>

          <tr>
            <td>{t("program")}</td>
            <td className="flex flex-col gap-3">
              <div>
                {locale === "ar"
                  ? `${primaryProgram?.program?.nameAr ?? "-"}-${
                      primaryProgram?.program?.university?.nameAr ?? "-"
                    }`
                  : `${primaryProgram?.program?.name}-${primaryProgram?.program?.university?.name}`}
              </div>
              {primaryProgram?.program?.minimumGPA && (
                <div className="stat-desc">
                  {`${t("minimumGPA")} : ${
                    primaryProgram?.program?.minimumGPA
                  }`}
                </div>
              )}
              {primaryProgram?.program?.requirements && (
                <div className="stat-desc">
                  {`${t("requirements")} : ${
                    locale === "ar"
                      ? primaryProgram?.program?.requirementsAr
                      : primaryProgram?.program?.requirements
                  }`}
                </div>
              )}
              {primaryProgram?.program?.university?.isException !== 1 && (
                <div className="flex  items-center gap-4">
                  <p className="text-xs stat-desc">{t("acceptanceLetter")}</p>
                  <GetStorageLinkComponent
                    storageKey={primaryProgram?.acceptanceLetterDoc}
                  ></GetStorageLinkComponent>
                </div>
              )}
            </td>
          </tr>
          <tr>
            <td>
              {t("schoolCertificate")} {t("document")}
            </td>
            <td>
              <GetStorageLinkComponent
                storageKey={application.attachment?.schoolCertificate}
              ></GetStorageLinkComponent>
            </td>
          </tr>
          <tr>
            <td>
              {t("transcript")} {t("document")}
            </td>
            <td>
              <GetStorageLinkComponent
                storageKey={application.attachment?.transcriptDoc}
              ></GetStorageLinkComponent>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
