/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { BahrainUniversities } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function BahrainUniversitiesCreateForm(props) {
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
    universityName: "",
    universityNameAr: "",
    isDeactivated: false,
  };
  const [universityName, setUniversityName] = React.useState(
    initialValues.universityName
  );
  const [universityNameAr, setUniversityNameAr] = React.useState(
    initialValues.universityNameAr
  );
  const [isDeactivated, setIsDeactivated] = React.useState(
    initialValues.isDeactivated
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setUniversityName(initialValues.universityName);
    setUniversityNameAr(initialValues.universityNameAr);
    setIsDeactivated(initialValues.isDeactivated);
    setErrors({});
  };
  const validations = {
    universityName: [],
    universityNameAr: [],
    isDeactivated: [],
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
          universityName,
          universityNameAr,
          isDeactivated,
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
          await DataStore.save(new BahrainUniversities(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "BahrainUniversitiesCreateForm")}
      {...rest}
    >
      <TextField
        label="University name"
        isRequired={false}
        isReadOnly={false}
        value={universityName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              universityName: value,
              universityNameAr,
              isDeactivated,
            };
            const result = onChange(modelFields);
            value = result?.universityName ?? value;
          }
          if (errors.universityName?.hasError) {
            runValidationTasks("universityName", value);
          }
          setUniversityName(value);
        }}
        onBlur={() => runValidationTasks("universityName", universityName)}
        errorMessage={errors.universityName?.errorMessage}
        hasError={errors.universityName?.hasError}
        {...getOverrideProps(overrides, "universityName")}
      ></TextField>
      <TextField
        label="University name ar"
        isRequired={false}
        isReadOnly={false}
        value={universityNameAr}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              universityName,
              universityNameAr: value,
              isDeactivated,
            };
            const result = onChange(modelFields);
            value = result?.universityNameAr ?? value;
          }
          if (errors.universityNameAr?.hasError) {
            runValidationTasks("universityNameAr", value);
          }
          setUniversityNameAr(value);
        }}
        onBlur={() => runValidationTasks("universityNameAr", universityNameAr)}
        errorMessage={errors.universityNameAr?.errorMessage}
        hasError={errors.universityNameAr?.hasError}
        {...getOverrideProps(overrides, "universityNameAr")}
      ></TextField>
      <SwitchField
        label="Is deactivated"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isDeactivated}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              universityName,
              universityNameAr,
              isDeactivated: value,
            };
            const result = onChange(modelFields);
            value = result?.isDeactivated ?? value;
          }
          if (errors.isDeactivated?.hasError) {
            runValidationTasks("isDeactivated", value);
          }
          setIsDeactivated(value);
        }}
        onBlur={() => runValidationTasks("isDeactivated", isDeactivated)}
        errorMessage={errors.isDeactivated?.errorMessage}
        hasError={errors.isDeactivated?.hasError}
        {...getOverrideProps(overrides, "isDeactivated")}
      ></SwitchField>
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
