/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { MasterUniversities } from "../models";
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
export declare type MasterUniversitiesUpdateFormInputValues = {
    universityName?: string;
    isDeactivated?: boolean;
};
export declare type MasterUniversitiesUpdateFormValidationValues = {
    universityName?: ValidationFunction<string>;
    isDeactivated?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MasterUniversitiesUpdateFormOverridesProps = {
    MasterUniversitiesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    universityName?: PrimitiveOverrideProps<TextFieldProps>;
    isDeactivated?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type MasterUniversitiesUpdateFormProps = React.PropsWithChildren<{
    overrides?: MasterUniversitiesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    masterUniversities?: MasterUniversities;
    onSubmit?: (fields: MasterUniversitiesUpdateFormInputValues) => MasterUniversitiesUpdateFormInputValues;
    onSuccess?: (fields: MasterUniversitiesUpdateFormInputValues) => void;
    onError?: (fields: MasterUniversitiesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MasterUniversitiesUpdateFormInputValues) => MasterUniversitiesUpdateFormInputValues;
    onValidate?: MasterUniversitiesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MasterUniversitiesUpdateForm(props: MasterUniversitiesUpdateFormProps): React.ReactElement;
