/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { MasterBatch } from "../models";
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
export declare type MasterBatchUpdateFormInputValues = {
    batch?: number;
    createApplicationStartDate?: string;
    createApplicationEndDate?: string;
    updateApplicationEndDate?: string;
    signUpStartDate?: string;
    signUpEndDate?: string;
};
export declare type MasterBatchUpdateFormValidationValues = {
    batch?: ValidationFunction<number>;
    createApplicationStartDate?: ValidationFunction<string>;
    createApplicationEndDate?: ValidationFunction<string>;
    updateApplicationEndDate?: ValidationFunction<string>;
    signUpStartDate?: ValidationFunction<string>;
    signUpEndDate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MasterBatchUpdateFormOverridesProps = {
    MasterBatchUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    batch?: PrimitiveOverrideProps<TextFieldProps>;
    createApplicationStartDate?: PrimitiveOverrideProps<TextFieldProps>;
    createApplicationEndDate?: PrimitiveOverrideProps<TextFieldProps>;
    updateApplicationEndDate?: PrimitiveOverrideProps<TextFieldProps>;
    signUpStartDate?: PrimitiveOverrideProps<TextFieldProps>;
    signUpEndDate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MasterBatchUpdateFormProps = React.PropsWithChildren<{
    overrides?: MasterBatchUpdateFormOverridesProps | undefined | null;
} & {
    batch?: string;
    masterBatch?: MasterBatch;
    onSubmit?: (fields: MasterBatchUpdateFormInputValues) => MasterBatchUpdateFormInputValues;
    onSuccess?: (fields: MasterBatchUpdateFormInputValues) => void;
    onError?: (fields: MasterBatchUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MasterBatchUpdateFormInputValues) => MasterBatchUpdateFormInputValues;
    onValidate?: MasterBatchUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MasterBatchUpdateForm(props: MasterBatchUpdateFormProps): React.ReactElement;
