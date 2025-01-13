import "yup-phone";
import React, { useState } from "react";

import {
  ApplicantType,
  CreateParentInfoMutationVariables,
  CreateStudentMutationVariables,
} from "../../src/API";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { CreateStudentForm } from "./create-student-form";
import { CreateParentsForm } from "./create-parents-form";
import { TermsAndConditions } from "./t-and-c";
import { useTranslation } from "react-i18next";
import { DocType, uploadFile } from "../../src/CustomAPI";

import { useMutation } from "@tanstack/react-query";

export interface CreateStudentFormValues {
  student: CreateStudentMutationVariables;
  parentInfo: CreateParentInfoMutationVariables;
  password: string;
  familyIncomeProofDocsFile: File[];
  cprDoc: File | undefined;
}

export default function BachelorSignUpForm() {
  const router = useRouter();
  const { t } = useTranslation("signUp");
  const { t: tToast } = useTranslation("toast");
  const [steps, setSteps] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: CreateStudentFormValues = {
    student: {
      input: {
        cpr: "",
        cprDoc: undefined,
        fullName: undefined,
        email: undefined,
        phone: undefined,
        gender: undefined,
        address: undefined,
        schoolName: undefined,
        schoolType: undefined,
        specialization: undefined,
        placeOfBirth: undefined,
        studentOrderAmongSiblings: undefined,
        preferredLanguage: undefined,
        graduationDate: undefined,
        parentInfoID: undefined,
        _version: undefined,
        m_applicantType: [ApplicantType.STUDENT],
        m_isEmployed: null,
      },
      condition: undefined,
    },
    parentInfo: {
      input: {
        id: undefined,
        guardianFullName: undefined,
        relation: undefined,
        guardianCPR: undefined,
        address: undefined,
        primaryMobile: "+973",
        secondaryMobile: "+973",
        fatherFullName: undefined,
        fatherCPR: undefined,
        motherFullName: undefined,
        motherCPR: undefined,
        numberOfFamilyMembers: undefined,
        _version: undefined,
      },
      condition: undefined,
    },
    password: "",
    familyIncomeProofDocsFile: [],
    cprDoc: undefined,
  };

  const [createStudentFormValues, setCreateStudentFormValues] =
    useState<CreateStudentFormValues>(initialValues);

  const signUpMutation = useMutation({
    mutationFn: (values: any) => {
      return fetch(
        process.env.LAMBDA_BACHELOR_SIGN_UP ??
          // `https://6tviwvcyjf3tousfqqxyoftige0ueqev.lambda-url.us-east-1.on.aws`,
          `https://ciuxdqxmol.execute-api.us-east-1.amazonaws.com/default/sign-up`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            ...(router.locale && { "Accept-Language": router.locale }),
            "Content-Type": "application/json",
          },
        }
      );
    },
    async onSuccess(data) {
      if (data.ok) {
        const { message } = await data.json();

        toast.success(message);

        router.push({
          pathname: "/verify-email",
          query: { cpr: createStudentFormValues.student.input.cpr },
        });
      } else {
        const { message } = await data.json();
        throw new Error(message);
      }
    },
    async onError(error) {
      throw new Error(error.message);
    },
  });

  async function signUpProcess(data: CreateStudentFormValues) {
    setIsLoading(true);

    if (data.cprDoc == undefined) {
      throw new Error(
        `CODE:00003 ${
          tToast("cprDocumentIsMissing") ?? "Cpr document is missing"
        }`
      );
    }

    const cprDocStorage = await uploadFile(
      data.cprDoc,
      DocType.CPR,
      data.student.input.cpr
    );

    const storageKeys = await Promise.all([
      ...data.familyIncomeProofDocsFile.map((f, index) =>
        uploadFile(
          f,
          DocType.FAMILY_INCOME_PROOF,
          data.student.input.cpr,
          index
        )
      ),
    ]);

    let temp: CreateStudentFormValues = {
      student: {
        input: {
          cpr: data.student.input.cpr,
          cprDoc: cprDocStorage,
          fullName: data.student.input.fullName,
          email: data.student.input.email,
          phone: data.student.input.phone,
          gender: data.student.input.gender,
          schoolName: data.student.input.schoolName,
          schoolType: data.student.input.schoolType,
          specialization: data.student.input.specialization,
          placeOfBirth: data.student.input.placeOfBirth,
          studentOrderAmongSiblings:
            data.student.input.studentOrderAmongSiblings,
          preferredLanguage: data.student.input.preferredLanguage,
          graduationDate: data.student.input.graduationDate,
          address: data.student.input.address,
          parentInfoID: data.student.input.parentInfoID,
          familyIncome: data.student.input.familyIncome,
          familyIncomeProofDocs: storageKeys,
          nationality: data.student.input.nationality,
          nationalityCategory: data.student.input.nationalityCategory,
          _version: data.student.input._version,
          m_applicantType: data.student.input.m_applicantType,
          m_isEmployed: null,
        },
        condition: data.student.condition,
      },
      parentInfo: data.parentInfo,
      password: data.password,
      familyIncomeProofDocsFile: data.familyIncomeProofDocsFile,
      cprDoc: data.cprDoc,
    };

    const dataToLambda = {
      student: {
        input: {
          cpr: data.student.input.cpr,
          cprDoc: cprDocStorage,
          fullName: data.student.input.fullName,
          email: data.student.input.email,
          phone: data.student.input.phone,
          gender: data.student.input.gender,
          schoolName: data.student.input.schoolName,
          schoolType: data.student.input.schoolType,
          specialization: data.student.input.specialization,
          placeOfBirth: data.student.input.placeOfBirth,
          studentOrderAmongSiblings:
            data.student.input.studentOrderAmongSiblings,
          preferredLanguage: data.student.input.preferredLanguage,
          graduationDate: data.student.input.graduationDate,
          address: data.student.input.address,
          familyIncome: data.student.input.familyIncome,
          familyIncomeProofDocs: storageKeys,
          nationality: data.student.input.nationality,
          nationalityCategory: data.student.input.nationalityCategory,
        },
      },
      parentInfo: { input: data.parentInfo.input },
      password: data.password,
    };

    setCreateStudentFormValues(temp);

    //* Call Sign up lambda
    await signUpMutation.mutateAsync(dataToLambda);
  }

  return (
    <div className="flex flex-col items-center">
      <ul dir="ltr" className="mb-6 steps">
        <li
          onClick={() => steps > 1 && setSteps(1)}
          className={`step mr-6  ${steps >= 1 && "step-primary "} ${
            steps > 1 && " cursor-pointer"
          }`}
        >
          {t("studentInfo")}
        </li>

        <li
          onClick={() => steps > 2 && setSteps(2)}
          className={`step  ${steps >= 2 && "step-primary"} ${
            steps > 2 && " cursor-pointer"
          }`}
        >
          {t("parentsInfo")}
        </li>
        <li
          onClick={() => steps > 3 && setSteps(3)}
          className={`step  ${steps >= 3 && "step-primary"} ${
            steps > 3 && " cursor-pointer"
          }`}
        >
          {t("termsAndConditions")}
        </li>
      </ul>
      {steps === 1 && (
        <CreateStudentForm
          student={createStudentFormValues.student}
          password={createStudentFormValues.password}
          submitTitle={t("nextStep")}
          onFormSubmit={(values) => {
            let temp: CreateStudentFormValues = {
              student: values.student,
              parentInfo: createStudentFormValues.parentInfo,
              password: values.password,
              familyIncomeProofDocsFile: values.familyIncomeProofDocsFile,
              cprDoc: values.cprDoc,
            };

            setCreateStudentFormValues(temp);
            setSteps(2);
          }}
        ></CreateStudentForm>
      )}
      {steps === 2 && (
        <CreateParentsForm
          parentInfo={createStudentFormValues.parentInfo}
          isLoading={isLoading}
          submitTitle={t("nextStep")}
          onFormSubmit={async (values) => {
            let temp: CreateStudentFormValues = {
              student: createStudentFormValues.student,
              parentInfo: values,
              password: createStudentFormValues.password,
              cprDoc: createStudentFormValues.cprDoc,
              familyIncomeProofDocsFile:
                createStudentFormValues.familyIncomeProofDocsFile,
            };

            setCreateStudentFormValues(temp);
            setSteps(3);
          }}
        ></CreateParentsForm>
      )}
      {steps === 3 && (
        <TermsAndConditions
          isLoading={signUpMutation.isPending || isLoading}
          submitTitle={t("register")}
          onFormSubmit={() =>
            toast.promise(
              signUpProcess(createStudentFormValues).finally(() =>
                setIsLoading(false)
              ),
              {
                loading: t("processing"),
                success: t("processComplete"),
                error: (error) => `${error.message}`,
              }
            )
          }
        ></TermsAndConditions>
      )}
    </div>
  );
}
