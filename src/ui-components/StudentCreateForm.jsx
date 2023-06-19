/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Student } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function StudentCreateForm(props) {
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
    cpr: undefined,
    fullName: undefined,
    email: undefined,
    phone: undefined,
    gender: undefined,
    schoolName: undefined,
    specialization: undefined,
    placeOfBirth: undefined,
    studentOrderAmongSiblings: undefined,
    householdIncome: undefined,
    preferredLanguage: undefined,
    graduationDate: undefined,
    address: undefined,
    ParentInfo: {},
    parentInfoID: undefined,
  };
  const [cpr, setCpr] = React.useState(initialValues.cpr);
  const [fullName, setFullName] = React.useState(initialValues.fullName);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [schoolName, setSchoolName] = React.useState(initialValues.schoolName);
  const [specialization, setSpecialization] = React.useState(
    initialValues.specialization
  );
  const [placeOfBirth, setPlaceOfBirth] = React.useState(
    initialValues.placeOfBirth
  );
  const [studentOrderAmongSiblings, setStudentOrderAmongSiblings] =
    React.useState(initialValues.studentOrderAmongSiblings);
  const [householdIncome, setHouseholdIncome] = React.useState(
    initialValues.householdIncome
  );
  const [preferredLanguage, setPreferredLanguage] = React.useState(
    initialValues.preferredLanguage
  );
  const [graduationDate, setGraduationDate] = React.useState(
    initialValues.graduationDate
  );
  const [address, setAddress] = React.useState(initialValues.address);
  const [ParentInfo, setParentInfo] = React.useState(initialValues.ParentInfo);
  const [parentInfoID, setParentInfoID] = React.useState(
    initialValues.parentInfoID
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setCpr(initialValues.cpr);
    setFullName(initialValues.fullName);
    setEmail(initialValues.email);
    setPhone(initialValues.phone);
    setGender(initialValues.gender);
    setSchoolName(initialValues.schoolName);
    setSpecialization(initialValues.specialization);
    setPlaceOfBirth(initialValues.placeOfBirth);
    setStudentOrderAmongSiblings(initialValues.studentOrderAmongSiblings);
    setHouseholdIncome(initialValues.householdIncome);
    setPreferredLanguage(initialValues.preferredLanguage);
    setGraduationDate(initialValues.graduationDate);
    setAddress(initialValues.address);
    setParentInfo(initialValues.ParentInfo);
    setParentInfoID(initialValues.parentInfoID);
    setErrors({});
  };
  const validations = {
    cpr: [{ type: "Required" }],
    fullName: [],
    email: [],
    phone: [],
    gender: [],
    schoolName: [],
    specialization: [],
    placeOfBirth: [],
    studentOrderAmongSiblings: [],
    householdIncome: [],
    preferredLanguage: [],
    graduationDate: [],
    address: [],
    ParentInfo: [],
    parentInfoID: [],
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
          cpr,
          fullName,
          email,
          phone,
          gender,
          schoolName,
          specialization,
          placeOfBirth,
          studentOrderAmongSiblings,
          householdIncome,
          preferredLanguage,
          graduationDate,
          address,
          ParentInfo,
          parentInfoID,
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
          await DataStore.save(new Student(modelFields));
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
      {...getOverrideProps(overrides, "StudentCreateForm")}
    >
      <TextField
        label="Cpr"
        isRequired={true}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr: value,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              preferredLanguage,
              graduationDate,
              address,
              ParentInfo,
              parentInfoID,
            };
            const result = onChange(modelFields);
            value = result?.cpr ?? value;
          }
          if (errors.cpr?.hasError) {
            runValidationTasks("cpr", value);
          }
          setCpr(value);
        }}
        onBlur={() => runValidationTasks("cpr", cpr)}
        errorMessage={errors.cpr?.errorMessage}
        hasError={errors.cpr?.hasError}
        {...getOverrideProps(overrides, "cpr")}
      ></TextField>
      <TextField
        label="Full name"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName: value,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              preferredLanguage,
              graduationDate,
              address,
              ParentInfo,
              parentInfoID,
            };
            const result = onChange(modelFields);
            value = result?.fullName ?? value;
          }
          if (errors.fullName?.hasError) {
            runValidationTasks("fullName", value);
          }
          setFullName(value);
        }}
        onBlur={() => runValidationTasks("fullName", fullName)}
        errorMessage={errors.fullName?.errorMessage}
        hasError={errors.fullName?.hasError}
        {...getOverrideProps(overrides, "fullName")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email: value,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              preferredLanguage,
              graduationDate,
              address,
              ParentInfo,
              parentInfoID,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone: value,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              preferredLanguage,
              graduationDate,
              address,
              ParentInfo,
              parentInfoID,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
      <SelectField
        label="Gender"
        placeholder="Please select an option"
        isDisabled={false}
        value={gender}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender: value,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              preferredLanguage,
              graduationDate,
              address,
              ParentInfo,
              parentInfoID,
            };
            const result = onChange(modelFields);
            value = result?.gender ?? value;
          }
          if (errors.gender?.hasError) {
            runValidationTasks("gender", value);
          }
          setGender(value);
        }}
        onBlur={() => runValidationTasks("gender", gender)}
        errorMessage={errors.gender?.errorMessage}
        hasError={errors.gender?.hasError}
        {...getOverrideProps(overrides, "gender")}
      >
        <option
          children="Female"
          value="FEMALE"
          {...getOverrideProps(overrides, "genderoption0")}
        ></option>
        <option
          children="Male"
          value="MALE"
          {...getOverrideProps(overrides, "genderoption1")}
        ></option>
      </SelectField>
      <TextField
        label="School name"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName: value,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              preferredLanguage,
              graduationDate,
              address,
              ParentInfo,
              parentInfoID,
            };
            const result = onChange(modelFields);
            value = result?.schoolName ?? value;
          }
          if (errors.schoolName?.hasError) {
            runValidationTasks("schoolName", value);
          }
          setSchoolName(value);
        }}
        onBlur={() => runValidationTasks("schoolName", schoolName)}
        errorMessage={errors.schoolName?.errorMessage}
        hasError={errors.schoolName?.hasError}
        {...getOverrideProps(overrides, "schoolName")}
      ></TextField>
      <TextField
        label="Specialization"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization: value,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              preferredLanguage,
              graduationDate,
              address,
              ParentInfo,
              parentInfoID,
            };
            const result = onChange(modelFields);
            value = result?.specialization ?? value;
          }
          if (errors.specialization?.hasError) {
            runValidationTasks("specialization", value);
          }
          setSpecialization(value);
        }}
        onBlur={() => runValidationTasks("specialization", specialization)}
        errorMessage={errors.specialization?.errorMessage}
        hasError={errors.specialization?.hasError}
        {...getOverrideProps(overrides, "specialization")}
      ></TextField>
      <TextField
        label="Place of birth"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth: value,
              studentOrderAmongSiblings,
              householdIncome,
              preferredLanguage,
              graduationDate,
              address,
              ParentInfo,
              parentInfoID,
            };
            const result = onChange(modelFields);
            value = result?.placeOfBirth ?? value;
          }
          if (errors.placeOfBirth?.hasError) {
            runValidationTasks("placeOfBirth", value);
          }
          setPlaceOfBirth(value);
        }}
        onBlur={() => runValidationTasks("placeOfBirth", placeOfBirth)}
        errorMessage={errors.placeOfBirth?.errorMessage}
        hasError={errors.placeOfBirth?.hasError}
        {...getOverrideProps(overrides, "placeOfBirth")}
      ></TextField>
      <TextField
        label="Student order among siblings"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        onChange={(e) => {
          let value = parseInt(e.target.value);
          if (isNaN(value)) {
            setErrors((errors) => ({
              ...errors,
              studentOrderAmongSiblings: "Value must be a valid number",
            }));
            return;
          }
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings: value,
              householdIncome,
              preferredLanguage,
              graduationDate,
              address,
              ParentInfo,
              parentInfoID,
            };
            const result = onChange(modelFields);
            value = result?.studentOrderAmongSiblings ?? value;
          }
          if (errors.studentOrderAmongSiblings?.hasError) {
            runValidationTasks("studentOrderAmongSiblings", value);
          }
          setStudentOrderAmongSiblings(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "studentOrderAmongSiblings",
            studentOrderAmongSiblings
          )
        }
        errorMessage={errors.studentOrderAmongSiblings?.errorMessage}
        hasError={errors.studentOrderAmongSiblings?.hasError}
        {...getOverrideProps(overrides, "studentOrderAmongSiblings")}
      ></TextField>
      <TextField
        label="Household income"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        onChange={(e) => {
          let value = Number(e.target.value);
          if (isNaN(value)) {
            setErrors((errors) => ({
              ...errors,
              householdIncome: "Value must be a valid number",
            }));
            return;
          }
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome: value,
              preferredLanguage,
              graduationDate,
              address,
              ParentInfo,
              parentInfoID,
            };
            const result = onChange(modelFields);
            value = result?.householdIncome ?? value;
          }
          if (errors.householdIncome?.hasError) {
            runValidationTasks("householdIncome", value);
          }
          setHouseholdIncome(value);
        }}
        onBlur={() => runValidationTasks("householdIncome", householdIncome)}
        errorMessage={errors.householdIncome?.errorMessage}
        hasError={errors.householdIncome?.hasError}
        {...getOverrideProps(overrides, "householdIncome")}
      ></TextField>
      <SelectField
        label="Preferred language"
        placeholder="Please select an option"
        isDisabled={false}
        value={preferredLanguage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              preferredLanguage: value,
              graduationDate,
              address,
              ParentInfo,
              parentInfoID,
            };
            const result = onChange(modelFields);
            value = result?.preferredLanguage ?? value;
          }
          if (errors.preferredLanguage?.hasError) {
            runValidationTasks("preferredLanguage", value);
          }
          setPreferredLanguage(value);
        }}
        onBlur={() =>
          runValidationTasks("preferredLanguage", preferredLanguage)
        }
        errorMessage={errors.preferredLanguage?.errorMessage}
        hasError={errors.preferredLanguage?.hasError}
        {...getOverrideProps(overrides, "preferredLanguage")}
      >
        <option
          children="Arabic"
          value="ARABIC"
          {...getOverrideProps(overrides, "preferredLanguageoption0")}
        ></option>
        <option
          children="English"
          value="ENGLISH"
          {...getOverrideProps(overrides, "preferredLanguageoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Graduation date"
        isRequired={false}
        isReadOnly={false}
        type="date"
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              preferredLanguage,
              graduationDate: value,
              address,
              ParentInfo,
              parentInfoID,
            };
            const result = onChange(modelFields);
            value = result?.graduationDate ?? value;
          }
          if (errors.graduationDate?.hasError) {
            runValidationTasks("graduationDate", value);
          }
          setGraduationDate(value);
        }}
        onBlur={() => runValidationTasks("graduationDate", graduationDate)}
        errorMessage={errors.graduationDate?.errorMessage}
        hasError={errors.graduationDate?.hasError}
        {...getOverrideProps(overrides, "graduationDate")}
      ></TextField>
      <TextField
        label="Address"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              preferredLanguage,
              graduationDate,
              address: value,
              ParentInfo,
              parentInfoID,
            };
            const result = onChange(modelFields);
            value = result?.address ?? value;
          }
          if (errors.address?.hasError) {
            runValidationTasks("address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("address", address)}
        errorMessage={errors.address?.errorMessage}
        hasError={errors.address?.hasError}
        {...getOverrideProps(overrides, "address")}
      ></TextField>
      <SelectField
        label="Parent info"
        placeholder="Please select an option"
        isDisabled={false}
        value={ParentInfo}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              preferredLanguage,
              graduationDate,
              address,
              ParentInfo: value,
              parentInfoID,
            };
            const result = onChange(modelFields);
            value = result?.ParentInfo ?? value;
          }
          if (errors.ParentInfo?.hasError) {
            runValidationTasks("ParentInfo", value);
          }
          setParentInfo(value);
        }}
        onBlur={() => runValidationTasks("ParentInfo", ParentInfo)}
        errorMessage={errors.ParentInfo?.errorMessage}
        hasError={errors.ParentInfo?.hasError}
        {...getOverrideProps(overrides, "ParentInfo")}
      ></SelectField>
      <TextField
        label="Parent info id"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              fullName,
              email,
              phone,
              gender,
              schoolName,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              householdIncome,
              preferredLanguage,
              graduationDate,
              address,
              ParentInfo,
              parentInfoID: value,
            };
            const result = onChange(modelFields);
            value = result?.parentInfoID ?? value;
          }
          if (errors.parentInfoID?.hasError) {
            runValidationTasks("parentInfoID", value);
          }
          setParentInfoID(value);
        }}
        onBlur={() => runValidationTasks("parentInfoID", parentInfoID)}
        errorMessage={errors.parentInfoID?.errorMessage}
        hasError={errors.parentInfoID?.hasError}
        {...getOverrideProps(overrides, "parentInfoID")}
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
