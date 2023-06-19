/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { AdminLog } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AdminLogUpdateFormInputValues = {
    applicationID?: string;
    adminCPR?: string;
    dateTime?: string;
    snapshot?: string;
    reason?: string;
};
export declare type AdminLogUpdateFormValidationValues = {
    applicationID?: ValidationFunction<string>;
    adminCPR?: ValidationFunction<string>;
    dateTime?: ValidationFunction<string>;
    snapshot?: ValidationFunction<string>;
    reason?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AdminLogUpdateFormOverridesProps = {
    AdminLogUpdateFormGrid?: FormProps<GridProps>;
    applicationID?: FormProps<TextFieldProps>;
    adminCPR?: FormProps<TextFieldProps>;
    dateTime?: FormProps<TextFieldProps>;
    snapshot?: FormProps<TextFieldProps>;
    reason?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AdminLogUpdateFormProps = React.PropsWithChildren<{
    overrides?: AdminLogUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    adminLog?: AdminLog;
    onSubmit?: (fields: AdminLogUpdateFormInputValues) => AdminLogUpdateFormInputValues;
    onSuccess?: (fields: AdminLogUpdateFormInputValues) => void;
    onError?: (fields: AdminLogUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: AdminLogUpdateFormInputValues) => AdminLogUpdateFormInputValues;
    onValidate?: AdminLogUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AdminLogUpdateForm(props: AdminLogUpdateFormProps): React.ReactElement;
