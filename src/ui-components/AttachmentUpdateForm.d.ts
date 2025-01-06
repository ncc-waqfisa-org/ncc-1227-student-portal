/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Attachment } from "../models";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AttachmentUpdateFormInputValues = {
    cprDoc?: string;
    signedContractDoc?: string;
    transcriptDoc?: string;
    schoolCertificate?: string;
};
export declare type AttachmentUpdateFormValidationValues = {
    cprDoc?: ValidationFunction<string>;
    signedContractDoc?: ValidationFunction<string>;
    transcriptDoc?: ValidationFunction<string>;
    schoolCertificate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AttachmentUpdateFormOverridesProps = {
    AttachmentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cprDoc?: PrimitiveOverrideProps<TextFieldProps>;
    signedContractDoc?: PrimitiveOverrideProps<TextFieldProps>;
    transcriptDoc?: PrimitiveOverrideProps<TextFieldProps>;
    schoolCertificate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AttachmentUpdateFormProps = React.PropsWithChildren<{
    overrides?: AttachmentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    attachment?: Attachment;
    onSubmit?: (fields: AttachmentUpdateFormInputValues) => AttachmentUpdateFormInputValues;
    onSuccess?: (fields: AttachmentUpdateFormInputValues) => void;
    onError?: (fields: AttachmentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AttachmentUpdateFormInputValues) => AttachmentUpdateFormInputValues;
    onValidate?: AttachmentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AttachmentUpdateForm(props: AttachmentUpdateFormProps): React.ReactElement;
