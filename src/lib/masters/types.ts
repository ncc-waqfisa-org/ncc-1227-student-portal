import { Gender, Nationality } from "../../API";

export type MasterSignUpData = {
  // Should be set in the backend
  // batch: number | null; //current year
  // preferredLanguage: "ENGLISH";

  // Personal data
  cpr: string;
  cpr_doc: string;

  first_name: string;
  second_name: string;
  last_name: string;
  address: string;
  email: string | null;
  phone: string | null;
  gender: string | undefined;
  place_of_birth?: string | null;
  nationality: string | undefined;
  number_of_family_member: number;

  // Graduated from
  graduation_year: string;
  universityID: string | undefined;
  old_program: string;

  // Employment info
  isEmployed: boolean;
  place_of_employment: string | null;

  // Personal income or guardian income based on employment
  income: Income | undefined;
  income_doc: string;

  // Guardian data
  guardian_cpr: string;
  guardian_full_name: string;
  guardian_cpr_doc: string;

  //   applicant_type: ApplicantType[];
  password: string;
};
export type MasterSignUpFormSchema = {
  // Should be set in the backend
  // batch: number | null; //current year
  // preferredLanguage: "ENGLISH";

  // Personal data
  cpr: string;
  cpr_doc?: File;

  first_name: string;
  second_name: string;
  last_name: string;
  address: string;
  email: string | null;
  phone: string | null;
  gender: string | undefined;
  place_of_birth?: string | null;
  nationality: string | undefined;
  number_of_family_member: number;

  // Graduated from
  graduation_year: string;
  universityID: string | undefined;
  old_program: string;

  // Employment info
  isEmployed: boolean;
  place_of_employment: string | null;

  // Personal income or guardian income based on employment
  income: Income | undefined;
  income_doc?: File;

  // Guardian data
  guardian_cpr: string;
  guardian_full_name: string;
  guardian_cpr_doc?: File;

  password: string;
  confirm_password: string;

  // Terms
  accepted: boolean;
};

export enum ApplicantType {
  BACHELOR = "BACHELOR",
  MASTERS = "MASTERS",
}

export enum Income {
  LESS_THAN_1500 = "LESS_THAN_1500",
  MORE_THAN_1500 = "MORE_THAN_1500",
}

//   // Applying to
//   master_universityID: string;
//   master_program: string;
//   master_major: string;
