/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Application } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ApplicationUpdateFormInputValues = {
    gpa?: number;
    status?: string;
    attachmentID?: string;
    studentCPR?: string;
    attachment?: string;
    applicationAttachmentId?: string;
};
export declare type ApplicationUpdateFormValidationValues = {
    gpa?: ValidationFunction<number>;
    status?: ValidationFunction<string>;
    attachmentID?: ValidationFunction<string>;
    studentCPR?: ValidationFunction<string>;
    attachment?: ValidationFunction<string>;
    applicationAttachmentId?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ApplicationUpdateFormOverridesProps = {
    ApplicationUpdateFormGrid?: FormProps<GridProps>;
    gpa?: FormProps<TextFieldProps>;
    status?: FormProps<SelectFieldProps>;
    attachmentID?: FormProps<TextFieldProps>;
    studentCPR?: FormProps<TextFieldProps>;
    attachment?: FormProps<SelectFieldProps>;
    applicationAttachmentId?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ApplicationUpdateFormProps = React.PropsWithChildren<{
    overrides?: ApplicationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    application?: Application;
    onSubmit?: (fields: ApplicationUpdateFormInputValues) => ApplicationUpdateFormInputValues;
    onSuccess?: (fields: ApplicationUpdateFormInputValues) => void;
    onError?: (fields: ApplicationUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: ApplicationUpdateFormInputValues) => ApplicationUpdateFormInputValues;
    onValidate?: ApplicationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ApplicationUpdateForm(props: ApplicationUpdateFormProps): React.ReactElement;
