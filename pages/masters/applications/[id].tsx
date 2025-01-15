import { GetServerSideProps } from "next";
import React, { ReactElement, useState } from "react";
import { PageComponent } from "../../../components/PageComponent";
import {
  Application,
  Batch,
  MasterApplication,
  MasterBatch,
  MasterAppliedUniversities,
  Program,
  Status,
  Student,
} from "../../../src/API";
import ViewApplication from "../../../components/applications/ViewApplication";
import { ApplicationForm } from "../../../components/applications/ApplicationForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import GetStorageLinkComponent from "../../../components/get-storage-link-component";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/use-auth";
import dayjs from "dayjs";
import { NextPageWithLayout } from "../../_app";
import { useAppContext } from "../../../contexts/AppContexts";
import {
  MastersProvider,
  useMastersContext,
} from "../../../contexts/MastersContexts";
import { MastersApplicationForm } from "../../../components/applications/MastersApplicationForm";
import ViewMasterApplication from "../../../components/applications/ViewMasterApplication";
import { stringify } from "querystring";

interface Props {
  id: string | null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { locale } = ctx;

  try {
    const { id } = ctx.query;

    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", [
          "common",
          "toast",
          "footer",
          "pageTitles",
          "applicationPage",
          "signIn",
          "account",
          "errors",
        ])),
        id,
      },
    };
  } catch (error) {
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", [
          "common",
          "toast",
          "footer",
          "pageTitles",
          "applicationPage",
          "signIn",
          "account",
          "errors",
        ])),
        id: null,
      },
    };
  }
};

const Page: NextPageWithLayout<Props> = ({ id }) => {
  const { t } = useTranslation("applicationPage");
  const [isEdit, setIsEdit] = useState(false);
  const { student: studentData } = useAppContext();

  const { editingApplicationsEnabled, batch } = useMastersContext();
  const student = studentData?.getStudent as Student;

  const { token } = useAuth();

  const { data, isPending } = useQuery<{
    application: MasterApplication | null;
    universities: MasterAppliedUniversities[];
    haveScholarship: boolean;
  }>({
    queryKey: ["masterApplicationData", token, id],
    queryFn: () =>
      fetch(`/api/get-masters-application`, {
        method: "POST",
        body: JSON.stringify({
          id: id,
          token: token,
        }),
      }).then((resData) => resData.json()),
  });

  if (isPending) {
    return (
      <PageComponent title={"MApplication"} authRequired>
        <div className="flex flex-col justify-center items-center">
          <p className="flex gap-2 items-center">
            <span className="loading"></span>
            {t("loading")}
          </p>
        </div>
      </PageComponent>
    );
  }

  return (
    <PageComponent title={"MApplication"} authRequired>
      <div className="mx-auto max-w-3xl my-3">
        {(data?.application?.status === Status.REVIEW ||
          data?.application?.status === Status.NOT_COMPLETED ||
          data?.application?.status === Status.ELIGIBLE) &&
          (data?.application?.batch ?? -1) >= (batch?.batch ?? 0) &&
          editingApplicationsEnabled && (
            <div className="flex justify-end mb-3">
              <button
                className="btn btn-sm btn-outline btn-primary"
                onClick={() => setIsEdit(!isEdit)}
                type="button"
              >
                {isEdit ? t("view") : t("edit")}
              </button>
            </div>
          )}
      </div>
      <div className="mx-auto max-w-3xl">
        {data?.application && !isEdit && (
          <ViewMasterApplication
            application={data?.application}
            haveScholarship={data?.haveScholarship ?? false}
          />
        )}
      </div>

      <div className="mx-auto max-w-3xl">
        {data?.application && batch && isEdit && editingApplicationsEnabled && (
          <MastersApplicationForm
            application={data?.application}
            universities={data?.universities}
          />
        )}
      </div>

      <div className="mx-auto max-w-3xl">
        {data?.application && student && (
          <AccountDocs student={student}></AccountDocs>
        )}
      </div>

      {!data?.application && (
        <div className="flex flex-col justify-center items-center">
          <div className="prose">
            <h1 className="text-error">{t("accessDenied")}</h1>
          </div>
        </div>
      )}
    </PageComponent>
  );
};

interface AccountDocs {
  student: Student;
}

function AccountDocs({ student }: AccountDocs) {
  const { t } = useTranslation("account");
  return (
    <div className="w-full">
      <div className="container flex flex-col gap-3 items-end mt-8">
        <div className="flex justify-between items-center w-full">
          <p className="w-full text-xl stat-value">{t("accountTitle")}</p>
          <Link
            className="btn btn-primary btn-sm btn-outline w-fit"
            href={"/account"}
          >
            {t("editAccount")}
          </Link>
        </div>
        <div className="overflow-x-scroll w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>{t("field")}</th>
                <th>{t("value")}</th>
              </tr>
            </thead>
            <tbody className="">
              <tr className="">
                <td>{t("studentCPR")}</td>
                <td className="label">
                  <GetStorageLinkComponent
                    storageKey={student.cprDoc}
                  ></GetStorageLinkComponent>
                </td>
              </tr>
              <tr className="">
                <td>{t("income")}</td>
                <td className="label">
                  <GetStorageLinkComponent
                    storageKey={student.m_income}
                  ></GetStorageLinkComponent>
                </td>
              </tr>
              <tr className="">
                <td>{t("guardianCprDoc")}</td>
                <td className="label">
                  <GetStorageLinkComponent
                    storageKey={student.m_guardianCPRDoc}
                  ></GetStorageLinkComponent>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <MastersProvider>{page}</MastersProvider>;
};

export default Page;
