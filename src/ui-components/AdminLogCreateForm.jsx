/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { AdminLog } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function AdminLogCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    applicationID: undefined,
    adminCPR: undefined,
    dateTime: undefined,
    snapshot: undefined,
    reason: undefined,
  };
  const [applicationID, setApplicationID] = React.useState(
    initialValues.applicationID
  );
  const [adminCPR, setAdminCPR] = React.useState(initialValues.adminCPR);
  const [dateTime, setDateTime] = React.useState(initialValues.dateTime);
  const [snapshot, setSnapshot] = React.useState(initialValues.snapshot);
  const [reason, setReason] = React.useState(initialValues.reason);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setApplicationID(initialValues.applicationID);
    setAdminCPR(initialValues.adminCPR);
    setDateTime(initialValues.dateTime);
    setSnapshot(initialValues.snapshot);
    setReason(initialValues.reason);
    setErrors({});
  };
  const validations = {
    applicationID: [{ type: "Required" }],
    adminCPR: [{ type: "Required" }],
    dateTime: [],
    snapshot: [],
    reason: [],
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
          applicationID,
          adminCPR,
          dateTime,
          snapshot,
          reason,
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
          await DataStore.save(new AdminLog(modelFields));
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
      {...rest}
      {...getOverrideProps(overrides, "AdminLogCreateForm")}
    >
      <TextField
        label="Application id"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              applicationID: value,
              adminCPR,
              dateTime,
              snapshot,
              reason,
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
        label="Admin cpr"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              applicationID,
              adminCPR: value,
              dateTime,
              snapshot,
              reason,
            };
            const result = onChange(modelFields);
            value = result?.adminCPR ?? value;
          }
          if (errors.adminCPR?.hasError) {
            runValidationTasks("adminCPR", value);
          }
          setAdminCPR(value);
        }}
        onBlur={() => runValidationTasks("adminCPR", adminCPR)}
        errorMessage={errors.adminCPR?.errorMessage}
        hasError={errors.adminCPR?.hasError}
        {...getOverrideProps(overrides, "adminCPR")}
      ></TextField>
      <TextField
        label="Date time"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              applicationID,
              adminCPR,
              dateTime: value,
              snapshot,
              reason,
            };
            const result = onChange(modelFields);
            value = result?.dateTime ?? value;
          }
          if (errors.dateTime?.hasError) {
            runValidationTasks("dateTime", value);
          }
          setDateTime(new Date(value).toISOString());
        }}
        onBlur={() => runValidationTasks("dateTime", dateTime)}
        errorMessage={errors.dateTime?.errorMessage}
        hasError={errors.dateTime?.hasError}
        {...getOverrideProps(overrides, "dateTime")}
      ></TextField>
      <TextField
        label="Snapshot"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              applicationID,
              adminCPR,
              dateTime,
              snapshot: value,
              reason,
            };
            const result = onChange(modelFields);
            value = result?.snapshot ?? value;
          }
          if (errors.snapshot?.hasError) {
            runValidationTasks("snapshot", value);
          }
          setSnapshot(value);
        }}
        onBlur={() => runValidationTasks("snapshot", snapshot)}
        errorMessage={errors.snapshot?.errorMessage}
        hasError={errors.snapshot?.hasError}
        {...getOverrideProps(overrides, "snapshot")}
      ></TextField>
      <TextField
        label="Reason"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              applicationID,
              adminCPR,
              dateTime,
              snapshot,
              reason: value,
            };
            const result = onChange(modelFields);
            value = result?.reason ?? value;
          }
          if (errors.reason?.hasError) {
            runValidationTasks("reason", value);
          }
          setReason(value);
        }}
        onBlur={() => runValidationTasks("reason", reason)}
        errorMessage={errors.reason?.errorMessage}
        hasError={errors.reason?.hasError}
        {...getOverrideProps(overrides, "reason")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ClearButton")}
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
