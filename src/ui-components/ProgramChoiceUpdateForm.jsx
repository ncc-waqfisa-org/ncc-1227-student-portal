/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { ProgramChoice } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function ProgramChoiceUpdateForm(props) {
  const {
    id,
    programChoice,
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
    programID: undefined,
    applicationID: undefined,
    choiceOrder: undefined,
  };
  const [programID, setProgramID] = React.useState(initialValues.programID);
  const [applicationID, setApplicationID] = React.useState(
    initialValues.applicationID
  );
  const [choiceOrder, setChoiceOrder] = React.useState(
    initialValues.choiceOrder
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...programChoiceRecord };
    setProgramID(cleanValues.programID);
    setApplicationID(cleanValues.applicationID);
    setChoiceOrder(cleanValues.choiceOrder);
    setErrors({});
  };
  const [programChoiceRecord, setProgramChoiceRecord] =
    React.useState(programChoice);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id
        ? await DataStore.query(ProgramChoice, id)
        : programChoice;
      setProgramChoiceRecord(record);
    };
    queryData();
  }, [id, programChoice]);
  React.useEffect(resetStateValues, [programChoiceRecord]);
  const validations = {
    programID: [{ type: "Required" }],
    applicationID: [{ type: "Required" }],
    choiceOrder: [],
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
          programID,
          applicationID,
          choiceOrder,
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
            ProgramChoice.copyOf(programChoiceRecord, (updated) => {
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
      {...getOverrideProps(overrides, "ProgramChoiceUpdateForm")}
    >
      <TextField
        label="Program id"
        isRequired={true}
        isReadOnly={false}
        defaultValue={programID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              programID: value,
              applicationID,
              choiceOrder,
            };
            const result = onChange(modelFields);
            value = result?.programID ?? value;
          }
          if (errors.programID?.hasError) {
            runValidationTasks("programID", value);
          }
          setProgramID(value);
        }}
        onBlur={() => runValidationTasks("programID", programID)}
        errorMessage={errors.programID?.errorMessage}
        hasError={errors.programID?.hasError}
        {...getOverrideProps(overrides, "programID")}
      ></TextField>
      <TextField
        label="Application id"
        isRequired={true}
        isReadOnly={false}
        defaultValue={applicationID}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              programID,
              applicationID: value,
              choiceOrder,
            };
            const result = onChange(modelFields);
            value = result?.applicationID ?? value;
          }
          if (errors.applicationID?.hasError) {
            runValidationTasks("applicationID", value);
          }
          setApplicationID(value);
        }}
        onBlur={() => runValidationTasks("applicationID", applicationID)}
        errorMessage={errors.applicationID?.errorMessage}
        hasError={errors.applicationID?.hasError}
        {...getOverrideProps(overrides, "applicationID")}
      ></TextField>
      <TextField
        label="Choice order"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        defaultValue={choiceOrder}
        onChange={(e) => {
          let value = parseInt(e.target.value);
          if (isNaN(value)) {
            setErrors((errors) => ({
              ...errors,
              choiceOrder: "Value must be a valid number",
            }));
            return;
          }
          if (onChange) {
            const modelFields = {
              programID,
              applicationID,
              choiceOrder: value,
            };
            const result = onChange(modelFields);
            value = result?.choiceOrder ?? value;
          }
          if (errors.choiceOrder?.hasError) {
            runValidationTasks("choiceOrder", value);
          }
          setChoiceOrder(value);
        }}
        onBlur={() => runValidationTasks("choiceOrder", choiceOrder)}
        errorMessage={errors.choiceOrder?.errorMessage}
        hasError={errors.choiceOrder?.hasError}
        {...getOverrideProps(overrides, "choiceOrder")}
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
