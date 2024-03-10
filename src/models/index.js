// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const AdminRole = {
  "ADMIN": "ADMIN",
  "SUPER_ADMIN": "SUPER_ADMIN"
};

const Status = {
  "APPROVED": "APPROVED",
  "ELIGIBLE": "ELIGIBLE",
  "REVIEW": "REVIEW",
  "NOT_COMPLETED": "NOT_COMPLETED",
  "REJECTED": "REJECTED",
  "WITHDRAWN": "WITHDRAWN"
};

const Language = {
  "ARABIC": "ARABIC",
  "ENGLISH": "ENGLISH"
};

const Gender = {
  "FEMALE": "FEMALE",
  "MALE": "MALE"
};

const SchoolType = {
  "PRIVATE": "PRIVATE",
  "PUBLIC": "PUBLIC"
};

const Nationality = {
  "BAHRAINI": "BAHRAINI",
  "NON_BAHRAINI": "NON_BAHRAINI"
};

const FamilyIncome = {
  "LESS_THAN_500": "LESS_THAN_500",
  "BETWEEN_500_AND_700": "BETWEEN_500_AND_700",
  "BETWEEN_700_AND_1000": "BETWEEN_700_AND_1000",
  "LESS_THAN_1500": "LESS_THAN_1500",
  "MORE_THAN_1500": "MORE_THAN_1500",
  "OVER_1000": "OVER_1000"
};

const { Attachment, Application, ProgramChoice, Program, University, AdminLog, StudentLog, Admin, ParentInfo, Student, Batch } = initSchema(schema);

export {
  Attachment,
  Application,
  ProgramChoice,
  Program,
  University,
  AdminLog,
  StudentLog,
  Admin,
  ParentInfo,
  Student,
  Batch,
  AdminRole,
  Status,
  Language,
  Gender,
  SchoolType,
  Nationality,
  FamilyIncome
};