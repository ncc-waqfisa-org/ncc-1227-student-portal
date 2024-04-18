import { withSSRContext } from "aws-amplify";
import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { PageComponent } from "../../components/PageComponent";
import { Application, Status, Student } from "../../src/API";
import ViewApplication from "../../components/applications/ViewApplication";
import { CognitoUser } from "@aws-amplify/auth";
import { ApplicationForm } from "../../components/applications/ApplicationForm";
import { getApplicationData, listAllPrograms } from "../../src/CustomAPI";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../contexts/AppContexts";
import GetStorageLinkComponent from "../../components/get-storage-link-component";
import Link from "next/link";

interface Props {
  application: Application | null;
  programs: any;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { Auth } = withSSRContext(ctx);
  const { locale } = ctx;

  try {
    let authUser = (await Auth.currentAuthenticatedUser()) as
      | CognitoUser
      | undefined;

    const { id } = ctx.query;

    let application = await getApplicationData(`${id}`);

    const programs = await listAllPrograms();

    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", [
          "common",
          "footer",
          "pageTitles",
          "applicationPage",
          "signIn",
          "account",
          "errors",
        ])),
        application:
          authUser?.getUsername() === application?.studentCPR && application,
        programs: programs,
      },
    };
  } catch (error) {
    console.log("🚀 ~ getServerSideProps:GetServerSideProps= ~ error:", error);
    return {
      props: {
        ...(await serverSideTranslations(locale ?? "en", [
          "common",
          "footer",
          "pageTitles",
          "applicationPage",
          "signIn",
          "account",
          "errors",
        ])),
        application: null,
        programs: [],
      },
    };
  }
};

export default function SingleApplicationPage({
  application,
  programs,
}: Props) {
  const { t } = useTranslation("applicationPage");

  const [isEdit, setIsEdit] = useState(false);

  const { student: studentData, editingApplicationsEnabled } = useAppContext();

  const student = studentData?.getStudent as Student;

  return (
    <PageComponent title={"Application"} authRequired>
      <div className="max-w-3xl mx-auto">
        {(application?.status === Status.REVIEW ||
          application?.status === Status.NOT_COMPLETED ||
          application?.status === Status.ELIGIBLE) &&
          editingApplicationsEnabled && (
            <div className="flex justify-end mb-3 ">
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
      <div className="max-w-3xl mx-auto">
        {application && !isEdit && (
          <ViewApplication application={application} />
        )}
      </div>

      <div className="max-w-3xl mx-auto">
        {application && isEdit && editingApplicationsEnabled && (
          <ApplicationForm application={application} programs={programs} />
        )}
      </div>

      <div className="max-w-3xl mx-auto">
        {application && student && (
          <AccountDocs student={student}></AccountDocs>
        )}
      </div>

      {!application && (
        <div className="flex flex-col items-center justify-center">
          <div className="prose">
            <h1 className="text-error">{t("accessDenied")}</h1>
          </div>
        </div>
      )}
    </PageComponent>
  );
}

interface AccountDocs {
  student: Student;
}

function AccountDocs({ student }: AccountDocs) {
  const { t } = useTranslation("account");
  return (
    <div className="w-full">
      <div className="container flex flex-col items-end gap-3 mt-8">
        <div className="flex items-center justify-between w-full">
          <p className="w-full text-xl stat-value">{t("accountTitle")}</p>
          <Link
            className="btn btn-primary btn-sm btn-outline w-fit"
            href={"/account"}
          >
            {t("editAccount")}
          </Link>
        </div>
        <div className="w-full overflow-x-scroll">
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
                <td>{t("familyIncomeProofDocs")}</td>
                <td className="">
                  <div className="">
                    {(student.familyIncomeProofDocs ?? [])?.length > 0 && (
                      <div className="flex flex-col p-3 mb-3 bg-gray-200 rounded-lg">
                        <div className="flex items-center gap-2">
                          {student.familyIncomeProofDocs?.map((doc, index) => (
                            <div key={index} className="overflow-x-scroll">
                              <GetStorageLinkComponent
                                storageKey={doc}
                                showName
                              ></GetStorageLinkComponent>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
