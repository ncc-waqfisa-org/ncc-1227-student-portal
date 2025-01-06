/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { Student } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function StudentUpdateForm(props) {
  const {
    cpr: cprProp,
    student: studentModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    cpr: "",
    cprDoc: "",
    fullName: "",
    batch: "",
    email: "",
    phone: "",
    gender: "",
    nationalityCategory: "",
    nationality: "",
    schoolName: "",
    schoolType: "",
    specialization: "",
    placeOfBirth: "",
    studentOrderAmongSiblings: "",
    familyIncome: "",
    familyIncomeProofDoc: "",
    familyIncomeProofDocs: [],
    preferredLanguage: "",
    graduationDate: "",
    address: "",
  };
  const [cpr, setCpr] = React.useState(initialValues.cpr);
  const [cprDoc, setCprDoc] = React.useState(initialValues.cprDoc);
  const [fullName, setFullName] = React.useState(initialValues.fullName);
  const [batch, setBatch] = React.useState(initialValues.batch);
  const [email, setEmail] = React.useState(initialValues.email);
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [gender, setGender] = React.useState(initialValues.gender);
  const [nationalityCategory, setNationalityCategory] = React.useState(
    initialValues.nationalityCategory
  );
  const [nationality, setNationality] = React.useState(
    initialValues.nationality
  );
  const [schoolName, setSchoolName] = React.useState(initialValues.schoolName);
  const [schoolType, setSchoolType] = React.useState(initialValues.schoolType);
  const [specialization, setSpecialization] = React.useState(
    initialValues.specialization
  );
  const [placeOfBirth, setPlaceOfBirth] = React.useState(
    initialValues.placeOfBirth
  );
  const [studentOrderAmongSiblings, setStudentOrderAmongSiblings] =
    React.useState(initialValues.studentOrderAmongSiblings);
  const [familyIncome, setFamilyIncome] = React.useState(
    initialValues.familyIncome
  );
  const [familyIncomeProofDoc, setFamilyIncomeProofDoc] = React.useState(
    initialValues.familyIncomeProofDoc
  );
  const [familyIncomeProofDocs, setFamilyIncomeProofDocs] = React.useState(
    initialValues.familyIncomeProofDocs
  );
  const [preferredLanguage, setPreferredLanguage] = React.useState(
    initialValues.preferredLanguage
  );
  const [graduationDate, setGraduationDate] = React.useState(
    initialValues.graduationDate
  );
  const [address, setAddress] = React.useState(initialValues.address);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = studentRecord
      ? { ...initialValues, ...studentRecord }
      : initialValues;
    setCpr(cleanValues.cpr);
    setCprDoc(cleanValues.cprDoc);
    setFullName(cleanValues.fullName);
    setBatch(cleanValues.batch);
    setEmail(cleanValues.email);
    setPhone(cleanValues.phone);
    setGender(cleanValues.gender);
    setNationalityCategory(cleanValues.nationalityCategory);
    setNationality(cleanValues.nationality);
    setSchoolName(cleanValues.schoolName);
    setSchoolType(cleanValues.schoolType);
    setSpecialization(cleanValues.specialization);
    setPlaceOfBirth(cleanValues.placeOfBirth);
    setStudentOrderAmongSiblings(cleanValues.studentOrderAmongSiblings);
    setFamilyIncome(cleanValues.familyIncome);
    setFamilyIncomeProofDoc(cleanValues.familyIncomeProofDoc);
    setFamilyIncomeProofDocs(cleanValues.familyIncomeProofDocs ?? []);
    setCurrentFamilyIncomeProofDocsValue("");
    setPreferredLanguage(cleanValues.preferredLanguage);
    setGraduationDate(cleanValues.graduationDate);
    setAddress(cleanValues.address);
    setErrors({});
  };
  const [studentRecord, setStudentRecord] = React.useState(studentModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = cprProp
        ? await DataStore.query(Student, cprProp)
        : studentModelProp;
      setStudentRecord(record);
    };
    queryData();
  }, [cprProp, studentModelProp]);
  React.useEffect(resetStateValues, [studentRecord]);
  const [
    currentFamilyIncomeProofDocsValue,
    setCurrentFamilyIncomeProofDocsValue,
  ] = React.useState("");
  const familyIncomeProofDocsRef = React.createRef();
  const validations = {
    cpr: [{ type: "Required" }],
    cprDoc: [],
    fullName: [],
    batch: [],
    email: [],
    phone: [],
    gender: [],
    nationalityCategory: [],
    nationality: [],
    schoolName: [],
    schoolType: [],
    specialization: [],
    placeOfBirth: [],
    studentOrderAmongSiblings: [],
    familyIncome: [],
    familyIncomeProofDoc: [],
    familyIncomeProofDocs: [],
    preferredLanguage: [],
    graduationDate: [],
    address: [],
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
          cpr,
          cprDoc,
          fullName,
          batch,
          email,
          phone,
          gender,
          nationalityCategory,
          nationality,
          schoolName,
          schoolType,
          specialization,
          placeOfBirth,
          studentOrderAmongSiblings,
          familyIncome,
          familyIncomeProofDoc,
          familyIncomeProofDocs,
          preferredLanguage,
          graduationDate,
          address,
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
            Student.copyOf(studentRecord, (updated) => {
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
      {...getOverrideProps(overrides, "StudentUpdateForm")}
      {...rest}
    >
      <TextField
        label="Cpr"
        isRequired={true}
        isReadOnly={true}
        value={cpr}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr: value,
              cprDoc,
              fullName,
              batch,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
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
        label="Cpr doc"
        isRequired={false}
        isReadOnly={false}
        value={cprDoc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc: value,
              fullName,
              batch,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
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
        label="Full name"
        isRequired={false}
        isReadOnly={false}
        value={fullName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName: value,
              batch,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
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
        label="Batch"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={batch}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName,
              batch: value,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
            };
            const result = onChange(modelFields);
            value = result?.batch ?? value;
          }
          if (errors.batch?.hasError) {
            runValidationTasks("batch", value);
          }
          setBatch(value);
        }}
        onBlur={() => runValidationTasks("batch", batch)}
        errorMessage={errors.batch?.errorMessage}
        hasError={errors.batch?.hasError}
        {...getOverrideProps(overrides, "batch")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName,
              batch,
              email: value,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
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
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName,
              batch,
              email,
              phone: value,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
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
              cprDoc,
              fullName,
              batch,
              email,
              phone,
              gender: value,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
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
      <SelectField
        label="Nationality category"
        placeholder="Please select an option"
        isDisabled={false}
        value={nationalityCategory}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName,
              batch,
              email,
              phone,
              gender,
              nationalityCategory: value,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
            };
            const result = onChange(modelFields);
            value = result?.nationalityCategory ?? value;
          }
          if (errors.nationalityCategory?.hasError) {
            runValidationTasks("nationalityCategory", value);
          }
          setNationalityCategory(value);
        }}
        onBlur={() =>
          runValidationTasks("nationalityCategory", nationalityCategory)
        }
        errorMessage={errors.nationalityCategory?.errorMessage}
        hasError={errors.nationalityCategory?.hasError}
        {...getOverrideProps(overrides, "nationalityCategory")}
      >
        <option
          children="Bahraini"
          value="BAHRAINI"
          {...getOverrideProps(overrides, "nationalityCategoryoption0")}
        ></option>
        <option
          children="Non bahraini"
          value="NON_BAHRAINI"
          {...getOverrideProps(overrides, "nationalityCategoryoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Nationality"
        isRequired={false}
        isReadOnly={false}
        value={nationality}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName,
              batch,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality: value,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
            };
            const result = onChange(modelFields);
            value = result?.nationality ?? value;
          }
          if (errors.nationality?.hasError) {
            runValidationTasks("nationality", value);
          }
          setNationality(value);
        }}
        onBlur={() => runValidationTasks("nationality", nationality)}
        errorMessage={errors.nationality?.errorMessage}
        hasError={errors.nationality?.hasError}
        {...getOverrideProps(overrides, "nationality")}
      ></TextField>
      <TextField
        label="School name"
        isRequired={false}
        isReadOnly={false}
        value={schoolName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName,
              batch,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName: value,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
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
      <SelectField
        label="School type"
        placeholder="Please select an option"
        isDisabled={false}
        value={schoolType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName,
              batch,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType: value,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
            };
            const result = onChange(modelFields);
            value = result?.schoolType ?? value;
          }
          if (errors.schoolType?.hasError) {
            runValidationTasks("schoolType", value);
          }
          setSchoolType(value);
        }}
        onBlur={() => runValidationTasks("schoolType", schoolType)}
        errorMessage={errors.schoolType?.errorMessage}
        hasError={errors.schoolType?.hasError}
        {...getOverrideProps(overrides, "schoolType")}
      >
        <option
          children="Private"
          value="PRIVATE"
          {...getOverrideProps(overrides, "schoolTypeoption0")}
        ></option>
        <option
          children="Public"
          value="PUBLIC"
          {...getOverrideProps(overrides, "schoolTypeoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Specialization"
        isRequired={false}
        isReadOnly={false}
        value={specialization}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName,
              batch,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization: value,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
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
        value={placeOfBirth}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName,
              batch,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth: value,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
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
        value={studentOrderAmongSiblings}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName,
              batch,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings: value,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
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
      <SelectField
        label="Family income"
        placeholder="Please select an option"
        isDisabled={false}
        value={familyIncome}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName,
              batch,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome: value,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
            };
            const result = onChange(modelFields);
            value = result?.familyIncome ?? value;
          }
          if (errors.familyIncome?.hasError) {
            runValidationTasks("familyIncome", value);
          }
          setFamilyIncome(value);
        }}
        onBlur={() => runValidationTasks("familyIncome", familyIncome)}
        errorMessage={errors.familyIncome?.errorMessage}
        hasError={errors.familyIncome?.hasError}
        {...getOverrideProps(overrides, "familyIncome")}
      >
        <option
          children="Less than 500"
          value="LESS_THAN_500"
          {...getOverrideProps(overrides, "familyIncomeoption0")}
        ></option>
        <option
          children="Between 500 and 700"
          value="BETWEEN_500_AND_700"
          {...getOverrideProps(overrides, "familyIncomeoption1")}
        ></option>
        <option
          children="Between 700 and 1000"
          value="BETWEEN_700_AND_1000"
          {...getOverrideProps(overrides, "familyIncomeoption2")}
        ></option>
        <option
          children="Less than 1500"
          value="LESS_THAN_1500"
          {...getOverrideProps(overrides, "familyIncomeoption3")}
        ></option>
        <option
          children="More than 1500"
          value="MORE_THAN_1500"
          {...getOverrideProps(overrides, "familyIncomeoption4")}
        ></option>
        <option
          children="Over 1000"
          value="OVER_1000"
          {...getOverrideProps(overrides, "familyIncomeoption5")}
        ></option>
      </SelectField>
      <TextField
        label="Family income proof doc"
        isRequired={false}
        isReadOnly={false}
        value={familyIncomeProofDoc}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName,
              batch,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc: value,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address,
            };
            const result = onChange(modelFields);
            value = result?.familyIncomeProofDoc ?? value;
          }
          if (errors.familyIncomeProofDoc?.hasError) {
            runValidationTasks("familyIncomeProofDoc", value);
          }
          setFamilyIncomeProofDoc(value);
        }}
        onBlur={() =>
          runValidationTasks("familyIncomeProofDoc", familyIncomeProofDoc)
        }
        errorMessage={errors.familyIncomeProofDoc?.errorMessage}
        hasError={errors.familyIncomeProofDoc?.hasError}
        {...getOverrideProps(overrides, "familyIncomeProofDoc")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName,
              batch,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs: values,
              preferredLanguage,
              graduationDate,
              address,
            };
            const result = onChange(modelFields);
            values = result?.familyIncomeProofDocs ?? values;
          }
          setFamilyIncomeProofDocs(values);
          setCurrentFamilyIncomeProofDocsValue("");
        }}
        currentFieldValue={currentFamilyIncomeProofDocsValue}
        label={"Family income proof docs"}
        items={familyIncomeProofDocs}
        hasError={errors?.familyIncomeProofDocs?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks(
            "familyIncomeProofDocs",
            currentFamilyIncomeProofDocsValue
          )
        }
        errorMessage={errors?.familyIncomeProofDocs?.errorMessage}
        setFieldValue={setCurrentFamilyIncomeProofDocsValue}
        inputFieldRef={familyIncomeProofDocsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Family income proof docs"
          isRequired={false}
          isReadOnly={false}
          value={currentFamilyIncomeProofDocsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.familyIncomeProofDocs?.hasError) {
              runValidationTasks("familyIncomeProofDocs", value);
            }
            setCurrentFamilyIncomeProofDocsValue(value);
          }}
          onBlur={() =>
            runValidationTasks(
              "familyIncomeProofDocs",
              currentFamilyIncomeProofDocsValue
            )
          }
          errorMessage={errors.familyIncomeProofDocs?.errorMessage}
          hasError={errors.familyIncomeProofDocs?.hasError}
          ref={familyIncomeProofDocsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "familyIncomeProofDocs")}
        ></TextField>
      </ArrayField>
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
              cprDoc,
              fullName,
              batch,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage: value,
              graduationDate,
              address,
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
        value={graduationDate}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName,
              batch,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate: value,
              address,
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
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              cpr,
              cprDoc,
              fullName,
              batch,
              email,
              phone,
              gender,
              nationalityCategory,
              nationality,
              schoolName,
              schoolType,
              specialization,
              placeOfBirth,
              studentOrderAmongSiblings,
              familyIncome,
              familyIncomeProofDoc,
              familyIncomeProofDocs,
              preferredLanguage,
              graduationDate,
              address: value,
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
          isDisabled={!(cprProp || studentModelProp)}
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
              !(cprProp || studentModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
