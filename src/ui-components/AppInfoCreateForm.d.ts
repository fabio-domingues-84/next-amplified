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
export declare type AppInfoCreateFormInputValues = {
    paywallVideoId?: string;
    env?: string;
};
export declare type AppInfoCreateFormValidationValues = {
    paywallVideoId?: ValidationFunction<string>;
    env?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AppInfoCreateFormOverridesProps = {
    AppInfoCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    paywallVideoId?: PrimitiveOverrideProps<TextFieldProps>;
    env?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AppInfoCreateFormProps = React.PropsWithChildren<{
    overrides?: AppInfoCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: AppInfoCreateFormInputValues) => AppInfoCreateFormInputValues;
    onSuccess?: (fields: AppInfoCreateFormInputValues) => void;
    onError?: (fields: AppInfoCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AppInfoCreateFormInputValues) => AppInfoCreateFormInputValues;
    onValidate?: AppInfoCreateFormValidationValues;
} & React.CSSProperties>;
export default function AppInfoCreateForm(props: AppInfoCreateFormProps): React.ReactElement;
