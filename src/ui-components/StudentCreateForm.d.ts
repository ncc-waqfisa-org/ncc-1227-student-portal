/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type StudentCreateFormInputValues = {
    cpr?: string;
    cprDoc?: string;
    fullName?: string;
    batch?: number;
    email?: string;
    phone?: string;
    gender?: string;
    nationalityCategory?: string;
    nationality?: string;
    schoolName?: string;
    schoolType?: string;
    specialization?: string;
    placeOfBirth?: string;
    studentOrderAmongSiblings?: number;
    familyIncome?: string;
    familyIncomeProofDoc?: string;
    familyIncomeProofDocs?: string[];
    preferredLanguage?: string;
    graduationDate?: string;
    address?: string;
    m_firstName?: string;
    m_secondName?: string;
    m_lastName?: string;
    m_numberOfFamilyMembers?: number;
    m_graduationYear?: string;
    m_oldProgram?: string;
    m_applicantType?: string[];
    m_isEmployeed?: boolean;
    m_placeOfEmployment?: string;
    m_income?: string;
    m_incomeDoc?: string;
    m_guardianCPR?: string;
    m_guardianFullName?: string;
    m_guardianCPRDoc?: string;
};
export declare type StudentCreateFormValidationValues = {
    cpr?: ValidationFunction<string>;
    cprDoc?: ValidationFunction<string>;
    fullName?: ValidationFunction<string>;
    batch?: ValidationFunction<number>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    gender?: ValidationFunction<string>;
    nationalityCategory?: ValidationFunction<string>;
    nationality?: ValidationFunction<string>;
    schoolName?: ValidationFunction<string>;
    schoolType?: ValidationFunction<string>;
    specialization?: ValidationFunction<string>;
    placeOfBirth?: ValidationFunction<string>;
    studentOrderAmongSiblings?: ValidationFunction<number>;
    familyIncome?: ValidationFunction<string>;
    familyIncomeProofDoc?: ValidationFunction<string>;
    familyIncomeProofDocs?: ValidationFunction<string>;
    preferredLanguage?: ValidationFunction<string>;
    graduationDate?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    m_firstName?: ValidationFunction<string>;
    m_secondName?: ValidationFunction<string>;
    m_lastName?: ValidationFunction<string>;
    m_numberOfFamilyMembers?: ValidationFunction<number>;
    m_graduationYear?: ValidationFunction<string>;
    m_oldProgram?: ValidationFunction<string>;
    m_applicantType?: ValidationFunction<string>;
    m_isEmployeed?: ValidationFunction<boolean>;
    m_placeOfEmployment?: ValidationFunction<string>;
    m_income?: ValidationFunction<string>;
    m_incomeDoc?: ValidationFunction<string>;
    m_guardianCPR?: ValidationFunction<string>;
    m_guardianFullName?: ValidationFunction<string>;
    m_guardianCPRDoc?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StudentCreateFormOverridesProps = {
    StudentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cpr?: PrimitiveOverrideProps<TextFieldProps>;
    cprDoc?: PrimitiveOverrideProps<TextFieldProps>;
    fullName?: PrimitiveOverrideProps<TextFieldProps>;
    batch?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    gender?: PrimitiveOverrideProps<SelectFieldProps>;
    nationalityCategory?: PrimitiveOverrideProps<SelectFieldProps>;
    nationality?: PrimitiveOverrideProps<TextFieldProps>;
    schoolName?: PrimitiveOverrideProps<TextFieldProps>;
    schoolType?: PrimitiveOverrideProps<SelectFieldProps>;
    specialization?: PrimitiveOverrideProps<TextFieldProps>;
    placeOfBirth?: PrimitiveOverrideProps<TextFieldProps>;
    studentOrderAmongSiblings?: PrimitiveOverrideProps<TextFieldProps>;
    familyIncome?: PrimitiveOverrideProps<SelectFieldProps>;
    familyIncomeProofDoc?: PrimitiveOverrideProps<TextFieldProps>;
    familyIncomeProofDocs?: PrimitiveOverrideProps<TextFieldProps>;
    preferredLanguage?: PrimitiveOverrideProps<SelectFieldProps>;
    graduationDate?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    m_firstName?: PrimitiveOverrideProps<TextFieldProps>;
    m_secondName?: PrimitiveOverrideProps<TextFieldProps>;
    m_lastName?: PrimitiveOverrideProps<TextFieldProps>;
    m_numberOfFamilyMembers?: PrimitiveOverrideProps<TextFieldProps>;
    m_graduationYear?: PrimitiveOverrideProps<TextFieldProps>;
    m_oldProgram?: PrimitiveOverrideProps<TextFieldProps>;
    m_applicantType?: PrimitiveOverrideProps<SelectFieldProps>;
    m_isEmployeed?: PrimitiveOverrideProps<SwitchFieldProps>;
    m_placeOfEmployment?: PrimitiveOverrideProps<TextFieldProps>;
    m_income?: PrimitiveOverrideProps<SelectFieldProps>;
    m_incomeDoc?: PrimitiveOverrideProps<TextFieldProps>;
    m_guardianCPR?: PrimitiveOverrideProps<TextFieldProps>;
    m_guardianFullName?: PrimitiveOverrideProps<TextFieldProps>;
    m_guardianCPRDoc?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StudentCreateFormProps = React.PropsWithChildren<{
    overrides?: StudentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: StudentCreateFormInputValues) => StudentCreateFormInputValues;
    onSuccess?: (fields: StudentCreateFormInputValues) => void;
    onError?: (fields: StudentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StudentCreateFormInputValues) => StudentCreateFormInputValues;
    onValidate?: StudentCreateFormValidationValues;
} & React.CSSProperties>;
export default function StudentCreateForm(props: StudentCreateFormProps): React.ReactElement;
