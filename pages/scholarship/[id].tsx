import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import { PageComponent } from "../../components/PageComponent";
import { Scholarship } from "../../src/API";
import { getScholarship } from "../../src/CustomAPI";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { Contract } from "../../components/scholarship/Contract";
import { ScholarshipPreview } from "../../components/scholarship/ScholarshipPreview";
import { BankDetails } from "../../components/scholarship/BankDetails";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/use-auth";
import { Skeleton } from "../../components/Skeleton";

interface Props {
  scholarshipId: string | null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  const { id } = ctx.query;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "common",
        "toast",
        "footer",
        "pageTitles",
        "applicationPage",
        "scholarships",
        "signIn",
        "account",
        "errors",
      ])),
      scholarshipId: id,
    },
  };
};

export default function ScholarshipPage({ scholarshipId }: Props) {
  const { t } = useTranslation("scholarships");
  const { cpr } = useAuth();

  const { data: scholarship, isPending: isScholarshipPending } =
    useQuery<Scholarship | null>({
      queryKey: [`scholarships/${scholarshipId}`],
      queryFn: () => (scholarshipId ? getScholarship(scholarshipId) : null),
      select: (data) => {
        return cpr === data?.studentCPR ? data : null;
      },
    });

  const [showContract, setShowContract] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);

  useEffect(() => {
    setShowContract(!Boolean(scholarship?.signedContractDoc));
    setShowBankDetails(
      Boolean(scholarship?.signedContractDoc) &&
        !Boolean(
          scholarship?.bankName &&
            scholarship?.IBAN &&
            scholarship?.IBANLetterDoc
        )
    );
    return () => {};
  }, [scholarship]);

  if (isScholarshipPending) {
    return (
      <PageComponent title={"Scholarships"} authRequired>
        <Skeleton className="bg-slate-200 rounded-md w-full max-w-3xl h-96" />
      </PageComponent>
    );
  }

  if (!scholarship) {
    return (
      <PageComponent title={"Scholarships"} authRequired>
        <div>
          <p>{t("notFound")}</p>
        </div>
      </PageComponent>
    );
  }

  return (
    <PageComponent title={"Scholarships"} authRequired>
      {scholarship && !isScholarshipPending && (
        <div className="flex flex-col gap-10">
          <ScholarshipPreview
            scholarship={scholarship}
            toggleShowContract={() => {
              setShowContract(!showContract);
              setShowBankDetails(false);
            }}
            toggleShowBankDetails={() => {
              setShowBankDetails(!showBankDetails);
              setShowContract(false);
            }}
          />
          <div>
            {showContract && <Contract scholarship={scholarship} />}
            {showBankDetails && <BankDetails scholarship={scholarship} />}
          </div>
        </div>
      )}
    </PageComponent>
  );
}
