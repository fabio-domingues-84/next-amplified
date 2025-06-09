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
export declare type SkillCreateFormInputValues = {
    name?: string;
    trackingName?: string;
    description?: string;
    games?: string[];
};
export declare type SkillCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    trackingName?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    games?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type SkillCreateFormOverridesProps = {
    SkillCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    trackingName?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    games?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type SkillCreateFormProps = React.PropsWithChildren<{
    overrides?: SkillCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: SkillCreateFormInputValues) => SkillCreateFormInputValues;
    onSuccess?: (fields: SkillCreateFormInputValues) => void;
    onError?: (fields: SkillCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: SkillCreateFormInputValues) => SkillCreateFormInputValues;
    onValidate?: SkillCreateFormValidationValues;
} & React.CSSProperties>;
export default function SkillCreateForm(props: SkillCreateFormProps): React.ReactElement;
