import "yup-phone";
import React, { useState } from "react";
import { API, Auth } from "aws-amplify";

import * as mutations from "../../src/graphql/mutations";

import {
  CreateParentInfoMutation,
  CreateParentInfoMutationVariables,
  CreateStudentMutation,
  CreateStudentMutationVariables,
  DeleteParentInfoMutation,
  DeleteParentInfoMutationVariables,
  DeleteStudentMutation,
  DeleteStudentMutationVariables,
} from "../../src/API";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { SignUpParams } from "@aws-amplify/auth";
import { ISignUpResult } from "amazon-cognito-identity-js";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/use-auth";
import { useRouter } from "next/router";
import { CreateStudentForm } from "./create-student-form";
import { CreateParentsForm } from "./create-parents-form";
import { TermsAndConditions } from "./t-and-c";
import { useTranslation } from "react-i18next";
import { DocType, uploadFile } from "../../src/CustomAPI";

import { bugsnagClient } from "../../src/bugsnag";

export interface CreateStudentFormValues {
  student: CreateStudentMutationVariables;
  parentInfo: CreateParentInfoMutationVariables;
  password: string;
  familyIncomeProofDocsFile: File[];
  cprDoc: File | undefined;
}

export default function SignUpForm() {
  const auth = useAuth();
  const router = useRouter();
  const { t } = useTranslation("signUp");
  const [steps, setSteps] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues: CreateStudentFormValues = {
    student: {
      input: {
        cpr: "",
        cprDoc: undefined,
        fullName: undefined,
        email: undefined,
        phone: "+973",
        gender: undefined,
        address: undefined,
        schoolName: undefined,
        schoolType: undefined,
        specialization: undefined,
        placeOfBirth: undefined,
        studentOrderAmongSiblings: undefined,
        householdIncome: undefined,
        preferredLanguage: undefined,
        graduationDate: undefined,
        parentInfoID: undefined,
        _version: undefined,
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

  async function createDatabaseParentInfo(
    values: CreateStudentFormValues
  ): Promise<GraphQLResult<CreateParentInfoMutation> | null> {
    let mutationInput: CreateParentInfoMutationVariables = values.parentInfo;

    try {
      const res: GraphQLResult<CreateParentInfoMutation> = (await API.graphql({
        query: mutations.createParentInfo,
        variables: mutationInput,
      })) as GraphQLResult<CreateParentInfoMutation>;

      return res;
    } catch (error) {
      bugsnagClient.notify(error as any);
      console.log("createDatabaseParentInfo => error", error);
      return null;
    }
  }

  async function createDatabaseStudent(
    values: CreateStudentFormValues
  ): Promise<GraphQLResult<CreateStudentMutation> | null> {
    let mutationInput: CreateStudentMutationVariables = values.student;

    try {
      const res: GraphQLResult<CreateStudentMutation> = (await API.graphql({
        query: mutations.createStudent,
        variables: mutationInput,
      })) as GraphQLResult<CreateStudentMutation>;

      return res;
    } catch (error) {
      bugsnagClient.notify(error as any);
      console.log("createDatabaseStudent => error", error);
      return null;
    }
  }

  async function createCognitoUser(
    values: CreateStudentFormValues
  ): Promise<ISignUpResult | null> {
    try {
      const signUpPrams: SignUpParams = {
        username: values.student.input.cpr,
        password: values.password,
        attributes: {
          email: values.student.input.email,
          // ! this cause problem when sign up with invalid format
          // phone_number: values.student.input.phone,
        },
      };
      const signUpResult = await Auth.signUp(signUpPrams);

      return signUpResult;
    } catch (error) {
      bugsnagClient.notify(error as any);
      console.log("createCognitoUser => error", error);
      return null;
    }
  }

  async function deleteParentInfo(createdParentInfo: CreateParentInfoMutation) {
    let mutationInputs: DeleteParentInfoMutationVariables = {
      input: {
        id: `${createdParentInfo.createParentInfo?.id}`,
        _version: createdParentInfo.createParentInfo?._version,
      },
    };

    try {
      let res = (await API.graphql({
        query: mutations.deleteParentInfo,
        variables: mutationInputs,
      })) as GraphQLResult<DeleteParentInfoMutation>;

      return res;
    } catch (error) {
      bugsnagClient.notify(error as any);
      console.log("SignUpForm => deleteParentInfo => error", error);
      return null;
    }
  }

  async function deleteCreatedUser(createdDatabaseUser: CreateStudentMutation) {
    let mutationInputs: DeleteStudentMutationVariables = {
      input: {
        cpr: `${createdDatabaseUser.createStudent?.cpr}`,
        _version: createdDatabaseUser.createStudent?._version,
      },
    };

    try {
      let res = (await API.graphql({
        query: mutations.deleteStudent,
        variables: mutationInputs,
      })) as GraphQLResult<DeleteStudentMutation>;

      return res;
    } catch (error) {
      bugsnagClient.notify(error as any);
      console.log("SignUpForm => deleteCreatedUser => error", error);
      return null;
    }
  }

  async function signUpProcess(data: CreateStudentFormValues) {
    let userAlreadyExists = await auth.checkIfCprExist(
      createStudentFormValues.student.input.cpr.trim()
    );

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const createdParentInfo = await createDatabaseParentInfo(data);

    if (createdParentInfo?.data == null) {
      throw new Error("Error creating the user");
    }
    if (data.cprDoc == undefined) {
      throw new Error("CprDoc is missing");
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
          householdIncome: data.student.input.householdIncome,
          preferredLanguage: data.student.input.preferredLanguage,
          graduationDate: data.student.input.graduationDate,
          address: data.student.input.address,
          parentInfoID: createdParentInfo?.data?.createParentInfo?.id,
          familyIncome: data.student.input.familyIncome,
          familyIncomeProofDocs: storageKeys,
          nationality: data.student.input.nationality,
          _version: data.student.input._version,
        },
        condition: data.student.condition,
      },
      parentInfo: data.parentInfo,
      password: data.password,
      familyIncomeProofDocsFile: data.familyIncomeProofDocsFile,
      cprDoc: data.cprDoc,
    };

    setCreateStudentFormValues(temp);

    const createdDatabaseUser = await createDatabaseStudent(temp);

    if (createdDatabaseUser?.data == null) {
      await deleteParentInfo(createdParentInfo.data);
      throw new Error("Error creating the user");
    }

    const createCognitoUserResult = await createCognitoUser(temp);

    if (createCognitoUserResult?.user) {
      router.push({
        pathname: "/signUp",
        query: { cpr: createStudentFormValues.student.input.cpr },
      });
      toast("email need to be verified");
    } else {
      await deleteCreatedUser(createdDatabaseUser.data);
      throw new Error("Error creating the user");
    }
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
          isLoading={isLoading}
          submitTitle={t("register")}
          onFormSubmit={async () => {
            setIsLoading(true);
            await toast
              .promise(
                signUpProcess(createStudentFormValues)
                  .then((val) => val)
                  .catch((error) => {
                    bugsnagClient.notify(error);
                    throw error;
                  }),
                {
                  loading: "Creating your account...",
                  success: "Account created successfully",
                  error: (err) => {
                    return `${err}`;
                  },
                }
              )
              .finally(() => {
                setIsLoading(false);
              });
          }}
        ></TermsAndConditions>
      )}
    </div>
  );
}
