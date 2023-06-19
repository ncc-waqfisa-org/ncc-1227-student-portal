/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { ProgramChoice } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProgramChoiceUpdateFormInputValues = {
    programID?: string;
    applicationID?: string;
    choiceOrder?: number;
};
export declare type ProgramChoiceUpdateFormValidationValues = {
    programID?: ValidationFunction<string>;
    applicationID?: ValidationFunction<string>;
    choiceOrder?: ValidationFunction<number>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProgramChoiceUpdateFormOverridesProps = {
    ProgramChoiceUpdateFormGrid?: FormProps<GridProps>;
    programID?: FormProps<TextFieldProps>;
    applicationID?: FormProps<TextFieldProps>;
    choiceOrder?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProgramChoiceUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProgramChoiceUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    programChoice?: ProgramChoice;
    onSubmit?: (fields: ProgramChoiceUpdateFormInputValues) => ProgramChoiceUpdateFormInputValues;
    onSuccess?: (fields: ProgramChoiceUpdateFormInputValues) => void;
    onError?: (fields: ProgramChoiceUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: ProgramChoiceUpdateFormInputValues) => ProgramChoiceUpdateFormInputValues;
    onValidate?: ProgramChoiceUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProgramChoiceUpdateForm(props: ProgramChoiceUpdateFormProps): React.ReactElement;
