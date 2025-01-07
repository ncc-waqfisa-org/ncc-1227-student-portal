/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextAreaFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type MasterStatisticsCreateFormInputValues = {
    id?: number;
    batch?: number;
    totalApplications?: number;
    totalApplicationsPerStatus?: string;
    scoreHistogram?: string;
    gpaHistogram?: string;
    totalApplicationsPerUniversity?: string;
    topUniversities?: string;
    topPrograms?: string;
    familyIncome?: string;
    schoolType?: string;
    students?: string;
    applications?: string;
    today?: string;
};
export declare type MasterStatisticsCreateFormValidationValues = {
    id?: ValidationFunction<number>;
    batch?: ValidationFunction<number>;
    totalApplications?: ValidationFunction<number>;
    totalApplicationsPerStatus?: ValidationFunction<string>;
    scoreHistogram?: ValidationFunction<string>;
    gpaHistogram?: ValidationFunction<string>;
    totalApplicationsPerUniversity?: ValidationFunction<string>;
    topUniversities?: ValidationFunction<string>;
    topPrograms?: ValidationFunction<string>;
    familyIncome?: ValidationFunction<string>;
    schoolType?: ValidationFunction<string>;
    students?: ValidationFunction<string>;
    applications?: ValidationFunction<string>;
    today?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MasterStatisticsCreateFormOverridesProps = {
    MasterStatisticsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    id?: PrimitiveOverrideProps<TextFieldProps>;
    batch?: PrimitiveOverrideProps<TextFieldProps>;
    totalApplications?: PrimitiveOverrideProps<TextFieldProps>;
    totalApplicationsPerStatus?: PrimitiveOverrideProps<TextAreaFieldProps>;
    scoreHistogram?: PrimitiveOverrideProps<TextAreaFieldProps>;
    gpaHistogram?: PrimitiveOverrideProps<TextAreaFieldProps>;
    totalApplicationsPerUniversity?: PrimitiveOverrideProps<TextAreaFieldProps>;
    topUniversities?: PrimitiveOverrideProps<TextAreaFieldProps>;
    topPrograms?: PrimitiveOverrideProps<TextAreaFieldProps>;
    familyIncome?: PrimitiveOverrideProps<TextAreaFieldProps>;
    schoolType?: PrimitiveOverrideProps<TextAreaFieldProps>;
    students?: PrimitiveOverrideProps<TextAreaFieldProps>;
    applications?: PrimitiveOverrideProps<TextAreaFieldProps>;
    today?: PrimitiveOverrideProps<TextAreaFieldProps>;
} & EscapeHatchProps;
export declare type MasterStatisticsCreateFormProps = React.PropsWithChildren<{
    overrides?: MasterStatisticsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: MasterStatisticsCreateFormInputValues) => MasterStatisticsCreateFormInputValues;
    onSuccess?: (fields: MasterStatisticsCreateFormInputValues) => void;
    onError?: (fields: MasterStatisticsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MasterStatisticsCreateFormInputValues) => MasterStatisticsCreateFormInputValues;
    onValidate?: MasterStatisticsCreateFormValidationValues;
} & React.CSSProperties>;
export default function MasterStatisticsCreateForm(props: MasterStatisticsCreateFormProps): React.ReactElement;
