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
export declare type StudentLogCreateFormInputValues = {
    applicationID?: string;
    studentCPR?: string;
    dateTime?: string;
    snapshot?: string;
    reason?: string;
};
export declare type StudentLogCreateFormValidationValues = {
    applicationID?: ValidationFunction<string>;
    studentCPR?: ValidationFunction<string>;
    dateTime?: ValidationFunction<string>;
    snapshot?: ValidationFunction<string>;
    reason?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StudentLogCreateFormOverridesProps = {
    StudentLogCreateFormGrid?: FormProps<GridProps>;
    applicationID?: FormProps<TextFieldProps>;
    studentCPR?: FormProps<TextFieldProps>;
    dateTime?: FormProps<TextFieldProps>;
    snapshot?: FormProps<TextFieldProps>;
    reason?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StudentLogCreateFormProps = React.PropsWithChildren<{
    overrides?: StudentLogCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: StudentLogCreateFormInputValues) => StudentLogCreateFormInputValues;
    onSuccess?: (fields: StudentLogCreateFormInputValues) => void;
    onError?: (fields: StudentLogCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: StudentLogCreateFormInputValues) => StudentLogCreateFormInputValues;
    onValidate?: StudentLogCreateFormValidationValues;
} & React.CSSProperties>;
export default function StudentLogCreateForm(props: StudentLogCreateFormProps): React.ReactElement;
