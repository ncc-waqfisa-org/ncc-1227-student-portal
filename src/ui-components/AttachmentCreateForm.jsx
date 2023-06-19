/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Attachment } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function AttachmentCreateForm(props) {
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
    cprDoc: undefined,
    acceptanceLetterDoc: undefined,
    transcriptDoc: undefined,
    signedContractDoc: undefined,
  };
  const [cprDoc, setCprDoc] = React.useState(initialValues.cprDoc);
  const [acceptanceLetterDoc, setAcceptanceLetterDoc] = React.useState(
    initialValues.acceptanceLetterDoc
  );
  const [transcriptDoc, setTranscriptDoc] = React.useState(
    initialValues.transcriptDoc
  );
  const [signedContractDoc, setSignedContractDoc] = React.useState(
    initialValues.signedContractDoc
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCprDoc(initialValues.cprDoc);
    setAcceptanceLetterDoc(initialValues.acceptanceLetterDoc);
    setTranscriptDoc(initialValues.transcriptDoc);
    setSignedContractDoc(initialValues.signedContractDoc);
    setErrors({});
  };
  const validations = {
    cprDoc: [],
    acceptanceLetterDoc: [],
    transcriptDoc: [],
    signedContractDoc: [],
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
          cprDoc,
          acceptanceLetterDoc,
          transcriptDoc,
          signedContractDoc,
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
          await DataStore.save(new Attachment(modelFields));
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
      {...getOverrideProps(overrides, "AttachmentCreateForm")}
    >
      <TextField
        label="Cpr doc"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cprDoc: value,
              acceptanceLetterDoc,
              transcriptDoc,
              signedContractDoc,
            };
            const result = onChange(modelFields);
            value = result?.cprDoc ?? value;
          }
          if (errors.cprDoc?.hasError) {
            runValidationTasks("cprDoc", value);
          }
          setCprDoc(value);
        }}
        onBlur={() => runValidationTasks("cprDoc", cprDoc)}
        errorMessage={errors.cprDoc?.errorMessage}
        hasError={errors.cprDoc?.hasError}
        {...getOverrideProps(overrides, "cprDoc")}
      ></TextField>
      <TextField
        label="Acceptance letter doc"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cprDoc,
              acceptanceLetterDoc: value,
              transcriptDoc,
              signedContractDoc,
            };
            const result = onChange(modelFields);
            value = result?.acceptanceLetterDoc ?? value;
          }
          if (errors.acceptanceLetterDoc?.hasError) {
            runValidationTasks("acceptanceLetterDoc", value);
          }
          setAcceptanceLetterDoc(value);
        }}
        onBlur={() =>
          runValidationTasks("acceptanceLetterDoc", acceptanceLetterDoc)
        }
        errorMessage={errors.acceptanceLetterDoc?.errorMessage}
        hasError={errors.acceptanceLetterDoc?.hasError}
        {...getOverrideProps(overrides, "acceptanceLetterDoc")}
      ></TextField>
      <TextField
        label="Transcript doc"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cprDoc,
              acceptanceLetterDoc,
              transcriptDoc: value,
              signedContractDoc,
            };
            const result = onChange(modelFields);
            value = result?.transcriptDoc ?? value;
          }
          if (errors.transcriptDoc?.hasError) {
            runValidationTasks("transcriptDoc", value);
          }
          setTranscriptDoc(value);
        }}
        onBlur={() => runValidationTasks("transcriptDoc", transcriptDoc)}
        errorMessage={errors.transcriptDoc?.errorMessage}
        hasError={errors.transcriptDoc?.hasError}
        {...getOverrideProps(overrides, "transcriptDoc")}
      ></TextField>
      <TextField
        label="Signed contract doc"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cprDoc,
              acceptanceLetterDoc,
              transcriptDoc,
              signedContractDoc: value,
            };
            const result = onChange(modelFields);
            value = result?.signedContractDoc ?? value;
          }
          if (errors.signedContractDoc?.hasError) {
            runValidationTasks("signedContractDoc", value);
          }
          setSignedContractDoc(value);
        }}
        onBlur={() =>
          runValidationTasks("signedContractDoc", signedContractDoc)
        }
        errorMessage={errors.signedContractDoc?.errorMessage}
        hasError={errors.signedContractDoc?.hasError}
        {...getOverrideProps(overrides, "signedContractDoc")}
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
