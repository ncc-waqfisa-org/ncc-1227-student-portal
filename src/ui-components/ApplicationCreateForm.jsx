/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Application } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function ApplicationCreateForm(props) {
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
    gpa: undefined,
    status: undefined,
    attachmentID: undefined,
    studentCPR: undefined,
    attachment: {},
    applicationAttachmentId: undefined,
  };
  const [gpa, setGpa] = React.useState(initialValues.gpa);
  const [status, setStatus] = React.useState(initialValues.status);
  const [attachmentID, setAttachmentID] = React.useState(
    initialValues.attachmentID
  );
  const [studentCPR, setStudentCPR] = React.useState(initialValues.studentCPR);
  const [attachment, setAttachment] = React.useState(initialValues.attachment);
  const [applicationAttachmentId, setApplicationAttachmentId] = React.useState(
    initialValues.applicationAttachmentId
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setGpa(initialValues.gpa);
    setStatus(initialValues.status);
    setAttachmentID(initialValues.attachmentID);
    setStudentCPR(initialValues.studentCPR);
    setAttachment(initialValues.attachment);
    setApplicationAttachmentId(initialValues.applicationAttachmentId);
    setErrors({});
  };
  const validations = {
    gpa: [],
    status: [],
    attachmentID: [],
    studentCPR: [{ type: "Required" }],
    attachment: [],
    applicationAttachmentId: [],
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
          gpa,
          status,
          attachmentID,
          studentCPR,
          attachment,
          applicationAttachmentId,
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
          await DataStore.save(new Application(modelFields));
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
      {...getOverrideProps(overrides, "ApplicationCreateForm")}
    >
      <TextField
        label="Gpa"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        onChange={(e) => {
          let value = parseInt(e.target.value);
          if (isNaN(value)) {
            setErrors((errors) => ({
              ...errors,
              gpa: "Value must be a valid number",
            }));
            return;
          }
          if (onChange) {
            const modelFields = {
              gpa: value,
              status,
              attachmentID,
              studentCPR,
              attachment,
              applicationAttachmentId,
            };
            const result = onChange(modelFields);
            value = result?.gpa ?? value;
          }
          if (errors.gpa?.hasError) {
            runValidationTasks("gpa", value);
          }
          setGpa(value);
        }}
        onBlur={() => runValidationTasks("gpa", gpa)}
        errorMessage={errors.gpa?.errorMessage}
        hasError={errors.gpa?.hasError}
        {...getOverrideProps(overrides, "gpa")}
      ></TextField>
      <SelectField
        label="Status"
        placeholder="Please select an option"
        isDisabled={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gpa,
              status: value,
              attachmentID,
              studentCPR,
              attachment,
              applicationAttachmentId,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      >
        <option
          children="Approved"
          value="APPROVED"
          {...getOverrideProps(overrides, "statusoption0")}
        ></option>
        <option
          children="Rejected"
          value="REJECTED"
          {...getOverrideProps(overrides, "statusoption1")}
        ></option>
        <option
          children="Canceled"
          value="CANCELED"
          {...getOverrideProps(overrides, "statusoption2")}
        ></option>
        <option
          children="Review"
          value="REVIEW"
          {...getOverrideProps(overrides, "statusoption3")}
        ></option>
        <option
          children="Withdrawn"
          value="WITHDRAWN"
          {...getOverrideProps(overrides, "statusoption4")}
        ></option>
        <option
          children="Eligible"
          value="ELIGIBLE"
          {...getOverrideProps(overrides, "statusoption5")}
        ></option>
      </SelectField>
      <TextField
        label="Attachment id"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gpa,
              status,
              attachmentID: value,
              studentCPR,
              attachment,
              applicationAttachmentId,
            };
            const result = onChange(modelFields);
            value = result?.attachmentID ?? value;
          }
          if (errors.attachmentID?.hasError) {
            runValidationTasks("attachmentID", value);
          }
          setAttachmentID(value);
        }}
        onBlur={() => runValidationTasks("attachmentID", attachmentID)}
        errorMessage={errors.attachmentID?.errorMessage}
        hasError={errors.attachmentID?.hasError}
        {...getOverrideProps(overrides, "attachmentID")}
      ></TextField>
      <TextField
        label="Student cpr"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gpa,
              status,
              attachmentID,
              studentCPR: value,
              attachment,
              applicationAttachmentId,
            };
            const result = onChange(modelFields);
            value = result?.studentCPR ?? value;
          }
          if (errors.studentCPR?.hasError) {
            runValidationTasks("studentCPR", value);
          }
          setStudentCPR(value);
        }}
        onBlur={() => runValidationTasks("studentCPR", studentCPR)}
        errorMessage={errors.studentCPR?.errorMessage}
        hasError={errors.studentCPR?.hasError}
        {...getOverrideProps(overrides, "studentCPR")}
      ></TextField>
      <SelectField
        label="Attachment"
        placeholder="Please select an option"
        isDisabled={false}
        value={attachment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gpa,
              status,
              attachmentID,
              studentCPR,
              attachment: value,
              applicationAttachmentId,
            };
            const result = onChange(modelFields);
            value = result?.attachment ?? value;
          }
          if (errors.attachment?.hasError) {
            runValidationTasks("attachment", value);
          }
          setAttachment(value);
        }}
        onBlur={() => runValidationTasks("attachment", attachment)}
        errorMessage={errors.attachment?.errorMessage}
        hasError={errors.attachment?.hasError}
        {...getOverrideProps(overrides, "attachment")}
      ></SelectField>
      <TextField
        label="Application attachment id"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              gpa,
              status,
              attachmentID,
              studentCPR,
              attachment,
              applicationAttachmentId: value,
            };
            const result = onChange(modelFields);
            value = result?.applicationAttachmentId ?? value;
          }
          if (errors.applicationAttachmentId?.hasError) {
            runValidationTasks("applicationAttachmentId", value);
          }
          setApplicationAttachmentId(value);
        }}
        onBlur={() =>
          runValidationTasks("applicationAttachmentId", applicationAttachmentId)
        }
        errorMessage={errors.applicationAttachmentId?.errorMessage}
        hasError={errors.applicationAttachmentId?.hasError}
        {...getOverrideProps(overrides, "applicationAttachmentId")}
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
