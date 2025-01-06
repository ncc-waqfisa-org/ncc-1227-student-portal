/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { University } from "../models";
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
export declare type UniversityUpdateFormInputValues = {
    name?: string;
    nameAr?: string;
    availability?: number;
    isDeactivated?: boolean;
    isExtended?: number;
    extensionDuration?: number;
    isException?: number;
    isTrashed?: boolean;
};
export declare type UniversityUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    nameAr?: ValidationFunction<string>;
    availability?: ValidationFunction<number>;
    isDeactivated?: ValidationFunction<boolean>;
    isExtended?: ValidationFunction<number>;
    extensionDuration?: ValidationFunction<number>;
    isException?: ValidationFunction<number>;
    isTrashed?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UniversityUpdateFormOverridesProps = {
    UniversityUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    nameAr?: PrimitiveOverrideProps<TextFieldProps>;
    availability?: PrimitiveOverrideProps<TextFieldProps>;
    isDeactivated?: PrimitiveOverrideProps<SwitchFieldProps>;
    isExtended?: PrimitiveOverrideProps<TextFieldProps>;
    extensionDuration?: PrimitiveOverrideProps<TextFieldProps>;
    isException?: PrimitiveOverrideProps<TextFieldProps>;
    isTrashed?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type UniversityUpdateFormProps = React.PropsWithChildren<{
    overrides?: UniversityUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    university?: University;
    onSubmit?: (fields: UniversityUpdateFormInputValues) => UniversityUpdateFormInputValues;
    onSuccess?: (fields: UniversityUpdateFormInputValues) => void;
    onError?: (fields: UniversityUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UniversityUpdateFormInputValues) => UniversityUpdateFormInputValues;
    onValidate?: UniversityUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UniversityUpdateForm(props: UniversityUpdateFormProps): React.ReactElement;
