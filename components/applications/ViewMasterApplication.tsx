import React from "react";
import { useTranslation } from "react-i18next";
import { Application, MasterApplication, Status } from "../../src/API";
import GetStorageLinkComponent from "../get-storage-link-component";
import { useRouter } from "next/router";
import Link from "next/link";
import { cn } from "../../src/lib/utils";

interface Props {
  application: MasterApplication;
  haveScholarship: boolean;
}

export default function ViewMasterApplication({
  application,
  haveScholarship,
}: Props) {
  const { t } = useTranslation("applicationPage");
  const { locale } = useRouter();

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
            <td className="flex flex-wrap gap-4 items-baseline">
              <div
                className={cn(
                  "badge badge-warning w-fit",
                  application.status === Status.APPROVED && "!badge-success"
                )}
              >
                {t(
                  `${
                    application.status === Status.ELIGIBLE ||
                    application.status === Status.REVIEW ||
                    application.status === Status.REJECTED
                      ? Status.REVIEW
                      : application.status
                  }`
                )}
              </div>
              {/* only show when there is a scholarship */}
              {haveScholarship && (
                <div className="w-fit">
                  <Link
                    className="brightness-75 btn btn-ghost btn-sm text-success hover:bg-success/20"
                    href={`/masters/scholarship`}
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
            <td>{t("university")}</td>
            <td>
              {locale === "ar"
                ? application.university?.universityNameAr
                : application.university?.universityName}
            </td>
          </tr>
          <tr>
            <td>{t("major")}</td>
            <td>
              {application.major ? t(application.major) : application.major}
            </td>
          </tr>
          <tr>
            <td>{t("program")}</td>
            <td>{application.program}</td>
          </tr>
          <tr>
            <td className="flex gap-2 rtl:justify-end rtl:flex-row-reverse">
              <span>{t("universityCertificate")}</span>{" "}
              <span>{t("document")}</span>
            </td>
            <td>
              <GetStorageLinkComponent
                storageKey={application.attachment?.universityCertificate}
              ></GetStorageLinkComponent>
            </td>
          </tr>
          <tr>
            <td className="flex gap-2 rtl:justify-end rtl:flex-row-reverse">
              <span>{t("acceptanceLetter")}</span> <span>{t("document")}</span>
            </td>
            <td>
              <GetStorageLinkComponent
                storageKey={application.attachment?.acceptanceLetterDoc}
              ></GetStorageLinkComponent>
            </td>
          </tr>
          <tr>
            <td className="flex gap-2 rtl:justify-end rtl:flex-row-reverse">
              <span>{t("transcript")}</span> <p>{t("document")}</p>
            </td>
            <td>
              <GetStorageLinkComponent
                storageKey={application.attachment?.transcriptDoc}
              ></GetStorageLinkComponent>
            </td>
          </tr>
          <tr>
            <td className="flex gap-2 rtl:justify-end rtl:flex-row-reverse">
              <span>{t("TOEFLIELTSCertificateDoc")}</span>{" "}
              <p>{t("document")}</p>
            </td>
            <td>
              <GetStorageLinkComponent
                storageKey={application.attachment?.tofelILETSCertificate}
              ></GetStorageLinkComponent>
            </td>
          </tr>
          <tr>
            <td>{t("reason")}</td>
            <td>{application.reason ?? t("empty")}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
