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
export declare type ProgramCreateFormInputValues = {
    name?: string;
    requirements?: string;
    availability?: number;
    universityID?: string;
};
export declare type ProgramCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    requirements?: ValidationFunction<string>;
    availability?: ValidationFunction<number>;
    universityID?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProgramCreateFormOverridesProps = {
    ProgramCreateFormGrid?: FormProps<GridProps>;
    name?: FormProps<TextFieldProps>;
    requirements?: FormProps<TextFieldProps>;
    availability?: FormProps<TextFieldProps>;
    universityID?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProgramCreateFormProps = React.PropsWithChildren<{
    overrides?: ProgramCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProgramCreateFormInputValues) => ProgramCreateFormInputValues;
    onSuccess?: (fields: ProgramCreateFormInputValues) => void;
    onError?: (fields: ProgramCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: ProgramCreateFormInputValues) => ProgramCreateFormInputValues;
    onValidate?: ProgramCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProgramCreateForm(props: ProgramCreateFormProps): React.ReactElement;
