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
export declare type CoachUserNotesCreateFormInputValues = {
    coachUserId?: string;
    notes?: string;
};
export declare type CoachUserNotesCreateFormValidationValues = {
    coachUserId?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CoachUserNotesCreateFormOverridesProps = {
    CoachUserNotesCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    coachUserId?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CoachUserNotesCreateFormProps = React.PropsWithChildren<{
    overrides?: CoachUserNotesCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CoachUserNotesCreateFormInputValues) => CoachUserNotesCreateFormInputValues;
    onSuccess?: (fields: CoachUserNotesCreateFormInputValues) => void;
    onError?: (fields: CoachUserNotesCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CoachUserNotesCreateFormInputValues) => CoachUserNotesCreateFormInputValues;
    onValidate?: CoachUserNotesCreateFormValidationValues;
} & React.CSSProperties>;
export default function CoachUserNotesCreateForm(props: CoachUserNotesCreateFormProps): React.ReactElement;
