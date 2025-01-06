/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { ParentInfo } from "../models";
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
export declare type ParentInfoUpdateFormInputValues = {
    guardianFullName?: string;
    relation?: string;
    guardianCPR?: string;
    primaryMobile?: string;
    secondaryMobile?: string;
    fatherFullName?: string;
    fatherCPR?: string;
    motherFullName?: string;
    motherCPR?: string;
    numberOfFamilyMembers?: number;
    address?: string;
};
export declare type ParentInfoUpdateFormValidationValues = {
    guardianFullName?: ValidationFunction<string>;
    relation?: ValidationFunction<string>;
    guardianCPR?: ValidationFunction<string>;
    primaryMobile?: ValidationFunction<string>;
    secondaryMobile?: ValidationFunction<string>;
    fatherFullName?: ValidationFunction<string>;
    fatherCPR?: ValidationFunction<string>;
    motherFullName?: ValidationFunction<string>;
    motherCPR?: ValidationFunction<string>;
    numberOfFamilyMembers?: ValidationFunction<number>;
    address?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ParentInfoUpdateFormOverridesProps = {
    ParentInfoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    guardianFullName?: PrimitiveOverrideProps<TextFieldProps>;
    relation?: PrimitiveOverrideProps<TextFieldProps>;
    guardianCPR?: PrimitiveOverrideProps<TextFieldProps>;
    primaryMobile?: PrimitiveOverrideProps<TextFieldProps>;
    secondaryMobile?: PrimitiveOverrideProps<TextFieldProps>;
    fatherFullName?: PrimitiveOverrideProps<TextFieldProps>;
    fatherCPR?: PrimitiveOverrideProps<TextFieldProps>;
    motherFullName?: PrimitiveOverrideProps<TextFieldProps>;
    motherCPR?: PrimitiveOverrideProps<TextFieldProps>;
    numberOfFamilyMembers?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ParentInfoUpdateFormProps = React.PropsWithChildren<{
    overrides?: ParentInfoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    parentInfo?: ParentInfo;
    onSubmit?: (fields: ParentInfoUpdateFormInputValues) => ParentInfoUpdateFormInputValues;
    onSuccess?: (fields: ParentInfoUpdateFormInputValues) => void;
    onError?: (fields: ParentInfoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ParentInfoUpdateFormInputValues) => ParentInfoUpdateFormInputValues;
    onValidate?: ParentInfoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ParentInfoUpdateForm(props: ParentInfoUpdateFormProps): React.ReactElement;
