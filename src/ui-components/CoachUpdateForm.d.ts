/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Coach } from "../API.ts";
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
export declare type CoachUpdateFormInputValues = {
    cognitoId?: string;
    name?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    bio?: string;
    school?: string;
    zipCode?: string;
    address?: string;
    state?: string;
    city?: string;
    country?: string;
};
export declare type CoachUpdateFormValidationValues = {
    cognitoId?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    phoneNumber?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    bio?: ValidationFunction<string>;
    school?: ValidationFunction<string>;
    zipCode?: ValidationFunction<string>;
    address?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    country?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CoachUpdateFormOverridesProps = {
    CoachUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    cognitoId?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    phoneNumber?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    bio?: PrimitiveOverrideProps<TextFieldProps>;
    school?: PrimitiveOverrideProps<TextFieldProps>;
    zipCode?: PrimitiveOverrideProps<TextFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    country?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CoachUpdateFormProps = React.PropsWithChildren<{
    overrides?: CoachUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    coach?: Coach;
    onSubmit?: (fields: CoachUpdateFormInputValues) => CoachUpdateFormInputValues;
    onSuccess?: (fields: CoachUpdateFormInputValues) => void;
    onError?: (fields: CoachUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CoachUpdateFormInputValues) => CoachUpdateFormInputValues;
    onValidate?: CoachUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CoachUpdateForm(props: CoachUpdateFormProps): React.ReactElement;
