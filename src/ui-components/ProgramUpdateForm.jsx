/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Program } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function ProgramUpdateForm(props) {
  const {
    id,
    program,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    name: undefined,
    requirements: undefined,
    availability: undefined,
    universityID: undefined,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [requirements, setRequirements] = React.useState(
    initialValues.requirements
  );
  const [availability, setAvailability] = React.useState(
    initialValues.availability
  );
  const [universityID, setUniversityID] = React.useState(
    initialValues.universityID
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...programRecord };
    setName(cleanValues.name);
    setRequirements(cleanValues.requirements);
    setAvailability(cleanValues.availability);
    setUniversityID(cleanValues.universityID);
    setErrors({});
  };
  const [programRecord, setProgramRecord] = React.useState(program);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(Program, id) : program;
      setProgramRecord(record);
    };
    queryData();
  }, [id, program]);
  React.useEffect(resetStateValues, [programRecord]);
  const validations = {
    name: [],
    requirements: [],
    availability: [],
    universityID: [{ type: "Required" }],
  };
  const runValidationTasks = async (fieldName, value) => {
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
          requirements,
          availability,
          universityID,
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
          await DataStore.save(
            Program.copyOf(programRecord, (updated) => {
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
      {...rest}
      {...getOverrideProps(overrides, "ProgramUpdateForm")}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        defaultValue={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              requirements,
              availability,
              universityID,
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
        label="Requirements"
        isRequired={false}
        isReadOnly={false}
        defaultValue={requirements}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              requirements: value,
              availability,
              universityID,
            };
            const result = onChange(modelFields);
            value = result?.requirements ?? value;
          }
          if (errors.requirements?.hasError) {
            runValidationTasks("requirements", value);
          }
          setRequirements(value);
        }}
        onBlur={() => runValidationTasks("requirements", requirements)}
        errorMessage={errors.requirements?.errorMessage}
        hasError={errors.requirements?.hasError}
        {...getOverrideProps(overrides, "requirements")}
      ></TextField>
      <TextField
        label="Availability"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        defaultValue={availability}
        onChange={(e) => {
          let value = parseInt(e.target.value);
          if (isNaN(value)) {
            setErrors((errors) => ({
              ...errors,
              availability: "Value must be a valid number",
            }));
            return;
          }
          if (onChange) {
            const modelFields = {
              name,
              requirements,
              availability: value,
              universityID,
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
      <TextField
        label="University id"
        isRequired={true}
        isReadOnly={false}
        defaultValue={universityID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              requirements,
              availability,
              universityID: value,
            };
            const result = onChange(modelFields);
            value = result?.universityID ?? value;
          }
          if (errors.universityID?.hasError) {
            runValidationTasks("universityID", value);
          }
          setUniversityID(value);
        }}
        onBlur={() => runValidationTasks("universityID", universityID)}
        errorMessage={errors.universityID?.errorMessage}
        hasError={errors.universityID?.hasError}
        {...getOverrideProps(overrides, "universityID")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
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
