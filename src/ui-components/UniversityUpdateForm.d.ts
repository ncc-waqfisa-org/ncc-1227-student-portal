/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { University } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UniversityUpdateFormInputValues = {
    name?: string;
};
export declare type UniversityUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UniversityUpdateFormOverridesProps = {
    UniversityUpdateFormGrid?: FormProps<GridProps>;
    name?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UniversityUpdateFormProps = React.PropsWithChildren<{
    overrides?: UniversityUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    university?: University;
    onSubmit?: (fields: UniversityUpdateFormInputValues) => UniversityUpdateFormInputValues;
    onSuccess?: (fields: UniversityUpdateFormInputValues) => void;
    onError?: (fields: UniversityUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: UniversityUpdateFormInputValues) => UniversityUpdateFormInputValues;
    onValidate?: UniversityUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UniversityUpdateForm(props: UniversityUpdateFormProps): React.ReactElement;
