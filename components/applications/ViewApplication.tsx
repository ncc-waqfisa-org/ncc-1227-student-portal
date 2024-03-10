import React from "react";
import { useTranslation } from "react-i18next";
import { Application, Status } from "../../src/API";
import GetStorageLinkComponent from "../get-storage-link-component";
import { useRouter } from "next/router";

interface Props {
  application: Application;
}

export default function ViewApplication({ application }: Props) {
  const { t } = useTranslation("applicationPage");
  const { locale } = useRouter();

  const primaryProgram = application.programs?.items[0];
  // const secondaryProgram = application.programs?.items?.sort(
  //   (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
  // )[1];

  return (
    <div className="overflow-x-auto">
      <table dir="ltr" className="table w-full">
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
              {Intl.DateTimeFormat("en", {
                timeStyle: "short",
                dateStyle: "medium",
              }).format(new Date(application.createdAt))}
            </td>
          </tr>

          <tr>
            <td>{t("Status")}</td>
            <td>
              <div className="badge badge-warning">
                {t(
                  `${
                    application.status === Status.ELIGIBLE ||
                    application.status === Status.REVIEW ||
                    application.status === Status.REJECTED ||
                    application.status === Status.APPROVED ||
                    application.status === Status.NOT_COMPLETED
                      ? Status.REVIEW
                      : application.status
                  }`
                )}
              </div>
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
              {primaryProgram?.program?.requirements && (
                <div className="stat-desc">
                  {`${t("requirements")} : ${
                    locale === "ar"
                      ? primaryProgram?.program?.requirementsAr
                      : primaryProgram?.program?.requirements
                  }`}
                </div>
              )}
              <div className="flex items-center gap-4">
                <p className="text-xs">{t("acceptanceLetter")}</p>
                <GetStorageLinkComponent
                  storageKey={primaryProgram?.acceptanceLetterDoc}
                ></GetStorageLinkComponent>
              </div>
            </td>
          </tr>
          {/* <tr>
            <td>{t("secondaryProgram")}</td>
            <td className="flex flex-col gap-3">
              <div>
                {locale === "ar"
                  ? `${secondaryProgram?.program?.nameAr ?? "-"}-${
                      secondaryProgram?.program?.university?.nameAr ?? "-"
                    }`
                  : `${secondaryProgram?.program?.name}-${secondaryProgram?.program?.university?.name}`}
              </div>
              {secondaryProgram?.program?.requirements && (
                <div className="stat-desc">
                  {`${t("requirements")} : ${
                    locale === "ar"
                      ? secondaryProgram?.program?.requirementsAr
                      : secondaryProgram?.program?.requirements
                  }`}
                </div>
              )}
              <div className="flex items-center gap-4">
                <p className="text-xs">{t("acceptanceLetter")}</p>
                <GetStorageLinkComponent
                  storageKey={secondaryProgram?.acceptanceLetterDoc}
                ></GetStorageLinkComponent>
              </div>
            </td>
          </tr> */}
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
