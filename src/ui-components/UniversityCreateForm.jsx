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
import { University } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function UniversityCreateForm(props) {
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
    name: "",
    nameAr: "",
    availability: "",
    isDeactivated: false,
    isExtended: "",
    extensionDuration: "",
    isException: "",
    isTrashed: false,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [nameAr, setNameAr] = React.useState(initialValues.nameAr);
  const [availability, setAvailability] = React.useState(
    initialValues.availability
  );
  const [isDeactivated, setIsDeactivated] = React.useState(
    initialValues.isDeactivated
  );
  const [isExtended, setIsExtended] = React.useState(initialValues.isExtended);
  const [extensionDuration, setExtensionDuration] = React.useState(
    initialValues.extensionDuration
  );
  const [isException, setIsException] = React.useState(
    initialValues.isException
  );
  const [isTrashed, setIsTrashed] = React.useState(initialValues.isTrashed);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setNameAr(initialValues.nameAr);
    setAvailability(initialValues.availability);
    setIsDeactivated(initialValues.isDeactivated);
    setIsExtended(initialValues.isExtended);
    setExtensionDuration(initialValues.extensionDuration);
    setIsException(initialValues.isException);
    setIsTrashed(initialValues.isTrashed);
    setErrors({});
  };
  const validations = {
    name: [],
    nameAr: [],
    availability: [],
    isDeactivated: [],
    isExtended: [],
    extensionDuration: [],
    isException: [],
    isTrashed: [],
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
          name,
          nameAr,
          availability,
          isDeactivated,
          isExtended,
          extensionDuration,
          isException,
          isTrashed,
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
          await DataStore.save(new University(modelFields));
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
      {...getOverrideProps(overrides, "UniversityCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              nameAr,
              availability,
              isDeactivated,
              isExtended,
              extensionDuration,
              isException,
              isTrashed,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Name ar"
        isRequired={false}
        isReadOnly={false}
        value={nameAr}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              nameAr: value,
              availability,
              isDeactivated,
              isExtended,
              extensionDuration,
              isException,
              isTrashed,
            };
            const result = onChange(modelFields);
            value = result?.nameAr ?? value;
          }
          if (errors.nameAr?.hasError) {
            runValidationTasks("nameAr", value);
          }
          setNameAr(value);
        }}
        onBlur={() => runValidationTasks("nameAr", nameAr)}
        errorMessage={errors.nameAr?.errorMessage}
        hasError={errors.nameAr?.hasError}
        {...getOverrideProps(overrides, "nameAr")}
      ></TextField>
      <TextField
        label="Availability"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={availability}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              nameAr,
              availability: value,
              isDeactivated,
              isExtended,
              extensionDuration,
              isException,
              isTrashed,
            };
            const result = onChange(modelFields);
            value = result?.availability ?? value;
          }
          if (errors.availability?.hasError) {
            runValidationTasks("availability", value);
          }
          setAvailability(value);
        }}
        onBlur={() => runValidationTasks("availability", availability)}
        errorMessage={errors.availability?.errorMessage}
        hasError={errors.availability?.hasError}
        {...getOverrideProps(overrides, "availability")}
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
              name,
              nameAr,
              availability,
              isDeactivated: value,
              isExtended,
              extensionDuration,
              isException,
              isTrashed,
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
      <TextField
        label="Is extended"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={isExtended}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              nameAr,
              availability,
              isDeactivated,
              isExtended: value,
              extensionDuration,
              isException,
              isTrashed,
            };
            const result = onChange(modelFields);
            value = result?.isExtended ?? value;
          }
          if (errors.isExtended?.hasError) {
            runValidationTasks("isExtended", value);
          }
          setIsExtended(value);
        }}
        onBlur={() => runValidationTasks("isExtended", isExtended)}
        errorMessage={errors.isExtended?.errorMessage}
        hasError={errors.isExtended?.hasError}
        {...getOverrideProps(overrides, "isExtended")}
      ></TextField>
      <TextField
        label="Extension duration"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={extensionDuration}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              nameAr,
              availability,
              isDeactivated,
              isExtended,
              extensionDuration: value,
              isException,
              isTrashed,
            };
            const result = onChange(modelFields);
            value = result?.extensionDuration ?? value;
          }
          if (errors.extensionDuration?.hasError) {
            runValidationTasks("extensionDuration", value);
          }
          setExtensionDuration(value);
        }}
        onBlur={() =>
          runValidationTasks("extensionDuration", extensionDuration)
        }
        errorMessage={errors.extensionDuration?.errorMessage}
        hasError={errors.extensionDuration?.hasError}
        {...getOverrideProps(overrides, "extensionDuration")}
      ></TextField>
      <TextField
        label="Is exception"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={isException}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              name,
              nameAr,
              availability,
              isDeactivated,
              isExtended,
              extensionDuration,
              isException: value,
              isTrashed,
            };
            const result = onChange(modelFields);
            value = result?.isException ?? value;
          }
          if (errors.isException?.hasError) {
            runValidationTasks("isException", value);
          }
          setIsException(value);
        }}
        onBlur={() => runValidationTasks("isException", isException)}
        errorMessage={errors.isException?.errorMessage}
        hasError={errors.isException?.hasError}
        {...getOverrideProps(overrides, "isException")}
      ></TextField>
      <SwitchField
        label="Is trashed"
        defaultChecked={false}
        isDisabled={false}
        isChecked={isTrashed}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              nameAr,
              availability,
              isDeactivated,
              isExtended,
              extensionDuration,
              isException,
              isTrashed: value,
            };
            const result = onChange(modelFields);
            value = result?.isTrashed ?? value;
          }
          if (errors.isTrashed?.hasError) {
            runValidationTasks("isTrashed", value);
          }
          setIsTrashed(value);
        }}
        onBlur={() => runValidationTasks("isTrashed", isTrashed)}
        errorMessage={errors.isTrashed?.errorMessage}
        hasError={errors.isTrashed?.hasError}
        {...getOverrideProps(overrides, "isTrashed")}
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
