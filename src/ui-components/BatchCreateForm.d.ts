/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type BatchCreateFormInputValues = {
    batch?: number;
    createApplicationStartDate?: string;
    createApplicationEndDate?: string;
    updateApplicationEndDate?: string;
    signUpStartDate?: string;
    signUpEndDate?: string;
};
export declare type BatchCreateFormValidationValues = {
    batch?: ValidationFunction<number>;
    createApplicationStartDate?: ValidationFunction<string>;
    createApplicationEndDate?: ValidationFunction<string>;
    updateApplicationEndDate?: ValidationFunction<string>;
    signUpStartDate?: ValidationFunction<string>;
    signUpEndDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BatchCreateFormOverridesProps = {
    BatchCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    batch?: PrimitiveOverrideProps<TextFieldProps>;
    createApplicationStartDate?: PrimitiveOverrideProps<TextFieldProps>;
    createApplicationEndDate?: PrimitiveOverrideProps<TextFieldProps>;
    updateApplicationEndDate?: PrimitiveOverrideProps<TextFieldProps>;
    signUpStartDate?: PrimitiveOverrideProps<TextFieldProps>;
    signUpEndDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type BatchCreateFormProps = React.PropsWithChildren<{
    overrides?: BatchCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: BatchCreateFormInputValues) => BatchCreateFormInputValues;
    onSuccess?: (fields: BatchCreateFormInputValues) => void;
    onError?: (fields: BatchCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BatchCreateFormInputValues) => BatchCreateFormInputValues;
    onValidate?: BatchCreateFormValidationValues;
} & React.CSSProperties>;
export default function BatchCreateForm(props: BatchCreateFormProps): React.ReactElement;
