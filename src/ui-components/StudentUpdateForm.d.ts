/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Student } from "../models";
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
export declare type StudentUpdateFormInputValues = {
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
};
export declare type StudentUpdateFormValidationValues = {
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
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StudentUpdateFormOverridesProps = {
    StudentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
} & EscapeHatchProps;
export declare type StudentUpdateFormProps = React.PropsWithChildren<{
    overrides?: StudentUpdateFormOverridesProps | undefined | null;
} & {
    cpr?: string;
    student?: Student;
    onSubmit?: (fields: StudentUpdateFormInputValues) => StudentUpdateFormInputValues;
    onSuccess?: (fields: StudentUpdateFormInputValues) => void;
    onError?: (fields: StudentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: StudentUpdateFormInputValues) => StudentUpdateFormInputValues;
    onValidate?: StudentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function StudentUpdateForm(props: StudentUpdateFormProps): React.ReactElement;
