/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { MasterAppliedUniversities } from "../models";
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
export declare type MasterAppliedUniversitiesUpdateFormInputValues = {
    universityName?: string;
    universityNameAr?: string;
    isDeactivated?: boolean;
};
export declare type MasterAppliedUniversitiesUpdateFormValidationValues = {
    universityName?: ValidationFunction<string>;
    universityNameAr?: ValidationFunction<string>;
    isDeactivated?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MasterAppliedUniversitiesUpdateFormOverridesProps = {
    MasterAppliedUniversitiesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    universityName?: PrimitiveOverrideProps<TextFieldProps>;
    universityNameAr?: PrimitiveOverrideProps<TextFieldProps>;
    isDeactivated?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type MasterAppliedUniversitiesUpdateFormProps = React.PropsWithChildren<{
    overrides?: MasterAppliedUniversitiesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    masterAppliedUniversities?: MasterAppliedUniversities;
    onSubmit?: (fields: MasterAppliedUniversitiesUpdateFormInputValues) => MasterAppliedUniversitiesUpdateFormInputValues;
    onSuccess?: (fields: MasterAppliedUniversitiesUpdateFormInputValues) => void;
    onError?: (fields: MasterAppliedUniversitiesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MasterAppliedUniversitiesUpdateFormInputValues) => MasterAppliedUniversitiesUpdateFormInputValues;
    onValidate?: MasterAppliedUniversitiesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MasterAppliedUniversitiesUpdateForm(props: MasterAppliedUniversitiesUpdateFormProps): React.ReactElement;
