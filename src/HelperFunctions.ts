import { isEqual, round } from "lodash";
import { FamilyIncome, Income, Status } from "./API";

/**
 * It checks if a file is too big
 * @param {File} [file] - The file that is being checked.
 * @returns A boolean value.
 */
export function checkIfFilesAreTooBig(file?: File, maxSize?: number): boolean {
  let valid = true;
  const allowedSizeInMegabytes = maxSize ?? 2;
  if (file) {
    const size = file.size / 1024 / 1024;
    if (size > allowedSizeInMegabytes) {
      valid = false;
    }
  }
  return valid;
}

type TCalculateScore = {
  familyIncome: FamilyIncome | null | undefined;
  gpa: number;
  adminScore?: number;
};
type TCalculateMasterScore = {
  income: Income | null | undefined;
  gpa: number;
  adminScore?: number;
};

export function calculateScore({
  familyIncome,
  gpa,
  adminScore = 0,
}: TCalculateScore) {
  let score = gpa * 0.7 + adminScore;
  if (familyIncome === FamilyIncome.LESS_THAN_1500) {
    score += 20;
  } else if (familyIncome === FamilyIncome.MORE_THAN_1500) {
    score += 10;
  }
  return round(score, 2);
}

export function calculateMasterScore({
  income,
  gpa,
  adminScore = 0,
}: TCalculateMasterScore) {
  let score = gpa * 0.7 + adminScore;
  if (income === Income.LESS_THAN_1500) {
    score += 20;
  } else if (income === Income.MORE_THAN_1500) {
    score += 10;
  }
  return round(score, 2);
}

export function getStatusOrder(status: Status) {
  switch (status) {
    case Status.APPROVED:
      return 1;
    case Status.ELIGIBLE:
      return 0.7;
    case Status.REVIEW:
      return 0.5;
    case Status.NOT_COMPLETED:
      return 0.3;
    case Status.REJECTED:
      return 0.2;
    case Status.WITHDRAWN:
      return 0.1;
  }
}

export interface ApplicationSnapshotInput {
  gpa: number | undefined;
  reason: string | undefined;
  primaryProgram: {
    id: string | undefined;
    name: string | undefined;
    acceptanceLetterDoc: string | undefined;
  };

  attachments: {
    cpr?: string | undefined;
    transcript?: string | undefined;
    schoolCertificate?: string | undefined;
    signedContract?: string | undefined;
  };
}

export interface ApplicationSnapshot {
  gpa?: string;
  reason?: string;
  primaryProgram?: string;
  primaryProgramAcceptanceLetter?: string;
  secondaryProgram?: string;
  secondaryProgramAcceptanceLetter?: string;
  attachments?: {
    cpr?: string;
    transcript?: string;
    schoolCertificate?: string;
    signedContract?: string;
  };
}

// TODO make one for master application
export function getStudentApplicationSnapshot(inputData: {
  newApplication: ApplicationSnapshotInput;
  oldApplication?: ApplicationSnapshotInput;
}): string {
  let snapshot: ApplicationSnapshot = inputData.oldApplication
    ? {
        gpa: isEqual(inputData.newApplication.gpa, inputData.oldApplication.gpa)
          ? undefined
          : `Changed ${inputData.oldApplication.gpa} to ${inputData.newApplication.gpa}`,
        primaryProgram: isEqual(
          inputData.newApplication.primaryProgram.id,
          inputData.oldApplication.primaryProgram.id
        )
          ? undefined
          : `Changed ${inputData.oldApplication.primaryProgram.name} to ${inputData.newApplication.primaryProgram.name}`,
        primaryProgramAcceptanceLetter: isEqual(
          inputData.newApplication.primaryProgram.acceptanceLetterDoc,
          inputData.oldApplication.primaryProgram.acceptanceLetterDoc
        )
          ? undefined
          : `Changed ${inputData.oldApplication.primaryProgram.acceptanceLetterDoc} to ${inputData.newApplication.primaryProgram.acceptanceLetterDoc}`,
        attachments: isEqual(
          inputData.newApplication.attachments,
          inputData.oldApplication.attachments
        )
          ? undefined
          : {
              cpr: inputData.newApplication.attachments.cpr
                ? `Changed ${inputData.oldApplication.attachments.cpr} to ${inputData.newApplication.attachments.cpr}`
                : undefined,
              transcript: inputData.newApplication.attachments.transcript
                ? `Changed ${inputData.oldApplication.attachments.transcript} to ${inputData.newApplication.attachments.transcript}`
                : undefined,
              schoolCertificate: inputData.newApplication.attachments
                .schoolCertificate
                ? `Changed ${inputData.oldApplication.attachments.schoolCertificate} to ${inputData.newApplication.attachments.schoolCertificate}`
                : undefined,
              signedContract: inputData.newApplication.attachments
                .signedContract
                ? `Changed ${inputData.oldApplication.attachments.signedContract} to ${inputData.newApplication.attachments.signedContract}`
                : undefined,
            },
      }
    : {
        gpa: `Initial submit with GPA ${inputData.newApplication.gpa}`,
        primaryProgram: `Initial submit with Primary Program ${inputData.newApplication.primaryProgram.name}`,
        primaryProgramAcceptanceLetter: `Initial submit with Primary Program Acceptance letter ${inputData.newApplication.primaryProgram.acceptanceLetterDoc}`,
        attachments: {
          cpr: `Initial submit with CPR ${inputData.newApplication.attachments.cpr}`,
          transcript: `Initial submit with transcript ${inputData.newApplication.attachments.transcript}`,
          schoolCertificate: `Initial submit with acceptance ${inputData.newApplication.attachments.schoolCertificate}`,
          signedContract: `Initial submit with signed contract ${inputData.newApplication.attachments.signedContract}`,
        },
      };

  return JSON.stringify(snapshot);
}

interface IAllDocsAreAvailable {
  isException?: number | null | undefined;
  cpr: string | null | undefined;
  familyProofs: (string | null)[];
  transcript: string | null | undefined;
  schoolCertificate: string | null | undefined;
  primaryProgramAcceptanceLetter: string | null | undefined;
  // secondaryProgramAcceptanceLetter: string | null | undefined;
}
interface IAllMasterDocsAreAvailable {
  cpr: string | null | undefined;
  guardian: string | null | undefined;

  transcript: string | null | undefined;
  acceptance: string | null | undefined;
  universitiyCertificate: string | null | undefined;
  tofelILETS: string | null | undefined;

  income: string | null | undefined;
}

export function allDocsAreAvailable(props: IAllDocsAreAvailable): boolean {
  return (
    typeof props.cpr === "string" &&
    typeof props.transcript === "string" &&
    typeof props.schoolCertificate === "string" &&
    (props.isException !== 1
      ? typeof props.primaryProgramAcceptanceLetter === "string"
      : true) &&
    // ||typeof props.secondaryProgramAcceptanceLetter === "string"
    props.familyProofs.length > 0
  );
}

export function allMasterDocsAreAvailable(
  props: IAllMasterDocsAreAvailable
): boolean {
  return (
    typeof props.cpr === "string" &&
    typeof props.guardian === "string" &&
    typeof props.transcript === "string" &&
    typeof props.acceptance === "string" &&
    typeof props.universitiyCertificate === "string" &&
    typeof props.tofelILETS === "string" &&
    typeof props.income === "string"
  );
}

// export function allDocsAreAvailable(props: IAllDocsAreAvailable): boolean {
//   return (
//     typeof props.cpr === "string" &&
//     typeof props.transcript === "string" &&
//     typeof props.schoolCertificate === "string" &&
//     typeof props.primaryProgramAcceptanceLetter === "string" &&
//     typeof props.secondaryProgramAcceptanceLetter === "string" &&
//     props.familyProofs.length > 0
//   );
// }

export async function getCprFromToken(token: string | null): Promise<{
  isAdmin?: boolean;
  username: string;
}> {
  return fetch(process.env.NEXT_PUBLIC_LAMBDA_GET_CPR_FROM_TOKEN ?? "", {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  }).then((data) => data.json());
}
