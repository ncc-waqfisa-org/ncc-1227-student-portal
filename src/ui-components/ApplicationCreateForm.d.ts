/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ApplicationCreateFormInputValues = {
    gpa?: number;
    status?: string;
    attachmentID?: string;
    studentCPR?: string;
    attachment?: string;
    applicationAttachmentId?: string;
};
export declare type ApplicationCreateFormValidationValues = {
    gpa?: ValidationFunction<number>;
    status?: ValidationFunction<string>;
    attachmentID?: ValidationFunction<string>;
    studentCPR?: ValidationFunction<string>;
    attachment?: ValidationFunction<string>;
    applicationAttachmentId?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ApplicationCreateFormOverridesProps = {
    ApplicationCreateFormGrid?: FormProps<GridProps>;
    gpa?: FormProps<TextFieldProps>;
    status?: FormProps<SelectFieldProps>;
    attachmentID?: FormProps<TextFieldProps>;
    studentCPR?: FormProps<TextFieldProps>;
    attachment?: FormProps<SelectFieldProps>;
    applicationAttachmentId?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ApplicationCreateFormProps = React.PropsWithChildren<{
    overrides?: ApplicationCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ApplicationCreateFormInputValues) => ApplicationCreateFormInputValues;
    onSuccess?: (fields: ApplicationCreateFormInputValues) => void;
    onError?: (fields: ApplicationCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: ApplicationCreateFormInputValues) => ApplicationCreateFormInputValues;
    onValidate?: ApplicationCreateFormValidationValues;
} & React.CSSProperties>;
export default function ApplicationCreateForm(props: ApplicationCreateFormProps): React.ReactElement;
