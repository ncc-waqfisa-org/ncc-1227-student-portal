/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Attachment } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AttachmentUpdateFormInputValues = {
    cprDoc?: string;
    acceptanceLetterDoc?: string;
    transcriptDoc?: string;
    signedContractDoc?: string;
};
export declare type AttachmentUpdateFormValidationValues = {
    cprDoc?: ValidationFunction<string>;
    acceptanceLetterDoc?: ValidationFunction<string>;
    transcriptDoc?: ValidationFunction<string>;
    signedContractDoc?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AttachmentUpdateFormOverridesProps = {
    AttachmentUpdateFormGrid?: FormProps<GridProps>;
    cprDoc?: FormProps<TextFieldProps>;
    acceptanceLetterDoc?: FormProps<TextFieldProps>;
    transcriptDoc?: FormProps<TextFieldProps>;
    signedContractDoc?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AttachmentUpdateFormProps = React.PropsWithChildren<{
    overrides?: AttachmentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    attachment?: Attachment;
    onSubmit?: (fields: AttachmentUpdateFormInputValues) => AttachmentUpdateFormInputValues;
    onSuccess?: (fields: AttachmentUpdateFormInputValues) => void;
    onError?: (fields: AttachmentUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: AttachmentUpdateFormInputValues) => AttachmentUpdateFormInputValues;
    onValidate?: AttachmentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AttachmentUpdateForm(props: AttachmentUpdateFormProps): React.ReactElement;
