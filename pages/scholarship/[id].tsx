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
import { Contract } from "../../components/scholarship/Contract";

interface Props {
  application: Application | null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { Auth } = withSSRContext(ctx);
  const { locale } = ctx;

  let authUser = (await Auth.currentAuthenticatedUser()) as
    | CognitoUser
    | undefined;

  const { id } = ctx.query;

  let application = await getApplicationData(`${id}`);

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
    },
  };
};

export default function ScholarshipPage({ application }: Props) {
  const { t } = useTranslation("applicationPage");

  const { student: studentData } = useAppContext();

  const student = studentData?.getStudent as Student;

  // TODO: Put later
  if (application?.status !== Status.APPROVED) {
    return (
      <PageComponent title={"Scholarship"} authRequired>
        <div>
          <p>This is not a Scholarship</p>
        </div>
      </PageComponent>
    );
  }

  return (
    <PageComponent title={"Scholarship"} authRequired>
      <div className="max-w-3xl mx-auto">
        {application && <ViewApplication application={application} />}
      </div>
      <Contract application={application} />
    </PageComponent>
  );
}
