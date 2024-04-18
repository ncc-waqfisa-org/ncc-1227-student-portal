/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateAttachmentInput = {
  id?: string | null,
  cprDoc?: string | null,
  signedContractDoc?: string | null,
  transcriptDoc?: string | null,
  schoolCertificate?: string | null,
  _version?: number | null,
};

export type ModelAttachmentConditionInput = {
  cprDoc?: ModelStringInput | null,
  signedContractDoc?: ModelStringInput | null,
  transcriptDoc?: ModelStringInput | null,
  schoolCertificate?: ModelStringInput | null,
  and?: Array< ModelAttachmentConditionInput | null > | null,
  or?: Array< ModelAttachmentConditionInput | null > | null,
  not?: ModelAttachmentConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Attachment = {
  __typename: "Attachment",
  id: string,
  cprDoc?: string | null,
  signedContractDoc?: string | null,
  transcriptDoc?: string | null,
  schoolCertificate?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateAttachmentInput = {
  id: string,
  cprDoc?: string | null,
  signedContractDoc?: string | null,
  transcriptDoc?: string | null,
  schoolCertificate?: string | null,
  _version?: number | null,
};

export type DeleteAttachmentInput = {
  id: string,
  _version?: number | null,
};

export type CreateApplicationInput = {
  id?: string | null,
  gpa?: number | null,
  verifiedGPA?: number | null,
  status?: Status | null,
  attachmentID?: string | null,
  dateTime: string,
  isEmailSent?: boolean | null,
  nationalityCategory?: Nationality | null,
  familyIncome?: FamilyIncome | null,
  schoolName?: string | null,
  schoolType?: SchoolType | null,
  studentName?: string | null,
  programID?: string | null,
  universityID?: string | null,
  studentCPR: string,
  batch?: number | null,
  score?: number | null,
  adminPoints?: number | null,
  processed?: number | null,
  isFamilyIncomeVerified?: boolean | null,
  _version?: number | null,
  programApplicationId?: string | null,
  universityApplicationsId?: string | null,
  applicationAttachmentId?: string | null,
};

export enum Status {
  APPROVED = "APPROVED",
  ELIGIBLE = "ELIGIBLE",
  REVIEW = "REVIEW",
  NOT_COMPLETED = "NOT_COMPLETED",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
}


export enum Nationality {
  BAHRAINI = "BAHRAINI",
  NON_BAHRAINI = "NON_BAHRAINI",
}


export enum FamilyIncome {
  LESS_THAN_500 = "LESS_THAN_500",
  BETWEEN_500_AND_700 = "BETWEEN_500_AND_700",
  BETWEEN_700_AND_1000 = "BETWEEN_700_AND_1000",
  LESS_THAN_1500 = "LESS_THAN_1500",
  MORE_THAN_1500 = "MORE_THAN_1500",
  OVER_1000 = "OVER_1000",
}


export enum SchoolType {
  PRIVATE = "PRIVATE",
  PUBLIC = "PUBLIC",
}


export type ModelApplicationConditionInput = {
  gpa?: ModelFloatInput | null,
  verifiedGPA?: ModelFloatInput | null,
  status?: ModelStatusInput | null,
  attachmentID?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  isEmailSent?: ModelBooleanInput | null,
  nationalityCategory?: ModelNationalityInput | null,
  familyIncome?: ModelFamilyIncomeInput | null,
  schoolName?: ModelStringInput | null,
  schoolType?: ModelSchoolTypeInput | null,
  studentName?: ModelStringInput | null,
  programID?: ModelIDInput | null,
  universityID?: ModelIDInput | null,
  studentCPR?: ModelStringInput | null,
  batch?: ModelIntInput | null,
  score?: ModelFloatInput | null,
  adminPoints?: ModelIntInput | null,
  processed?: ModelIntInput | null,
  isFamilyIncomeVerified?: ModelBooleanInput | null,
  and?: Array< ModelApplicationConditionInput | null > | null,
  or?: Array< ModelApplicationConditionInput | null > | null,
  not?: ModelApplicationConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  programApplicationId?: ModelIDInput | null,
  universityApplicationsId?: ModelIDInput | null,
  applicationAttachmentId?: ModelIDInput | null,
};

export type ModelFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelStatusInput = {
  eq?: Status | null,
  ne?: Status | null,
};

export type ModelNationalityInput = {
  eq?: Nationality | null,
  ne?: Nationality | null,
};

export type ModelFamilyIncomeInput = {
  eq?: FamilyIncome | null,
  ne?: FamilyIncome | null,
};

export type ModelSchoolTypeInput = {
  eq?: SchoolType | null,
  ne?: SchoolType | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Application = {
  __typename: "Application",
  id: string,
  gpa?: number | null,
  verifiedGPA?: number | null,
  status?: Status | null,
  attachmentID?: string | null,
  adminLogs?: ModelAdminLogConnection | null,
  studentLogs?: ModelStudentLogConnection | null,
  attachment?: Attachment | null,
  programs?: ModelProgramChoiceConnection | null,
  dateTime: string,
  isEmailSent?: boolean | null,
  nationalityCategory?: Nationality | null,
  familyIncome?: FamilyIncome | null,
  schoolName?: string | null,
  schoolType?: SchoolType | null,
  studentName?: string | null,
  programID?: string | null,
  program?: Program | null,
  universityID?: string | null,
  university?: University | null,
  studentCPR: string,
  student?: Student | null,
  batch?: number | null,
  score?: number | null,
  adminPoints?: number | null,
  processed?: number | null,
  isFamilyIncomeVerified?: boolean | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  programApplicationId?: string | null,
  universityApplicationsId?: string | null,
  applicationAttachmentId?: string | null,
};

export type ModelAdminLogConnection = {
  __typename: "ModelAdminLogConnection",
  items:  Array<AdminLog | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type AdminLog = {
  __typename: "AdminLog",
  id: string,
  applicationID: string,
  adminCPR: string,
  dateTime?: string | null,
  snapshot?: string | null,
  reason?: string | null,
  admin?: Admin | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  applicationAdminLogsId?: string | null,
  adminAdminLogsCpr?: string | null,
};

export type Admin = {
  __typename: "Admin",
  cpr: string,
  fullName?: string | null,
  email?: string | null,
  AdminLogs?: ModelAdminLogConnection | null,
  role?: AdminRole | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export enum AdminRole {
  ADMIN = "ADMIN",
  SUPER_ADMIN = "SUPER_ADMIN",
}


export type ModelStudentLogConnection = {
  __typename: "ModelStudentLogConnection",
  items:  Array<StudentLog | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type StudentLog = {
  __typename: "StudentLog",
  id: string,
  applicationID: string,
  studentCPR: string,
  dateTime?: string | null,
  snapshot?: string | null,
  reason?: string | null,
  student?: Student | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  applicationStudentLogsId?: string | null,
  studentStudentLogsCpr?: string | null,
};

export type Student = {
  __typename: "Student",
  cpr: string,
  cprDoc?: string | null,
  fullName?: string | null,
  batch?: number | null,
  email?: string | null,
  phone?: string | null,
  gender?: Gender | null,
  nationalityCategory?: Nationality | null,
  nationality?: string | null,
  schoolName?: string | null,
  schoolType?: SchoolType | null,
  specialization?: string | null,
  placeOfBirth?: string | null,
  studentOrderAmongSiblings?: number | null,
  familyIncome?: FamilyIncome | null,
  familyIncomeProofDoc?: string | null,
  familyIncomeProofDocs?: Array< string | null > | null,
  preferredLanguage?: Language | null,
  graduationDate?: string | null,
  address?: string | null,
  applications?: ModelApplicationConnection | null,
  ParentInfo?: ParentInfo | null,
  parentInfoID?: string | null,
  StudentLogs?: ModelStudentLogConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
}


export enum Language {
  ARABIC = "ARABIC",
  ENGLISH = "ENGLISH",
}


export type ModelApplicationConnection = {
  __typename: "ModelApplicationConnection",
  items:  Array<Application | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ParentInfo = {
  __typename: "ParentInfo",
  id: string,
  guardianFullName?: string | null,
  relation?: string | null,
  guardianCPR?: string | null,
  primaryMobile?: string | null,
  secondaryMobile?: string | null,
  fatherFullName?: string | null,
  fatherCPR?: string | null,
  motherFullName?: string | null,
  motherCPR?: string | null,
  numberOfFamilyMembers?: number | null,
  address?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelProgramChoiceConnection = {
  __typename: "ModelProgramChoiceConnection",
  items:  Array<ProgramChoice | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ProgramChoice = {
  __typename: "ProgramChoice",
  id: string,
  programID: string,
  applicationID: string,
  program?: Program | null,
  application?: Application | null,
  choiceOrder?: number | null,
  acceptanceLetterDoc?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  applicationProgramsId?: string | null,
  programApplicationsId?: string | null,
};

export type Program = {
  __typename: "Program",
  id: string,
  name?: string | null,
  minimumGPA?: number | null,
  requirements?: string | null,
  nameAr?: string | null,
  requirementsAr?: string | null,
  availability?: number | null,
  universityID: string,
  university?: University | null,
  applications?: ModelProgramChoiceConnection | null,
  isDeactivated?: boolean | null,
  isTrashed?: boolean | null,
  application?: ModelApplicationConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
  universityProgramsId?: string | null,
};

export type University = {
  __typename: "University",
  id: string,
  name?: string | null,
  nameAr?: string | null,
  Programs?: ModelProgramConnection | null,
  availability?: number | null,
  isDeactivated?: boolean | null,
  isExtended?: number | null,
  extensionDuration?: number | null,
  isException?: number | null,
  isTrashed?: boolean | null,
  applications?: ModelApplicationConnection | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type ModelProgramConnection = {
  __typename: "ModelProgramConnection",
  items:  Array<Program | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type UpdateApplicationInput = {
  id: string,
  gpa?: number | null,
  verifiedGPA?: number | null,
  status?: Status | null,
  attachmentID?: string | null,
  dateTime?: string | null,
  isEmailSent?: boolean | null,
  nationalityCategory?: Nationality | null,
  familyIncome?: FamilyIncome | null,
  schoolName?: string | null,
  schoolType?: SchoolType | null,
  studentName?: string | null,
  programID?: string | null,
  universityID?: string | null,
  studentCPR?: string | null,
  batch?: number | null,
  score?: number | null,
  adminPoints?: number | null,
  processed?: number | null,
  isFamilyIncomeVerified?: boolean | null,
  _version?: number | null,
  programApplicationId?: string | null,
  universityApplicationsId?: string | null,
  applicationAttachmentId?: string | null,
};

export type DeleteApplicationInput = {
  id: string,
  _version?: number | null,
};

export type CreateProgramChoiceInput = {
  id?: string | null,
  programID: string,
  applicationID: string,
  choiceOrder?: number | null,
  acceptanceLetterDoc?: string | null,
  _version?: number | null,
  applicationProgramsId?: string | null,
  programApplicationsId?: string | null,
};

export type ModelProgramChoiceConditionInput = {
  programID?: ModelIDInput | null,
  applicationID?: ModelIDInput | null,
  choiceOrder?: ModelIntInput | null,
  acceptanceLetterDoc?: ModelStringInput | null,
  and?: Array< ModelProgramChoiceConditionInput | null > | null,
  or?: Array< ModelProgramChoiceConditionInput | null > | null,
  not?: ModelProgramChoiceConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  applicationProgramsId?: ModelIDInput | null,
  programApplicationsId?: ModelIDInput | null,
};

export type UpdateProgramChoiceInput = {
  id: string,
  programID?: string | null,
  applicationID?: string | null,
  choiceOrder?: number | null,
  acceptanceLetterDoc?: string | null,
  _version?: number | null,
  applicationProgramsId?: string | null,
  programApplicationsId?: string | null,
};

export type DeleteProgramChoiceInput = {
  id: string,
  _version?: number | null,
};

export type CreateProgramInput = {
  id?: string | null,
  name?: string | null,
  minimumGPA?: number | null,
  requirements?: string | null,
  nameAr?: string | null,
  requirementsAr?: string | null,
  availability?: number | null,
  universityID: string,
  isDeactivated?: boolean | null,
  isTrashed?: boolean | null,
  _version?: number | null,
  universityProgramsId?: string | null,
};

export type ModelProgramConditionInput = {
  name?: ModelStringInput | null,
  minimumGPA?: ModelFloatInput | null,
  requirements?: ModelStringInput | null,
  nameAr?: ModelStringInput | null,
  requirementsAr?: ModelStringInput | null,
  availability?: ModelIntInput | null,
  universityID?: ModelIDInput | null,
  isDeactivated?: ModelBooleanInput | null,
  isTrashed?: ModelBooleanInput | null,
  and?: Array< ModelProgramConditionInput | null > | null,
  or?: Array< ModelProgramConditionInput | null > | null,
  not?: ModelProgramConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  universityProgramsId?: ModelIDInput | null,
};

export type UpdateProgramInput = {
  id: string,
  name?: string | null,
  minimumGPA?: number | null,
  requirements?: string | null,
  nameAr?: string | null,
  requirementsAr?: string | null,
  availability?: number | null,
  universityID?: string | null,
  isDeactivated?: boolean | null,
  isTrashed?: boolean | null,
  _version?: number | null,
  universityProgramsId?: string | null,
};

export type DeleteProgramInput = {
  id: string,
  _version?: number | null,
};

export type CreateUniversityInput = {
  id?: string | null,
  name?: string | null,
  nameAr?: string | null,
  availability?: number | null,
  isDeactivated?: boolean | null,
  isExtended?: number | null,
  extensionDuration?: number | null,
  isException?: number | null,
  isTrashed?: boolean | null,
  _version?: number | null,
};

export type ModelUniversityConditionInput = {
  name?: ModelStringInput | null,
  nameAr?: ModelStringInput | null,
  availability?: ModelIntInput | null,
  isDeactivated?: ModelBooleanInput | null,
  isExtended?: ModelIntInput | null,
  extensionDuration?: ModelIntInput | null,
  isException?: ModelIntInput | null,
  isTrashed?: ModelBooleanInput | null,
  and?: Array< ModelUniversityConditionInput | null > | null,
  or?: Array< ModelUniversityConditionInput | null > | null,
  not?: ModelUniversityConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type UpdateUniversityInput = {
  id: string,
  name?: string | null,
  nameAr?: string | null,
  availability?: number | null,
  isDeactivated?: boolean | null,
  isExtended?: number | null,
  extensionDuration?: number | null,
  isException?: number | null,
  isTrashed?: boolean | null,
  _version?: number | null,
};

export type DeleteUniversityInput = {
  id: string,
  _version?: number | null,
};

export type CreateAdminLogInput = {
  id?: string | null,
  applicationID: string,
  adminCPR: string,
  dateTime?: string | null,
  snapshot?: string | null,
  reason?: string | null,
  _version?: number | null,
  applicationAdminLogsId?: string | null,
  adminAdminLogsCpr?: string | null,
};

export type ModelAdminLogConditionInput = {
  applicationID?: ModelIDInput | null,
  adminCPR?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  snapshot?: ModelStringInput | null,
  reason?: ModelStringInput | null,
  and?: Array< ModelAdminLogConditionInput | null > | null,
  or?: Array< ModelAdminLogConditionInput | null > | null,
  not?: ModelAdminLogConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  applicationAdminLogsId?: ModelIDInput | null,
  adminAdminLogsCpr?: ModelStringInput | null,
};

export type UpdateAdminLogInput = {
  id: string,
  applicationID?: string | null,
  adminCPR?: string | null,
  dateTime?: string | null,
  snapshot?: string | null,
  reason?: string | null,
  _version?: number | null,
  applicationAdminLogsId?: string | null,
  adminAdminLogsCpr?: string | null,
};

export type DeleteAdminLogInput = {
  id: string,
  _version?: number | null,
};

export type CreateStudentLogInput = {
  id?: string | null,
  applicationID: string,
  studentCPR: string,
  dateTime?: string | null,
  snapshot?: string | null,
  reason?: string | null,
  _version?: number | null,
  applicationStudentLogsId?: string | null,
  studentStudentLogsCpr?: string | null,
};

export type ModelStudentLogConditionInput = {
  applicationID?: ModelIDInput | null,
  studentCPR?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  snapshot?: ModelStringInput | null,
  reason?: ModelStringInput | null,
  and?: Array< ModelStudentLogConditionInput | null > | null,
  or?: Array< ModelStudentLogConditionInput | null > | null,
  not?: ModelStudentLogConditionInput | null,
  _deleted?: ModelBooleanInput | null,
  applicationStudentLogsId?: ModelIDInput | null,
  studentStudentLogsCpr?: ModelStringInput | null,
};

export type UpdateStudentLogInput = {
  id: string,
  applicationID?: string | null,
  studentCPR?: string | null,
  dateTime?: string | null,
  snapshot?: string | null,
  reason?: string | null,
  _version?: number | null,
  applicationStudentLogsId?: string | null,
  studentStudentLogsCpr?: string | null,
};

export type DeleteStudentLogInput = {
  id: string,
  _version?: number | null,
};

export type CreateAdminInput = {
  cpr: string,
  fullName?: string | null,
  email?: string | null,
  role?: AdminRole | null,
  _version?: number | null,
};

export type ModelAdminConditionInput = {
  fullName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  role?: ModelAdminRoleInput | null,
  and?: Array< ModelAdminConditionInput | null > | null,
  or?: Array< ModelAdminConditionInput | null > | null,
  not?: ModelAdminConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelAdminRoleInput = {
  eq?: AdminRole | null,
  ne?: AdminRole | null,
};

export type UpdateAdminInput = {
  cpr: string,
  fullName?: string | null,
  email?: string | null,
  role?: AdminRole | null,
  _version?: number | null,
};

export type DeleteAdminInput = {
  cpr: string,
  _version?: number | null,
};

export type CreateParentInfoInput = {
  id?: string | null,
  guardianFullName?: string | null,
  relation?: string | null,
  guardianCPR?: string | null,
  primaryMobile?: string | null,
  secondaryMobile?: string | null,
  fatherFullName?: string | null,
  fatherCPR?: string | null,
  motherFullName?: string | null,
  motherCPR?: string | null,
  numberOfFamilyMembers?: number | null,
  address?: string | null,
  _version?: number | null,
};

export type ModelParentInfoConditionInput = {
  guardianFullName?: ModelStringInput | null,
  relation?: ModelStringInput | null,
  guardianCPR?: ModelStringInput | null,
  primaryMobile?: ModelStringInput | null,
  secondaryMobile?: ModelStringInput | null,
  fatherFullName?: ModelStringInput | null,
  fatherCPR?: ModelStringInput | null,
  motherFullName?: ModelStringInput | null,
  motherCPR?: ModelStringInput | null,
  numberOfFamilyMembers?: ModelIntInput | null,
  address?: ModelStringInput | null,
  and?: Array< ModelParentInfoConditionInput | null > | null,
  or?: Array< ModelParentInfoConditionInput | null > | null,
  not?: ModelParentInfoConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type UpdateParentInfoInput = {
  id: string,
  guardianFullName?: string | null,
  relation?: string | null,
  guardianCPR?: string | null,
  primaryMobile?: string | null,
  secondaryMobile?: string | null,
  fatherFullName?: string | null,
  fatherCPR?: string | null,
  motherFullName?: string | null,
  motherCPR?: string | null,
  numberOfFamilyMembers?: number | null,
  address?: string | null,
  _version?: number | null,
};

export type DeleteParentInfoInput = {
  id: string,
  _version?: number | null,
};

export type CreateStudentInput = {
  cpr: string,
  cprDoc?: string | null,
  fullName?: string | null,
  batch?: number | null,
  email?: string | null,
  phone?: string | null,
  gender?: Gender | null,
  nationalityCategory?: Nationality | null,
  nationality?: string | null,
  schoolName?: string | null,
  schoolType?: SchoolType | null,
  specialization?: string | null,
  placeOfBirth?: string | null,
  studentOrderAmongSiblings?: number | null,
  familyIncome?: FamilyIncome | null,
  familyIncomeProofDoc?: string | null,
  familyIncomeProofDocs?: Array< string | null > | null,
  preferredLanguage?: Language | null,
  graduationDate?: string | null,
  address?: string | null,
  parentInfoID?: string | null,
  _version?: number | null,
};

export type ModelStudentConditionInput = {
  cprDoc?: ModelStringInput | null,
  fullName?: ModelStringInput | null,
  batch?: ModelIntInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  gender?: ModelGenderInput | null,
  nationalityCategory?: ModelNationalityInput | null,
  nationality?: ModelStringInput | null,
  schoolName?: ModelStringInput | null,
  schoolType?: ModelSchoolTypeInput | null,
  specialization?: ModelStringInput | null,
  placeOfBirth?: ModelStringInput | null,
  studentOrderAmongSiblings?: ModelIntInput | null,
  familyIncome?: ModelFamilyIncomeInput | null,
  familyIncomeProofDoc?: ModelStringInput | null,
  familyIncomeProofDocs?: ModelStringInput | null,
  preferredLanguage?: ModelLanguageInput | null,
  graduationDate?: ModelStringInput | null,
  address?: ModelStringInput | null,
  parentInfoID?: ModelIDInput | null,
  and?: Array< ModelStudentConditionInput | null > | null,
  or?: Array< ModelStudentConditionInput | null > | null,
  not?: ModelStudentConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelGenderInput = {
  eq?: Gender | null,
  ne?: Gender | null,
};

export type ModelLanguageInput = {
  eq?: Language | null,
  ne?: Language | null,
};

export type UpdateStudentInput = {
  cpr: string,
  cprDoc?: string | null,
  fullName?: string | null,
  batch?: number | null,
  email?: string | null,
  phone?: string | null,
  gender?: Gender | null,
  nationalityCategory?: Nationality | null,
  nationality?: string | null,
  schoolName?: string | null,
  schoolType?: SchoolType | null,
  specialization?: string | null,
  placeOfBirth?: string | null,
  studentOrderAmongSiblings?: number | null,
  familyIncome?: FamilyIncome | null,
  familyIncomeProofDoc?: string | null,
  familyIncomeProofDocs?: Array< string | null > | null,
  preferredLanguage?: Language | null,
  graduationDate?: string | null,
  address?: string | null,
  parentInfoID?: string | null,
  _version?: number | null,
};

export type DeleteStudentInput = {
  cpr: string,
  _version?: number | null,
};

export type CreateBatchInput = {
  batch: number,
  createApplicationStartDate?: string | null,
  createApplicationEndDate?: string | null,
  updateApplicationEndDate?: string | null,
  signUpStartDate?: string | null,
  signUpEndDate?: string | null,
  _version?: number | null,
};

export type ModelBatchConditionInput = {
  createApplicationStartDate?: ModelStringInput | null,
  createApplicationEndDate?: ModelStringInput | null,
  updateApplicationEndDate?: ModelStringInput | null,
  signUpStartDate?: ModelStringInput | null,
  signUpEndDate?: ModelStringInput | null,
  and?: Array< ModelBatchConditionInput | null > | null,
  or?: Array< ModelBatchConditionInput | null > | null,
  not?: ModelBatchConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type Batch = {
  __typename: "Batch",
  batch: number,
  createApplicationStartDate?: string | null,
  createApplicationEndDate?: string | null,
  updateApplicationEndDate?: string | null,
  signUpStartDate?: string | null,
  signUpEndDate?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateBatchInput = {
  batch: number,
  createApplicationStartDate?: string | null,
  createApplicationEndDate?: string | null,
  updateApplicationEndDate?: string | null,
  signUpStartDate?: string | null,
  signUpEndDate?: string | null,
  _version?: number | null,
};

export type DeleteBatchInput = {
  batch: number,
  _version?: number | null,
};

export type CreateScholarshipInput = {
  id?: string | null,
  status?: ScholarshipStatus | null,
  applicationID: string,
  batch?: number | null,
  isConfirmed?: boolean | null,
  studentCPR?: string | null,
  unsignedContractDoc?: string | null,
  signedContractDoc?: string | null,
  studentSignature?: string | null,
  guardianSignature?: string | null,
  bankName?: string | null,
  IBAN?: string | null,
  IBANLetterDoc?: string | null,
  _version?: number | null,
};

export enum ScholarshipStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  WITHDRAWN = "WITHDRAWN",
}


export type ModelScholarshipConditionInput = {
  status?: ModelScholarshipStatusInput | null,
  applicationID?: ModelIDInput | null,
  batch?: ModelIntInput | null,
  isConfirmed?: ModelBooleanInput | null,
  studentCPR?: ModelStringInput | null,
  unsignedContractDoc?: ModelStringInput | null,
  signedContractDoc?: ModelStringInput | null,
  studentSignature?: ModelStringInput | null,
  guardianSignature?: ModelStringInput | null,
  bankName?: ModelStringInput | null,
  IBAN?: ModelStringInput | null,
  IBANLetterDoc?: ModelStringInput | null,
  and?: Array< ModelScholarshipConditionInput | null > | null,
  or?: Array< ModelScholarshipConditionInput | null > | null,
  not?: ModelScholarshipConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelScholarshipStatusInput = {
  eq?: ScholarshipStatus | null,
  ne?: ScholarshipStatus | null,
};

export type Scholarship = {
  __typename: "Scholarship",
  id: string,
  status?: ScholarshipStatus | null,
  applicationID: string,
  batch?: number | null,
  isConfirmed?: boolean | null,
  application?: Application | null,
  studentCPR?: string | null,
  unsignedContractDoc?: string | null,
  signedContractDoc?: string | null,
  studentSignature?: string | null,
  guardianSignature?: string | null,
  bankName?: string | null,
  IBAN?: string | null,
  IBANLetterDoc?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateScholarshipInput = {
  id: string,
  status?: ScholarshipStatus | null,
  applicationID?: string | null,
  batch?: number | null,
  isConfirmed?: boolean | null,
  studentCPR?: string | null,
  unsignedContractDoc?: string | null,
  signedContractDoc?: string | null,
  studentSignature?: string | null,
  guardianSignature?: string | null,
  bankName?: string | null,
  IBAN?: string | null,
  IBANLetterDoc?: string | null,
  _version?: number | null,
};

export type DeleteScholarshipInput = {
  id: string,
  _version?: number | null,
};

export type CreateStatisticsInput = {
  id: number,
  batch: number,
  totalApplications?: number | null,
  totalApplicationsPerStatus?: string | null,
  scoreHistogram?: string | null,
  gpaHistogram?: string | null,
  totalApplicationsPerUniversity?: string | null,
  topUniversities?: string | null,
  _version?: number | null,
};

export type ModelStatisticsConditionInput = {
  batch?: ModelIntInput | null,
  totalApplications?: ModelIntInput | null,
  totalApplicationsPerStatus?: ModelStringInput | null,
  scoreHistogram?: ModelStringInput | null,
  gpaHistogram?: ModelStringInput | null,
  totalApplicationsPerUniversity?: ModelStringInput | null,
  topUniversities?: ModelStringInput | null,
  and?: Array< ModelStatisticsConditionInput | null > | null,
  or?: Array< ModelStatisticsConditionInput | null > | null,
  not?: ModelStatisticsConditionInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type Statistics = {
  __typename: "Statistics",
  id: number,
  batch: number,
  totalApplications?: number | null,
  totalApplicationsPerStatus?: string | null,
  scoreHistogram?: string | null,
  gpaHistogram?: string | null,
  totalApplicationsPerUniversity?: string | null,
  topUniversities?: string | null,
  createdAt: string,
  updatedAt: string,
  _version: number,
  _deleted?: boolean | null,
  _lastChangedAt: number,
};

export type UpdateStatisticsInput = {
  id: number,
  batch?: number | null,
  totalApplications?: number | null,
  totalApplicationsPerStatus?: string | null,
  scoreHistogram?: string | null,
  gpaHistogram?: string | null,
  totalApplicationsPerUniversity?: string | null,
  topUniversities?: string | null,
  _version?: number | null,
};

export type DeleteStatisticsInput = {
  id: number,
  _version?: number | null,
};

export type ModelAttachmentFilterInput = {
  id?: ModelIDInput | null,
  cprDoc?: ModelStringInput | null,
  signedContractDoc?: ModelStringInput | null,
  transcriptDoc?: ModelStringInput | null,
  schoolCertificate?: ModelStringInput | null,
  and?: Array< ModelAttachmentFilterInput | null > | null,
  or?: Array< ModelAttachmentFilterInput | null > | null,
  not?: ModelAttachmentFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelAttachmentConnection = {
  __typename: "ModelAttachmentConnection",
  items:  Array<Attachment | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelApplicationFilterInput = {
  id?: ModelIDInput | null,
  gpa?: ModelFloatInput | null,
  verifiedGPA?: ModelFloatInput | null,
  status?: ModelStatusInput | null,
  attachmentID?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  isEmailSent?: ModelBooleanInput | null,
  nationalityCategory?: ModelNationalityInput | null,
  familyIncome?: ModelFamilyIncomeInput | null,
  schoolName?: ModelStringInput | null,
  schoolType?: ModelSchoolTypeInput | null,
  studentName?: ModelStringInput | null,
  programID?: ModelIDInput | null,
  universityID?: ModelIDInput | null,
  studentCPR?: ModelStringInput | null,
  batch?: ModelIntInput | null,
  score?: ModelFloatInput | null,
  adminPoints?: ModelIntInput | null,
  processed?: ModelIntInput | null,
  isFamilyIncomeVerified?: ModelBooleanInput | null,
  and?: Array< ModelApplicationFilterInput | null > | null,
  or?: Array< ModelApplicationFilterInput | null > | null,
  not?: ModelApplicationFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  programApplicationId?: ModelIDInput | null,
  universityApplicationsId?: ModelIDInput | null,
  applicationAttachmentId?: ModelIDInput | null,
};

export type ModelProgramChoiceFilterInput = {
  id?: ModelIDInput | null,
  programID?: ModelIDInput | null,
  applicationID?: ModelIDInput | null,
  choiceOrder?: ModelIntInput | null,
  acceptanceLetterDoc?: ModelStringInput | null,
  and?: Array< ModelProgramChoiceFilterInput | null > | null,
  or?: Array< ModelProgramChoiceFilterInput | null > | null,
  not?: ModelProgramChoiceFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  applicationProgramsId?: ModelIDInput | null,
  programApplicationsId?: ModelIDInput | null,
};

export type ModelProgramFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  minimumGPA?: ModelFloatInput | null,
  requirements?: ModelStringInput | null,
  nameAr?: ModelStringInput | null,
  requirementsAr?: ModelStringInput | null,
  availability?: ModelIntInput | null,
  universityID?: ModelIDInput | null,
  isDeactivated?: ModelBooleanInput | null,
  isTrashed?: ModelBooleanInput | null,
  and?: Array< ModelProgramFilterInput | null > | null,
  or?: Array< ModelProgramFilterInput | null > | null,
  not?: ModelProgramFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  universityProgramsId?: ModelIDInput | null,
};

export type ModelUniversityFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  nameAr?: ModelStringInput | null,
  availability?: ModelIntInput | null,
  isDeactivated?: ModelBooleanInput | null,
  isExtended?: ModelIntInput | null,
  extensionDuration?: ModelIntInput | null,
  isException?: ModelIntInput | null,
  isTrashed?: ModelBooleanInput | null,
  and?: Array< ModelUniversityFilterInput | null > | null,
  or?: Array< ModelUniversityFilterInput | null > | null,
  not?: ModelUniversityFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelUniversityConnection = {
  __typename: "ModelUniversityConnection",
  items:  Array<University | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelAdminLogFilterInput = {
  id?: ModelIDInput | null,
  applicationID?: ModelIDInput | null,
  adminCPR?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  snapshot?: ModelStringInput | null,
  reason?: ModelStringInput | null,
  and?: Array< ModelAdminLogFilterInput | null > | null,
  or?: Array< ModelAdminLogFilterInput | null > | null,
  not?: ModelAdminLogFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  applicationAdminLogsId?: ModelIDInput | null,
  adminAdminLogsCpr?: ModelStringInput | null,
};

export type ModelStudentLogFilterInput = {
  id?: ModelIDInput | null,
  applicationID?: ModelIDInput | null,
  studentCPR?: ModelStringInput | null,
  dateTime?: ModelStringInput | null,
  snapshot?: ModelStringInput | null,
  reason?: ModelStringInput | null,
  and?: Array< ModelStudentLogFilterInput | null > | null,
  or?: Array< ModelStudentLogFilterInput | null > | null,
  not?: ModelStudentLogFilterInput | null,
  _deleted?: ModelBooleanInput | null,
  applicationStudentLogsId?: ModelIDInput | null,
  studentStudentLogsCpr?: ModelStringInput | null,
};

export type ModelAdminFilterInput = {
  cpr?: ModelStringInput | null,
  fullName?: ModelStringInput | null,
  email?: ModelStringInput | null,
  role?: ModelAdminRoleInput | null,
  and?: Array< ModelAdminFilterInput | null > | null,
  or?: Array< ModelAdminFilterInput | null > | null,
  not?: ModelAdminFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelAdminConnection = {
  __typename: "ModelAdminConnection",
  items:  Array<Admin | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelParentInfoFilterInput = {
  id?: ModelIDInput | null,
  guardianFullName?: ModelStringInput | null,
  relation?: ModelStringInput | null,
  guardianCPR?: ModelStringInput | null,
  primaryMobile?: ModelStringInput | null,
  secondaryMobile?: ModelStringInput | null,
  fatherFullName?: ModelStringInput | null,
  fatherCPR?: ModelStringInput | null,
  motherFullName?: ModelStringInput | null,
  motherCPR?: ModelStringInput | null,
  numberOfFamilyMembers?: ModelIntInput | null,
  address?: ModelStringInput | null,
  and?: Array< ModelParentInfoFilterInput | null > | null,
  or?: Array< ModelParentInfoFilterInput | null > | null,
  not?: ModelParentInfoFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelParentInfoConnection = {
  __typename: "ModelParentInfoConnection",
  items:  Array<ParentInfo | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelStudentFilterInput = {
  cpr?: ModelStringInput | null,
  cprDoc?: ModelStringInput | null,
  fullName?: ModelStringInput | null,
  batch?: ModelIntInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  gender?: ModelGenderInput | null,
  nationalityCategory?: ModelNationalityInput | null,
  nationality?: ModelStringInput | null,
  schoolName?: ModelStringInput | null,
  schoolType?: ModelSchoolTypeInput | null,
  specialization?: ModelStringInput | null,
  placeOfBirth?: ModelStringInput | null,
  studentOrderAmongSiblings?: ModelIntInput | null,
  familyIncome?: ModelFamilyIncomeInput | null,
  familyIncomeProofDoc?: ModelStringInput | null,
  familyIncomeProofDocs?: ModelStringInput | null,
  preferredLanguage?: ModelLanguageInput | null,
  graduationDate?: ModelStringInput | null,
  address?: ModelStringInput | null,
  parentInfoID?: ModelIDInput | null,
  and?: Array< ModelStudentFilterInput | null > | null,
  or?: Array< ModelStudentFilterInput | null > | null,
  not?: ModelStudentFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelStudentConnection = {
  __typename: "ModelStudentConnection",
  items:  Array<Student | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelBatchFilterInput = {
  batch?: ModelIntInput | null,
  createApplicationStartDate?: ModelStringInput | null,
  createApplicationEndDate?: ModelStringInput | null,
  updateApplicationEndDate?: ModelStringInput | null,
  signUpStartDate?: ModelStringInput | null,
  signUpEndDate?: ModelStringInput | null,
  and?: Array< ModelBatchFilterInput | null > | null,
  or?: Array< ModelBatchFilterInput | null > | null,
  not?: ModelBatchFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelBatchConnection = {
  __typename: "ModelBatchConnection",
  items:  Array<Batch | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelScholarshipFilterInput = {
  id?: ModelIDInput | null,
  status?: ModelScholarshipStatusInput | null,
  applicationID?: ModelIDInput | null,
  batch?: ModelIntInput | null,
  isConfirmed?: ModelBooleanInput | null,
  studentCPR?: ModelStringInput | null,
  unsignedContractDoc?: ModelStringInput | null,
  signedContractDoc?: ModelStringInput | null,
  studentSignature?: ModelStringInput | null,
  guardianSignature?: ModelStringInput | null,
  bankName?: ModelStringInput | null,
  IBAN?: ModelStringInput | null,
  IBANLetterDoc?: ModelStringInput | null,
  and?: Array< ModelScholarshipFilterInput | null > | null,
  or?: Array< ModelScholarshipFilterInput | null > | null,
  not?: ModelScholarshipFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelScholarshipConnection = {
  __typename: "ModelScholarshipConnection",
  items:  Array<Scholarship | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelStatisticsFilterInput = {
  id?: ModelIntInput | null,
  batch?: ModelIntInput | null,
  totalApplications?: ModelIntInput | null,
  totalApplicationsPerStatus?: ModelStringInput | null,
  scoreHistogram?: ModelStringInput | null,
  gpaHistogram?: ModelStringInput | null,
  totalApplicationsPerUniversity?: ModelStringInput | null,
  topUniversities?: ModelStringInput | null,
  and?: Array< ModelStatisticsFilterInput | null > | null,
  or?: Array< ModelStatisticsFilterInput | null > | null,
  not?: ModelStatisticsFilterInput | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelStatisticsConnection = {
  __typename: "ModelStatisticsConnection",
  items:  Array<Statistics | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelIntKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelFloatKeyConditionInput = {
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelSubscriptionAttachmentFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  cprDoc?: ModelSubscriptionStringInput | null,
  signedContractDoc?: ModelSubscriptionStringInput | null,
  transcriptDoc?: ModelSubscriptionStringInput | null,
  schoolCertificate?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAttachmentFilterInput | null > | null,
  or?: Array< ModelSubscriptionAttachmentFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionApplicationFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  gpa?: ModelSubscriptionFloatInput | null,
  verifiedGPA?: ModelSubscriptionFloatInput | null,
  status?: ModelSubscriptionStringInput | null,
  attachmentID?: ModelSubscriptionStringInput | null,
  dateTime?: ModelSubscriptionStringInput | null,
  isEmailSent?: ModelSubscriptionBooleanInput | null,
  nationalityCategory?: ModelSubscriptionStringInput | null,
  familyIncome?: ModelSubscriptionStringInput | null,
  schoolName?: ModelSubscriptionStringInput | null,
  schoolType?: ModelSubscriptionStringInput | null,
  studentName?: ModelSubscriptionStringInput | null,
  programID?: ModelSubscriptionIDInput | null,
  universityID?: ModelSubscriptionIDInput | null,
  studentCPR?: ModelSubscriptionStringInput | null,
  batch?: ModelSubscriptionIntInput | null,
  score?: ModelSubscriptionFloatInput | null,
  adminPoints?: ModelSubscriptionIntInput | null,
  processed?: ModelSubscriptionIntInput | null,
  isFamilyIncomeVerified?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionApplicationFilterInput | null > | null,
  or?: Array< ModelSubscriptionApplicationFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionFloatInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type ModelSubscriptionProgramChoiceFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  programID?: ModelSubscriptionIDInput | null,
  applicationID?: ModelSubscriptionIDInput | null,
  choiceOrder?: ModelSubscriptionIntInput | null,
  acceptanceLetterDoc?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionProgramChoiceFilterInput | null > | null,
  or?: Array< ModelSubscriptionProgramChoiceFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionProgramFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  minimumGPA?: ModelSubscriptionFloatInput | null,
  requirements?: ModelSubscriptionStringInput | null,
  nameAr?: ModelSubscriptionStringInput | null,
  requirementsAr?: ModelSubscriptionStringInput | null,
  availability?: ModelSubscriptionIntInput | null,
  universityID?: ModelSubscriptionIDInput | null,
  isDeactivated?: ModelSubscriptionBooleanInput | null,
  isTrashed?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionProgramFilterInput | null > | null,
  or?: Array< ModelSubscriptionProgramFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionUniversityFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  nameAr?: ModelSubscriptionStringInput | null,
  availability?: ModelSubscriptionIntInput | null,
  isDeactivated?: ModelSubscriptionBooleanInput | null,
  isExtended?: ModelSubscriptionIntInput | null,
  extensionDuration?: ModelSubscriptionIntInput | null,
  isException?: ModelSubscriptionIntInput | null,
  isTrashed?: ModelSubscriptionBooleanInput | null,
  and?: Array< ModelSubscriptionUniversityFilterInput | null > | null,
  or?: Array< ModelSubscriptionUniversityFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionAdminLogFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  applicationID?: ModelSubscriptionIDInput | null,
  adminCPR?: ModelSubscriptionStringInput | null,
  dateTime?: ModelSubscriptionStringInput | null,
  snapshot?: ModelSubscriptionStringInput | null,
  reason?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAdminLogFilterInput | null > | null,
  or?: Array< ModelSubscriptionAdminLogFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionStudentLogFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  applicationID?: ModelSubscriptionIDInput | null,
  studentCPR?: ModelSubscriptionStringInput | null,
  dateTime?: ModelSubscriptionStringInput | null,
  snapshot?: ModelSubscriptionStringInput | null,
  reason?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionStudentLogFilterInput | null > | null,
  or?: Array< ModelSubscriptionStudentLogFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionAdminFilterInput = {
  cpr?: ModelSubscriptionStringInput | null,
  fullName?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  role?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionAdminFilterInput | null > | null,
  or?: Array< ModelSubscriptionAdminFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionParentInfoFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  guardianFullName?: ModelSubscriptionStringInput | null,
  relation?: ModelSubscriptionStringInput | null,
  guardianCPR?: ModelSubscriptionStringInput | null,
  primaryMobile?: ModelSubscriptionStringInput | null,
  secondaryMobile?: ModelSubscriptionStringInput | null,
  fatherFullName?: ModelSubscriptionStringInput | null,
  fatherCPR?: ModelSubscriptionStringInput | null,
  motherFullName?: ModelSubscriptionStringInput | null,
  motherCPR?: ModelSubscriptionStringInput | null,
  numberOfFamilyMembers?: ModelSubscriptionIntInput | null,
  address?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionParentInfoFilterInput | null > | null,
  or?: Array< ModelSubscriptionParentInfoFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionStudentFilterInput = {
  cpr?: ModelSubscriptionStringInput | null,
  cprDoc?: ModelSubscriptionStringInput | null,
  fullName?: ModelSubscriptionStringInput | null,
  batch?: ModelSubscriptionIntInput | null,
  email?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  gender?: ModelSubscriptionStringInput | null,
  nationalityCategory?: ModelSubscriptionStringInput | null,
  nationality?: ModelSubscriptionStringInput | null,
  schoolName?: ModelSubscriptionStringInput | null,
  schoolType?: ModelSubscriptionStringInput | null,
  specialization?: ModelSubscriptionStringInput | null,
  placeOfBirth?: ModelSubscriptionStringInput | null,
  studentOrderAmongSiblings?: ModelSubscriptionIntInput | null,
  familyIncome?: ModelSubscriptionStringInput | null,
  familyIncomeProofDoc?: ModelSubscriptionStringInput | null,
  familyIncomeProofDocs?: ModelSubscriptionStringInput | null,
  preferredLanguage?: ModelSubscriptionStringInput | null,
  graduationDate?: ModelSubscriptionStringInput | null,
  address?: ModelSubscriptionStringInput | null,
  parentInfoID?: ModelSubscriptionIDInput | null,
  and?: Array< ModelSubscriptionStudentFilterInput | null > | null,
  or?: Array< ModelSubscriptionStudentFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionBatchFilterInput = {
  batch?: ModelSubscriptionIntInput | null,
  createApplicationStartDate?: ModelSubscriptionStringInput | null,
  createApplicationEndDate?: ModelSubscriptionStringInput | null,
  updateApplicationEndDate?: ModelSubscriptionStringInput | null,
  signUpStartDate?: ModelSubscriptionStringInput | null,
  signUpEndDate?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionBatchFilterInput | null > | null,
  or?: Array< ModelSubscriptionBatchFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionScholarshipFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  status?: ModelSubscriptionStringInput | null,
  applicationID?: ModelSubscriptionIDInput | null,
  batch?: ModelSubscriptionIntInput | null,
  isConfirmed?: ModelSubscriptionBooleanInput | null,
  studentCPR?: ModelSubscriptionStringInput | null,
  unsignedContractDoc?: ModelSubscriptionStringInput | null,
  signedContractDoc?: ModelSubscriptionStringInput | null,
  studentSignature?: ModelSubscriptionStringInput | null,
  guardianSignature?: ModelSubscriptionStringInput | null,
  bankName?: ModelSubscriptionStringInput | null,
  IBAN?: ModelSubscriptionStringInput | null,
  IBANLetterDoc?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionScholarshipFilterInput | null > | null,
  or?: Array< ModelSubscriptionScholarshipFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type ModelSubscriptionStatisticsFilterInput = {
  id?: ModelSubscriptionIntInput | null,
  batch?: ModelSubscriptionIntInput | null,
  totalApplications?: ModelSubscriptionIntInput | null,
  totalApplicationsPerStatus?: ModelSubscriptionStringInput | null,
  scoreHistogram?: ModelSubscriptionStringInput | null,
  gpaHistogram?: ModelSubscriptionStringInput | null,
  totalApplicationsPerUniversity?: ModelSubscriptionStringInput | null,
  topUniversities?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionStatisticsFilterInput | null > | null,
  or?: Array< ModelSubscriptionStatisticsFilterInput | null > | null,
  _deleted?: ModelBooleanInput | null,
};

export type CreateAttachmentMutationVariables = {
  input: CreateAttachmentInput,
  condition?: ModelAttachmentConditionInput | null,
};

export type CreateAttachmentMutation = {
  createAttachment?:  {
    __typename: "Attachment",
    id: string,
    cprDoc?: string | null,
    signedContractDoc?: string | null,
    transcriptDoc?: string | null,
    schoolCertificate?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateAttachmentMutationVariables = {
  input: UpdateAttachmentInput,
  condition?: ModelAttachmentConditionInput | null,
};

export type UpdateAttachmentMutation = {
  updateAttachment?:  {
    __typename: "Attachment",
    id: string,
    cprDoc?: string | null,
    signedContractDoc?: string | null,
    transcriptDoc?: string | null,
    schoolCertificate?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteAttachmentMutationVariables = {
  input: DeleteAttachmentInput,
  condition?: ModelAttachmentConditionInput | null,
};

export type DeleteAttachmentMutation = {
  deleteAttachment?:  {
    __typename: "Attachment",
    id: string,
    cprDoc?: string | null,
    signedContractDoc?: string | null,
    transcriptDoc?: string | null,
    schoolCertificate?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateApplicationMutationVariables = {
  input: CreateApplicationInput,
  condition?: ModelApplicationConditionInput | null,
};

export type CreateApplicationMutation = {
  createApplication?:  {
    __typename: "Application",
    id: string,
    gpa?: number | null,
    verifiedGPA?: number | null,
    status?: Status | null,
    attachmentID?: string | null,
    adminLogs?:  {
      __typename: "ModelAdminLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    studentLogs?:  {
      __typename: "ModelStudentLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    attachment?:  {
      __typename: "Attachment",
      id: string,
      cprDoc?: string | null,
      signedContractDoc?: string | null,
      transcriptDoc?: string | null,
      schoolCertificate?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    programs?:  {
      __typename: "ModelProgramChoiceConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    dateTime: string,
    isEmailSent?: boolean | null,
    nationalityCategory?: Nationality | null,
    familyIncome?: FamilyIncome | null,
    schoolName?: string | null,
    schoolType?: SchoolType | null,
    studentName?: string | null,
    programID?: string | null,
    program?:  {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null,
    universityID?: string | null,
    university?:  {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    studentCPR: string,
    student?:  {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    batch?: number | null,
    score?: number | null,
    adminPoints?: number | null,
    processed?: number | null,
    isFamilyIncomeVerified?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    programApplicationId?: string | null,
    universityApplicationsId?: string | null,
    applicationAttachmentId?: string | null,
  } | null,
};

export type UpdateApplicationMutationVariables = {
  input: UpdateApplicationInput,
  condition?: ModelApplicationConditionInput | null,
};

export type UpdateApplicationMutation = {
  updateApplication?:  {
    __typename: "Application",
    id: string,
    gpa?: number | null,
    verifiedGPA?: number | null,
    status?: Status | null,
    attachmentID?: string | null,
    adminLogs?:  {
      __typename: "ModelAdminLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    studentLogs?:  {
      __typename: "ModelStudentLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    attachment?:  {
      __typename: "Attachment",
      id: string,
      cprDoc?: string | null,
      signedContractDoc?: string | null,
      transcriptDoc?: string | null,
      schoolCertificate?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    programs?:  {
      __typename: "ModelProgramChoiceConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    dateTime: string,
    isEmailSent?: boolean | null,
    nationalityCategory?: Nationality | null,
    familyIncome?: FamilyIncome | null,
    schoolName?: string | null,
    schoolType?: SchoolType | null,
    studentName?: string | null,
    programID?: string | null,
    program?:  {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null,
    universityID?: string | null,
    university?:  {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    studentCPR: string,
    student?:  {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    batch?: number | null,
    score?: number | null,
    adminPoints?: number | null,
    processed?: number | null,
    isFamilyIncomeVerified?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    programApplicationId?: string | null,
    universityApplicationsId?: string | null,
    applicationAttachmentId?: string | null,
  } | null,
};

export type DeleteApplicationMutationVariables = {
  input: DeleteApplicationInput,
  condition?: ModelApplicationConditionInput | null,
};

export type DeleteApplicationMutation = {
  deleteApplication?:  {
    __typename: "Application",
    id: string,
    gpa?: number | null,
    verifiedGPA?: number | null,
    status?: Status | null,
    attachmentID?: string | null,
    adminLogs?:  {
      __typename: "ModelAdminLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    studentLogs?:  {
      __typename: "ModelStudentLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    attachment?:  {
      __typename: "Attachment",
      id: string,
      cprDoc?: string | null,
      signedContractDoc?: string | null,
      transcriptDoc?: string | null,
      schoolCertificate?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    programs?:  {
      __typename: "ModelProgramChoiceConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    dateTime: string,
    isEmailSent?: boolean | null,
    nationalityCategory?: Nationality | null,
    familyIncome?: FamilyIncome | null,
    schoolName?: string | null,
    schoolType?: SchoolType | null,
    studentName?: string | null,
    programID?: string | null,
    program?:  {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null,
    universityID?: string | null,
    university?:  {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    studentCPR: string,
    student?:  {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    batch?: number | null,
    score?: number | null,
    adminPoints?: number | null,
    processed?: number | null,
    isFamilyIncomeVerified?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    programApplicationId?: string | null,
    universityApplicationsId?: string | null,
    applicationAttachmentId?: string | null,
  } | null,
};

export type CreateProgramChoiceMutationVariables = {
  input: CreateProgramChoiceInput,
  condition?: ModelProgramChoiceConditionInput | null,
};

export type CreateProgramChoiceMutation = {
  createProgramChoice?:  {
    __typename: "ProgramChoice",
    id: string,
    programID: string,
    applicationID: string,
    program?:  {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null,
    application?:  {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null,
    choiceOrder?: number | null,
    acceptanceLetterDoc?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationProgramsId?: string | null,
    programApplicationsId?: string | null,
  } | null,
};

export type UpdateProgramChoiceMutationVariables = {
  input: UpdateProgramChoiceInput,
  condition?: ModelProgramChoiceConditionInput | null,
};

export type UpdateProgramChoiceMutation = {
  updateProgramChoice?:  {
    __typename: "ProgramChoice",
    id: string,
    programID: string,
    applicationID: string,
    program?:  {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null,
    application?:  {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null,
    choiceOrder?: number | null,
    acceptanceLetterDoc?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationProgramsId?: string | null,
    programApplicationsId?: string | null,
  } | null,
};

export type DeleteProgramChoiceMutationVariables = {
  input: DeleteProgramChoiceInput,
  condition?: ModelProgramChoiceConditionInput | null,
};

export type DeleteProgramChoiceMutation = {
  deleteProgramChoice?:  {
    __typename: "ProgramChoice",
    id: string,
    programID: string,
    applicationID: string,
    program?:  {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null,
    application?:  {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null,
    choiceOrder?: number | null,
    acceptanceLetterDoc?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationProgramsId?: string | null,
    programApplicationsId?: string | null,
  } | null,
};

export type CreateProgramMutationVariables = {
  input: CreateProgramInput,
  condition?: ModelProgramConditionInput | null,
};

export type CreateProgramMutation = {
  createProgram?:  {
    __typename: "Program",
    id: string,
    name?: string | null,
    minimumGPA?: number | null,
    requirements?: string | null,
    nameAr?: string | null,
    requirementsAr?: string | null,
    availability?: number | null,
    universityID: string,
    university?:  {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    applications?:  {
      __typename: "ModelProgramChoiceConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    isDeactivated?: boolean | null,
    isTrashed?: boolean | null,
    application?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    universityProgramsId?: string | null,
  } | null,
};

export type UpdateProgramMutationVariables = {
  input: UpdateProgramInput,
  condition?: ModelProgramConditionInput | null,
};

export type UpdateProgramMutation = {
  updateProgram?:  {
    __typename: "Program",
    id: string,
    name?: string | null,
    minimumGPA?: number | null,
    requirements?: string | null,
    nameAr?: string | null,
    requirementsAr?: string | null,
    availability?: number | null,
    universityID: string,
    university?:  {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    applications?:  {
      __typename: "ModelProgramChoiceConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    isDeactivated?: boolean | null,
    isTrashed?: boolean | null,
    application?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    universityProgramsId?: string | null,
  } | null,
};

export type DeleteProgramMutationVariables = {
  input: DeleteProgramInput,
  condition?: ModelProgramConditionInput | null,
};

export type DeleteProgramMutation = {
  deleteProgram?:  {
    __typename: "Program",
    id: string,
    name?: string | null,
    minimumGPA?: number | null,
    requirements?: string | null,
    nameAr?: string | null,
    requirementsAr?: string | null,
    availability?: number | null,
    universityID: string,
    university?:  {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    applications?:  {
      __typename: "ModelProgramChoiceConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    isDeactivated?: boolean | null,
    isTrashed?: boolean | null,
    application?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    universityProgramsId?: string | null,
  } | null,
};

export type CreateUniversityMutationVariables = {
  input: CreateUniversityInput,
  condition?: ModelUniversityConditionInput | null,
};

export type CreateUniversityMutation = {
  createUniversity?:  {
    __typename: "University",
    id: string,
    name?: string | null,
    nameAr?: string | null,
    Programs?:  {
      __typename: "ModelProgramConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    availability?: number | null,
    isDeactivated?: boolean | null,
    isExtended?: number | null,
    extensionDuration?: number | null,
    isException?: number | null,
    isTrashed?: boolean | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateUniversityMutationVariables = {
  input: UpdateUniversityInput,
  condition?: ModelUniversityConditionInput | null,
};

export type UpdateUniversityMutation = {
  updateUniversity?:  {
    __typename: "University",
    id: string,
    name?: string | null,
    nameAr?: string | null,
    Programs?:  {
      __typename: "ModelProgramConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    availability?: number | null,
    isDeactivated?: boolean | null,
    isExtended?: number | null,
    extensionDuration?: number | null,
    isException?: number | null,
    isTrashed?: boolean | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteUniversityMutationVariables = {
  input: DeleteUniversityInput,
  condition?: ModelUniversityConditionInput | null,
};

export type DeleteUniversityMutation = {
  deleteUniversity?:  {
    __typename: "University",
    id: string,
    name?: string | null,
    nameAr?: string | null,
    Programs?:  {
      __typename: "ModelProgramConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    availability?: number | null,
    isDeactivated?: boolean | null,
    isExtended?: number | null,
    extensionDuration?: number | null,
    isException?: number | null,
    isTrashed?: boolean | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateAdminLogMutationVariables = {
  input: CreateAdminLogInput,
  condition?: ModelAdminLogConditionInput | null,
};

export type CreateAdminLogMutation = {
  createAdminLog?:  {
    __typename: "AdminLog",
    id: string,
    applicationID: string,
    adminCPR: string,
    dateTime?: string | null,
    snapshot?: string | null,
    reason?: string | null,
    admin?:  {
      __typename: "Admin",
      cpr: string,
      fullName?: string | null,
      email?: string | null,
      role?: AdminRole | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationAdminLogsId?: string | null,
    adminAdminLogsCpr?: string | null,
  } | null,
};

export type UpdateAdminLogMutationVariables = {
  input: UpdateAdminLogInput,
  condition?: ModelAdminLogConditionInput | null,
};

export type UpdateAdminLogMutation = {
  updateAdminLog?:  {
    __typename: "AdminLog",
    id: string,
    applicationID: string,
    adminCPR: string,
    dateTime?: string | null,
    snapshot?: string | null,
    reason?: string | null,
    admin?:  {
      __typename: "Admin",
      cpr: string,
      fullName?: string | null,
      email?: string | null,
      role?: AdminRole | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationAdminLogsId?: string | null,
    adminAdminLogsCpr?: string | null,
  } | null,
};

export type DeleteAdminLogMutationVariables = {
  input: DeleteAdminLogInput,
  condition?: ModelAdminLogConditionInput | null,
};

export type DeleteAdminLogMutation = {
  deleteAdminLog?:  {
    __typename: "AdminLog",
    id: string,
    applicationID: string,
    adminCPR: string,
    dateTime?: string | null,
    snapshot?: string | null,
    reason?: string | null,
    admin?:  {
      __typename: "Admin",
      cpr: string,
      fullName?: string | null,
      email?: string | null,
      role?: AdminRole | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationAdminLogsId?: string | null,
    adminAdminLogsCpr?: string | null,
  } | null,
};

export type CreateStudentLogMutationVariables = {
  input: CreateStudentLogInput,
  condition?: ModelStudentLogConditionInput | null,
};

export type CreateStudentLogMutation = {
  createStudentLog?:  {
    __typename: "StudentLog",
    id: string,
    applicationID: string,
    studentCPR: string,
    dateTime?: string | null,
    snapshot?: string | null,
    reason?: string | null,
    student?:  {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationStudentLogsId?: string | null,
    studentStudentLogsCpr?: string | null,
  } | null,
};

export type UpdateStudentLogMutationVariables = {
  input: UpdateStudentLogInput,
  condition?: ModelStudentLogConditionInput | null,
};

export type UpdateStudentLogMutation = {
  updateStudentLog?:  {
    __typename: "StudentLog",
    id: string,
    applicationID: string,
    studentCPR: string,
    dateTime?: string | null,
    snapshot?: string | null,
    reason?: string | null,
    student?:  {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationStudentLogsId?: string | null,
    studentStudentLogsCpr?: string | null,
  } | null,
};

export type DeleteStudentLogMutationVariables = {
  input: DeleteStudentLogInput,
  condition?: ModelStudentLogConditionInput | null,
};

export type DeleteStudentLogMutation = {
  deleteStudentLog?:  {
    __typename: "StudentLog",
    id: string,
    applicationID: string,
    studentCPR: string,
    dateTime?: string | null,
    snapshot?: string | null,
    reason?: string | null,
    student?:  {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationStudentLogsId?: string | null,
    studentStudentLogsCpr?: string | null,
  } | null,
};

export type CreateAdminMutationVariables = {
  input: CreateAdminInput,
  condition?: ModelAdminConditionInput | null,
};

export type CreateAdminMutation = {
  createAdmin?:  {
    __typename: "Admin",
    cpr: string,
    fullName?: string | null,
    email?: string | null,
    AdminLogs?:  {
      __typename: "ModelAdminLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    role?: AdminRole | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateAdminMutationVariables = {
  input: UpdateAdminInput,
  condition?: ModelAdminConditionInput | null,
};

export type UpdateAdminMutation = {
  updateAdmin?:  {
    __typename: "Admin",
    cpr: string,
    fullName?: string | null,
    email?: string | null,
    AdminLogs?:  {
      __typename: "ModelAdminLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    role?: AdminRole | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteAdminMutationVariables = {
  input: DeleteAdminInput,
  condition?: ModelAdminConditionInput | null,
};

export type DeleteAdminMutation = {
  deleteAdmin?:  {
    __typename: "Admin",
    cpr: string,
    fullName?: string | null,
    email?: string | null,
    AdminLogs?:  {
      __typename: "ModelAdminLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    role?: AdminRole | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateParentInfoMutationVariables = {
  input: CreateParentInfoInput,
  condition?: ModelParentInfoConditionInput | null,
};

export type CreateParentInfoMutation = {
  createParentInfo?:  {
    __typename: "ParentInfo",
    id: string,
    guardianFullName?: string | null,
    relation?: string | null,
    guardianCPR?: string | null,
    primaryMobile?: string | null,
    secondaryMobile?: string | null,
    fatherFullName?: string | null,
    fatherCPR?: string | null,
    motherFullName?: string | null,
    motherCPR?: string | null,
    numberOfFamilyMembers?: number | null,
    address?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateParentInfoMutationVariables = {
  input: UpdateParentInfoInput,
  condition?: ModelParentInfoConditionInput | null,
};

export type UpdateParentInfoMutation = {
  updateParentInfo?:  {
    __typename: "ParentInfo",
    id: string,
    guardianFullName?: string | null,
    relation?: string | null,
    guardianCPR?: string | null,
    primaryMobile?: string | null,
    secondaryMobile?: string | null,
    fatherFullName?: string | null,
    fatherCPR?: string | null,
    motherFullName?: string | null,
    motherCPR?: string | null,
    numberOfFamilyMembers?: number | null,
    address?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteParentInfoMutationVariables = {
  input: DeleteParentInfoInput,
  condition?: ModelParentInfoConditionInput | null,
};

export type DeleteParentInfoMutation = {
  deleteParentInfo?:  {
    __typename: "ParentInfo",
    id: string,
    guardianFullName?: string | null,
    relation?: string | null,
    guardianCPR?: string | null,
    primaryMobile?: string | null,
    secondaryMobile?: string | null,
    fatherFullName?: string | null,
    fatherCPR?: string | null,
    motherFullName?: string | null,
    motherCPR?: string | null,
    numberOfFamilyMembers?: number | null,
    address?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateStudentMutationVariables = {
  input: CreateStudentInput,
  condition?: ModelStudentConditionInput | null,
};

export type CreateStudentMutation = {
  createStudent?:  {
    __typename: "Student",
    cpr: string,
    cprDoc?: string | null,
    fullName?: string | null,
    batch?: number | null,
    email?: string | null,
    phone?: string | null,
    gender?: Gender | null,
    nationalityCategory?: Nationality | null,
    nationality?: string | null,
    schoolName?: string | null,
    schoolType?: SchoolType | null,
    specialization?: string | null,
    placeOfBirth?: string | null,
    studentOrderAmongSiblings?: number | null,
    familyIncome?: FamilyIncome | null,
    familyIncomeProofDoc?: string | null,
    familyIncomeProofDocs?: Array< string | null > | null,
    preferredLanguage?: Language | null,
    graduationDate?: string | null,
    address?: string | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ParentInfo?:  {
      __typename: "ParentInfo",
      id: string,
      guardianFullName?: string | null,
      relation?: string | null,
      guardianCPR?: string | null,
      primaryMobile?: string | null,
      secondaryMobile?: string | null,
      fatherFullName?: string | null,
      fatherCPR?: string | null,
      motherFullName?: string | null,
      motherCPR?: string | null,
      numberOfFamilyMembers?: number | null,
      address?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    parentInfoID?: string | null,
    StudentLogs?:  {
      __typename: "ModelStudentLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateStudentMutationVariables = {
  input: UpdateStudentInput,
  condition?: ModelStudentConditionInput | null,
};

export type UpdateStudentMutation = {
  updateStudent?:  {
    __typename: "Student",
    cpr: string,
    cprDoc?: string | null,
    fullName?: string | null,
    batch?: number | null,
    email?: string | null,
    phone?: string | null,
    gender?: Gender | null,
    nationalityCategory?: Nationality | null,
    nationality?: string | null,
    schoolName?: string | null,
    schoolType?: SchoolType | null,
    specialization?: string | null,
    placeOfBirth?: string | null,
    studentOrderAmongSiblings?: number | null,
    familyIncome?: FamilyIncome | null,
    familyIncomeProofDoc?: string | null,
    familyIncomeProofDocs?: Array< string | null > | null,
    preferredLanguage?: Language | null,
    graduationDate?: string | null,
    address?: string | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ParentInfo?:  {
      __typename: "ParentInfo",
      id: string,
      guardianFullName?: string | null,
      relation?: string | null,
      guardianCPR?: string | null,
      primaryMobile?: string | null,
      secondaryMobile?: string | null,
      fatherFullName?: string | null,
      fatherCPR?: string | null,
      motherFullName?: string | null,
      motherCPR?: string | null,
      numberOfFamilyMembers?: number | null,
      address?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    parentInfoID?: string | null,
    StudentLogs?:  {
      __typename: "ModelStudentLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteStudentMutationVariables = {
  input: DeleteStudentInput,
  condition?: ModelStudentConditionInput | null,
};

export type DeleteStudentMutation = {
  deleteStudent?:  {
    __typename: "Student",
    cpr: string,
    cprDoc?: string | null,
    fullName?: string | null,
    batch?: number | null,
    email?: string | null,
    phone?: string | null,
    gender?: Gender | null,
    nationalityCategory?: Nationality | null,
    nationality?: string | null,
    schoolName?: string | null,
    schoolType?: SchoolType | null,
    specialization?: string | null,
    placeOfBirth?: string | null,
    studentOrderAmongSiblings?: number | null,
    familyIncome?: FamilyIncome | null,
    familyIncomeProofDoc?: string | null,
    familyIncomeProofDocs?: Array< string | null > | null,
    preferredLanguage?: Language | null,
    graduationDate?: string | null,
    address?: string | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ParentInfo?:  {
      __typename: "ParentInfo",
      id: string,
      guardianFullName?: string | null,
      relation?: string | null,
      guardianCPR?: string | null,
      primaryMobile?: string | null,
      secondaryMobile?: string | null,
      fatherFullName?: string | null,
      fatherCPR?: string | null,
      motherFullName?: string | null,
      motherCPR?: string | null,
      numberOfFamilyMembers?: number | null,
      address?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    parentInfoID?: string | null,
    StudentLogs?:  {
      __typename: "ModelStudentLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateBatchMutationVariables = {
  input: CreateBatchInput,
  condition?: ModelBatchConditionInput | null,
};

export type CreateBatchMutation = {
  createBatch?:  {
    __typename: "Batch",
    batch: number,
    createApplicationStartDate?: string | null,
    createApplicationEndDate?: string | null,
    updateApplicationEndDate?: string | null,
    signUpStartDate?: string | null,
    signUpEndDate?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateBatchMutationVariables = {
  input: UpdateBatchInput,
  condition?: ModelBatchConditionInput | null,
};

export type UpdateBatchMutation = {
  updateBatch?:  {
    __typename: "Batch",
    batch: number,
    createApplicationStartDate?: string | null,
    createApplicationEndDate?: string | null,
    updateApplicationEndDate?: string | null,
    signUpStartDate?: string | null,
    signUpEndDate?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteBatchMutationVariables = {
  input: DeleteBatchInput,
  condition?: ModelBatchConditionInput | null,
};

export type DeleteBatchMutation = {
  deleteBatch?:  {
    __typename: "Batch",
    batch: number,
    createApplicationStartDate?: string | null,
    createApplicationEndDate?: string | null,
    updateApplicationEndDate?: string | null,
    signUpStartDate?: string | null,
    signUpEndDate?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateScholarshipMutationVariables = {
  input: CreateScholarshipInput,
  condition?: ModelScholarshipConditionInput | null,
};

export type CreateScholarshipMutation = {
  createScholarship?:  {
    __typename: "Scholarship",
    id: string,
    status?: ScholarshipStatus | null,
    applicationID: string,
    batch?: number | null,
    isConfirmed?: boolean | null,
    application?:  {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null,
    studentCPR?: string | null,
    unsignedContractDoc?: string | null,
    signedContractDoc?: string | null,
    studentSignature?: string | null,
    guardianSignature?: string | null,
    bankName?: string | null,
    IBAN?: string | null,
    IBANLetterDoc?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateScholarshipMutationVariables = {
  input: UpdateScholarshipInput,
  condition?: ModelScholarshipConditionInput | null,
};

export type UpdateScholarshipMutation = {
  updateScholarship?:  {
    __typename: "Scholarship",
    id: string,
    status?: ScholarshipStatus | null,
    applicationID: string,
    batch?: number | null,
    isConfirmed?: boolean | null,
    application?:  {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null,
    studentCPR?: string | null,
    unsignedContractDoc?: string | null,
    signedContractDoc?: string | null,
    studentSignature?: string | null,
    guardianSignature?: string | null,
    bankName?: string | null,
    IBAN?: string | null,
    IBANLetterDoc?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteScholarshipMutationVariables = {
  input: DeleteScholarshipInput,
  condition?: ModelScholarshipConditionInput | null,
};

export type DeleteScholarshipMutation = {
  deleteScholarship?:  {
    __typename: "Scholarship",
    id: string,
    status?: ScholarshipStatus | null,
    applicationID: string,
    batch?: number | null,
    isConfirmed?: boolean | null,
    application?:  {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null,
    studentCPR?: string | null,
    unsignedContractDoc?: string | null,
    signedContractDoc?: string | null,
    studentSignature?: string | null,
    guardianSignature?: string | null,
    bankName?: string | null,
    IBAN?: string | null,
    IBANLetterDoc?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type CreateStatisticsMutationVariables = {
  input: CreateStatisticsInput,
  condition?: ModelStatisticsConditionInput | null,
};

export type CreateStatisticsMutation = {
  createStatistics?:  {
    __typename: "Statistics",
    id: number,
    batch: number,
    totalApplications?: number | null,
    totalApplicationsPerStatus?: string | null,
    scoreHistogram?: string | null,
    gpaHistogram?: string | null,
    totalApplicationsPerUniversity?: string | null,
    topUniversities?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type UpdateStatisticsMutationVariables = {
  input: UpdateStatisticsInput,
  condition?: ModelStatisticsConditionInput | null,
};

export type UpdateStatisticsMutation = {
  updateStatistics?:  {
    __typename: "Statistics",
    id: number,
    batch: number,
    totalApplications?: number | null,
    totalApplicationsPerStatus?: string | null,
    scoreHistogram?: string | null,
    gpaHistogram?: string | null,
    totalApplicationsPerUniversity?: string | null,
    topUniversities?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type DeleteStatisticsMutationVariables = {
  input: DeleteStatisticsInput,
  condition?: ModelStatisticsConditionInput | null,
};

export type DeleteStatisticsMutation = {
  deleteStatistics?:  {
    __typename: "Statistics",
    id: number,
    batch: number,
    totalApplications?: number | null,
    totalApplicationsPerStatus?: string | null,
    scoreHistogram?: string | null,
    gpaHistogram?: string | null,
    totalApplicationsPerUniversity?: string | null,
    topUniversities?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type GetAttachmentQueryVariables = {
  id: string,
};

export type GetAttachmentQuery = {
  getAttachment?:  {
    __typename: "Attachment",
    id: string,
    cprDoc?: string | null,
    signedContractDoc?: string | null,
    transcriptDoc?: string | null,
    schoolCertificate?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListAttachmentsQueryVariables = {
  filter?: ModelAttachmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAttachmentsQuery = {
  listAttachments?:  {
    __typename: "ModelAttachmentConnection",
    items:  Array< {
      __typename: "Attachment",
      id: string,
      cprDoc?: string | null,
      signedContractDoc?: string | null,
      transcriptDoc?: string | null,
      schoolCertificate?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncAttachmentsQueryVariables = {
  filter?: ModelAttachmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncAttachmentsQuery = {
  syncAttachments?:  {
    __typename: "ModelAttachmentConnection",
    items:  Array< {
      __typename: "Attachment",
      id: string,
      cprDoc?: string | null,
      signedContractDoc?: string | null,
      transcriptDoc?: string | null,
      schoolCertificate?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetApplicationQueryVariables = {
  id: string,
};

export type GetApplicationQuery = {
  getApplication?:  {
    __typename: "Application",
    id: string,
    gpa?: number | null,
    verifiedGPA?: number | null,
    status?: Status | null,
    attachmentID?: string | null,
    adminLogs?:  {
      __typename: "ModelAdminLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    studentLogs?:  {
      __typename: "ModelStudentLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    attachment?:  {
      __typename: "Attachment",
      id: string,
      cprDoc?: string | null,
      signedContractDoc?: string | null,
      transcriptDoc?: string | null,
      schoolCertificate?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    programs?:  {
      __typename: "ModelProgramChoiceConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    dateTime: string,
    isEmailSent?: boolean | null,
    nationalityCategory?: Nationality | null,
    familyIncome?: FamilyIncome | null,
    schoolName?: string | null,
    schoolType?: SchoolType | null,
    studentName?: string | null,
    programID?: string | null,
    program?:  {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null,
    universityID?: string | null,
    university?:  {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    studentCPR: string,
    student?:  {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    batch?: number | null,
    score?: number | null,
    adminPoints?: number | null,
    processed?: number | null,
    isFamilyIncomeVerified?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    programApplicationId?: string | null,
    universityApplicationsId?: string | null,
    applicationAttachmentId?: string | null,
  } | null,
};

export type ListApplicationsQueryVariables = {
  filter?: ModelApplicationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApplicationsQuery = {
  listApplications?:  {
    __typename: "ModelApplicationConnection",
    items:  Array< {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncApplicationsQueryVariables = {
  filter?: ModelApplicationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncApplicationsQuery = {
  syncApplications?:  {
    __typename: "ModelApplicationConnection",
    items:  Array< {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetProgramChoiceQueryVariables = {
  id: string,
};

export type GetProgramChoiceQuery = {
  getProgramChoice?:  {
    __typename: "ProgramChoice",
    id: string,
    programID: string,
    applicationID: string,
    program?:  {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null,
    application?:  {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null,
    choiceOrder?: number | null,
    acceptanceLetterDoc?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationProgramsId?: string | null,
    programApplicationsId?: string | null,
  } | null,
};

export type ListProgramChoicesQueryVariables = {
  filter?: ModelProgramChoiceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProgramChoicesQuery = {
  listProgramChoices?:  {
    __typename: "ModelProgramChoiceConnection",
    items:  Array< {
      __typename: "ProgramChoice",
      id: string,
      programID: string,
      applicationID: string,
      choiceOrder?: number | null,
      acceptanceLetterDoc?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      applicationProgramsId?: string | null,
      programApplicationsId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncProgramChoicesQueryVariables = {
  filter?: ModelProgramChoiceFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncProgramChoicesQuery = {
  syncProgramChoices?:  {
    __typename: "ModelProgramChoiceConnection",
    items:  Array< {
      __typename: "ProgramChoice",
      id: string,
      programID: string,
      applicationID: string,
      choiceOrder?: number | null,
      acceptanceLetterDoc?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      applicationProgramsId?: string | null,
      programApplicationsId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetProgramQueryVariables = {
  id: string,
};

export type GetProgramQuery = {
  getProgram?:  {
    __typename: "Program",
    id: string,
    name?: string | null,
    minimumGPA?: number | null,
    requirements?: string | null,
    nameAr?: string | null,
    requirementsAr?: string | null,
    availability?: number | null,
    universityID: string,
    university?:  {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    applications?:  {
      __typename: "ModelProgramChoiceConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    isDeactivated?: boolean | null,
    isTrashed?: boolean | null,
    application?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    universityProgramsId?: string | null,
  } | null,
};

export type ListProgramsQueryVariables = {
  filter?: ModelProgramFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListProgramsQuery = {
  listPrograms?:  {
    __typename: "ModelProgramConnection",
    items:  Array< {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncProgramsQueryVariables = {
  filter?: ModelProgramFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncProgramsQuery = {
  syncPrograms?:  {
    __typename: "ModelProgramConnection",
    items:  Array< {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetUniversityQueryVariables = {
  id: string,
};

export type GetUniversityQuery = {
  getUniversity?:  {
    __typename: "University",
    id: string,
    name?: string | null,
    nameAr?: string | null,
    Programs?:  {
      __typename: "ModelProgramConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    availability?: number | null,
    isDeactivated?: boolean | null,
    isExtended?: number | null,
    extensionDuration?: number | null,
    isException?: number | null,
    isTrashed?: boolean | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListUniversitiesQueryVariables = {
  filter?: ModelUniversityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUniversitiesQuery = {
  listUniversities?:  {
    __typename: "ModelUniversityConnection",
    items:  Array< {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncUniversitiesQueryVariables = {
  filter?: ModelUniversityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncUniversitiesQuery = {
  syncUniversities?:  {
    __typename: "ModelUniversityConnection",
    items:  Array< {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetAdminLogQueryVariables = {
  id: string,
};

export type GetAdminLogQuery = {
  getAdminLog?:  {
    __typename: "AdminLog",
    id: string,
    applicationID: string,
    adminCPR: string,
    dateTime?: string | null,
    snapshot?: string | null,
    reason?: string | null,
    admin?:  {
      __typename: "Admin",
      cpr: string,
      fullName?: string | null,
      email?: string | null,
      role?: AdminRole | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationAdminLogsId?: string | null,
    adminAdminLogsCpr?: string | null,
  } | null,
};

export type ListAdminLogsQueryVariables = {
  filter?: ModelAdminLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAdminLogsQuery = {
  listAdminLogs?:  {
    __typename: "ModelAdminLogConnection",
    items:  Array< {
      __typename: "AdminLog",
      id: string,
      applicationID: string,
      adminCPR: string,
      dateTime?: string | null,
      snapshot?: string | null,
      reason?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      applicationAdminLogsId?: string | null,
      adminAdminLogsCpr?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncAdminLogsQueryVariables = {
  filter?: ModelAdminLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncAdminLogsQuery = {
  syncAdminLogs?:  {
    __typename: "ModelAdminLogConnection",
    items:  Array< {
      __typename: "AdminLog",
      id: string,
      applicationID: string,
      adminCPR: string,
      dateTime?: string | null,
      snapshot?: string | null,
      reason?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      applicationAdminLogsId?: string | null,
      adminAdminLogsCpr?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetStudentLogQueryVariables = {
  id: string,
};

export type GetStudentLogQuery = {
  getStudentLog?:  {
    __typename: "StudentLog",
    id: string,
    applicationID: string,
    studentCPR: string,
    dateTime?: string | null,
    snapshot?: string | null,
    reason?: string | null,
    student?:  {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationStudentLogsId?: string | null,
    studentStudentLogsCpr?: string | null,
  } | null,
};

export type ListStudentLogsQueryVariables = {
  filter?: ModelStudentLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListStudentLogsQuery = {
  listStudentLogs?:  {
    __typename: "ModelStudentLogConnection",
    items:  Array< {
      __typename: "StudentLog",
      id: string,
      applicationID: string,
      studentCPR: string,
      dateTime?: string | null,
      snapshot?: string | null,
      reason?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      applicationStudentLogsId?: string | null,
      studentStudentLogsCpr?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncStudentLogsQueryVariables = {
  filter?: ModelStudentLogFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncStudentLogsQuery = {
  syncStudentLogs?:  {
    __typename: "ModelStudentLogConnection",
    items:  Array< {
      __typename: "StudentLog",
      id: string,
      applicationID: string,
      studentCPR: string,
      dateTime?: string | null,
      snapshot?: string | null,
      reason?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      applicationStudentLogsId?: string | null,
      studentStudentLogsCpr?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetAdminQueryVariables = {
  cpr: string,
};

export type GetAdminQuery = {
  getAdmin?:  {
    __typename: "Admin",
    cpr: string,
    fullName?: string | null,
    email?: string | null,
    AdminLogs?:  {
      __typename: "ModelAdminLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    role?: AdminRole | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListAdminsQueryVariables = {
  cpr?: string | null,
  filter?: ModelAdminFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListAdminsQuery = {
  listAdmins?:  {
    __typename: "ModelAdminConnection",
    items:  Array< {
      __typename: "Admin",
      cpr: string,
      fullName?: string | null,
      email?: string | null,
      role?: AdminRole | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncAdminsQueryVariables = {
  filter?: ModelAdminFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncAdminsQuery = {
  syncAdmins?:  {
    __typename: "ModelAdminConnection",
    items:  Array< {
      __typename: "Admin",
      cpr: string,
      fullName?: string | null,
      email?: string | null,
      role?: AdminRole | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetParentInfoQueryVariables = {
  id: string,
};

export type GetParentInfoQuery = {
  getParentInfo?:  {
    __typename: "ParentInfo",
    id: string,
    guardianFullName?: string | null,
    relation?: string | null,
    guardianCPR?: string | null,
    primaryMobile?: string | null,
    secondaryMobile?: string | null,
    fatherFullName?: string | null,
    fatherCPR?: string | null,
    motherFullName?: string | null,
    motherCPR?: string | null,
    numberOfFamilyMembers?: number | null,
    address?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListParentInfosQueryVariables = {
  filter?: ModelParentInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListParentInfosQuery = {
  listParentInfos?:  {
    __typename: "ModelParentInfoConnection",
    items:  Array< {
      __typename: "ParentInfo",
      id: string,
      guardianFullName?: string | null,
      relation?: string | null,
      guardianCPR?: string | null,
      primaryMobile?: string | null,
      secondaryMobile?: string | null,
      fatherFullName?: string | null,
      fatherCPR?: string | null,
      motherFullName?: string | null,
      motherCPR?: string | null,
      numberOfFamilyMembers?: number | null,
      address?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncParentInfosQueryVariables = {
  filter?: ModelParentInfoFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncParentInfosQuery = {
  syncParentInfos?:  {
    __typename: "ModelParentInfoConnection",
    items:  Array< {
      __typename: "ParentInfo",
      id: string,
      guardianFullName?: string | null,
      relation?: string | null,
      guardianCPR?: string | null,
      primaryMobile?: string | null,
      secondaryMobile?: string | null,
      fatherFullName?: string | null,
      fatherCPR?: string | null,
      motherFullName?: string | null,
      motherCPR?: string | null,
      numberOfFamilyMembers?: number | null,
      address?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetStudentQueryVariables = {
  cpr: string,
};

export type GetStudentQuery = {
  getStudent?:  {
    __typename: "Student",
    cpr: string,
    cprDoc?: string | null,
    fullName?: string | null,
    batch?: number | null,
    email?: string | null,
    phone?: string | null,
    gender?: Gender | null,
    nationalityCategory?: Nationality | null,
    nationality?: string | null,
    schoolName?: string | null,
    schoolType?: SchoolType | null,
    specialization?: string | null,
    placeOfBirth?: string | null,
    studentOrderAmongSiblings?: number | null,
    familyIncome?: FamilyIncome | null,
    familyIncomeProofDoc?: string | null,
    familyIncomeProofDocs?: Array< string | null > | null,
    preferredLanguage?: Language | null,
    graduationDate?: string | null,
    address?: string | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ParentInfo?:  {
      __typename: "ParentInfo",
      id: string,
      guardianFullName?: string | null,
      relation?: string | null,
      guardianCPR?: string | null,
      primaryMobile?: string | null,
      secondaryMobile?: string | null,
      fatherFullName?: string | null,
      fatherCPR?: string | null,
      motherFullName?: string | null,
      motherCPR?: string | null,
      numberOfFamilyMembers?: number | null,
      address?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    parentInfoID?: string | null,
    StudentLogs?:  {
      __typename: "ModelStudentLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListStudentsQueryVariables = {
  cpr?: string | null,
  filter?: ModelStudentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListStudentsQuery = {
  listStudents?:  {
    __typename: "ModelStudentConnection",
    items:  Array< {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncStudentsQueryVariables = {
  filter?: ModelStudentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncStudentsQuery = {
  syncStudents?:  {
    __typename: "ModelStudentConnection",
    items:  Array< {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetBatchQueryVariables = {
  batch: number,
};

export type GetBatchQuery = {
  getBatch?:  {
    __typename: "Batch",
    batch: number,
    createApplicationStartDate?: string | null,
    createApplicationEndDate?: string | null,
    updateApplicationEndDate?: string | null,
    signUpStartDate?: string | null,
    signUpEndDate?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListBatchesQueryVariables = {
  batch?: number | null,
  filter?: ModelBatchFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListBatchesQuery = {
  listBatches?:  {
    __typename: "ModelBatchConnection",
    items:  Array< {
      __typename: "Batch",
      batch: number,
      createApplicationStartDate?: string | null,
      createApplicationEndDate?: string | null,
      updateApplicationEndDate?: string | null,
      signUpStartDate?: string | null,
      signUpEndDate?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncBatchesQueryVariables = {
  filter?: ModelBatchFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncBatchesQuery = {
  syncBatches?:  {
    __typename: "ModelBatchConnection",
    items:  Array< {
      __typename: "Batch",
      batch: number,
      createApplicationStartDate?: string | null,
      createApplicationEndDate?: string | null,
      updateApplicationEndDate?: string | null,
      signUpStartDate?: string | null,
      signUpEndDate?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetScholarshipQueryVariables = {
  id: string,
};

export type GetScholarshipQuery = {
  getScholarship?:  {
    __typename: "Scholarship",
    id: string,
    status?: ScholarshipStatus | null,
    applicationID: string,
    batch?: number | null,
    isConfirmed?: boolean | null,
    application?:  {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null,
    studentCPR?: string | null,
    unsignedContractDoc?: string | null,
    signedContractDoc?: string | null,
    studentSignature?: string | null,
    guardianSignature?: string | null,
    bankName?: string | null,
    IBAN?: string | null,
    IBANLetterDoc?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListScholarshipsQueryVariables = {
  filter?: ModelScholarshipFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListScholarshipsQuery = {
  listScholarships?:  {
    __typename: "ModelScholarshipConnection",
    items:  Array< {
      __typename: "Scholarship",
      id: string,
      status?: ScholarshipStatus | null,
      applicationID: string,
      batch?: number | null,
      isConfirmed?: boolean | null,
      studentCPR?: string | null,
      unsignedContractDoc?: string | null,
      signedContractDoc?: string | null,
      studentSignature?: string | null,
      guardianSignature?: string | null,
      bankName?: string | null,
      IBAN?: string | null,
      IBANLetterDoc?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncScholarshipsQueryVariables = {
  filter?: ModelScholarshipFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncScholarshipsQuery = {
  syncScholarships?:  {
    __typename: "ModelScholarshipConnection",
    items:  Array< {
      __typename: "Scholarship",
      id: string,
      status?: ScholarshipStatus | null,
      applicationID: string,
      batch?: number | null,
      isConfirmed?: boolean | null,
      studentCPR?: string | null,
      unsignedContractDoc?: string | null,
      signedContractDoc?: string | null,
      studentSignature?: string | null,
      guardianSignature?: string | null,
      bankName?: string | null,
      IBAN?: string | null,
      IBANLetterDoc?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type GetStatisticsQueryVariables = {
  id: number,
};

export type GetStatisticsQuery = {
  getStatistics?:  {
    __typename: "Statistics",
    id: number,
    batch: number,
    totalApplications?: number | null,
    totalApplicationsPerStatus?: string | null,
    scoreHistogram?: string | null,
    gpaHistogram?: string | null,
    totalApplicationsPerUniversity?: string | null,
    topUniversities?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type ListStatisticsQueryVariables = {
  id?: number | null,
  filter?: ModelStatisticsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  sortDirection?: ModelSortDirection | null,
};

export type ListStatisticsQuery = {
  listStatistics?:  {
    __typename: "ModelStatisticsConnection",
    items:  Array< {
      __typename: "Statistics",
      id: number,
      batch: number,
      totalApplications?: number | null,
      totalApplicationsPerStatus?: string | null,
      scoreHistogram?: string | null,
      gpaHistogram?: string | null,
      totalApplicationsPerUniversity?: string | null,
      topUniversities?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncStatisticsQueryVariables = {
  filter?: ModelStatisticsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncStatisticsQuery = {
  syncStatistics?:  {
    __typename: "ModelStatisticsConnection",
    items:  Array< {
      __typename: "Statistics",
      id: number,
      batch: number,
      totalApplications?: number | null,
      totalApplicationsPerStatus?: string | null,
      scoreHistogram?: string | null,
      gpaHistogram?: string | null,
      totalApplicationsPerUniversity?: string | null,
      topUniversities?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ApplicationsByIdAndDateTimeQueryVariables = {
  id: string,
  dateTime?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApplicationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApplicationsByIdAndDateTimeQuery = {
  applicationsByIdAndDateTime?:  {
    __typename: "ModelApplicationConnection",
    items:  Array< {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ApplicationsByNationalityCategoryAndBatchQueryVariables = {
  nationalityCategory: Nationality,
  batch?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApplicationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApplicationsByNationalityCategoryAndBatchQuery = {
  applicationsByNationalityCategoryAndBatch?:  {
    __typename: "ModelApplicationConnection",
    items:  Array< {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ApplicationsByStudentCPRAndGpaQueryVariables = {
  studentCPR: string,
  gpa?: ModelFloatKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApplicationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApplicationsByStudentCPRAndGpaQuery = {
  applicationsByStudentCPRAndGpa?:  {
    __typename: "ModelApplicationConnection",
    items:  Array< {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ApplicationsByBatchAndStatusQueryVariables = {
  batch: number,
  status?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApplicationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApplicationsByBatchAndStatusQuery = {
  applicationsByBatchAndStatus?:  {
    __typename: "ModelApplicationConnection",
    items:  Array< {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ApplicationsByScoreAndStatusQueryVariables = {
  score: number,
  status?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApplicationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApplicationsByScoreAndStatusQuery = {
  applicationsByScoreAndStatus?:  {
    __typename: "ModelApplicationConnection",
    items:  Array< {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ApplicationsByProcessedAndBatchQueryVariables = {
  processed: number,
  batch?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelApplicationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ApplicationsByProcessedAndBatchQuery = {
  applicationsByProcessedAndBatch?:  {
    __typename: "ModelApplicationConnection",
    items:  Array< {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UniversitiesByIsExtendedAndNameQueryVariables = {
  isExtended: number,
  name?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUniversityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UniversitiesByIsExtendedAndNameQuery = {
  universitiesByIsExtendedAndName?:  {
    __typename: "ModelUniversityConnection",
    items:  Array< {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type UniversitiesByIsExceptionQueryVariables = {
  isException: number,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelUniversityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type UniversitiesByIsExceptionQuery = {
  universitiesByIsException?:  {
    __typename: "ModelUniversityConnection",
    items:  Array< {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type StudentsByNationalityCategoryAndGraduationDateQueryVariables = {
  nationalityCategory: Nationality,
  graduationDate?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelStudentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type StudentsByNationalityCategoryAndGraduationDateQuery = {
  studentsByNationalityCategoryAndGraduationDate?:  {
    __typename: "ModelStudentConnection",
    items:  Array< {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ScholarshipsByApplicationIDQueryVariables = {
  applicationID: string,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelScholarshipFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ScholarshipsByApplicationIDQuery = {
  scholarshipsByApplicationID?:  {
    __typename: "ModelScholarshipConnection",
    items:  Array< {
      __typename: "Scholarship",
      id: string,
      status?: ScholarshipStatus | null,
      applicationID: string,
      batch?: number | null,
      isConfirmed?: boolean | null,
      studentCPR?: string | null,
      unsignedContractDoc?: string | null,
      signedContractDoc?: string | null,
      studentSignature?: string | null,
      guardianSignature?: string | null,
      bankName?: string | null,
      IBAN?: string | null,
      IBANLetterDoc?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ScholarshipsByBatchAndStatusQueryVariables = {
  batch: number,
  status?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelScholarshipFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ScholarshipsByBatchAndStatusQuery = {
  scholarshipsByBatchAndStatus?:  {
    __typename: "ModelScholarshipConnection",
    items:  Array< {
      __typename: "Scholarship",
      id: string,
      status?: ScholarshipStatus | null,
      applicationID: string,
      batch?: number | null,
      isConfirmed?: boolean | null,
      studentCPR?: string | null,
      unsignedContractDoc?: string | null,
      signedContractDoc?: string | null,
      studentSignature?: string | null,
      guardianSignature?: string | null,
      bankName?: string | null,
      IBAN?: string | null,
      IBANLetterDoc?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type ScholarshipsByStudentCPRAndStatusQueryVariables = {
  studentCPR: string,
  status?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelScholarshipFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ScholarshipsByStudentCPRAndStatusQuery = {
  scholarshipsByStudentCPRAndStatus?:  {
    __typename: "ModelScholarshipConnection",
    items:  Array< {
      __typename: "Scholarship",
      id: string,
      status?: ScholarshipStatus | null,
      applicationID: string,
      batch?: number | null,
      isConfirmed?: boolean | null,
      studentCPR?: string | null,
      unsignedContractDoc?: string | null,
      signedContractDoc?: string | null,
      studentSignature?: string | null,
      guardianSignature?: string | null,
      bankName?: string | null,
      IBAN?: string | null,
      IBANLetterDoc?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type StatisticsByBatchAndTotalApplicationsQueryVariables = {
  batch: number,
  totalApplications?: ModelIntKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelStatisticsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type StatisticsByBatchAndTotalApplicationsQuery = {
  statisticsByBatchAndTotalApplications?:  {
    __typename: "ModelStatisticsConnection",
    items:  Array< {
      __typename: "Statistics",
      id: number,
      batch: number,
      totalApplications?: number | null,
      totalApplicationsPerStatus?: string | null,
      scoreHistogram?: string | null,
      gpaHistogram?: string | null,
      totalApplicationsPerUniversity?: string | null,
      topUniversities?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateAttachmentSubscriptionVariables = {
  filter?: ModelSubscriptionAttachmentFilterInput | null,
};

export type OnCreateAttachmentSubscription = {
  onCreateAttachment?:  {
    __typename: "Attachment",
    id: string,
    cprDoc?: string | null,
    signedContractDoc?: string | null,
    transcriptDoc?: string | null,
    schoolCertificate?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateAttachmentSubscriptionVariables = {
  filter?: ModelSubscriptionAttachmentFilterInput | null,
};

export type OnUpdateAttachmentSubscription = {
  onUpdateAttachment?:  {
    __typename: "Attachment",
    id: string,
    cprDoc?: string | null,
    signedContractDoc?: string | null,
    transcriptDoc?: string | null,
    schoolCertificate?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteAttachmentSubscriptionVariables = {
  filter?: ModelSubscriptionAttachmentFilterInput | null,
};

export type OnDeleteAttachmentSubscription = {
  onDeleteAttachment?:  {
    __typename: "Attachment",
    id: string,
    cprDoc?: string | null,
    signedContractDoc?: string | null,
    transcriptDoc?: string | null,
    schoolCertificate?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateApplicationSubscriptionVariables = {
  filter?: ModelSubscriptionApplicationFilterInput | null,
};

export type OnCreateApplicationSubscription = {
  onCreateApplication?:  {
    __typename: "Application",
    id: string,
    gpa?: number | null,
    verifiedGPA?: number | null,
    status?: Status | null,
    attachmentID?: string | null,
    adminLogs?:  {
      __typename: "ModelAdminLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    studentLogs?:  {
      __typename: "ModelStudentLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    attachment?:  {
      __typename: "Attachment",
      id: string,
      cprDoc?: string | null,
      signedContractDoc?: string | null,
      transcriptDoc?: string | null,
      schoolCertificate?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    programs?:  {
      __typename: "ModelProgramChoiceConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    dateTime: string,
    isEmailSent?: boolean | null,
    nationalityCategory?: Nationality | null,
    familyIncome?: FamilyIncome | null,
    schoolName?: string | null,
    schoolType?: SchoolType | null,
    studentName?: string | null,
    programID?: string | null,
    program?:  {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null,
    universityID?: string | null,
    university?:  {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    studentCPR: string,
    student?:  {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    batch?: number | null,
    score?: number | null,
    adminPoints?: number | null,
    processed?: number | null,
    isFamilyIncomeVerified?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    programApplicationId?: string | null,
    universityApplicationsId?: string | null,
    applicationAttachmentId?: string | null,
  } | null,
};

export type OnUpdateApplicationSubscriptionVariables = {
  filter?: ModelSubscriptionApplicationFilterInput | null,
};

export type OnUpdateApplicationSubscription = {
  onUpdateApplication?:  {
    __typename: "Application",
    id: string,
    gpa?: number | null,
    verifiedGPA?: number | null,
    status?: Status | null,
    attachmentID?: string | null,
    adminLogs?:  {
      __typename: "ModelAdminLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    studentLogs?:  {
      __typename: "ModelStudentLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    attachment?:  {
      __typename: "Attachment",
      id: string,
      cprDoc?: string | null,
      signedContractDoc?: string | null,
      transcriptDoc?: string | null,
      schoolCertificate?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    programs?:  {
      __typename: "ModelProgramChoiceConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    dateTime: string,
    isEmailSent?: boolean | null,
    nationalityCategory?: Nationality | null,
    familyIncome?: FamilyIncome | null,
    schoolName?: string | null,
    schoolType?: SchoolType | null,
    studentName?: string | null,
    programID?: string | null,
    program?:  {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null,
    universityID?: string | null,
    university?:  {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    studentCPR: string,
    student?:  {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    batch?: number | null,
    score?: number | null,
    adminPoints?: number | null,
    processed?: number | null,
    isFamilyIncomeVerified?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    programApplicationId?: string | null,
    universityApplicationsId?: string | null,
    applicationAttachmentId?: string | null,
  } | null,
};

export type OnDeleteApplicationSubscriptionVariables = {
  filter?: ModelSubscriptionApplicationFilterInput | null,
};

export type OnDeleteApplicationSubscription = {
  onDeleteApplication?:  {
    __typename: "Application",
    id: string,
    gpa?: number | null,
    verifiedGPA?: number | null,
    status?: Status | null,
    attachmentID?: string | null,
    adminLogs?:  {
      __typename: "ModelAdminLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    studentLogs?:  {
      __typename: "ModelStudentLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    attachment?:  {
      __typename: "Attachment",
      id: string,
      cprDoc?: string | null,
      signedContractDoc?: string | null,
      transcriptDoc?: string | null,
      schoolCertificate?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    programs?:  {
      __typename: "ModelProgramChoiceConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    dateTime: string,
    isEmailSent?: boolean | null,
    nationalityCategory?: Nationality | null,
    familyIncome?: FamilyIncome | null,
    schoolName?: string | null,
    schoolType?: SchoolType | null,
    studentName?: string | null,
    programID?: string | null,
    program?:  {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null,
    universityID?: string | null,
    university?:  {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    studentCPR: string,
    student?:  {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    batch?: number | null,
    score?: number | null,
    adminPoints?: number | null,
    processed?: number | null,
    isFamilyIncomeVerified?: boolean | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    programApplicationId?: string | null,
    universityApplicationsId?: string | null,
    applicationAttachmentId?: string | null,
  } | null,
};

export type OnCreateProgramChoiceSubscriptionVariables = {
  filter?: ModelSubscriptionProgramChoiceFilterInput | null,
};

export type OnCreateProgramChoiceSubscription = {
  onCreateProgramChoice?:  {
    __typename: "ProgramChoice",
    id: string,
    programID: string,
    applicationID: string,
    program?:  {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null,
    application?:  {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null,
    choiceOrder?: number | null,
    acceptanceLetterDoc?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationProgramsId?: string | null,
    programApplicationsId?: string | null,
  } | null,
};

export type OnUpdateProgramChoiceSubscriptionVariables = {
  filter?: ModelSubscriptionProgramChoiceFilterInput | null,
};

export type OnUpdateProgramChoiceSubscription = {
  onUpdateProgramChoice?:  {
    __typename: "ProgramChoice",
    id: string,
    programID: string,
    applicationID: string,
    program?:  {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null,
    application?:  {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null,
    choiceOrder?: number | null,
    acceptanceLetterDoc?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationProgramsId?: string | null,
    programApplicationsId?: string | null,
  } | null,
};

export type OnDeleteProgramChoiceSubscriptionVariables = {
  filter?: ModelSubscriptionProgramChoiceFilterInput | null,
};

export type OnDeleteProgramChoiceSubscription = {
  onDeleteProgramChoice?:  {
    __typename: "ProgramChoice",
    id: string,
    programID: string,
    applicationID: string,
    program?:  {
      __typename: "Program",
      id: string,
      name?: string | null,
      minimumGPA?: number | null,
      requirements?: string | null,
      nameAr?: string | null,
      requirementsAr?: string | null,
      availability?: number | null,
      universityID: string,
      isDeactivated?: boolean | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      universityProgramsId?: string | null,
    } | null,
    application?:  {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null,
    choiceOrder?: number | null,
    acceptanceLetterDoc?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationProgramsId?: string | null,
    programApplicationsId?: string | null,
  } | null,
};

export type OnCreateProgramSubscriptionVariables = {
  filter?: ModelSubscriptionProgramFilterInput | null,
};

export type OnCreateProgramSubscription = {
  onCreateProgram?:  {
    __typename: "Program",
    id: string,
    name?: string | null,
    minimumGPA?: number | null,
    requirements?: string | null,
    nameAr?: string | null,
    requirementsAr?: string | null,
    availability?: number | null,
    universityID: string,
    university?:  {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    applications?:  {
      __typename: "ModelProgramChoiceConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    isDeactivated?: boolean | null,
    isTrashed?: boolean | null,
    application?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    universityProgramsId?: string | null,
  } | null,
};

export type OnUpdateProgramSubscriptionVariables = {
  filter?: ModelSubscriptionProgramFilterInput | null,
};

export type OnUpdateProgramSubscription = {
  onUpdateProgram?:  {
    __typename: "Program",
    id: string,
    name?: string | null,
    minimumGPA?: number | null,
    requirements?: string | null,
    nameAr?: string | null,
    requirementsAr?: string | null,
    availability?: number | null,
    universityID: string,
    university?:  {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    applications?:  {
      __typename: "ModelProgramChoiceConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    isDeactivated?: boolean | null,
    isTrashed?: boolean | null,
    application?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    universityProgramsId?: string | null,
  } | null,
};

export type OnDeleteProgramSubscriptionVariables = {
  filter?: ModelSubscriptionProgramFilterInput | null,
};

export type OnDeleteProgramSubscription = {
  onDeleteProgram?:  {
    __typename: "Program",
    id: string,
    name?: string | null,
    minimumGPA?: number | null,
    requirements?: string | null,
    nameAr?: string | null,
    requirementsAr?: string | null,
    availability?: number | null,
    universityID: string,
    university?:  {
      __typename: "University",
      id: string,
      name?: string | null,
      nameAr?: string | null,
      availability?: number | null,
      isDeactivated?: boolean | null,
      isExtended?: number | null,
      extensionDuration?: number | null,
      isException?: number | null,
      isTrashed?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    applications?:  {
      __typename: "ModelProgramChoiceConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    isDeactivated?: boolean | null,
    isTrashed?: boolean | null,
    application?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    universityProgramsId?: string | null,
  } | null,
};

export type OnCreateUniversitySubscriptionVariables = {
  filter?: ModelSubscriptionUniversityFilterInput | null,
};

export type OnCreateUniversitySubscription = {
  onCreateUniversity?:  {
    __typename: "University",
    id: string,
    name?: string | null,
    nameAr?: string | null,
    Programs?:  {
      __typename: "ModelProgramConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    availability?: number | null,
    isDeactivated?: boolean | null,
    isExtended?: number | null,
    extensionDuration?: number | null,
    isException?: number | null,
    isTrashed?: boolean | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateUniversitySubscriptionVariables = {
  filter?: ModelSubscriptionUniversityFilterInput | null,
};

export type OnUpdateUniversitySubscription = {
  onUpdateUniversity?:  {
    __typename: "University",
    id: string,
    name?: string | null,
    nameAr?: string | null,
    Programs?:  {
      __typename: "ModelProgramConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    availability?: number | null,
    isDeactivated?: boolean | null,
    isExtended?: number | null,
    extensionDuration?: number | null,
    isException?: number | null,
    isTrashed?: boolean | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteUniversitySubscriptionVariables = {
  filter?: ModelSubscriptionUniversityFilterInput | null,
};

export type OnDeleteUniversitySubscription = {
  onDeleteUniversity?:  {
    __typename: "University",
    id: string,
    name?: string | null,
    nameAr?: string | null,
    Programs?:  {
      __typename: "ModelProgramConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    availability?: number | null,
    isDeactivated?: boolean | null,
    isExtended?: number | null,
    extensionDuration?: number | null,
    isException?: number | null,
    isTrashed?: boolean | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateAdminLogSubscriptionVariables = {
  filter?: ModelSubscriptionAdminLogFilterInput | null,
};

export type OnCreateAdminLogSubscription = {
  onCreateAdminLog?:  {
    __typename: "AdminLog",
    id: string,
    applicationID: string,
    adminCPR: string,
    dateTime?: string | null,
    snapshot?: string | null,
    reason?: string | null,
    admin?:  {
      __typename: "Admin",
      cpr: string,
      fullName?: string | null,
      email?: string | null,
      role?: AdminRole | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationAdminLogsId?: string | null,
    adminAdminLogsCpr?: string | null,
  } | null,
};

export type OnUpdateAdminLogSubscriptionVariables = {
  filter?: ModelSubscriptionAdminLogFilterInput | null,
};

export type OnUpdateAdminLogSubscription = {
  onUpdateAdminLog?:  {
    __typename: "AdminLog",
    id: string,
    applicationID: string,
    adminCPR: string,
    dateTime?: string | null,
    snapshot?: string | null,
    reason?: string | null,
    admin?:  {
      __typename: "Admin",
      cpr: string,
      fullName?: string | null,
      email?: string | null,
      role?: AdminRole | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationAdminLogsId?: string | null,
    adminAdminLogsCpr?: string | null,
  } | null,
};

export type OnDeleteAdminLogSubscriptionVariables = {
  filter?: ModelSubscriptionAdminLogFilterInput | null,
};

export type OnDeleteAdminLogSubscription = {
  onDeleteAdminLog?:  {
    __typename: "AdminLog",
    id: string,
    applicationID: string,
    adminCPR: string,
    dateTime?: string | null,
    snapshot?: string | null,
    reason?: string | null,
    admin?:  {
      __typename: "Admin",
      cpr: string,
      fullName?: string | null,
      email?: string | null,
      role?: AdminRole | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationAdminLogsId?: string | null,
    adminAdminLogsCpr?: string | null,
  } | null,
};

export type OnCreateStudentLogSubscriptionVariables = {
  filter?: ModelSubscriptionStudentLogFilterInput | null,
};

export type OnCreateStudentLogSubscription = {
  onCreateStudentLog?:  {
    __typename: "StudentLog",
    id: string,
    applicationID: string,
    studentCPR: string,
    dateTime?: string | null,
    snapshot?: string | null,
    reason?: string | null,
    student?:  {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationStudentLogsId?: string | null,
    studentStudentLogsCpr?: string | null,
  } | null,
};

export type OnUpdateStudentLogSubscriptionVariables = {
  filter?: ModelSubscriptionStudentLogFilterInput | null,
};

export type OnUpdateStudentLogSubscription = {
  onUpdateStudentLog?:  {
    __typename: "StudentLog",
    id: string,
    applicationID: string,
    studentCPR: string,
    dateTime?: string | null,
    snapshot?: string | null,
    reason?: string | null,
    student?:  {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationStudentLogsId?: string | null,
    studentStudentLogsCpr?: string | null,
  } | null,
};

export type OnDeleteStudentLogSubscriptionVariables = {
  filter?: ModelSubscriptionStudentLogFilterInput | null,
};

export type OnDeleteStudentLogSubscription = {
  onDeleteStudentLog?:  {
    __typename: "StudentLog",
    id: string,
    applicationID: string,
    studentCPR: string,
    dateTime?: string | null,
    snapshot?: string | null,
    reason?: string | null,
    student?:  {
      __typename: "Student",
      cpr: string,
      cprDoc?: string | null,
      fullName?: string | null,
      batch?: number | null,
      email?: string | null,
      phone?: string | null,
      gender?: Gender | null,
      nationalityCategory?: Nationality | null,
      nationality?: string | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      specialization?: string | null,
      placeOfBirth?: string | null,
      studentOrderAmongSiblings?: number | null,
      familyIncome?: FamilyIncome | null,
      familyIncomeProofDoc?: string | null,
      familyIncomeProofDocs?: Array< string | null > | null,
      preferredLanguage?: Language | null,
      graduationDate?: string | null,
      address?: string | null,
      parentInfoID?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    applicationStudentLogsId?: string | null,
    studentStudentLogsCpr?: string | null,
  } | null,
};

export type OnCreateAdminSubscriptionVariables = {
  filter?: ModelSubscriptionAdminFilterInput | null,
};

export type OnCreateAdminSubscription = {
  onCreateAdmin?:  {
    __typename: "Admin",
    cpr: string,
    fullName?: string | null,
    email?: string | null,
    AdminLogs?:  {
      __typename: "ModelAdminLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    role?: AdminRole | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateAdminSubscriptionVariables = {
  filter?: ModelSubscriptionAdminFilterInput | null,
};

export type OnUpdateAdminSubscription = {
  onUpdateAdmin?:  {
    __typename: "Admin",
    cpr: string,
    fullName?: string | null,
    email?: string | null,
    AdminLogs?:  {
      __typename: "ModelAdminLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    role?: AdminRole | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteAdminSubscriptionVariables = {
  filter?: ModelSubscriptionAdminFilterInput | null,
};

export type OnDeleteAdminSubscription = {
  onDeleteAdmin?:  {
    __typename: "Admin",
    cpr: string,
    fullName?: string | null,
    email?: string | null,
    AdminLogs?:  {
      __typename: "ModelAdminLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    role?: AdminRole | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateParentInfoSubscriptionVariables = {
  filter?: ModelSubscriptionParentInfoFilterInput | null,
};

export type OnCreateParentInfoSubscription = {
  onCreateParentInfo?:  {
    __typename: "ParentInfo",
    id: string,
    guardianFullName?: string | null,
    relation?: string | null,
    guardianCPR?: string | null,
    primaryMobile?: string | null,
    secondaryMobile?: string | null,
    fatherFullName?: string | null,
    fatherCPR?: string | null,
    motherFullName?: string | null,
    motherCPR?: string | null,
    numberOfFamilyMembers?: number | null,
    address?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateParentInfoSubscriptionVariables = {
  filter?: ModelSubscriptionParentInfoFilterInput | null,
};

export type OnUpdateParentInfoSubscription = {
  onUpdateParentInfo?:  {
    __typename: "ParentInfo",
    id: string,
    guardianFullName?: string | null,
    relation?: string | null,
    guardianCPR?: string | null,
    primaryMobile?: string | null,
    secondaryMobile?: string | null,
    fatherFullName?: string | null,
    fatherCPR?: string | null,
    motherFullName?: string | null,
    motherCPR?: string | null,
    numberOfFamilyMembers?: number | null,
    address?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteParentInfoSubscriptionVariables = {
  filter?: ModelSubscriptionParentInfoFilterInput | null,
};

export type OnDeleteParentInfoSubscription = {
  onDeleteParentInfo?:  {
    __typename: "ParentInfo",
    id: string,
    guardianFullName?: string | null,
    relation?: string | null,
    guardianCPR?: string | null,
    primaryMobile?: string | null,
    secondaryMobile?: string | null,
    fatherFullName?: string | null,
    fatherCPR?: string | null,
    motherFullName?: string | null,
    motherCPR?: string | null,
    numberOfFamilyMembers?: number | null,
    address?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateStudentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentFilterInput | null,
};

export type OnCreateStudentSubscription = {
  onCreateStudent?:  {
    __typename: "Student",
    cpr: string,
    cprDoc?: string | null,
    fullName?: string | null,
    batch?: number | null,
    email?: string | null,
    phone?: string | null,
    gender?: Gender | null,
    nationalityCategory?: Nationality | null,
    nationality?: string | null,
    schoolName?: string | null,
    schoolType?: SchoolType | null,
    specialization?: string | null,
    placeOfBirth?: string | null,
    studentOrderAmongSiblings?: number | null,
    familyIncome?: FamilyIncome | null,
    familyIncomeProofDoc?: string | null,
    familyIncomeProofDocs?: Array< string | null > | null,
    preferredLanguage?: Language | null,
    graduationDate?: string | null,
    address?: string | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ParentInfo?:  {
      __typename: "ParentInfo",
      id: string,
      guardianFullName?: string | null,
      relation?: string | null,
      guardianCPR?: string | null,
      primaryMobile?: string | null,
      secondaryMobile?: string | null,
      fatherFullName?: string | null,
      fatherCPR?: string | null,
      motherFullName?: string | null,
      motherCPR?: string | null,
      numberOfFamilyMembers?: number | null,
      address?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    parentInfoID?: string | null,
    StudentLogs?:  {
      __typename: "ModelStudentLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateStudentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentFilterInput | null,
};

export type OnUpdateStudentSubscription = {
  onUpdateStudent?:  {
    __typename: "Student",
    cpr: string,
    cprDoc?: string | null,
    fullName?: string | null,
    batch?: number | null,
    email?: string | null,
    phone?: string | null,
    gender?: Gender | null,
    nationalityCategory?: Nationality | null,
    nationality?: string | null,
    schoolName?: string | null,
    schoolType?: SchoolType | null,
    specialization?: string | null,
    placeOfBirth?: string | null,
    studentOrderAmongSiblings?: number | null,
    familyIncome?: FamilyIncome | null,
    familyIncomeProofDoc?: string | null,
    familyIncomeProofDocs?: Array< string | null > | null,
    preferredLanguage?: Language | null,
    graduationDate?: string | null,
    address?: string | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ParentInfo?:  {
      __typename: "ParentInfo",
      id: string,
      guardianFullName?: string | null,
      relation?: string | null,
      guardianCPR?: string | null,
      primaryMobile?: string | null,
      secondaryMobile?: string | null,
      fatherFullName?: string | null,
      fatherCPR?: string | null,
      motherFullName?: string | null,
      motherCPR?: string | null,
      numberOfFamilyMembers?: number | null,
      address?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    parentInfoID?: string | null,
    StudentLogs?:  {
      __typename: "ModelStudentLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteStudentSubscriptionVariables = {
  filter?: ModelSubscriptionStudentFilterInput | null,
};

export type OnDeleteStudentSubscription = {
  onDeleteStudent?:  {
    __typename: "Student",
    cpr: string,
    cprDoc?: string | null,
    fullName?: string | null,
    batch?: number | null,
    email?: string | null,
    phone?: string | null,
    gender?: Gender | null,
    nationalityCategory?: Nationality | null,
    nationality?: string | null,
    schoolName?: string | null,
    schoolType?: SchoolType | null,
    specialization?: string | null,
    placeOfBirth?: string | null,
    studentOrderAmongSiblings?: number | null,
    familyIncome?: FamilyIncome | null,
    familyIncomeProofDoc?: string | null,
    familyIncomeProofDocs?: Array< string | null > | null,
    preferredLanguage?: Language | null,
    graduationDate?: string | null,
    address?: string | null,
    applications?:  {
      __typename: "ModelApplicationConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    ParentInfo?:  {
      __typename: "ParentInfo",
      id: string,
      guardianFullName?: string | null,
      relation?: string | null,
      guardianCPR?: string | null,
      primaryMobile?: string | null,
      secondaryMobile?: string | null,
      fatherFullName?: string | null,
      fatherCPR?: string | null,
      motherFullName?: string | null,
      motherCPR?: string | null,
      numberOfFamilyMembers?: number | null,
      address?: string | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
    } | null,
    parentInfoID?: string | null,
    StudentLogs?:  {
      __typename: "ModelStudentLogConnection",
      nextToken?: string | null,
      startedAt?: number | null,
    } | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateBatchSubscriptionVariables = {
  filter?: ModelSubscriptionBatchFilterInput | null,
};

export type OnCreateBatchSubscription = {
  onCreateBatch?:  {
    __typename: "Batch",
    batch: number,
    createApplicationStartDate?: string | null,
    createApplicationEndDate?: string | null,
    updateApplicationEndDate?: string | null,
    signUpStartDate?: string | null,
    signUpEndDate?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateBatchSubscriptionVariables = {
  filter?: ModelSubscriptionBatchFilterInput | null,
};

export type OnUpdateBatchSubscription = {
  onUpdateBatch?:  {
    __typename: "Batch",
    batch: number,
    createApplicationStartDate?: string | null,
    createApplicationEndDate?: string | null,
    updateApplicationEndDate?: string | null,
    signUpStartDate?: string | null,
    signUpEndDate?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteBatchSubscriptionVariables = {
  filter?: ModelSubscriptionBatchFilterInput | null,
};

export type OnDeleteBatchSubscription = {
  onDeleteBatch?:  {
    __typename: "Batch",
    batch: number,
    createApplicationStartDate?: string | null,
    createApplicationEndDate?: string | null,
    updateApplicationEndDate?: string | null,
    signUpStartDate?: string | null,
    signUpEndDate?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateScholarshipSubscriptionVariables = {
  filter?: ModelSubscriptionScholarshipFilterInput | null,
};

export type OnCreateScholarshipSubscription = {
  onCreateScholarship?:  {
    __typename: "Scholarship",
    id: string,
    status?: ScholarshipStatus | null,
    applicationID: string,
    batch?: number | null,
    isConfirmed?: boolean | null,
    application?:  {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null,
    studentCPR?: string | null,
    unsignedContractDoc?: string | null,
    signedContractDoc?: string | null,
    studentSignature?: string | null,
    guardianSignature?: string | null,
    bankName?: string | null,
    IBAN?: string | null,
    IBANLetterDoc?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateScholarshipSubscriptionVariables = {
  filter?: ModelSubscriptionScholarshipFilterInput | null,
};

export type OnUpdateScholarshipSubscription = {
  onUpdateScholarship?:  {
    __typename: "Scholarship",
    id: string,
    status?: ScholarshipStatus | null,
    applicationID: string,
    batch?: number | null,
    isConfirmed?: boolean | null,
    application?:  {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null,
    studentCPR?: string | null,
    unsignedContractDoc?: string | null,
    signedContractDoc?: string | null,
    studentSignature?: string | null,
    guardianSignature?: string | null,
    bankName?: string | null,
    IBAN?: string | null,
    IBANLetterDoc?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteScholarshipSubscriptionVariables = {
  filter?: ModelSubscriptionScholarshipFilterInput | null,
};

export type OnDeleteScholarshipSubscription = {
  onDeleteScholarship?:  {
    __typename: "Scholarship",
    id: string,
    status?: ScholarshipStatus | null,
    applicationID: string,
    batch?: number | null,
    isConfirmed?: boolean | null,
    application?:  {
      __typename: "Application",
      id: string,
      gpa?: number | null,
      verifiedGPA?: number | null,
      status?: Status | null,
      attachmentID?: string | null,
      dateTime: string,
      isEmailSent?: boolean | null,
      nationalityCategory?: Nationality | null,
      familyIncome?: FamilyIncome | null,
      schoolName?: string | null,
      schoolType?: SchoolType | null,
      studentName?: string | null,
      programID?: string | null,
      universityID?: string | null,
      studentCPR: string,
      batch?: number | null,
      score?: number | null,
      adminPoints?: number | null,
      processed?: number | null,
      isFamilyIncomeVerified?: boolean | null,
      createdAt: string,
      updatedAt: string,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      programApplicationId?: string | null,
      universityApplicationsId?: string | null,
      applicationAttachmentId?: string | null,
    } | null,
    studentCPR?: string | null,
    unsignedContractDoc?: string | null,
    signedContractDoc?: string | null,
    studentSignature?: string | null,
    guardianSignature?: string | null,
    bankName?: string | null,
    IBAN?: string | null,
    IBANLetterDoc?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnCreateStatisticsSubscriptionVariables = {
  filter?: ModelSubscriptionStatisticsFilterInput | null,
};

export type OnCreateStatisticsSubscription = {
  onCreateStatistics?:  {
    __typename: "Statistics",
    id: number,
    batch: number,
    totalApplications?: number | null,
    totalApplicationsPerStatus?: string | null,
    scoreHistogram?: string | null,
    gpaHistogram?: string | null,
    totalApplicationsPerUniversity?: string | null,
    topUniversities?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnUpdateStatisticsSubscriptionVariables = {
  filter?: ModelSubscriptionStatisticsFilterInput | null,
};

export type OnUpdateStatisticsSubscription = {
  onUpdateStatistics?:  {
    __typename: "Statistics",
    id: number,
    batch: number,
    totalApplications?: number | null,
    totalApplicationsPerStatus?: string | null,
    scoreHistogram?: string | null,
    gpaHistogram?: string | null,
    totalApplicationsPerUniversity?: string | null,
    topUniversities?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};

export type OnDeleteStatisticsSubscriptionVariables = {
  filter?: ModelSubscriptionStatisticsFilterInput | null,
};

export type OnDeleteStatisticsSubscription = {
  onDeleteStatistics?:  {
    __typename: "Statistics",
    id: number,
    batch: number,
    totalApplications?: number | null,
    totalApplicationsPerStatus?: string | null,
    scoreHistogram?: string | null,
    gpaHistogram?: string | null,
    totalApplicationsPerUniversity?: string | null,
    topUniversities?: string | null,
    createdAt: string,
    updatedAt: string,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
  } | null,
};
