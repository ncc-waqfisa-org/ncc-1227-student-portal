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
import { MasterUniversities } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function MasterUniversitiesUpdateForm(props) {
  const {
    id: idProp,
    masterUniversities: masterUniversitiesModelProp,
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
    isDeactivated: false,
  };
  const [universityName, setUniversityName] = React.useState(
    initialValues.universityName
  );
  const [isDeactivated, setIsDeactivated] = React.useState(
    initialValues.isDeactivated
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = masterUniversitiesRecord
      ? { ...initialValues, ...masterUniversitiesRecord }
      : initialValues;
    setUniversityName(cleanValues.universityName);
    setIsDeactivated(cleanValues.isDeactivated);
    setErrors({});
  };
  const [masterUniversitiesRecord, setMasterUniversitiesRecord] =
    React.useState(masterUniversitiesModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(MasterUniversities, idProp)
        : masterUniversitiesModelProp;
      setMasterUniversitiesRecord(record);
    };
    queryData();
  }, [idProp, masterUniversitiesModelProp]);
  React.useEffect(resetStateValues, [masterUniversitiesRecord]);
  const validations = {
    universityName: [{ type: "Required" }],
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
          await DataStore.save(
            MasterUniversities.copyOf(masterUniversitiesRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "MasterUniversitiesUpdateForm")}
      {...rest}
    >
      <TextField
        label="University name"
        isRequired={true}
        isReadOnly={false}
        value={universityName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              universityName: value,
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
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || masterUniversitiesModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || masterUniversitiesModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
