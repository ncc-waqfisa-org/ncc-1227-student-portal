/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { Address } from "../models";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type AddressUpdateFormInputValues = {
    type?: string;
    buildingNumber?: string;
    roadNumber?: string;
    blockNumber?: string;
    city?: string;
};
export declare type AddressUpdateFormValidationValues = {
    type?: ValidationFunction<string>;
    buildingNumber?: ValidationFunction<string>;
    roadNumber?: ValidationFunction<string>;
    blockNumber?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
};
export declare type FormProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AddressUpdateFormOverridesProps = {
    AddressUpdateFormGrid?: FormProps<GridProps>;
    type?: FormProps<TextFieldProps>;
    buildingNumber?: FormProps<TextFieldProps>;
    roadNumber?: FormProps<TextFieldProps>;
    blockNumber?: FormProps<TextFieldProps>;
    city?: FormProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AddressUpdateFormProps = React.PropsWithChildren<{
    overrides?: AddressUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    address?: Address;
    onSubmit?: (fields: AddressUpdateFormInputValues) => AddressUpdateFormInputValues;
    onSuccess?: (fields: AddressUpdateFormInputValues) => void;
    onError?: (fields: AddressUpdateFormInputValues, errorMessage: string) => void;
    onCancel?: () => void;
    onChange?: (fields: AddressUpdateFormInputValues) => AddressUpdateFormInputValues;
    onValidate?: AddressUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AddressUpdateForm(props: AddressUpdateFormProps): React.ReactElement;
