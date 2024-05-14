import { Formik, Form, Field, FormikHelpers } from "formik";
import { FC, useState } from "react";
import * as yup from "yup";
import { useAppContext } from "../../contexts/AppContexts";
import { useAuth } from "../../hooks/use-auth";

import {
  Application,
  CreateApplicationMutationVariables,
  CreateAttachmentMutationVariables,
  CreateProgramChoiceMutationVariables,
  CreateStudentLogMutationVariables,
  Program,
  Student,
  UpdateApplicationMutationVariables,
  UpdateAttachmentMutationVariables,
  UpdateProgramChoiceMutationVariables,
} from "../../src/API";
import { Status } from "../../src/models";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

import {
  createAttachmentInDB,
  createApplicationInDB,
  createProgramChoiceInDB,
  updateAttachmentInDB,
  updateApplicationInDB,
  updateProgramChoiceInDB,
  createStudentLogInDB,
  DocType,
  uploadFile,
} from "../../src/CustomAPI";
import {
  ApplicationSnapshotInput,
  allDocsAreAvailable,
  calculateScore,
  checkIfFilesAreTooBig,
  getStudentApplicationSnapshot,
} from "../../src/HelperFunctions";
import GetStorageLinkComponent from "../get-storage-link-component";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { cn } from "../../src/lib/utils";
import { Textarea } from "../Textarea";
import WordCounter from "../word-counter";

export interface CreateApplicationFormValues {
  application: CreateApplicationMutationVariables;
  primaryProgram: CreateProgramChoiceMutationVariables;
  attachment: CreateAttachmentMutationVariables;
  studentLog: CreateStudentLogMutationVariables;
}
export interface UpdateApplicationFormValues {
  application: UpdateApplicationMutationVariables;
  primaryProgram: UpdateProgramChoiceMutationVariables;
  attachment: UpdateAttachmentMutationVariables;
  studentLog: CreateStudentLogMutationVariables;
}

interface FormValues {
  gpa: number | undefined;
  primaryProgramID: string | undefined;
  schoolCertificate: File | undefined;
  transcriptDoc: File | undefined;
  primaryAcceptanceDoc: File | undefined;
  reason: string | undefined;
  reasonForUpdate?: string | undefined;
}

interface Props {
  application?: Application;
  programs?: Program[];
}

export const ApplicationForm: FC<Props> = (props) => {
  const { user } = useAuth();
  const { push, locale } = useRouter();
  const { student, syncStudentApplication, batch } = useAppContext();
  const { t } = useTranslation("applicationPage");
  const { t: tErrors } = useTranslation("errors");

  const studentData = student?.getStudent as Student;

  const applicationIsEligible = props.application?.status === Status.ELIGIBLE;

  const [primaryAcceptanceDoc, setPrimaryAcceptanceDoc] = useState<
    File | undefined
  >(undefined);

  const [schoolCertificate, setSchoolCertificate] = useState<File | undefined>(
    undefined
  );
  const [transcriptDoc, setTranscriptDoc] = useState<File | undefined>(
    undefined
  );

  const oldPrimaryProgram = props.application?.programs?.items.sort(
    (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
  )[0];

  const [primaryProgram, setPrimaryProgram] = useState<Program | undefined>(
    oldPrimaryProgram?.program ?? undefined
  );

  const [withdrawing, setWithdrawing] = useState(false);
  const initialValues: FormValues = {
    gpa: props.application?.gpa ?? undefined,
    reason: props.application?.reason ?? undefined,
    primaryProgramID: oldPrimaryProgram?.program?.id ?? undefined,
    schoolCertificate: undefined,
    transcriptDoc: undefined,
    primaryAcceptanceDoc: undefined,
    reasonForUpdate: undefined,
  };

  async function withdrawApplication(application: Application) {
    let tempApplicationVar: UpdateApplicationMutationVariables = {
      input: {
        id: application.id,
        status: Status.WITHDRAWN,
        _version: application._version,
      },
    };
    setWithdrawing(true);
    let res = await updateApplicationInDB(tempApplicationVar);
    if (res === undefined) {
      throw new Error("Failed to withdraw");
    }
    await syncStudentApplication();
    setWithdrawing(false);
    push("/applications/");
    return res;
  }

  /**
   * It creates an attachment in the database, then creates an application in the database, then
   * creates two program choices in the database
   * @param {CreateApplicationFormValues} data - CreateApplicationFormValues
   * @returns a promise that resolves to an array of two promises.
   */
  async function createApplicationProcess(data: CreateApplicationFormValues) {
    let createdAttachmentInDB = await createAttachmentInDB(data.attachment);

    if (createdAttachmentInDB === undefined) {
      toast.error("Failed to create application");
      return;
    }

    let tempApplicationVar: CreateApplicationMutationVariables = {
      input: {
        id: undefined,
        gpa: data.application.input.gpa,
        reason: data.application.input.reason,
        score: data.application.input.score,
        status: data.application.input.status,
        nationalityCategory: data.application.input.nationalityCategory,
        studentCPR: data.application.input.studentCPR,
        universityID: data.application.input.universityID,
        programID: data.application.input.programID,
        studentName: data.application.input.studentName,
        processed: data.application.input.processed,
        familyIncome: data.application.input.familyIncome,
        attachmentID: createdAttachmentInDB.createAttachment?.id,
        applicationAttachmentId: createdAttachmentInDB.createAttachment?.id,
        _version: undefined,
        dateTime: new Date().toISOString(),
        schoolType: student?.getStudent?.schoolType,
        schoolName: student?.getStudent?.schoolName,
        batch: dayjs().year(),
      },
    };

    let createdApplicationInDB = await createApplicationInDB(
      tempApplicationVar
    );

    if (createdApplicationInDB === undefined) {
      toast.error("Failed to create application");
      return;
    }

    let tempPrimaryProgramChoice: CreateProgramChoiceMutationVariables = {
      input: {
        id: undefined,
        _version: undefined,
        choiceOrder: data.primaryProgram.input.choiceOrder,
        acceptanceLetterDoc: data.primaryProgram.input.acceptanceLetterDoc,
        programID: data.primaryProgram.input.programID ?? "",
        programApplicationsId: data.primaryProgram.input.programID,
        applicationID: createdApplicationInDB.createApplication?.id ?? "",
        applicationProgramsId: createdApplicationInDB.createApplication?.id,
      },
    };

    await Promise.all([
      createProgramChoiceInDB(tempPrimaryProgramChoice),
      // createProgramChoiceInDB(tempSecondaryProgramChoice),
      createStudentLogInDB({
        input: {
          id: undefined,
          _version: undefined,
          applicationID: createdApplicationInDB.createApplication?.id ?? "",
          studentCPR: data.studentLog.input.studentCPR,
          dateTime: data.studentLog.input.dateTime,
          snapshot: data.studentLog.input.snapshot,
          reason: data.studentLog.input.reason,
          applicationStudentLogsId:
            createdApplicationInDB.createApplication?.id,
          studentStudentLogsCpr: data.studentLog.input.studentCPR,
        },
      }),
    ])
      .then(async (res) => {
        await syncStudentApplication();
        push("/applications");
      })
      .catch((err) => {
        console.log("Create program choice error", err);
        toast.error("Something went wrong");
      });
  }

  async function updateApplicationProcess(data: UpdateApplicationFormValues) {
    let updatedAttachmentInDB = await updateAttachmentInDB(data.attachment);

    if (updatedAttachmentInDB === undefined) {
      toast.error("Failed to update application");
      return;
    }

    let tempApplicationVar: UpdateApplicationMutationVariables = {
      input: {
        id: data.application.input.id,
        gpa: data.application.input.gpa,
        score: data.application.input.score,
        reason: data.application.input.reason,
        status: data.application.input.status,
        nationalityCategory: data.application.input.nationalityCategory,
        studentCPR: data.application.input.studentCPR,
        universityID: data.application.input.universityID,
        programID: data.application.input.programID,
        studentName: data.application.input.studentName,
        processed: data.application.input.processed,
        familyIncome: data.application.input.familyIncome,
        attachmentID: data.application.input.attachmentID,
        applicationAttachmentId: data.application.input.applicationAttachmentId,
        _version: data.application.input._version,
      },
    };

    let updatedApplicationInDB = await updateApplicationInDB(
      tempApplicationVar
    );

    if (updatedApplicationInDB === undefined) {
      toast.error("Failed to update application");
      return;
    }

    let tempPrimaryProgramChoice: UpdateProgramChoiceMutationVariables = {
      input: {
        id: data.primaryProgram.input.id,
        _version: data.primaryProgram.input._version,
        choiceOrder: data.primaryProgram.input.choiceOrder,
        acceptanceLetterDoc: data.primaryProgram.input.acceptanceLetterDoc,
        programID: data.primaryProgram.input.programID,
        programApplicationsId: data.primaryProgram.input.programApplicationsId,
        applicationID: data.primaryProgram.input.applicationID,
        applicationProgramsId: data.primaryProgram.input.applicationProgramsId,
      },
    };

    await Promise.all([
      updateProgramChoiceInDB(tempPrimaryProgramChoice),
      // updateProgramChoiceInDB(tempSecondaryProgramChoice),
      createStudentLogInDB(data.studentLog),
    ])
      .then(async (res) => {
        await syncStudentApplication();
        push("/applications");
      })
      .catch((err) => {
        console.log("Update program choice error", err);
        toast.error("Something went wrong");
      });
  }

  async function handleSubmit({
    values,
    actions,
  }: {
    values: FormValues;
    actions: FormikHelpers<FormValues>;
  }) {
    let checkStorageKeys: (string | null | undefined)[] = [
      props.application
        ? props.application.attachment?.schoolCertificate
        : undefined,
      props.application
        ? props.application.attachment?.transcriptDoc
        : undefined,
      oldPrimaryProgram?.acceptanceLetterDoc ?? undefined,
      // oldSecondaryProgram?.acceptanceLetterDoc ?? undefined,
    ];

    let storageKeys = await Promise.all([
      schoolCertificate &&
        uploadFile(
          schoolCertificate,
          DocType.SCHOOL_CERTIFICATE,
          `${student?.getStudent?.cpr}`
        ),
      transcriptDoc &&
        uploadFile(
          transcriptDoc,
          DocType.TRANSCRIPT,
          `${student?.getStudent?.cpr}`
        ),
      primaryAcceptanceDoc &&
        (await uploadFile(
          primaryAcceptanceDoc,
          DocType.PRIMARY_PROGRAM_ACCEPTANCE,
          `${student?.getStudent?.cpr}`
        )),
    ])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log("Upload error", error);
        throw error;
      });
    // let storageKeys = await toast.promise(
    //   Promise.all([
    //     schoolCertificate &&
    //       uploadFile(
    //         schoolCertificate,
    //         DocType.SCHOOL_CERTIFICATE,
    //         `${student?.getStudent?.cpr}`
    //       ),
    //     transcriptDoc &&
    //       uploadFile(
    //         transcriptDoc,
    //         DocType.TRANSCRIPT,
    //         `${student?.getStudent?.cpr}`
    //       ),
    //     primaryAcceptanceDoc &&
    //       (await uploadFile(
    //         primaryAcceptanceDoc,
    //         DocType.PRIMARY_PROGRAM_ACCEPTANCE,
    //         `${student?.getStudent?.cpr}`
    //       )),
    //   ])
    //     .then((res) => {
    //       return res;
    //     })
    //     .catch((error) => {
    //       console.log("Upload error", error);
    //       throw error;
    //     }),
    //   {
    //     loading: "Uploading documents...",
    //     success: "Documents uploaded successfully",
    //     error: "Uploading documents failed",
    //   }
    // );
    // School certificate doc storage key
    checkStorageKeys[0] =
      storageKeys?.[0] !== undefined ? storageKeys[0] : checkStorageKeys[0];
    // Transcript doc storage key
    checkStorageKeys[1] =
      storageKeys?.[1] !== undefined ? storageKeys[1] : checkStorageKeys[1];
    // Primary program acceptance letter doc storage key
    checkStorageKeys[2] =
      storageKeys?.[2] !== undefined ? storageKeys[2] : checkStorageKeys[2];

    const selectedPrimaryProgram = props.programs?.find(
      (p) => p.id === values.primaryProgramID
    );

    let newApplicationSnapshotInput: ApplicationSnapshotInput = {
      gpa: values.gpa,
      reason: values.reason,
      primaryProgram: {
        id: values.primaryProgramID,
        name: `${selectedPrimaryProgram?.name}-${selectedPrimaryProgram?.university?.name}`,
        acceptanceLetterDoc:
          storageKeys?.[2] ??
          oldPrimaryProgram?.acceptanceLetterDoc ??
          undefined,
      },
      attachments: {
        schoolCertificate: storageKeys?.[0] ?? undefined,
        transcript: storageKeys?.[1] ?? undefined,
      },
    };

    let oldApplicationSnapshotInput: ApplicationSnapshotInput | undefined =
      props.application
        ? {
            gpa: props.application.gpa ?? undefined,
            reason: props.application.reason ?? undefined,
            primaryProgram: {
              id: oldPrimaryProgram?.program?.id ?? undefined,
              name: `${oldPrimaryProgram?.program?.name}-${oldPrimaryProgram?.program?.university?.name}`,
              acceptanceLetterDoc:
                oldPrimaryProgram?.acceptanceLetterDoc ?? undefined,
            },
            attachments: {
              schoolCertificate:
                props.application?.attachment?.schoolCertificate ?? undefined,
              transcript:
                props.application?.attachment?.transcriptDoc ?? undefined,
            },
          }
        : undefined;

    const createValues: CreateApplicationFormValues = {
      application: {
        input: {
          id: undefined,
          gpa: values.gpa,
          reason: values.reason,
          score:
            studentData.familyIncome && values.gpa
              ? calculateScore({
                  familyIncome: studentData.familyIncome,
                  gpa: values.gpa,
                })
              : 0,
          batch: batch?.batch ?? 0,
          status: allDocsAreAvailable({
            isException: props.programs?.find(
              (program) => program.id === values.primaryProgramID
            )?.university?.isException,
            cpr: studentData.cprDoc,
            familyProofs: student?.getStudent?.familyIncomeProofDocs ?? [],
            transcript: checkStorageKeys[1],
            schoolCertificate: checkStorageKeys[0],
            primaryProgramAcceptanceLetter: checkStorageKeys[2],
            // secondaryProgramAcceptanceLetter: checkStorageKeys[3],
          })
            ? Status.REVIEW
            : Status.NOT_COMPLETED,
          studentCPR: `${student?.getStudent?.cpr}`,
          nationalityCategory: student?.getStudent?.nationalityCategory,
          universityID: props.programs?.find(
            (program) => program.id === values.primaryProgramID
          )?.university?.id,
          programID: values.primaryProgramID,
          processed: 0,
          familyIncome: student?.getStudent?.familyIncome,
          studentName: student?.getStudent?.fullName,
          _version: null,
          attachmentID: null,
          applicationAttachmentId: null,
          dateTime: new Date().toISOString(),
        },
        condition: undefined,
      },
      primaryProgram: {
        input: {
          id: undefined,
          applicationID: "",
          choiceOrder: 1,
          _version: undefined,
          programID: values.primaryProgramID ?? "",
          applicationProgramsId: values.primaryProgramID ?? "",
          programApplicationsId: undefined,
          acceptanceLetterDoc: storageKeys?.[2],
        },
        condition: undefined,
      },
      attachment: {
        input: {
          id: undefined,
          schoolCertificate: storageKeys?.[0],
          transcriptDoc: storageKeys?.[1],
          _version: undefined,
        },
        condition: undefined,
      },
      studentLog: {
        input: {
          id: undefined,
          applicationID: "",
          studentCPR: user?.getUsername() ?? "",
          dateTime: new Date().toISOString(),

          snapshot: getStudentApplicationSnapshot({
            newApplication: newApplicationSnapshotInput,
            oldApplication: oldApplicationSnapshotInput,
          }),

          reason: "Initial Submit",
          _version: undefined,
          applicationStudentLogsId: "",
        },
        condition: undefined,
      },
    };

    /* -------------------------------------------------------------------------- */
    /*                                   UPDATE                                   */
    /* -------------------------------------------------------------------------- */

    let updateValues: UpdateApplicationFormValues = {
      application: {
        input: {
          id: props.application?.id ?? "",
          gpa: values.gpa,
          reason: values.reason,
          score:
            studentData.familyIncome && values.gpa
              ? calculateScore({
                  familyIncome: studentData.familyIncome,
                  gpa: props.application?.verifiedGPA ?? values.gpa,
                  adminScore: props.application?.adminPoints ?? 0,
                })
              : 0,
          status: allDocsAreAvailable({
            isException: props.programs?.find(
              (program) => program.id === values.primaryProgramID
            )?.university?.isException,
            cpr: studentData.cprDoc,
            familyProofs: student?.getStudent?.familyIncomeProofDocs ?? [],
            transcript: checkStorageKeys[1],
            schoolCertificate: checkStorageKeys[0],
            primaryProgramAcceptanceLetter: checkStorageKeys[2],
          })
            ? applicationIsEligible
              ? props.application?.status
              : Status.REVIEW
            : Status.NOT_COMPLETED,

          studentCPR: `${student?.getStudent?.cpr}`,
          universityID:
            props.programs?.find(
              (program) => program.id === values.primaryProgramID
            )?.university?.id ?? props.application?.universityID,
          programID: values.primaryProgramID ?? props.application?.programID,
          processed: props.application?.processed ?? 0,
          familyIncome: student?.getStudent?.familyIncome,
          nationalityCategory: student?.getStudent?.nationalityCategory,
          studentName: student?.getStudent?.fullName,
          _version: props.application?._version,
          attachmentID: props.application?.attachmentID,
          applicationAttachmentId: props.application?.applicationAttachmentId,
        },
        condition: undefined,
      },
      primaryProgram: {
        input: {
          id:
            props.application?.programs?.items.sort(
              (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
            )[0]?.id ?? "",
          applicationID: props.application?.id ?? "",
          choiceOrder: 1,
          _version: props.application?.programs?.items.sort(
            (a, b) => (a?.choiceOrder ?? 0) - (b?.choiceOrder ?? 0)
          )[0]?._version,
          programID: values.primaryProgramID ?? "",
          applicationProgramsId: props.application?.id ?? "",
          programApplicationsId: values.primaryProgramID ?? "",
          acceptanceLetterDoc:
            storageKeys?.[2] ??
            (primaryProgram?.id === oldPrimaryProgram?.program?.id
              ? oldPrimaryProgram?.acceptanceLetterDoc
              : null) ??
            null,
        },
        condition: undefined,
      },
      attachment: {
        input: {
          id: props.application?.attachment?.id ?? "",
          schoolCertificate:
            storageKeys?.[0] ??
            props.application?.attachment?.schoolCertificate,
          transcriptDoc:
            storageKeys?.[1] ?? props.application?.attachment?.transcriptDoc,
          _version: props.application?.attachment?._version,
        },
        condition: undefined,
      },
      studentLog: {
        input: {
          id: undefined,
          applicationID: props.application?.id ?? "",
          studentCPR: user?.getUsername() ?? "",
          dateTime: new Date().toISOString(),

          snapshot: getStudentApplicationSnapshot({
            newApplication: newApplicationSnapshotInput,
            oldApplication: oldApplicationSnapshotInput,
          }),

          reason: values.reasonForUpdate,
          _version: undefined,
          applicationStudentLogsId: props.application?.id ?? "",
        },
        condition: undefined,
      },
    };

    {
      props.application
        ? await updateApplicationProcess(updateValues)
        : await createApplicationProcess(createValues);
      // props.application
      //   ? await toast.promise(updateApplicationProcess(updateValues), {
      //       loading: "Updating application...",
      //       success: "Application updated successfully",
      //       error: "Application update failed",
      //     })
      //   : await toast.promise(createApplicationProcess(createValues), {
      //       loading: "Creating application...",
      //       success: "Application created successfully",
      //       error: "Application creation failed",
      //     });
    }

    actions.setSubmitting(false);
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={
          props.application
            ? yup.object({
                gpa: yup
                  .number()
                  .min(88, `${tErrors("minimumGPA")} ${88}`)
                  .max(100, `${tErrors("maximumGPA")} ${100}`)
                  .required(`${tErrors("requiredField")}`),
                primaryProgramID: yup
                  .string()
                  .required(`${tErrors("requiredField")}`),
                reasonForUpdate: yup
                  .string()
                  .required(`${tErrors("requiredField")}`),
                reason: yup
                  .string()
                  .test(
                    "max100words",
                    (value) =>
                      (value || "").split(/\s+/).filter(Boolean).length <= 100
                  )
                  .required(`${tErrors("requiredField")}`),
              })
            : yup.object({
                gpa: yup
                  .number()
                  .min(88, `${tErrors("minimumGPA")} ${88}`)
                  .max(100, `${tErrors("maximumGPA")} ${100}`)
                  .required(`${tErrors("requiredField")}`),
                primaryProgramID: yup
                  .string()
                  .required(`${tErrors("requiredField")}`),
                schoolCertificate: yup.mixed(),
                transcriptDoc: yup.mixed(),
                primaryAcceptanceDoc: yup.mixed(),
                secondaryAcceptanceDoc: yup.mixed(),
                reason: yup
                  .string()
                  .required(`${tErrors("requiredField")}`)
                  .test(
                    "max100words",
                    (value) =>
                      (value || "").split(/\s+/).filter(Boolean).length <= 100
                  ),
              })
        }
        onSubmit={async (values, actions) => {
          await toast.promise(handleSubmit({ values, actions }), {
            loading: t("processing"),
            success: t("proccessComplete"),
            error: tErrors("somethingWentWrong"),
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          isValid,
          setFieldValue,
          setFieldError,
        }) => (
          <Form className="container grid max-w-3xl grid-cols-1 gap-3 mx-auto md:grid-cols-2 ">
            {/* FullName */}
            <div className="flex flex-col justify-start w-full">
              <label className="label">{t("fullName")}</label>
              <Field
                type="text"
                name="fullName"
                title="fullName"
                placeholder="Full name"
                className={`input input-bordered input-primary`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={student?.getStudent?.fullName}
                disabled
              />
            </div>
            {/* CPR */}
            <div className="flex flex-col justify-start w-full">
              <label className="label">{t("CPR")}</label>
              <Field
                dir="ltr"
                type="text"
                name="cpr"
                title="cpr"
                placeholder="CPR"
                className={`input input-bordered input-primary`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={user?.getUsername()}
                disabled
              />
            </div>
            <div className="divider md:col-span-2"></div>
            {/* GPA */}
            <div className="flex flex-col justify-start w-full md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="label">{t("studentGPA")}</label>
                <label className="label-text-alt text-error">
                  {errors.gpa && touched.gpa && errors.gpa}
                </label>
              </div>
              <Field
                dir="ltr"
                type="number"
                name="gpa"
                title="gpa"
                min={88}
                max={100}
                placeholder="GPA (88 - 100)"
                className={`input input-bordered input-primary ${
                  errors.gpa && touched.gpa && "input-error"
                }`}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.gpa ?? ""}
                disabled={applicationIsEligible}
              />
            </div>
            <div className="flex flex-col justify-start w-full md:col-span-2">
              <div className="flex items-center justify-between">
                <label className="label">{t("reason")}</label>
                <label className="label-text-alt text-error">
                  {errors.reason && touched.reason && errors.reason}
                </label>
              </div>
              <Textarea
                name="reason"
                title="reason"
                placeholder={t("reasonD") ?? ""}
                className={cn(
                  `input-bordered input-primary textarea min-h-[10rem] max-h-96`,
                  errors.reason && touched.reason && "input-error"
                )}
                onChange={(e) => setFieldValue("reason", e.target.value)}
                onBlur={handleBlur}
                value={values.reason ?? ""}
              />
              <WordCounter
                className="pt-2"
                value={values.reason}
                maxWords={100}
              />
              <p className="pt-3 text-sm text-gray-400">{t("reasonD")}</p>
            </div>
            <div className="divider md:col-span-2"></div>
            {/* Primary Program */}
            {
              <div className="flex flex-col justify-start w-full md:col-span-2">
                <div className="grid items-end grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <label className="label">{t("program")}</label>
                      <label className="label-text-alt text-error">
                        {errors.primaryProgramID &&
                          touched.primaryProgramID &&
                          errors.primaryProgramID}
                      </label>
                    </div>

                    <Field
                      as="select"
                      name="primaryProgramID"
                      title="primaryProgramID"
                      placeholder="Program"
                      className={`select select-bordered w-full select-primary ${
                        errors.primaryProgramID &&
                        touched.primaryProgramID &&
                        "select-error"
                      }`}
                      onChange={(event: any) => {
                        setPrimaryProgram(
                          props.programs?.find(
                            (p) => p.id === event.target.value
                          )
                        );
                        handleChange(event);
                      }}
                      onBlur={handleBlur}
                      value={values.primaryProgramID}
                      disabled={applicationIsEligible}
                    >
                      <option
                        selected={props.application === undefined}
                        disabled
                        value={undefined}
                      >
                        {t("select")}
                      </option>
                      {props.programs
                        ?.filter(
                          (p) =>
                            p.isDeactivated !== true ||
                            p.id === oldPrimaryProgram?.program?.id
                        )
                        ?.map((program) => (
                          <option
                            key={program?.id}
                            value={program?.id}
                            disabled={program?.isDeactivated === true}
                          >
                            {`${
                              locale === "ar"
                                ? program?.nameAr ?? "-"
                                : program?.name
                            }-${
                              locale === "ar"
                                ? program?.university?.nameAr ?? "-"
                                : program?.university?.name
                            }`}
                          </option>
                        ))}
                    </Field>
                  </div>
                  {primaryProgram?.university?.isException === 1 && (
                    <div className="flex flex-col items-center justify-end h-full">
                      <p className="w-full px-4 py-3 text-center border rounded-md border-secondary">
                        {/* Acceptance letter not required */}
                        {t("acceptanceLetterNotRequired")}
                      </p>
                    </div>
                  )}
                  {primaryProgram?.university?.isException !== 1 && (
                    <div className="flex flex-col justify-start w-full">
                      <label className="label">
                        {t("acceptanceLetter")}{" "}
                        {props.application && (
                          <GetStorageLinkComponent
                            storageKey={
                              primaryProgram?.id ===
                              oldPrimaryProgram?.program?.id
                                ? oldPrimaryProgram?.acceptanceLetterDoc
                                : undefined
                            }
                          ></GetStorageLinkComponent>
                        )}
                      </label>
                      <Field
                        type="file"
                        accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,application/msword"
                        id="primaryAcceptanceDoc"
                        name="primaryAcceptanceDoc"
                        title="primaryAcceptanceDoc"
                        placeholder="CPR Doc"
                        className={`file-input file-input-bordered file-input-secondary bg-secondary text-secondary-content ${
                          errors.primaryAcceptanceDoc && "input-error"
                        }`}
                        onChange={(event: any) => {
                          let file: File | undefined =
                            event.currentTarget.files[0];

                          let isValid = checkIfFilesAreTooBig(file);
                          if (isValid) {
                            setPrimaryAcceptanceDoc(file);
                            handleChange(event);
                          } else {
                            setFieldError(
                              "primaryAcceptanceDoc",
                              "File is too large"
                            );
                          }
                        }}
                        onBlur={handleBlur}
                        value={values.primaryAcceptanceDoc ?? ""}
                      />
                      <label className="label-text-alt text-error">
                        {errors.primaryAcceptanceDoc &&
                          touched.primaryAcceptanceDoc &&
                          errors.primaryAcceptanceDoc}
                      </label>
                    </div>
                  )}
                </div>
                {primaryProgram?.minimumGPA && (
                  <div
                    className={cn(
                      "p-3 mt-2 border border-gray-300 rounded-md",
                      primaryProgram.minimumGPA > (values.gpa ?? 0) &&
                        "border-error"
                    )}
                  >
                    <div
                      className={cn(
                        "stat-title",
                        primaryProgram.minimumGPA > (values.gpa ?? 0) &&
                          "text-error"
                      )}
                    >
                      {t("minimumGPA")}
                    </div>
                    <label
                      className={cn(
                        "whitespace-pre-wrap stat-desc",
                        primaryProgram.minimumGPA > (values.gpa ?? 0) &&
                          "text-error"
                      )}
                    >
                      {primaryProgram.minimumGPA}
                    </label>
                  </div>
                )}
                {(primaryProgram?.requirements ||
                  primaryProgram?.requirementsAr) && (
                  <div className="p-3 mt-2 border border-gray-300 rounded-md">
                    <div className="stat-title">{t("requirements")}</div>
                    <label className="whitespace-pre-wrap stat-desc">
                      {locale == "ar"
                        ? primaryProgram?.requirementsAr
                        : primaryProgram?.requirements}
                    </label>
                  </div>
                )}
              </div>
            }

            <div className="divider md:col-span-2"></div>

            {/* schoolCertificate */}
            <div className="flex flex-col justify-start w-full">
              <label className="label">
                {t("schoolCertificate")}{" "}
                {props.application && (
                  <GetStorageLinkComponent
                    storageKey={
                      props.application?.attachment?.schoolCertificate
                    }
                  ></GetStorageLinkComponent>
                )}
              </label>
              <Field
                type="file"
                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,application/msword"
                id="schoolCertificate"
                name="schoolCertificate"
                title="schoolCertificate"
                placeholder="School Certificate Doc"
                className={`file-input file-input-bordered file-input-secondary bg-secondary text-secondary-content ${
                  errors.schoolCertificate && "input-error"
                }`}
                onChange={(event: any) => {
                  let file: File | undefined = event.currentTarget.files[0];

                  let isValid = checkIfFilesAreTooBig(file);
                  if (isValid) {
                    setSchoolCertificate(file);
                    handleChange(event);
                  } else {
                    setFieldError("schoolCertificate", "File is too large");
                  }
                }}
                onBlur={handleBlur}
                value={values.schoolCertificate ?? ""}
                disabled={applicationIsEligible}
              />
              <label className="label-text-alt text-error">
                {errors.schoolCertificate &&
                  touched.schoolCertificate &&
                  errors.schoolCertificate}
              </label>
            </div>

            {/* transcriptDoc */}
            <div className="flex flex-col justify-start w-full">
              <label className="label">
                {t("transcript")}{" "}
                {props.application && (
                  <GetStorageLinkComponent
                    storageKey={props.application?.attachment?.transcriptDoc}
                  ></GetStorageLinkComponent>
                )}
              </label>
              <Field
                type="file"
                accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,application/msword"
                id="transcriptDoc"
                name="transcriptDoc"
                title="transcriptDoc"
                placeholder="Transcript Doc"
                className={`file-input file-input-bordered file-input-secondary bg-secondary text-secondary-content ${
                  errors.transcriptDoc && "input-error"
                }`}
                onChange={(event: any) => {
                  let file: File | undefined = event.currentTarget.files[0];

                  let isValid = checkIfFilesAreTooBig(file);
                  if (isValid) {
                    setTranscriptDoc(file);
                    handleChange(event);
                  } else {
                    setFieldError("transcriptDoc", "File is too large");
                  }
                }}
                onBlur={handleBlur}
                value={values.transcriptDoc ?? ""}
                disabled={applicationIsEligible}
              />
              <p className="py-2 italic whitespace-pre-wrap stat-desc">
                {t(`transcriptNote`)}
              </p>
              <label className="label-text-alt text-error">
                {errors.transcriptDoc &&
                  touched.transcriptDoc &&
                  errors.transcriptDoc}
              </label>
            </div>

            {/* Reason */}
            {props.application && (
              <div className="flex flex-col justify-start w-full md:col-span-2">
                <label className="label">{t("reasonForUpdate")}</label>
                <Field
                  type="text"
                  name="reasonForUpdate"
                  title="reasonForUpdate"
                  placeholder={`${t("reasonForUpdate")}...`}
                  className={`input input-bordered input-primary ${
                    errors.reasonForUpdate && "input-error"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.reasonForUpdate ?? ""}
                />
                <label className="label-text-alt text-error">
                  {errors.reasonForUpdate &&
                    touched.reasonForUpdate &&
                    errors.reasonForUpdate}
                </label>
              </div>
            )}

            {/* Submit */}
            <button
              className="my-3 text-white btn btn-primary md:col-span-2"
              type="submit"
              disabled={isSubmitting || !isValid}
            >
              {props.application ? t("update") : t("apply")}
            </button>

            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <label htmlFor="my-modal" className="cursor-pointer modal">
              <label className="relative modal-box" htmlFor="">
                <h3 className="text-lg font-bold">{t("confirmWithdraw")}</h3>
                <p className="py-4">{t("confirmWithdrawMessage")}</p>
                <div className="gap-3 modal-action">
                  <button
                    className={`btn btn-error btn-sm`}
                    type="button"
                    disabled={withdrawing}
                    onClick={() => {
                      toast.promise(withdrawApplication(props.application!), {
                        loading: "Withdrawing...",
                        success: "Withdraw successfully",
                        error: (err) => {
                          return `${err}`;
                        },
                      });
                    }}
                  >
                    {withdrawing && <span className="loading"></span>}
                    {t("withdraw")}
                  </button>
                  <label htmlFor="my-modal" className="btn btn-sm">
                    {t("no")}
                  </label>
                </div>
              </label>
            </label>

            {props.application &&
              (props.application.status === Status.REVIEW ||
                props.application.status === Status.ELIGIBLE ||
                props.application.status === Status.NOT_COMPLETED) && (
                <label
                  htmlFor="my-modal"
                  className="mx-auto btn btn-ghost hover:bg-error/20 btn-xs w-min text-error md:col-span-2 btn-error"
                >
                  {t("withdraw")}
                </label>
              )}
          </Form>
        )}
      </Formik>
    </div>
  );
};
