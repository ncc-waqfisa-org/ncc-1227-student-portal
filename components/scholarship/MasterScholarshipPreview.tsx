import React, { FC } from "react";
import { MasterScholarship } from "../../src/API";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import GetStorageLinkComponent from "../get-storage-link-component";

type TScholarshipPreview = {
  scholarship: MasterScholarship;
  toggleShowContract?: () => void;
  toggleShowBankDetails?: () => void;
};

export const MastersScholarshipPreview: FC<TScholarshipPreview> = ({
  scholarship,
  toggleShowContract,
  toggleShowBankDetails,
}) => {
  const { t } = useTranslation("scholarships");
  const { locale } = useRouter();

  // const contractStatus = Boolean(scholarship?.signedContractDoc);
  // const bankDetailsStatus = Boolean(
  //   scholarship?.bankName && scholarship?.IBAN && scholarship?.IBANLetterDoc
  // );

  return (
    <div className="flex flex-col gap-4 p-4 mx-auto w-full max-w-3xl bg-white rounded-lg border sm:p-6 md:p-10">
      {scholarship.isConfirmed && (
        <div className="flex flex-col justify-center items-center p-6 rounded-md bg-stone-100">
          {/* Scholarship Confirmed */}
          <h2 className="text-2xl font-medium">{t("scholarshipConfirmed")}</h2>
          {/* Congratulations, your scholarship is now confirmed */}
          <p className="">{t("scholarshipConfirmedDescription")}</p>
        </div>
      )}
      <p className="text-xl font-semibold">{t("details")}</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <p className="font-medium">{t("cpr")}</p>
          <p className="text-sm whitespace-normal stat-desc">
            {scholarship.studentCPR}
          </p>
        </div>
        <div>
          <p className="font-medium">{t("issuedAt")}</p>
          {/* Submit Date */}
          <div className="text-sm whitespace-normal stat-desc">
            {Intl.DateTimeFormat(locale).format(
              new Date(scholarship.createdAt)
            )}
          </div>
        </div>
        <div>
          <p className="font-medium">{t("contractStatus")}</p>
          <p className="text-sm whitespace-normal stat-desc">
            {scholarship.signedContractDoc ? t("complete") : t("incomplete")}
          </p>
        </div>
        <div>
          <p className="font-medium">{t("bankDetails")}</p>
          <p className="text-sm whitespace-normal stat-desc">
            {scholarship.IBAN ? t("complete") : t("incomplete")}
          </p>
        </div>
        <div>
          <p className="font-medium">{t("gpa")}</p>
          <p className="text-sm whitespace-normal stat-desc">
            {scholarship.application?.gpa}
          </p>
        </div>
        <div>
          <p className="font-medium">{t("programChosen")}</p>
          <p className="text-sm whitespace-normal stat-desc">
            {locale == "ar"
              ? `${scholarship.application?.program}-${
                  scholarship.application?.university?.universityNameAr ?? "-"
                }`
              : `${scholarship.application?.program}-${
                  scholarship.application?.university?.universityName ?? "-"
                }`}
          </p>
        </div>
        {scholarship.IBAN && (
          <div>
            <p className="font-medium">{t("IBAN")}</p>
            <p className="px-2 py-1 text-sm text-center whitespace-normal rounded-md border stat-desc text-stone-600 w-fit bg-stone-50">
              {scholarship.IBAN}
            </p>
          </div>
        )}
        {scholarship.bankName && (
          <div>
            <p className="font-medium">{t("bankName")}</p>
            <p className="text-sm whitespace-normal stat-desc">
              {scholarship.bankName}
            </p>
          </div>
        )}
        {scholarship.signedContractDoc && (
          <div className="flex flex-wrap gap-2 justify-between items-center p-3 rounded-md border">
            <p className="font-medium">{t("signedContract")}</p>
            <div className="flex flex-col gap-1 justify-end">
              <GetStorageLinkComponent
                storageKey={scholarship.signedContractDoc}
              />
              {!scholarship.isConfirmed && (
                <div
                  onClick={toggleShowContract}
                  className="btn btn-sm btn-ghost"
                >
                  {t("edit")}
                </div>
              )}
            </div>
          </div>
        )}
        {scholarship.IBANLetterDoc && (
          <div className="flex flex-wrap gap-2 justify-between items-center p-3 rounded-md border">
            <p className="font-medium">{t("IBANLetterDoc")}</p>
            <div className="flex flex-col gap-1 justify-end">
              <GetStorageLinkComponent storageKey={scholarship.IBANLetterDoc} />
              {!scholarship.isConfirmed && (
                <div
                  onClick={toggleShowBankDetails}
                  className="btn btn-sm btn-ghost"
                >
                  {t("edit")}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
