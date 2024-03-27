import React, { FC } from "react";
import { Scholarship } from "../../src/API";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import GetStorageLinkComponent from "../get-storage-link-component";

type TScholarshipPreview = {
  scholarship: Scholarship;
  toggleShowContract?: () => void;
  toggleShowBankDetails?: () => void;
};

export const ScholarshipPreview: FC<TScholarshipPreview> = ({
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
    <div className="flex flex-col w-full max-w-3xl gap-4 p-4 mx-auto bg-white border rounded-lg sm:p-6 md:p-10">
      {scholarship.isConfirmed && (
        <div className="flex flex-col items-center justify-center p-6 rounded-md bg-stone-100">
          {/* Scholarship Confirmed */}
          <h2 className="text-2xl font-medium">{t("scholarshipConfirmed")}</h2>
          {/* Congratulations, your scholarship is now confirmed */}
          <p className="">{t("scholarshipConfirmedDescription")}</p>
        </div>
      )}
      <p className="text-xl font-semibold ">{t("details")}</p>
      <div className="grid gap-4 sm:grid-cols-2 ">
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
              ? `${
                  scholarship.application?.programs?.items[0]?.program
                    ?.nameAr ?? "-"
                }-${
                  scholarship.application?.programs?.items[0]?.program
                    ?.university?.nameAr ?? "-"
                }`
              : `${scholarship.application?.programs?.items[0]?.program?.name}-${scholarship.application?.programs?.items[0]?.program?.university?.name}`}
          </p>
        </div>
        {scholarship.IBAN && (
          <div>
            <p className="font-medium">{t("IBAN")}</p>
            <p className="px-2 py-1 text-sm text-center whitespace-normal border rounded-md stat-desc text-stone-600 w-fit bg-stone-50">
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
          <div className="flex flex-wrap gap-2 items-center justify-between p-3 border rounded-md">
            <p className="font-medium">{t("signedContract")}</p>
            <div className="flex justify-end flex-col gap-1">
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
          <div className="flex flex-wrap gap-2 items-center justify-between p-3 border rounded-md">
            <p className="font-medium">{t("IBANLetterDoc")}</p>
            <div className="flex justify-end flex-col gap-1">
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
