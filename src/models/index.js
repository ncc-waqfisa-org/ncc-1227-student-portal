// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

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

const FamilyIncome = {
  "LESS_THAN_500": "LESS_THAN_500",
  "BETWEEN_500_AND_700": "BETWEEN_500_AND_700",
  "BETWEEN_700_AND_1000": "BETWEEN_700_AND_1000",
  "OVER_1000": "OVER_1000"
};

const { Attachment, Application, ProgramChoice, Program, University, AdminLog, StudentLog, Admin, ParentInfo, Student } = initSchema(schema);

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
  Status,
  Language,
  Gender,
  SchoolType,
  FamilyIncome
};