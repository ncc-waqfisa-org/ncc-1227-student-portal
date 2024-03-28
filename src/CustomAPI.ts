import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation, Storage } from "aws-amplify";
import {
  Application,
  CreateApplicationMutation,
  CreateApplicationMutationVariables,
  CreateAttachmentMutation,
  CreateAttachmentMutationVariables,
  CreateProgramChoiceMutation,
  CreateProgramChoiceMutationVariables,
  CreateStudentLogMutation,
  CreateStudentLogMutationVariables,
  GetBatchQuery,
  GetBatchQueryVariables,
  GetStudentQuery,
  ListBatchesQuery,
  ListBatchesQueryVariables,
  Program,
  Scholarship,
  UpdateApplicationMutation,
  UpdateApplicationMutationVariables,
  UpdateAttachmentMutation,
  UpdateAttachmentMutationVariables,
  UpdateParentInfoMutation,
  UpdateParentInfoMutationVariables,
  UpdateProgramChoiceMutation,
  UpdateProgramChoiceMutationVariables,
  UpdateScholarshipMutation,
  UpdateScholarshipMutationVariables,
  UpdateStudentMutation,
  UpdateStudentMutationVariables,
} from "./API";
import {
  createAttachment,
  updateAttachment,
  createApplication,
  updateApplication,
  createProgramChoice,
  updateProgramChoice,
  createStudentLog,
  updateStudent,
  updateParentInfo,
  updateScholarship,
} from "./graphql/mutations";

import dayjs from "dayjs";
import { getBatch, listBatches } from "./graphql/queries";

/* -------------------------------------------------------------------------- */
/*                                    ENUMS                                   */
/* -------------------------------------------------------------------------- */
export enum DocType {
  CPR,
  ACCEPTANCE,
  TRANSCRIPT,
  SIGNED_CONTRACT,
  SCHOOL_CERTIFICATE,
  FAMILY_INCOME_PROOF,
  PRIMARY_PROGRAM_ACCEPTANCE,
  SECONDARY_PROGRAM_ACCEPTANCE,
  BANK_LETTER,
}

export interface DownloadLinks {
  cprDoc?: string | null;
  schoolCertificate?: string | null;
  transcriptDoc?: string | null;
  signedContractDoc?: string | null;
}

/* -------------------------------------------------------------------------- */
/*                               NEW CUSTOM API                               */
/* -------------------------------------------------------------------------- */

export async function getCurrentBatch() {
  let queryInput: GetBatchQueryVariables = {
    batch: dayjs().year(),
  };

  const query = `
  query GetCurrentBatch {
    getBatch(batch: ${dayjs().year()}) {
      _deleted
      _lastChangedAt
      _version
      batch
      createApplicationEndDate
      createApplicationStartDate
      createdAt
      signUpEndDate
      signUpStartDate
      updateApplicationEndDate
      updatedAt
    }
  }  
  `;

  let res = (await API.graphql(
    graphqlOperation(query)
  )) as GraphQLResult<GetBatchQuery>;

  return res.data?.getBatch;
}

/* -------------------------------------------------------------------------- */
/*                             CUSTOM API QUERIES                             */
/* -------------------------------------------------------------------------- */

/**
 * It takes an application ID as a parameter and returns the application data as a promise
 * @param {string} id - string
 * @returns A promise of an application
 */
export async function getApplicationData(
  id: string
): Promise<Application | undefined> {
  let q = `query MyQuery {
        getApplication(id: "${id}") {
                id
                _version
                _deleted
                gpa
                createdAt
                attachmentID
                applicationAttachmentId
                _lastChangedAt
                studentCPR
                status
                updatedAt
                attachment {
                  id
                  transcriptDoc
                  signedContractDoc
                  cprDoc
                  schoolCertificate
                  _version
                  _deleted
                  _lastChangedAt
                  createdAt
                  updatedAt
                }
                programs {
                  items {
                    id
                    choiceOrder
                    acceptanceLetterDoc
                    applicationID
                    applicationProgramsId
                    programApplicationsId
                    programID
                    program {
                      id
                      name
                      nameAr
                      minimumGPA
                      requirements
                      requirementsAr
                      availability
                      university {
                        id
                        name
                        nameAr
                        isException
                        isExtended
                        extendedTo
                        isTrashed
                      }
                      _version
                      _deleted
                    }
                    _version
                    _deleted
                  }
                }
                studentLogs {
                  items {
                    id
                    dateTime
                    studentCPR
                    snapshot
                    reason
                    applicationStudentLogsId
                    applicationID
                    _version
                  }
                }
              }
      }
      `;

  const res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>;

  if (res.data === undefined || res.data === null) {
    return undefined;
  }

  let application = res.data?.getApplication as Application;

  return application;
}

export async function getScholarship(id: string): Promise<Scholarship | null> {
  let q = `query GetScholarship {
    getScholarship(id:"${id}") {
        id
        _version
        createdAt
        studentCPR
        applicationID
        status
        isConfirmed
        unsignedContractDoc
        signedContractDoc
        studentSignature
        guardianSignature
        IBAN
        IBANLetterDoc
        bankName
        application {
          gpa
          createdAt
          batch
          programs {
            items {
              program {
                name
                nameAr
                university{
                  name
                  nameAr
                }
              }
            }
          }
      }
    }
  }`;

  let res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>;

  const scholarship: Scholarship | null = res.data?.getScholarship;
  return scholarship;
}
export async function getStudentScholarships(
  cpr: string
): Promise<Scholarship[]> {
  let q = `query GetScholarships {
    scholarshipsByStudentCPRAndStatus(studentCPR: "${cpr}") {
      items{
      id
      _version
      createdAt
      studentCPR
      applicationID
      status
      isConfirmed
      unsignedContractDoc
      signedContractDoc
      studentSignature
      guardianSignature
      IBAN
      IBANLetterDoc
      bankName
      application {
        gpa
        createdAt
        batch
        programs {
          items {
            program {
              name
              nameAr
              university{
                name
                nameAr
              }
            }
          }
        }
      }
    }
    }
  }`;

  let res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>;
  const scholarships = (res.data?.scholarshipsByStudentCPRAndStatus?.items ??
    []) as Scholarship[];

  return scholarships;
}
export async function getStudentApplications(
  cpr: string
): Promise<Application[]> {
  let q = `
  query GetAllApplicationsByCPR {
    applicationsByStudentCPRAndGpa(studentCPR: "${cpr}", limit: 9999999) {
      items {
        id
        _version
        _deleted
        gpa
        createdAt
        attachmentID
        applicationAttachmentId
        _lastChangedAt
        studentCPR
        status
        updatedAt
        attachment {
          id
          transcriptDoc
          signedContractDoc
          schoolCertificate
          cprDoc
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        programs {
          items {
            id
            choiceOrder
            acceptanceLetterDoc
            program {
              id
              name
              nameAr
              requirements
              requirementsAr
              availability
              university {
                id
                name
                nameAr
                isException
                isExtended
                isDeactivated
                isTrashed
              }
              _version
              _deleted
            }
            _version
            _deleted
          }
        }
        studentLogs {
          items {
            id
            dateTime
            studentCPR
            snapshot
            reason
            applicationStudentLogsId
            applicationID
            _version
          }
        }
      }
    }
  }`;

  let res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>;

  return (res.data?.applicationsByStudentCPRAndGpa?.items ??
    []) as Application[];
}

/**
 * It queries the GraphQL API for all the programs in the database, and returns them as an array of
 * Program objects
 * @returns A list of all programs
 */
export async function listAllPrograms() {
  let q = `
  query ListAllPrograms {
    listPrograms(limit: 9999999) {
      items {
        id
        name
        nameAr
        minimumGPA
        requirements
        requirementsAr
        universityID
        universityProgramsId
        updatedAt
        createdAt
        availability
        isDeactivated
        _version
        _lastChangedAt
        _deleted
        university {
          id
          _deleted
          _version
          name
          nameAr
          availability
          isException
          isExtended
          isDeactivated
          isTrashed
        }
        isTrashed
      }
    }
  }
`;

  let res = (await API.graphql(graphqlOperation(q))) as GraphQLResult<any>; // your fetch function here
  let programs = res.data?.listPrograms.items as Program[];
  return programs;
}

/**
 * It takes in a mutation variable object, and returns a promise that resolves to a GraphQL result
 * object
 * @param {CreateAttachmentMutationVariables} mutationVars - CreateAttachmentMutationVariables
 * @returns The data from the mutation.
 */
export async function createAttachmentInDB(
  mutationVars: CreateAttachmentMutationVariables
): Promise<CreateAttachmentMutation | undefined> {
  let res = (await API.graphql({
    query: createAttachment,
    variables: mutationVars,
  })) as GraphQLResult<CreateAttachmentMutation>;

  return res.data;
}

/**
 * It takes in a mutation variable object, and returns a promise that resolves to the mutation result
 * @param {UpdateAttachmentMutationVariables} mutationVars - UpdateAttachmentMutationVariables
 * @returns The return type is a promise that resolves to an object of type UpdateAttachmentMutation.
 */
export async function updateAttachmentInDB(
  mutationVars: UpdateAttachmentMutationVariables
): Promise<UpdateAttachmentMutation | undefined> {
  let res = (await API.graphql({
    query: updateAttachment,
    variables: mutationVars,
  })) as GraphQLResult<UpdateAttachmentMutation>;

  return res.data;
}

/**
 * It takes in a mutation variable object, and returns a promise that resolves to a mutation object
 * @param {CreateApplicationMutationVariables} mutationVars - CreateApplicationMutationVariables
 * @returns The data from the mutation.
 */
export async function createApplicationInDB(
  mutationVars: CreateApplicationMutationVariables
): Promise<CreateApplicationMutation | undefined> {
  let res = (await API.graphql({
    query: createApplication,
    variables: mutationVars,
  })) as GraphQLResult<CreateApplicationMutation>;

  return res.data;
}

/**
 * It takes in a set of variables, and returns the result of the mutation
 * @param {UpdateApplicationMutationVariables} mutationVars - UpdateApplicationMutationVariables
 * @returns The data from the mutation.
 */
export async function updateApplicationInDB(
  mutationVars: UpdateApplicationMutationVariables
): Promise<UpdateApplicationMutation | undefined> {
  let res = (await API.graphql({
    query: updateApplication,
    variables: mutationVars,
  })) as GraphQLResult<UpdateApplicationMutation>;

  return res.data;
}
/**
 * It takes in a student object, and returns a promise that resolves to the updated student object
 * @param {UpdateStudentMutationVariables} mutationVars - UpdateStudentMutationVariables
 * @returns The data from the mutation.
 */
export async function updateStudentInDB(
  mutationVars: UpdateStudentMutationVariables
): Promise<UpdateStudentMutation | undefined> {
  let res = (await API.graphql({
    query: updateStudent,
    variables: mutationVars,
  })) as GraphQLResult<UpdateStudentMutation>;

  return res.data;
}

export async function updateParentInfoInDB(
  mutationVars: UpdateParentInfoMutationVariables
): Promise<UpdateParentInfoMutation | undefined> {
  let res = (await API.graphql({
    query: updateParentInfo,
    variables: mutationVars,
  })) as GraphQLResult<UpdateParentInfoMutation>;

  return res.data;
}

export async function updateScholarshipInDB(
  mutationVars: UpdateScholarshipMutationVariables
): Promise<UpdateScholarshipMutation | undefined> {
  let res = (await API.graphql({
    query: updateScholarship,
    variables: mutationVars,
  })) as GraphQLResult<UpdateScholarshipMutation>;

  return res.data;
}

/**
 * It takes in a variable of type CreateProgramChoiceMutationVariables and returns a promise of type
 * CreateProgramChoiceMutation or undefined
 * @param {CreateProgramChoiceMutationVariables} mutationVars - CreateProgramChoiceMutationVariables
 * @returns The data from the mutation.
 */
export async function createProgramChoiceInDB(
  mutationVars: CreateProgramChoiceMutationVariables
): Promise<CreateProgramChoiceMutation | undefined> {
  let res = (await API.graphql({
    query: createProgramChoice,
    variables: mutationVars,
  })) as GraphQLResult<CreateProgramChoiceMutation>;

  return res.data;
}

/**
 * It takes in a `mutationVars` object, and returns a promise that resolves to the
 * `UpdateProgramChoiceMutation` object
 * @param {UpdateProgramChoiceMutationVariables} mutationVars - UpdateProgramChoiceMutationVariables
 * @returns The data from the mutation
 */
export async function updateProgramChoiceInDB(
  mutationVars: UpdateProgramChoiceMutationVariables
): Promise<UpdateProgramChoiceMutation | undefined> {
  let res = (await API.graphql({
    query: updateProgramChoice,
    variables: mutationVars,
  })) as GraphQLResult<UpdateProgramChoiceMutation>;

  return res.data;
}

/**
 * It takes in a mutation variable object, and returns a promise that resolves to the mutation result
 * @param {CreateStudentLogMutationVariables} mutationVars - CreateStudentLogMutationVariables
 * @returns The data from the mutation
 */
export async function createStudentLogInDB(
  mutationVars: CreateStudentLogMutationVariables
): Promise<CreateStudentLogMutation | undefined> {
  let res = (await API.graphql({
    query: createStudentLog,
    variables: mutationVars,
  })) as GraphQLResult<CreateStudentLogMutation>;

  return res.data;
}

/**
 * It takes a file and a document type, and uploads the file to the AWS S3 bucket, and returns the
 * key of the file
 * @param {File} file - File - The file to be uploaded
 * @param {DocType} type - DocType - this is an enum that I have defined in my code.
 * @returns The key of the file uploaded to the storage bucket.
 */
export async function uploadFile(
  file: File,
  type: DocType,
  cpr: string,
  index?: number
) {
  try {
    let res = await Storage.put(
      `Student${cpr}/${cpr}#${DocType[type]}${
        index ? `-${index}` : ""
      }#${new Date().getTime()}`,
      file,
      {
        contentType: file.type,
      }
    );
    return res.key;
  } catch (error) {
    console.log("Error uploading file: ", error);
    return null;
  }
}
