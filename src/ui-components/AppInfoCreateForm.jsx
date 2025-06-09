/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createAppInfo } from "../graphql/mutations";
const client = generateClient();
export default function AppInfoCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    paywallVideoId: "",
    env: "",
  };
  const [paywallVideoId, setPaywallVideoId] = React.useState(
    initialValues.paywallVideoId
  );
  const [env, setEnv] = React.useState(initialValues.env);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setPaywallVideoId(initialValues.paywallVideoId);
    setEnv(initialValues.env);
    setErrors({});
  };
  const validations = {
    paywallVideoId: [],
    env: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          paywallVideoId,
          env,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createAppInfo.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "AppInfoCreateForm")}
      {...rest}
    >
      <TextField
        label="Paywall video id"
        isRequired={false}
        isReadOnly={false}
        value={paywallVideoId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              paywallVideoId: value,
              env,
            };
            const result = onChange(modelFields);
            value = result?.paywallVideoId ?? value;
          }
          if (errors.paywallVideoId?.hasError) {
            runValidationTasks("paywallVideoId", value);
          }
          setPaywallVideoId(value);
        }}
        onBlur={() => runValidationTasks("paywallVideoId", paywallVideoId)}
        errorMessage={errors.paywallVideoId?.errorMessage}
        hasError={errors.paywallVideoId?.hasError}
        {...getOverrideProps(overrides, "paywallVideoId")}
      ></TextField>
      <TextField
        label="Env"
        isRequired={false}
        isReadOnly={false}
        value={env}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              paywallVideoId,
              env: value,
            };
            const result = onChange(modelFields);
            value = result?.env ?? value;
          }
          if (errors.env?.hasError) {
            runValidationTasks("env", value);
          }
          setEnv(value);
        }}
        onBlur={() => runValidationTasks("env", env)}
        errorMessage={errors.env?.errorMessage}
        hasError={errors.env?.hasError}
        {...getOverrideProps(overrides, "env")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
