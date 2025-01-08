/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type MasterAttachmentCreateFormInputValues = {
    cprDoc?: string;
    signedContractDoc?: string;
    transcriptDoc?: string;
    universityCertificate?: string;
    tofelILETSCertificate?: string;
    acceptanceLetterDoc?: string;
};
export declare type MasterAttachmentCreateFormValidationValues = {
    cprDoc?: ValidationFunction<string>;
    signedContractDoc?: ValidationFunction<string>;
    transcriptDoc?: ValidationFunction<string>;
    universityCertificate?: ValidationFunction<string>;
    tofelILETSCertificate?: ValidationFunction<string>;
    acceptanceLetterDoc?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MasterAttachmentCreateFormOverridesProps = {
    MasterAttachmentCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cprDoc?: PrimitiveOverrideProps<TextFieldProps>;
    signedContractDoc?: PrimitiveOverrideProps<TextFieldProps>;
    transcriptDoc?: PrimitiveOverrideProps<TextFieldProps>;
    universityCertificate?: PrimitiveOverrideProps<TextFieldProps>;
    tofelILETSCertificate?: PrimitiveOverrideProps<TextFieldProps>;
    acceptanceLetterDoc?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MasterAttachmentCreateFormProps = React.PropsWithChildren<{
    overrides?: MasterAttachmentCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MasterAttachmentCreateFormInputValues) => MasterAttachmentCreateFormInputValues;
    onSuccess?: (fields: MasterAttachmentCreateFormInputValues) => void;
    onError?: (fields: MasterAttachmentCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MasterAttachmentCreateFormInputValues) => MasterAttachmentCreateFormInputValues;
    onValidate?: MasterAttachmentCreateFormValidationValues;
} & React.CSSProperties>;
export default function MasterAttachmentCreateForm(props: MasterAttachmentCreateFormProps): React.ReactElement;
