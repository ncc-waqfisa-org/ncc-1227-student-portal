/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { MasterAttachment } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function MasterAttachmentUpdateForm(props) {
  const {
    id: idProp,
    masterAttachment: masterAttachmentModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    cprDoc: "",
    signedContractDoc: "",
    transcriptDoc: "",
    universityCertificate: "",
    toeflIELTSCertificate: "",
    acceptanceLetterDoc: "",
  };
  const [cprDoc, setCprDoc] = React.useState(initialValues.cprDoc);
  const [signedContractDoc, setSignedContractDoc] = React.useState(
    initialValues.signedContractDoc
  );
  const [transcriptDoc, setTranscriptDoc] = React.useState(
    initialValues.transcriptDoc
  );
  const [universityCertificate, setUniversityCertificate] = React.useState(
    initialValues.universityCertificate
  );
  const [toeflIELTSCertificate, setToeflIELTSCertificate] = React.useState(
    initialValues.toeflIELTSCertificate
  );
  const [acceptanceLetterDoc, setAcceptanceLetterDoc] = React.useState(
    initialValues.acceptanceLetterDoc
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = masterAttachmentRecord
      ? { ...initialValues, ...masterAttachmentRecord }
      : initialValues;
    setCprDoc(cleanValues.cprDoc);
    setSignedContractDoc(cleanValues.signedContractDoc);
    setTranscriptDoc(cleanValues.transcriptDoc);
    setUniversityCertificate(cleanValues.universityCertificate);
    setToeflIELTSCertificate(cleanValues.toeflIELTSCertificate);
    setAcceptanceLetterDoc(cleanValues.acceptanceLetterDoc);
    setErrors({});
  };
  const [masterAttachmentRecord, setMasterAttachmentRecord] = React.useState(
    masterAttachmentModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(MasterAttachment, idProp)
        : masterAttachmentModelProp;
      setMasterAttachmentRecord(record);
    };
    queryData();
  }, [idProp, masterAttachmentModelProp]);
  React.useEffect(resetStateValues, [masterAttachmentRecord]);
  const validations = {
    cprDoc: [],
    signedContractDoc: [],
    transcriptDoc: [],
    universityCertificate: [],
    toeflIELTSCertificate: [],
    acceptanceLetterDoc: [],
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
          cprDoc,
          signedContractDoc,
          transcriptDoc,
          universityCertificate,
          toeflIELTSCertificate,
          acceptanceLetterDoc,
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
            MasterAttachment.copyOf(masterAttachmentRecord, (updated) => {
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
      {...getOverrideProps(overrides, "MasterAttachmentUpdateForm")}
      {...rest}
    >
      <TextField
        label="Cpr doc"
        isRequired={false}
        isReadOnly={false}
        value={cprDoc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cprDoc: value,
              signedContractDoc,
              transcriptDoc,
              universityCertificate,
              toeflIELTSCertificate,
              acceptanceLetterDoc,
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
        label="Signed contract doc"
        isRequired={false}
        isReadOnly={false}
        value={signedContractDoc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cprDoc,
              signedContractDoc: value,
              transcriptDoc,
              universityCertificate,
              toeflIELTSCertificate,
              acceptanceLetterDoc,
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
      <TextField
        label="Transcript doc"
        isRequired={false}
        isReadOnly={false}
        value={transcriptDoc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cprDoc,
              signedContractDoc,
              transcriptDoc: value,
              universityCertificate,
              toeflIELTSCertificate,
              acceptanceLetterDoc,
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
        label="University certificate"
        isRequired={false}
        isReadOnly={false}
        value={universityCertificate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cprDoc,
              signedContractDoc,
              transcriptDoc,
              universityCertificate: value,
              toeflIELTSCertificate,
              acceptanceLetterDoc,
            };
            const result = onChange(modelFields);
            value = result?.universityCertificate ?? value;
          }
          if (errors.universityCertificate?.hasError) {
            runValidationTasks("universityCertificate", value);
          }
          setUniversityCertificate(value);
        }}
        onBlur={() =>
          runValidationTasks("universityCertificate", universityCertificate)
        }
        errorMessage={errors.universityCertificate?.errorMessage}
        hasError={errors.universityCertificate?.hasError}
        {...getOverrideProps(overrides, "universityCertificate")}
      ></TextField>
      <TextField
        label="Toefl ielts certificate"
        isRequired={false}
        isReadOnly={false}
        value={toeflIELTSCertificate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cprDoc,
              signedContractDoc,
              transcriptDoc,
              universityCertificate,
              toeflIELTSCertificate: value,
              acceptanceLetterDoc,
            };
            const result = onChange(modelFields);
            value = result?.toeflIELTSCertificate ?? value;
          }
          if (errors.toeflIELTSCertificate?.hasError) {
            runValidationTasks("toeflIELTSCertificate", value);
          }
          setToeflIELTSCertificate(value);
        }}
        onBlur={() =>
          runValidationTasks("toeflIELTSCertificate", toeflIELTSCertificate)
        }
        errorMessage={errors.toeflIELTSCertificate?.errorMessage}
        hasError={errors.toeflIELTSCertificate?.hasError}
        {...getOverrideProps(overrides, "toeflIELTSCertificate")}
      ></TextField>
      <TextField
        label="Acceptance letter doc"
        isRequired={false}
        isReadOnly={false}
        value={acceptanceLetterDoc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cprDoc,
              signedContractDoc,
              transcriptDoc,
              universityCertificate,
              toeflIELTSCertificate,
              acceptanceLetterDoc: value,
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
          isDisabled={!(idProp || masterAttachmentModelProp)}
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
              !(idProp || masterAttachmentModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
