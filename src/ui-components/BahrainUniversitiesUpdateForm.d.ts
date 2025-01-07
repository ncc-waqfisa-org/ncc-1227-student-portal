/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { BahrainUniversities } from "../models";
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
export declare type BahrainUniversitiesUpdateFormInputValues = {
    universityName?: string;
    universityNameAr?: string;
    isDeactivated?: boolean;
};
export declare type BahrainUniversitiesUpdateFormValidationValues = {
    universityName?: ValidationFunction<string>;
    universityNameAr?: ValidationFunction<string>;
    isDeactivated?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type BahrainUniversitiesUpdateFormOverridesProps = {
    BahrainUniversitiesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    universityName?: PrimitiveOverrideProps<TextFieldProps>;
    universityNameAr?: PrimitiveOverrideProps<TextFieldProps>;
    isDeactivated?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type BahrainUniversitiesUpdateFormProps = React.PropsWithChildren<{
    overrides?: BahrainUniversitiesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    bahrainUniversities?: BahrainUniversities;
    onSubmit?: (fields: BahrainUniversitiesUpdateFormInputValues) => BahrainUniversitiesUpdateFormInputValues;
    onSuccess?: (fields: BahrainUniversitiesUpdateFormInputValues) => void;
    onError?: (fields: BahrainUniversitiesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: BahrainUniversitiesUpdateFormInputValues) => BahrainUniversitiesUpdateFormInputValues;
    onValidate?: BahrainUniversitiesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function BahrainUniversitiesUpdateForm(props: BahrainUniversitiesUpdateFormProps): React.ReactElement;
