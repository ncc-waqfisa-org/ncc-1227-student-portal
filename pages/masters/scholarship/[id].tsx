import { GetServerSideProps } from "next";
import React, { useEffect, useMemo, useState } from "react";
import { PageComponent } from "../../../components/PageComponent";
import { MasterScholarship } from "../../../src/API";
import { getMasterScholarship } from "../../../src/CustomAPI";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/use-auth";
import { Skeleton } from "../../../components/Skeleton";
import { MastersScholarshipPreview } from "../../../components/scholarship/MasterScholarshipPreview";
import { MastersContract } from "../../../components/scholarship/MastersContract";
import { MastersBankDetails } from "../../../components/scholarship/MastersBankDetails";

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

export default function MastersScholarshipPage({ scholarshipId }: Props) {
  const { t } = useTranslation("scholarships");
  const { cpr } = useAuth();

  const { data: scholarship, isPending: isScholarshipPending } =
    useQuery<MasterScholarship | null>({
      queryKey: [`masters/scholarships/${scholarshipId}`],
      queryFn: () =>
        scholarshipId ? getMasterScholarship({ id: scholarshipId }) : null,
      select: (data) => {
        return cpr === data?.studentCPR ? data : null;
      },
    });

  const [showContract, setShowContract] = useState(false);
  const [showBankDetails, setShowBankDetails] = useState(false);

  const showBankDetailsDefault = useMemo(
    () =>
      Boolean(scholarship?.signedContractDoc) &&
      !Boolean(
        scholarship?.bankName && scholarship?.IBAN && scholarship?.IBANLetterDoc
      ),
    [scholarship]
  );
  const showContractDefault = useMemo(
    () => !Boolean(scholarship?.signedContractDoc),
    [scholarship]
  );

  useEffect(() => {
    setShowContract(showContractDefault);
    setShowBankDetails(showBankDetailsDefault);
    return () => {};
  }, [showContractDefault, showBankDetailsDefault]);

  if (isScholarshipPending) {
    return (
      <PageComponent title={"MScholarships"} authRequired>
        <Skeleton className="w-full max-w-3xl h-96 rounded-md bg-slate-200" />
      </PageComponent>
    );
  }

  if (!scholarship) {
    return (
      <PageComponent title={"MScholarships"} authRequired>
        <div>
          <p>{t("notFound")}</p>
        </div>
      </PageComponent>
    );
  }

  return (
    <PageComponent title={"MScholarships"} authRequired>
      {scholarship && !isScholarshipPending && (
        <div className="flex flex-col gap-10 py-8">
          <MastersScholarshipPreview
            scholarship={scholarship}
            toggleShowContract={() => {
              setShowContract(!showContract);
              setShowBankDetails(
                showBankDetailsDefault ? !showBankDetails : false
              );
            }}
            toggleShowBankDetails={() => {
              setShowBankDetails(!showBankDetails);
              setShowContract(showBankDetailsDefault ? !showContract : false);
            }}
          />
          <div>
            {showContract && <MastersContract scholarship={scholarship} />}
            {showBankDetails && (
              <MastersBankDetails scholarship={scholarship} />
            )}
          </div>
        </div>
      )}
    </PageComponent>
  );
}
