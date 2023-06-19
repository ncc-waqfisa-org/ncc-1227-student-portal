/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Address } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function AddressUpdateForm(props) {
  const {
    id,
    address,
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
    type: undefined,
    buildingNumber: undefined,
    roadNumber: undefined,
    blockNumber: undefined,
    city: undefined,
  };
  const [type, setType] = React.useState(initialValues.type);
  const [buildingNumber, setBuildingNumber] = React.useState(
    initialValues.buildingNumber
  );
  const [roadNumber, setRoadNumber] = React.useState(initialValues.roadNumber);
  const [blockNumber, setBlockNumber] = React.useState(
    initialValues.blockNumber
  );
  const [city, setCity] = React.useState(initialValues.city);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = { ...initialValues, ...addressRecord };
    setType(cleanValues.type);
    setBuildingNumber(cleanValues.buildingNumber);
    setRoadNumber(cleanValues.roadNumber);
    setBlockNumber(cleanValues.blockNumber);
    setCity(cleanValues.city);
    setErrors({});
  };
  const [addressRecord, setAddressRecord] = React.useState(address);
  React.useEffect(() => {
    const queryData = async () => {
      const record = id ? await DataStore.query(Address, id) : address;
      setAddressRecord(record);
    };
    queryData();
  }, [id, address]);
  React.useEffect(resetStateValues, [addressRecord]);
  const validations = {
    type: [],
    buildingNumber: [],
    roadNumber: [],
    blockNumber: [],
    city: [],
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
          type,
          buildingNumber,
          roadNumber,
          blockNumber,
          city,
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
            Address.copyOf(addressRecord, (updated) => {
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
      {...getOverrideProps(overrides, "AddressUpdateForm")}
    >
      <TextField
        label="Type"
        isRequired={false}
        isReadOnly={false}
        defaultValue={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type: value,
              buildingNumber,
              roadNumber,
              blockNumber,
              city,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <TextField
        label="Building number"
        isRequired={false}
        isReadOnly={false}
        defaultValue={buildingNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
              buildingNumber: value,
              roadNumber,
              blockNumber,
              city,
            };
            const result = onChange(modelFields);
            value = result?.buildingNumber ?? value;
          }
          if (errors.buildingNumber?.hasError) {
            runValidationTasks("buildingNumber", value);
          }
          setBuildingNumber(value);
        }}
        onBlur={() => runValidationTasks("buildingNumber", buildingNumber)}
        errorMessage={errors.buildingNumber?.errorMessage}
        hasError={errors.buildingNumber?.hasError}
        {...getOverrideProps(overrides, "buildingNumber")}
      ></TextField>
      <TextField
        label="Road number"
        isRequired={false}
        isReadOnly={false}
        defaultValue={roadNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
              buildingNumber,
              roadNumber: value,
              blockNumber,
              city,
            };
            const result = onChange(modelFields);
            value = result?.roadNumber ?? value;
          }
          if (errors.roadNumber?.hasError) {
            runValidationTasks("roadNumber", value);
          }
          setRoadNumber(value);
        }}
        onBlur={() => runValidationTasks("roadNumber", roadNumber)}
        errorMessage={errors.roadNumber?.errorMessage}
        hasError={errors.roadNumber?.hasError}
        {...getOverrideProps(overrides, "roadNumber")}
      ></TextField>
      <TextField
        label="Block number"
        isRequired={false}
        isReadOnly={false}
        defaultValue={blockNumber}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
              buildingNumber,
              roadNumber,
              blockNumber: value,
              city,
            };
            const result = onChange(modelFields);
            value = result?.blockNumber ?? value;
          }
          if (errors.blockNumber?.hasError) {
            runValidationTasks("blockNumber", value);
          }
          setBlockNumber(value);
        }}
        onBlur={() => runValidationTasks("blockNumber", blockNumber)}
        errorMessage={errors.blockNumber?.errorMessage}
        hasError={errors.blockNumber?.hasError}
        {...getOverrideProps(overrides, "blockNumber")}
      ></TextField>
      <TextField
        label="City"
        isRequired={false}
        isReadOnly={false}
        defaultValue={city}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              type,
              buildingNumber,
              roadNumber,
              blockNumber,
              city: value,
            };
            const result = onChange(modelFields);
            value = result?.city ?? value;
          }
          if (errors.city?.hasError) {
            runValidationTasks("city", value);
          }
          setCity(value);
        }}
        onBlur={() => runValidationTasks("city", city)}
        errorMessage={errors.city?.errorMessage}
        hasError={errors.city?.hasError}
        {...getOverrideProps(overrides, "city")}
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
