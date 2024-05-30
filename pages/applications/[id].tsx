import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { PageComponent } from "../../components/PageComponent";
import { Application, Program, Status, Student } from "../../src/API";
import ViewApplication from "../../components/applications/ViewApplication";
import { ApplicationForm } from "../../components/applications/ApplicationForm";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../contexts/AppContexts";
import GetStorageLinkComponent from "../../components/get-storage-link-component";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../hooks/use-auth";

interface Props {
  id: string | null;
  // application: Application | null;
  // programs: any;
  // haveScholarship: boolean;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // const { Auth } = withSSRContext(ctx);
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

export default function SingleApplicationPage({ id }: Props) {
  const { t } = useTranslation("applicationPage");
  const [isEdit, setIsEdit] = useState(false);
  const { student: studentData, editingApplicationsEnabled } = useAppContext();
  const student = studentData?.getStudent as Student;

  const { token } = useAuth();
  // const [isPending, setIsPending] = useState(false);
  // const [data, setData] = useState<{
  //   application: Application | null;
  //   programs: Program[];
  //   haveScholarship: boolean;
  // }>({
  //   application: null,
  //   programs: [],
  //   haveScholarship: false,
  // });

  const { data, isPending } = useQuery<{
    application: Application | null;
    programs: Program[];
    haveScholarship: boolean;
  }>({
    queryKey: ["applicationData", token, id],
    queryFn: () =>
      fetch(`/api/get-student-application`, {
        method: "POST",
        body: JSON.stringify({
          id: id,
          token: token,
        }),
      }).then((resData) => resData.json()),
  });

  // useEffect(() => {
  //   if (id && token) {
  //     fetchData();
  //   }
  //   async function fetchData() {
  //     setIsPending(true);
  //     await fetch(`/api/get-student-application?id=${id}&token=${token}`)
  //       .then((resData) => resData.json())
  //       .then((d) => {
  //         setData(d);
  //       })
  //       .finally(() => setIsPending(false));
  //   }

  //   return () => {};
  // }, [id, token]);

  if (isPending) {
    return (
      <PageComponent title={"Application"} authRequired>
        <div className="flex flex-col items-center justify-center">
          <p className="flex items-center gap-2">
            <span className="loading"></span>
            {t("loading")}
          </p>
        </div>
      </PageComponent>
    );
  }

  return (
    <PageComponent title={"Application"} authRequired>
      <div className="max-w-3xl mx-auto">
        {(data?.application?.status === Status.REVIEW ||
          data?.application?.status === Status.NOT_COMPLETED ||
          data?.application?.status === Status.ELIGIBLE) &&
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
        {data?.application && !isEdit && (
          <ViewApplication
            application={data?.application}
            haveScholarship={data?.haveScholarship ?? false}
          />
        )}
      </div>

      <div className="max-w-3xl mx-auto">
        {data?.application && isEdit && editingApplicationsEnabled && (
          <ApplicationForm
            application={data?.application}
            programs={data?.programs}
          />
        )}
      </div>

      <div className="max-w-3xl mx-auto">
        {data?.application && student && (
          <AccountDocs student={student}></AccountDocs>
        )}
      </div>

      {!data?.application && (
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
