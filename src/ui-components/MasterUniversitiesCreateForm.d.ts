/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type MasterUniversitiesCreateFormInputValues = {
    universityName?: string;
    isDeactivated?: boolean;
};
export declare type MasterUniversitiesCreateFormValidationValues = {
    universityName?: ValidationFunction<string>;
    isDeactivated?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MasterUniversitiesCreateFormOverridesProps = {
    MasterUniversitiesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    universityName?: PrimitiveOverrideProps<TextFieldProps>;
    isDeactivated?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type MasterUniversitiesCreateFormProps = React.PropsWithChildren<{
    overrides?: MasterUniversitiesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MasterUniversitiesCreateFormInputValues) => MasterUniversitiesCreateFormInputValues;
    onSuccess?: (fields: MasterUniversitiesCreateFormInputValues) => void;
    onError?: (fields: MasterUniversitiesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MasterUniversitiesCreateFormInputValues) => MasterUniversitiesCreateFormInputValues;
    onValidate?: MasterUniversitiesCreateFormValidationValues;
} & React.CSSProperties>;
export default function MasterUniversitiesCreateForm(props: MasterUniversitiesCreateFormProps): React.ReactElement;
