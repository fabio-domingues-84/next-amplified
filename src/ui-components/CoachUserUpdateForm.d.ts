/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps } from "@aws-amplify/ui-react";
import { CoachUser } from "../API.ts";
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
export declare type CoachUserUpdateFormInputValues = {
    status?: string;
};
export declare type CoachUserUpdateFormValidationValues = {
    status?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CoachUserUpdateFormOverridesProps = {
    CoachUserUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    status?: PrimitiveOverrideProps<SelectFieldProps>;
} & EscapeHatchProps;
export declare type CoachUserUpdateFormProps = React.PropsWithChildren<{
    overrides?: CoachUserUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    coachUser?: CoachUser;
    onSubmit?: (fields: CoachUserUpdateFormInputValues) => CoachUserUpdateFormInputValues;
    onSuccess?: (fields: CoachUserUpdateFormInputValues) => void;
    onError?: (fields: CoachUserUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CoachUserUpdateFormInputValues) => CoachUserUpdateFormInputValues;
    onValidate?: CoachUserUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CoachUserUpdateForm(props: CoachUserUpdateFormProps): React.ReactElement;
