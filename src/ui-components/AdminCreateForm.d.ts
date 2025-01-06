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
export declare type AdminCreateFormInputValues = {
    cpr?: string;
    fullName?: string;
    email?: string;
    role?: string;
    isDeactivated?: boolean;
};
export declare type AdminCreateFormValidationValues = {
    cpr?: ValidationFunction<string>;
    fullName?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    role?: ValidationFunction<string>;
    isDeactivated?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AdminCreateFormOverridesProps = {
    AdminCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cpr?: PrimitiveOverrideProps<TextFieldProps>;
    fullName?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    role?: PrimitiveOverrideProps<SelectFieldProps>;
    isDeactivated?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type AdminCreateFormProps = React.PropsWithChildren<{
    overrides?: AdminCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AdminCreateFormInputValues) => AdminCreateFormInputValues;
    onSuccess?: (fields: AdminCreateFormInputValues) => void;
    onError?: (fields: AdminCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AdminCreateFormInputValues) => AdminCreateFormInputValues;
    onValidate?: AdminCreateFormValidationValues;
} & React.CSSProperties>;
export default function AdminCreateForm(props: AdminCreateFormProps): React.ReactElement;
