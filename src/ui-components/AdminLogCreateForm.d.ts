/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AdminLogCreateFormInputValues = {
    applicationID?: string;
    adminCPR?: string;
    dateTime?: string;
    snapshot?: string;
    reason?: string;
};
export declare type AdminLogCreateFormValidationValues = {
    applicationID?: ValidationFunction<string>;
    adminCPR?: ValidationFunction<string>;
    dateTime?: ValidationFunction<string>;
    snapshot?: ValidationFunction<string>;
    reason?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AdminLogCreateFormOverridesProps = {
    AdminLogCreateFormGrid?: FormProps<GridProps>;
    applicationID?: FormProps<TextFieldProps>;
    adminCPR?: FormProps<TextFieldProps>;
    dateTime?: FormProps<TextFieldProps>;
    snapshot?: FormProps<TextFieldProps>;
    reason?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AdminLogCreateFormProps = React.PropsWithChildren<{
    overrides?: AdminLogCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AdminLogCreateFormInputValues) => AdminLogCreateFormInputValues;
    onSuccess?: (fields: AdminLogCreateFormInputValues) => void;
    onError?: (fields: AdminLogCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: AdminLogCreateFormInputValues) => AdminLogCreateFormInputValues;
    onValidate?: AdminLogCreateFormValidationValues;
} & React.CSSProperties>;
export default function AdminLogCreateForm(props: AdminLogCreateFormProps): React.ReactElement;
