/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { MasterAttachment } from "../models";
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
export declare type MasterAttachmentUpdateFormInputValues = {
    cprDoc?: string;
    signedContractDoc?: string;
    transcriptDoc?: string;
    universityCertificate?: string;
    tofelILETSCertificate?: string;
};
export declare type MasterAttachmentUpdateFormValidationValues = {
    cprDoc?: ValidationFunction<string>;
    signedContractDoc?: ValidationFunction<string>;
    transcriptDoc?: ValidationFunction<string>;
    universityCertificate?: ValidationFunction<string>;
    tofelILETSCertificate?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MasterAttachmentUpdateFormOverridesProps = {
    MasterAttachmentUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cprDoc?: PrimitiveOverrideProps<TextFieldProps>;
    signedContractDoc?: PrimitiveOverrideProps<TextFieldProps>;
    transcriptDoc?: PrimitiveOverrideProps<TextFieldProps>;
    universityCertificate?: PrimitiveOverrideProps<TextFieldProps>;
    tofelILETSCertificate?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MasterAttachmentUpdateFormProps = React.PropsWithChildren<{
    overrides?: MasterAttachmentUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    masterAttachment?: MasterAttachment;
    onSubmit?: (fields: MasterAttachmentUpdateFormInputValues) => MasterAttachmentUpdateFormInputValues;
    onSuccess?: (fields: MasterAttachmentUpdateFormInputValues) => void;
    onError?: (fields: MasterAttachmentUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MasterAttachmentUpdateFormInputValues) => MasterAttachmentUpdateFormInputValues;
    onValidate?: MasterAttachmentUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MasterAttachmentUpdateForm(props: MasterAttachmentUpdateFormProps): React.ReactElement;
