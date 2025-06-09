/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { AppInfo } from "../API.ts";
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
export declare type AppInfoUpdateFormInputValues = {
    paywallVideoId?: string;
    env?: string;
};
export declare type AppInfoUpdateFormValidationValues = {
    paywallVideoId?: ValidationFunction<string>;
    env?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AppInfoUpdateFormOverridesProps = {
    AppInfoUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    paywallVideoId?: PrimitiveOverrideProps<TextFieldProps>;
    env?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AppInfoUpdateFormProps = React.PropsWithChildren<{
    overrides?: AppInfoUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    appInfo?: AppInfo;
    onSubmit?: (fields: AppInfoUpdateFormInputValues) => AppInfoUpdateFormInputValues;
    onSuccess?: (fields: AppInfoUpdateFormInputValues) => void;
    onError?: (fields: AppInfoUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AppInfoUpdateFormInputValues) => AppInfoUpdateFormInputValues;
    onValidate?: AppInfoUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AppInfoUpdateForm(props: AppInfoUpdateFormProps): React.ReactElement;
