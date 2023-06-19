/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Program } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ProgramUpdateFormInputValues = {
    name?: string;
    requirements?: string;
    availability?: number;
    universityID?: string;
};
export declare type ProgramUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    requirements?: ValidationFunction<string>;
    availability?: ValidationFunction<number>;
    universityID?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ProgramUpdateFormOverridesProps = {
    ProgramUpdateFormGrid?: FormProps<GridProps>;
    name?: FormProps<TextFieldProps>;
    requirements?: FormProps<TextFieldProps>;
    availability?: FormProps<TextFieldProps>;
    universityID?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ProgramUpdateFormProps = React.PropsWithChildren<{
    overrides?: ProgramUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    program?: Program;
    onSubmit?: (fields: ProgramUpdateFormInputValues) => ProgramUpdateFormInputValues;
    onSuccess?: (fields: ProgramUpdateFormInputValues) => void;
    onError?: (fields: ProgramUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: ProgramUpdateFormInputValues) => ProgramUpdateFormInputValues;
    onValidate?: ProgramUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ProgramUpdateForm(props: ProgramUpdateFormProps): React.ReactElement;
