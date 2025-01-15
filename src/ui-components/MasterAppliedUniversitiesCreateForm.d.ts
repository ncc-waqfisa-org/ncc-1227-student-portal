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
export declare type MasterAppliedUniversitiesCreateFormInputValues = {
    universityName?: string;
    universityNameAr?: string;
    isDeactivated?: boolean;
};
export declare type MasterAppliedUniversitiesCreateFormValidationValues = {
    universityName?: ValidationFunction<string>;
    universityNameAr?: ValidationFunction<string>;
    isDeactivated?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MasterAppliedUniversitiesCreateFormOverridesProps = {
    MasterAppliedUniversitiesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    universityName?: PrimitiveOverrideProps<TextFieldProps>;
    universityNameAr?: PrimitiveOverrideProps<TextFieldProps>;
    isDeactivated?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type MasterAppliedUniversitiesCreateFormProps = React.PropsWithChildren<{
    overrides?: MasterAppliedUniversitiesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MasterAppliedUniversitiesCreateFormInputValues) => MasterAppliedUniversitiesCreateFormInputValues;
    onSuccess?: (fields: MasterAppliedUniversitiesCreateFormInputValues) => void;
    onError?: (fields: MasterAppliedUniversitiesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MasterAppliedUniversitiesCreateFormInputValues) => MasterAppliedUniversitiesCreateFormInputValues;
    onValidate?: MasterAppliedUniversitiesCreateFormValidationValues;
} & React.CSSProperties>;
export default function MasterAppliedUniversitiesCreateForm(props: MasterAppliedUniversitiesCreateFormProps): React.ReactElement;
