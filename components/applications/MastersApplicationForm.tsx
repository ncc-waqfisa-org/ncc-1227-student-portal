import { Formik, Form, Field, FormikHelpers } from "formik";
import { FC, useState } from "react";
import * as yup from "yup";
import { useAuth } from "../../hooks/use-auth";

import {
  MasterApplication,
  CreateMasterApplicationMutationVariables,
  CreateMasterAttachmentMutationVariables,
  CreateMasterLogMutationVariables,
  MasterAppliedUniversities,
  Student,
  UpdateMasterApplicationMutationVariables,
  UpdateMasterAttachmentMutationVariables,
  Major,
} from "../../src/API";
import { Status } from "../../src/models";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

import {
  createMasterAttachmentInDB,
  createMasterApplicationInDB,
  updateMasterAttachmentInDB,
  updateMasterApplicationInDB,
  createMasterLogInDB,
  DocType,
  uploadFile,
} from "../../src/CustomAPI";
import {
  MasterApplicationSnapshotInput,
  allMasterDocsAreAvailable,
  calculateMasterScore,
  checkIfFilesAreTooBig,
  getMasterStudentApplicationSnapshot,
} from "../../src/HelperFunctions";
import GetStorageLinkComponent from "../get-storage-link-component";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { cn } from "../../src/lib/utils";
import { Textarea } from "../Textarea";
import WordCounter from "../word-counter";
import { useAppContext } from "../../contexts/AppContexts";
import { useMastersContext } from "../../contexts/MastersContexts";
import { Skeleton } from "../Skeleton";

export interface CreateMasterApplicationFormValues {
  application: CreateMasterApplicationMutationVariables;
  attachment: CreateMasterAttachmentMutationVariables;
  masterLog: CreateMasterLogMutationVariables;
}
export interface UpdateMasterApplicationFormValues {
  application: UpdateMasterApplicationMutationVariables;
  attachment: UpdateMasterAttachmentMutationVariables;
  masterLog: CreateMasterLogMutationVariables;
}

/**
 *
 * export type CreateMasterApplicationInput = {
  gpa?: number | null,

  universityID: string,
  major?: Major | null,
  program?: string | null,

  reason?: string | null,

  nationalityCategory?: Nationality | null, //* PreFilled
  studentCPR: string, //* PreFilled
  batch?: number | null, //* PreFilled
  income?: Income | null, //* PreFilled
  incomeDoc?: string | null, //* PreFilled
};

export type CreateMasterAttachmentInput = {

  cprDoc?: string | null, //* PreFilled
  signedContractDoc?: string | null,  //! Not now

  transcriptDoc?: string | null,
  universityCertificate?: string | null,
  toeflIELTSCertificate?: string | null,
  acceptanceDoc?: string | undefined;

};
 *
 */

interface FormValues {
  gpa: number | undefined;
  universityID: string;
  major: Major | undefined;
  program: string | undefined;
  reason: string | undefined;

  acceptanceDoc?: File | undefined;
  transcriptDoc?: File | undefined;
  universityCertificate?: File | undefined;
  toeflIELTSCertificate?: File | undefined;

  reasonForUpdate?: string | undefined;
}

interface Props {
  application?: MasterApplication;
  universities?: MasterAppliedUniversities[];
}

export const MastersApplicationForm: FC<Props> = (props) => {
  const { user } = useAuth();
  const { push, locale } = useRouter();
  const { syncStudentApplication, batch, editingApplicationsEnabled } =
    useMastersContext();
  const { student, isStudentPending } = useAppContext();
  const { t } = useTranslation("applicationPage");
  const { t: tErrors } = useTranslation("errors");
  const { t: tToast } = useTranslation("toast");

  const studentData = student ? (student?.getStudent as Student) : undefined;

  const applicationIsEligible = props.application?.status === Status.ELIGIBLE;

  const [acceptanceDoc, setAcceptanceDoc] = useState<File | undefined>(
    undefined
  );

  const [universityCertificate, setUniversityCertificate] = useState<
    File | undefined
  >(undefined);

  const [transcriptDoc, setTranscriptDoc] = useState<File | undefined>(
    undefined
  );

  // IELTS / TOEFL
  const [toeflIELTSCertificate, settoeflIELTSCertificate] = useState<
    File | undefined
  >(undefined);

  const oldUniversity = props.application?.university;

  // const [university, setUniversity] = useState<MasterUniversities | undefined>(
  //   oldUniversity ?? undefined
  // );

  const [withdrawing, setWithdrawing] = useState(false);
  const initialValues: FormValues = {
    gpa: props.application?.gpa ?? undefined,
    reason: props.application?.reason ?? undefined,
    universityID: oldUniversity?.id ?? "",
    major: props.application?.major ?? undefined,
    program: props.application?.program ?? undefined,

    universityCertificate: undefined,
    transcriptDoc: undefined,
    toeflIELTSCertificate: undefined,
    acceptanceDoc: undefined,

    reasonForUpdate: undefined,
  };

  async function withdrawApplication(application: MasterApplication) {
    let tempApplicationVar: UpdateMasterApplicationMutationVariables = {
      input: {
        id: application.id,
        status: Status.WITHDRAWN,
        _version: application._version,
      },
    };
    setWithdrawing(true);
    let res = await updateMasterApplicationInDB(tempApplicationVar);
    if (res === undefined) {
      throw new Error(tToast("failedToWithdraw") ?? "Failed to withdraw");
    }
    await syncStudentApplication();
    setWithdrawing(false);
    push("/masters/applications/");
    return res;
  }

  /**
   * It creates an attachment in the database, then creates an application in the database, then
   * creates two program choices in the database
   * @param {CreateMasterApplicationFormValues} data - CreateApplicationFormValues
   * @returns a promise that resolves to an array of two promises.
   */
  async function createApplicationProcess(
    data: CreateMasterApplicationFormValues
  ) {
    let createdMasterAttachmentInDB = await createMasterAttachmentInDB(
      data.attachment
    );

    if (createdMasterAttachmentInDB === undefined) {
      throw new Error(
        `EA0005 ${
          tToast("failedToCreateTheApplication") ??
          "Failed to create the application"
        }`
      );
    }

    let tempApplicationVar: CreateMasterApplicationMutationVariables = {
      input: {
        id: undefined,
        gpa: data.application.input.gpa,
        reason: data.application.input.reason,
        score: data.application.input.score,
        status: data.application.input.status,
        nationalityCategory: data.application.input.nationalityCategory,
        studentCPR: data.application.input.studentCPR,
        universityID: data.application.input.universityID,
        studentName: data.application.input.studentName,
        processed: data.application.input.processed,
        income: data.application.input.income,
        // attachmentID: createdMasterAttachmentInDB.createMasterAttachment?.id,
        masterApplicationAttachmentId:
          createdMasterAttachmentInDB.createMasterAttachment?.id,
        dateTime: new Date().toISOString(),

        program: data.application.input.program,
        major: data.application.input.major,
        incomeDoc: data.application.input.incomeDoc,

        batch: dayjs().year(),
        _version: undefined,
      },
    };

    let createdApplicationInDB = await createMasterApplicationInDB(
      tempApplicationVar
    );

    if (createdApplicationInDB === undefined) {
      throw new Error(
        `EA0006 ${
          tToast("failedToCreateTheApplication") ??
          "Failed to create the application"
        }`
      );
    }

    await Promise.all([
      createMasterLogInDB({
        input: {
          id: undefined,
          _version: undefined,
          applicationID:
            createdApplicationInDB.createMasterApplication?.id ?? "",
          studentCPR: data.masterLog.input.studentCPR,
          dateTime: data.masterLog.input.dateTime,
          snapshot: data.masterLog.input.snapshot,
          reason: data.masterLog.input.reason,
          masterApplicationMasterLogsId:
            createdApplicationInDB.createMasterApplication?.id,
          studentM_MasterLogsCpr: data.masterLog.input.studentCPR,
        },
      }),
    ])
      .then(async (res) => {
        await syncStudentApplication();
        push("/masters/applications");
      })
      .catch((err) => {
        throw new Error(
          `EA0007 ${
            tToast("failedToCreateTheApplication") ??
            "Failed to create the application"
          }`
        );
      });
  }

  async function updateApplicationProcess(
    data: UpdateMasterApplicationFormValues
  ) {
    let updatedAttachmentInDB = await updateMasterAttachmentInDB(
      data.attachment
    );

    if (updatedAttachmentInDB === undefined) {
      throw new Error(
        `EA0002 ${
          tToast("failedToUpdateTheApplication") ??
          "Failed to update the application"
        }`
      );
    }

    let tempApplicationVar: UpdateMasterApplicationMutationVariables = {
      input: {
        id: data.application.input.id,
        gpa: data.application.input.gpa,
        score: data.application.input.score,
        reason: data.application.input.reason,
        status: data.application.input.status,
        nationalityCategory: data.application.input.nationalityCategory,
        studentCPR: data.application.input.studentCPR,
        universityID: data.application.input.universityID,
        program: data.application.input.program,
        studentName: data.application.input.studentName,
        processed: data.application.input.processed,
        income: data.application.input.income,
        // attachmentID: data.application.input.attachmentID,
        masterApplicationAttachmentId:
          data.application.input.masterApplicationAttachmentId,

        major: data.application.input.major,
        incomeDoc: data.application.input.incomeDoc,

        _version: data.application.input._version,
      },
    };

    let updatedApplicationInDB = await updateMasterApplicationInDB(
      tempApplicationVar
    );

    if (updatedApplicationInDB === undefined) {
      throw new Error(
        `EA0003 ${
          tToast("failedToUpdateTheApplication") ??
          "Failed to update the application"
        }`
      );
    }

    await Promise.all([
      //   updateProgramChoiceInDB(tempPrimaryProgramChoice),
      // updateProgramChoiceInDB(tempSecondaryProgramChoice),
      createMasterLogInDB(data.masterLog),
    ])
      .then(async (res) => {
        await syncStudentApplication();
        push("/masters/applications");
      })
      .catch((err) => {
        throw new Error(
          `EA0004 ${
            tToast("failedToUpdateTheApplication") ??
            "Failed to update the application"
          }`
        );
      });
  }

  async function handleSubmit({
    values,
    actions,
  }: {
    values: FormValues;
    actions: FormikHelpers<FormValues>;
  }) {
    if (!studentData) {
      throw Error(
        tErrors("applicantDataMissing") ??
          "We're having trouble loading applicant data. Please try again later."
      );
    }

    // destructure documents
    let [
      sk_UniversityCertificate,
      sk_TranscriptDoc,
      sk_AcceptanceLetterDoc,
      sk_toeflIELTSCertificate,
    ]: (string | null | undefined)[] = [
      props.application?.attachment?.universityCertificate,
      props.application?.attachment?.transcriptDoc,
      props.application?.attachment?.acceptanceLetterDoc,
      props.application?.attachment?.toeflIELTSCertificate,
    ];

    let [
      new_sk_universityCertificate,
      new_sk_transcriptDoc,
      new_sk_acceptanceDoc,
      new_sk_toeflIELTSCertificate,
    ] = await Promise.all([
      universityCertificate &&
        uploadFile(
          universityCertificate,
          DocType.SCHOOL_CERTIFICATE,
          studentData.cpr
        ),
      transcriptDoc &&
        uploadFile(transcriptDoc, DocType.TRANSCRIPT, studentData.cpr),
      acceptanceDoc &&
        (await uploadFile(
          acceptanceDoc,
          DocType.PRIMARY_PROGRAM_ACCEPTANCE,
          studentData.cpr
        )),
      toeflIELTSCertificate &&
        (await uploadFile(
          toeflIELTSCertificate,
          DocType.TOEFL_IELTS,
          studentData.cpr
        )),
    ])
      .then((res) => {
        return res;
      })
      .catch((error) => {
        throw new Error(
          `EA0001 ${tToast("failedToUploadFiles") ?? "Failed to upload files"}`
        );
      });

    //* Assigning the new storage keys if available
    // University certificate doc storage key
    if (new_sk_universityCertificate) {
      sk_UniversityCertificate = new_sk_universityCertificate;
    }
    // Transcript doc storage key
    if (new_sk_transcriptDoc) {
      sk_TranscriptDoc = new_sk_transcriptDoc;
    }

    // Acceptance doc storage key
    if (new_sk_acceptanceDoc) {
      sk_AcceptanceLetterDoc = new_sk_acceptanceDoc;
    }

    // toeflIELTSCertificate doc storage key
    if (new_sk_toeflIELTSCertificate) {
      sk_toeflIELTSCertificate = new_sk_toeflIELTSCertificate;
    }

    // TODO: TEST
    let newApplicationSnapshotInput: MasterApplicationSnapshotInput = {
      gpa: values.gpa,
      reason: values.reason,
      university: values.universityID,
      major: values.major,
      program: values.program,
      attachments: {
        universityCertificate: sk_UniversityCertificate ?? undefined,
        transcript: sk_TranscriptDoc ?? undefined,
        acceptanceLetter: sk_AcceptanceLetterDoc ?? undefined,
        toeflIELTSCertificate: sk_toeflIELTSCertificate ?? undefined,
      },
    };

    let oldApplicationSnapshotInput:
      | MasterApplicationSnapshotInput
      | undefined = props.application
      ? {
          gpa: props.application.gpa ?? undefined,
          reason: props.application.reason ?? undefined,
          university: props.application.universityID ?? undefined,
          major: props.application.major ?? undefined,
          program: props.application.program ?? undefined,
          attachments: {
            universityCertificate:
              props.application?.attachment?.universityCertificate ?? undefined,
            transcript:
              props.application?.attachment?.transcriptDoc ?? undefined,
            acceptanceLetter:
              props.application?.attachment?.acceptanceLetterDoc ?? undefined,
            toeflIELTSCertificate:
              props.application?.attachment?.toeflIELTSCertificate ?? undefined,
          },
        }
      : undefined;

    const createValues: CreateMasterApplicationFormValues = {
      application: {
        input: {
          id: undefined,
          gpa: values.gpa,
          reason: values.reason,
          major: values.major,
          score:
            studentData.m_income && values.gpa
              ? calculateMasterScore({
                  income: studentData.m_income,
                  gpa: values.gpa,
                })
              : 0,
          batch: batch?.batch ?? 0,
          status: allMasterDocsAreAvailable({
            cpr: studentData.cprDoc,
            guardian: studentData.m_guardianCPR,
            income: studentData.m_incomeDoc,
            transcript: sk_TranscriptDoc,
            universitiyCertificate: sk_UniversityCertificate,
            acceptance: sk_AcceptanceLetterDoc,
            tofelILETS: sk_toeflIELTSCertificate,
          })
            ? Status.REVIEW
            : Status.NOT_COMPLETED,
          studentCPR: studentData.cpr,
          nationalityCategory: studentData.nationalityCategory,
          universityID: values.universityID,
          program: values.program,
          processed: 0,
          income: studentData.m_income,
          studentName: `${studentData.m_firstName} ${studentData.m_secondName} ${studentData.m_lastName}`,
          _version: null,
          masterApplicationAttachmentId: null,
          dateTime: new Date().toISOString(),
        },
        condition: undefined,
      },
      attachment: {
        input: {
          id: undefined,
          universityCertificate: sk_UniversityCertificate,
          transcriptDoc: sk_TranscriptDoc,
          acceptanceLetterDoc: sk_AcceptanceLetterDoc,
          toeflIELTSCertificate: sk_toeflIELTSCertificate,
          _version: undefined,
        },
        condition: undefined,
      },
      masterLog: {
        input: {
          id: undefined,
          applicationID: "",
          studentCPR: studentData.cpr,
          dateTime: new Date().toISOString(),

          snapshot: getMasterStudentApplicationSnapshot({
            newApplication: newApplicationSnapshotInput,
            oldApplication: oldApplicationSnapshotInput,
          }),

          reason: "Initial Submit",
          _version: undefined,
          masterApplicationMasterLogsId: "",
        },
        condition: undefined,
      },
    };

    /* -------------------------------------------------------------------------- */
    /*                                   UPDATE                                   */
    /* -------------------------------------------------------------------------- */

    let updateValues: UpdateMasterApplicationFormValues = {
      application: {
        input: {
          id: props.application?.id ?? "",
          gpa: values.gpa,
          reason: values.reason,
          major: values.major,
          score:
            studentData.m_income && values.gpa
              ? calculateMasterScore({
                  income: studentData.m_income,
                  gpa: props.application?.verifiedGPA ?? values.gpa,
                  adminScore: props.application?.adminPoints ?? 0,
                })
              : 0,
          status: allMasterDocsAreAvailable({
            cpr: studentData.cprDoc,
            income: studentData.m_income,
            guardian: studentData.m_guardianCPRDoc,
            transcript: sk_TranscriptDoc,
            universitiyCertificate: sk_UniversityCertificate,
            acceptance: sk_AcceptanceLetterDoc,
            tofelILETS: sk_toeflIELTSCertificate,
          })
            ? applicationIsEligible
              ? props.application?.status
              : Status.REVIEW
            : Status.NOT_COMPLETED,

          studentCPR: studentData.cpr,
          universityID: values.universityID ?? props.application?.universityID,
          program: values.program ?? props.application?.program,
          processed: props.application?.processed ?? 0,
          income: studentData.m_income,
          nationalityCategory: studentData.nationalityCategory,
          studentName: `${studentData.m_firstName} ${studentData.m_secondName} ${studentData.m_lastName}`,
          _version: props.application?._version,
          //   attachmentID: props.application?.attachmentID,
          masterApplicationAttachmentId:
            props.application?.masterApplicationAttachmentId,
        },
        condition: undefined,
      },
      attachment: {
        input: {
          id: props.application?.attachment?.id ?? "",
          universityCertificate: sk_UniversityCertificate,
          transcriptDoc: sk_TranscriptDoc,
          acceptanceLetterDoc: sk_AcceptanceLetterDoc,
          toeflIELTSCertificate: sk_toeflIELTSCertificate,
          _version: props.application?.attachment?._version,
        },
        condition: undefined,
      },
      masterLog: {
        input: {
          id: undefined,
          applicationID: props.application?.id ?? "",
          studentCPR: user?.getUsername() ?? "",
          dateTime: new Date().toISOString(),

          snapshot: getMasterStudentApplicationSnapshot({
            newApplication: newApplicationSnapshotInput,
            oldApplication: oldApplicationSnapshotInput,
          }),

          reason: values.reasonForUpdate,
          _version: undefined,
          masterApplicationMasterLogsId: props.application?.id ?? "",
        },
        condition: undefined,
      },
    };

    {
      props.application
        ? await updateApplicationProcess(updateValues)
        : await createApplicationProcess(createValues);
    }

    actions.setSubmitting(false);
  }

  //   gpa?: number | null,

  //   universityID: string,
  //   major?: Major | null,
  //   program?: string | null,

  //   reason?: string | null,
  //   transcriptDoc?: string | null,
  //   universityCertificate?: string | null,
  //   toeflIELTSCertificate?: string | null,

  return (
    <div>
      {isStudentPending && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="col-span-1" />
          <Skeleton className="col-span-1" />
          <Skeleton className="col-span-1" />
          <Skeleton className="col-span-1" />
          <Skeleton className="col-span-1" />
          <Skeleton className="col-span-1" />
        </div>
      )}
      {studentData && (
        <Formik
          initialValues={initialValues}
          validationSchema={
            props.application
              ? yup.object({
                  gpa: yup
                    .number()
                    .min(3.5, `${tErrors("minimumGPA")} ${3.5}`)
                    .max(4, `${tErrors("maximumGPA")} ${4}`)
                    .required(`${tErrors("requiredField")}`),

                  universityID: yup
                    .string()
                    .required(`${tErrors("requiredField")}`),
                  program: yup.string().required(`${tErrors("requiredField")}`),
                  major: yup.string().required(`${tErrors("requiredField")}`),

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
                    .min(3.5, `${tErrors("minimumGPA")} ${3.5}`)
                    .max(4, `${tErrors("maximumGPA")} ${4}`)
                    .required(`${tErrors("requiredField")}`),

                  universityID: yup
                    .string()
                    .required(`${tErrors("requiredField")}`),
                  program: yup.string().required(`${tErrors("requiredField")}`),
                  major: yup.string().required(`${tErrors("requiredField")}`),

                  universityCertificate: yup.mixed(),
                  transcriptDoc: yup.mixed(),
                  acceptanceDoc: yup.mixed(),
                  toeflIELTSCertificate: yup.mixed(),

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
              error: (error) =>
                error.message
                  ? `${error.message}`
                  : `EA0000 ${tErrors("somethingWentWrong")}`,
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
            <Form className="container grid grid-cols-1 gap-3 mx-auto max-w-3xl md:grid-cols-2">
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
                  value={`${studentData.m_firstName} ${studentData.m_secondName} ${studentData.m_lastName}`}
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
                  value={studentData.cpr}
                  disabled
                />
              </div>
              <div className="divider md:col-span-2"></div>
              {/* GPA */}
              <div className="flex flex-col justify-start w-full md:col-span-2">
                <div className="flex justify-between items-center">
                  <label className="label">{t("applicantGPA")}</label>
                  <label className="label-text-alt text-error">
                    {errors.gpa && touched.gpa && errors.gpa}
                  </label>
                </div>
                <Field
                  dir="ltr"
                  type="number"
                  step="0.01"
                  name="gpa"
                  title="gpa"
                  min={3.5}
                  max={4}
                  placeholder="GPA (3.5 - 4)"
                  className={`input input-bordered input-primary ${
                    errors.gpa && touched.gpa && "input-error"
                  }`}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.gpa ?? ""}
                  disabled={
                    applicationIsEligible || !editingApplicationsEnabled
                  }
                />
                <p className="pt-3 text-sm text-gray-400">
                  {t("applicantGPAD")}
                </p>
              </div>
              <div className="flex flex-col justify-start w-full md:col-span-2">
                <div className="flex justify-between items-center">
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
                  disabled={
                    applicationIsEligible || !editingApplicationsEnabled
                  }
                />
                <WordCounter
                  className="pt-2"
                  value={values.reason}
                  maxWords={100}
                />
                <p className="pt-3 text-sm text-gray-400">{t("reasonD")}</p>
              </div>
              <div className="divider md:col-span-2"></div>
              {/* Master Universities */}
              {
                <div className="flex flex-col justify-start w-full md:col-span-2">
                  <div className="grid grid-cols-1 gap-3 items-start md:grid-cols-2">
                    <div className="w-full">
                      <div className="flex justify-between items-center">
                        <label className="label">{t("university")}</label>
                        <label className="label-text-alt text-error">
                          {errors.universityID &&
                            touched.universityID &&
                            errors.universityID}
                        </label>
                      </div>

                      <Field
                        as="select"
                        name="universityID"
                        title="universityID"
                        placeholder={t("university")}
                        className={`select select-bordered w-full select-primary ${
                          errors.universityID &&
                          touched.universityID &&
                          "select-error"
                        }`}
                        onChange={(event: any) => {
                          // setUniversity(
                          //   props.universities?.find(
                          //     (u) => u.id === event.target.value
                          //   )
                          // );
                          handleChange(event);
                        }}
                        onBlur={handleBlur}
                        value={
                          values.universityID === ""
                            ? undefined
                            : values.universityID
                        }
                        disabled={
                          applicationIsEligible || !editingApplicationsEnabled
                        }
                      >
                        <option
                          selected={props.application === undefined}
                          disabled
                          value={undefined}
                        >
                          {t("select")}
                        </option>
                        {props.universities
                          ?.filter(
                            (u) =>
                              u.isDeactivated !== true ||
                              u.id === oldUniversity?.id
                          )
                          ?.map((uni) => (
                            <option
                              key={uni?.id}
                              value={uni?.id}
                              disabled={uni?.isDeactivated === true}
                            >
                              {`${
                                locale === "ar"
                                  ? uni?.universityNameAr ?? "-"
                                  : uni?.universityName
                              }`}
                            </option>
                          ))}
                      </Field>
                      <p className="pt-3 text-sm text-gray-400">
                        {t("theUniversityYouWantToApplyTo")}
                      </p>
                    </div>
                    <div className="w-full">
                      <div className="flex justify-between items-center">
                        <label className="label">{t("major")}</label>
                        <label className="label-text-alt text-error">
                          {errors.major && touched.major && errors.major}
                        </label>
                      </div>

                      <Field
                        as="select"
                        name="major"
                        title="major"
                        placeholder="Major"
                        className={`select select-bordered w-full select-primary ${
                          errors.major && touched.major && "select-error"
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.major}
                        disabled={
                          applicationIsEligible || !editingApplicationsEnabled
                        }
                      >
                        <option
                          selected={props.application === undefined}
                          disabled
                          value={undefined}
                        >
                          {t("select")}
                        </option>
                        <option key={Major.SCIENCE} value={Major.SCIENCE}>
                          {t(Major.SCIENCE)}
                        </option>
                        <option
                          key={Major.ENGINEERING}
                          value={Major.ENGINEERING}
                        >
                          {t(Major.ENGINEERING)}
                        </option>
                        <option key={Major.TECHNOLOGY} value={Major.TECHNOLOGY}>
                          {t(Major.TECHNOLOGY)}
                        </option>
                      </Field>
                    </div>
                    <div className="flex flex-col justify-start w-full">
                      <div className="flex justify-between items-center">
                        <label className="label">{t("program")}</label>
                        <label className="label-text-alt text-error">
                          {errors.program && touched.program && errors.program}
                        </label>
                      </div>
                      <Field
                        name="program"
                        title="program"
                        placeholder={t("program")}
                        className={`input input-bordered input-primary ${
                          errors.program && touched.program && "input-error"
                        }`}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.program ?? ""}
                        disabled={
                          applicationIsEligible || !editingApplicationsEnabled
                        }
                      />
                    </div>
                  </div>
                  {/* TODO: see if there is a minimumGPA for master universities */}
                  {/* {university?.minimumGPA && (
                    <div
                      className={cn(
                        "p-3 mt-2 border border-gray-300 rounded-md",
                        university.minimumGPA > (values.gpa ?? 0) &&
                          "border-error"
                      )}
                    >
                      <div
                        className={cn(
                          "stat-title",
                          university.minimumGPA > (values.gpa ?? 0) &&
                            "text-error"
                        )}
                      >
                        {t("minimumGPA")}
                      </div>
                      <label
                        className={cn(
                          "whitespace-pre-wrap stat-desc",
                          university.minimumGPA > (values.gpa ?? 0) &&
                            "text-error"
                        )}
                      >
                        {university.minimumGPA}
                      </label>
                    </div>
                  )} */}
                  {/* TODO: see if there is requirements have to be met for master universities */}
                  {/* {(university?.requirements || university?.requirementsAr) && (
                    <div className="p-3 mt-2 rounded-md border border-gray-300">
                      <div className="stat-title">{t("requirements")}</div>
                      <label className="whitespace-pre-wrap stat-desc">
                        {locale == "ar"
                          ? university?.requirementsAr
                          : university?.requirements}
                      </label>
                    </div>
                  )} */}
                </div>
              }

              <div className="divider md:col-span-2"></div>

              {/* universityCertificate */}
              <div className="flex flex-col justify-start w-full">
                <label className="label">
                  {t("universityCertificate")}{" "}
                  {props.application && (
                    <GetStorageLinkComponent
                      storageKey={
                        props.application?.attachment?.universityCertificate
                      }
                    ></GetStorageLinkComponent>
                  )}
                </label>
                <Field
                  type="file"
                  accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,application/msword"
                  id="universityCertificate"
                  name="universityCertificate"
                  title="universityCertificate"
                  placeholder="School Certificate Doc"
                  className={`file-input file-input-bordered file-input-secondary bg-secondary text-secondary-content ${
                    errors.universityCertificate && "input-error"
                  }`}
                  onChange={(event: any) => {
                    let file: File | undefined = event.currentTarget.files[0];

                    let isValid = checkIfFilesAreTooBig(file);
                    if (isValid) {
                      setUniversityCertificate(file);
                      handleChange(event);
                    } else {
                      setFieldError(
                        "universityCertificate",
                        "File is too large"
                      );
                    }
                  }}
                  onBlur={handleBlur}
                  value={values.universityCertificate ?? ""}
                  disabled={
                    applicationIsEligible || !editingApplicationsEnabled
                  }
                />
                <p className="py-2 italic whitespace-pre-wrap stat-desc">
                  {t(`universityCertificateD`)}
                </p>
                <label className="label-text-alt text-error">
                  {errors.universityCertificate &&
                    touched.universityCertificate &&
                    errors.universityCertificate}
                </label>
              </div>

              {/* transcriptDoc */}
              <div className="flex flex-col justify-start w-full">
                <label className="label">
                  {t("transcriptDoc")}{" "}
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
                  disabled={
                    applicationIsEligible || !editingApplicationsEnabled
                  }
                />
                <p className="py-2 italic whitespace-pre-wrap stat-desc">
                  {t(`transcriptDocD`)}
                </p>
                <label className="label-text-alt text-error">
                  {errors.transcriptDoc &&
                    touched.transcriptDoc &&
                    errors.transcriptDoc}
                </label>
              </div>

              {/* acceptanceLetterDoc */}
              <div className="flex flex-col justify-start w-full">
                <label className="label">
                  {t("acceptanceLetterDoc")}{" "}
                  {props.application && (
                    <GetStorageLinkComponent
                      storageKey={
                        props.application?.attachment?.acceptanceLetterDoc
                      }
                    ></GetStorageLinkComponent>
                  )}
                </label>
                <Field
                  type="file"
                  accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,application/msword"
                  id="acceptanceDoc"
                  name="acceptanceDoc"
                  title="acceptanceDoc"
                  placeholder="Transcript Doc"
                  className={`file-input file-input-bordered file-input-secondary bg-secondary text-secondary-content ${
                    errors.acceptanceDoc && "input-error"
                  }`}
                  onChange={(event: any) => {
                    let file: File | undefined = event.currentTarget.files[0];

                    let isValid = checkIfFilesAreTooBig(file);
                    if (isValid) {
                      setAcceptanceDoc(file);
                      handleChange(event);
                    } else {
                      setFieldError("acceptanceDoc", "File is too large");
                    }
                  }}
                  onBlur={handleBlur}
                  value={values.acceptanceDoc ?? ""}
                  disabled={
                    applicationIsEligible || !editingApplicationsEnabled
                  }
                />
                <p className="py-2 italic whitespace-pre-wrap stat-desc">
                  {t(`acceptanceLetterDocD`)}
                </p>
                <label className="label-text-alt text-error">
                  {errors.acceptanceDoc &&
                    touched.acceptanceDoc &&
                    errors.acceptanceDoc}
                </label>
              </div>

              {/* toeflIELTSCertificate */}
              <div className="flex flex-col justify-start w-full">
                <label className="label">
                  {t("TOEFLIELTSCertificateDoc")}{" "}
                  {props.application && (
                    <GetStorageLinkComponent
                      storageKey={
                        props.application?.attachment?.toeflIELTSCertificate
                      }
                    ></GetStorageLinkComponent>
                  )}
                </label>
                <Field
                  type="file"
                  accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps,application/msword"
                  id="toeflIELTSCertificate"
                  name="toeflIELTSCertificate"
                  title="toeflIELTSCertificate"
                  placeholder="TOFEL/ILETS"
                  className={`file-input file-input-bordered file-input-secondary bg-secondary text-secondary-content ${
                    errors.toeflIELTSCertificate && "input-error"
                  }`}
                  onChange={(event: any) => {
                    let file: File | undefined = event.currentTarget.files[0];

                    let isValid = checkIfFilesAreTooBig(file);
                    if (isValid) {
                      settoeflIELTSCertificate(file);
                      handleChange(event);
                    } else {
                      setFieldError(
                        "toeflIELTSCertificate",
                        "File is too large"
                      );
                    }
                  }}
                  onBlur={handleBlur}
                  value={values.toeflIELTSCertificate ?? ""}
                  disabled={
                    applicationIsEligible || !editingApplicationsEnabled
                  }
                />
                <p className="py-2 italic whitespace-pre-wrap stat-desc">
                  {t(`TOEFLIELTSCertificateDocD`)}
                </p>
                <label className="label-text-alt text-error">
                  {errors.toeflIELTSCertificate &&
                    touched.toeflIELTSCertificate &&
                    errors.toeflIELTSCertificate}
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
                    className="mx-auto w-min btn btn-ghost hover:bg-error/20 btn-xs text-error md:col-span-2 btn-error"
                  >
                    {t("withdraw")}
                  </label>
                )}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};
