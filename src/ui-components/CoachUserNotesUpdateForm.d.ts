/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { CoachUserNotes } from "../API.ts";
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
export declare type CoachUserNotesUpdateFormInputValues = {
    coachUserId?: string;
    notes?: string;
};
export declare type CoachUserNotesUpdateFormValidationValues = {
    coachUserId?: ValidationFunction<string>;
    notes?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CoachUserNotesUpdateFormOverridesProps = {
    CoachUserNotesUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    coachUserId?: PrimitiveOverrideProps<TextFieldProps>;
    notes?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CoachUserNotesUpdateFormProps = React.PropsWithChildren<{
    overrides?: CoachUserNotesUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    coachUserNotes?: CoachUserNotes;
    onSubmit?: (fields: CoachUserNotesUpdateFormInputValues) => CoachUserNotesUpdateFormInputValues;
    onSuccess?: (fields: CoachUserNotesUpdateFormInputValues) => void;
    onError?: (fields: CoachUserNotesUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CoachUserNotesUpdateFormInputValues) => CoachUserNotesUpdateFormInputValues;
    onValidate?: CoachUserNotesUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CoachUserNotesUpdateForm(props: CoachUserNotesUpdateFormProps): React.ReactElement;
