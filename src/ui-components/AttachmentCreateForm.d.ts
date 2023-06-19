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
export declare type AttachmentCreateFormInputValues = {
    cprDoc?: string;
    acceptanceLetterDoc?: string;
    transcriptDoc?: string;
    signedContractDoc?: string;
};
export declare type AttachmentCreateFormValidationValues = {
    cprDoc?: ValidationFunction<string>;
    acceptanceLetterDoc?: ValidationFunction<string>;
    transcriptDoc?: ValidationFunction<string>;
    signedContractDoc?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AttachmentCreateFormOverridesProps = {
    AttachmentCreateFormGrid?: FormProps<GridProps>;
    cprDoc?: FormProps<TextFieldProps>;
    acceptanceLetterDoc?: FormProps<TextFieldProps>;
    transcriptDoc?: FormProps<TextFieldProps>;
    signedContractDoc?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AttachmentCreateFormProps = React.PropsWithChildren<{
    overrides?: AttachmentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AttachmentCreateFormInputValues) => AttachmentCreateFormInputValues;
    onSuccess?: (fields: AttachmentCreateFormInputValues) => void;
    onError?: (fields: AttachmentCreateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: AttachmentCreateFormInputValues) => AttachmentCreateFormInputValues;
    onValidate?: AttachmentCreateFormValidationValues;
} & React.CSSProperties>;
export default function AttachmentCreateForm(props: AttachmentCreateFormProps): React.ReactElement;
