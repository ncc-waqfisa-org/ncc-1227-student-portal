/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { StudentLog } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type StudentLogUpdateFormInputValues = {
    applicationID?: string;
    studentCPR?: string;
    dateTime?: string;
    snapshot?: string;
    reason?: string;
};
export declare type StudentLogUpdateFormValidationValues = {
    applicationID?: ValidationFunction<string>;
    studentCPR?: ValidationFunction<string>;
    dateTime?: ValidationFunction<string>;
    snapshot?: ValidationFunction<string>;
    reason?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type StudentLogUpdateFormOverridesProps = {
    StudentLogUpdateFormGrid?: FormProps<GridProps>;
    applicationID?: FormProps<TextFieldProps>;
    studentCPR?: FormProps<TextFieldProps>;
    dateTime?: FormProps<TextFieldProps>;
    snapshot?: FormProps<TextFieldProps>;
    reason?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type StudentLogUpdateFormProps = React.PropsWithChildren<{
    overrides?: StudentLogUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    studentLog?: StudentLog;
    onSubmit?: (fields: StudentLogUpdateFormInputValues) => StudentLogUpdateFormInputValues;
    onSuccess?: (fields: StudentLogUpdateFormInputValues) => void;
    onError?: (fields: StudentLogUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: StudentLogUpdateFormInputValues) => StudentLogUpdateFormInputValues;
    onValidate?: StudentLogUpdateFormValidationValues;
} & React.CSSProperties>;
export default function StudentLogUpdateForm(props: StudentLogUpdateFormProps): React.ReactElement;
