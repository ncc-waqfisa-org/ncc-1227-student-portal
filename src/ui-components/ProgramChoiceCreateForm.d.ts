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
export declare type ProgramChoiceCreateFormInputValues = {
    programID?: string;
    applicationID?: string;
    choiceOrder?: number;
};
export declare type ProgramChoiceCreateFormValidationValues = {
    programID?: ValidationFunction<string>;
    applicationID?: ValidationFunction<string>;
    choiceOrder?: ValidationFunction<number>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProgramChoiceCreateFormOverridesProps = {
    ProgramChoiceCreateFormGrid?: FormProps<GridProps>;
    programID?: FormProps<TextFieldProps>;
    applicationID?: FormProps<TextFieldProps>;
    choiceOrder?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProgramChoiceCreateFormProps = React.PropsWithChildren<{
    overrides?: ProgramChoiceCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ProgramChoiceCreateFormInputValues) => ProgramChoiceCreateFormInputValues;
    onSuccess?: (fields: ProgramChoiceCreateFormInputValues) => void;
    onError?: (fields: ProgramChoiceCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: ProgramChoiceCreateFormInputValues) => ProgramChoiceCreateFormInputValues;
    onValidate?: ProgramChoiceCreateFormValidationValues;
} & React.CSSProperties>;
export default function ProgramChoiceCreateForm(props: ProgramChoiceCreateFormProps): React.ReactElement;
