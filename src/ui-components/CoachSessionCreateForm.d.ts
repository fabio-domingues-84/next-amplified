/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type CoachSessionCreateFormInputValues = {
    name?: string;
    duration?: number;
};
export declare type CoachSessionCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    duration?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CoachSessionCreateFormOverridesProps = {
    CoachSessionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    duration?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CoachSessionCreateFormProps = React.PropsWithChildren<{
    overrides?: CoachSessionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CoachSessionCreateFormInputValues) => CoachSessionCreateFormInputValues;
    onSuccess?: (fields: CoachSessionCreateFormInputValues) => void;
    onError?: (fields: CoachSessionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CoachSessionCreateFormInputValues) => CoachSessionCreateFormInputValues;
    onValidate?: CoachSessionCreateFormValidationValues;
} & React.CSSProperties>;
export default function CoachSessionCreateForm(props: CoachSessionCreateFormProps): React.ReactElement;
