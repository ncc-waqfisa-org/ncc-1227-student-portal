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
  TextAreaField,
  TextField,
} from "@aws-amplify/ui-react";
import { MasterStatistics } from "../models";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function MasterStatisticsUpdateForm(props) {
  const {
    id: idProp,
    masterStatistics: masterStatisticsModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    id: "",
    batch: "",
    totalApplications: "",
    totalApplicationsPerStatus: "",
    scoreHistogram: "",
    gpaHistogram: "",
    totalApplicationsPerUniversity: "",
    topUniversities: "",
    topPrograms: "",
    familyIncome: "",
    schoolType: "",
    students: "",
    applications: "",
    today: "",
  };
  const [id, setId] = React.useState(initialValues.id);
  const [batch, setBatch] = React.useState(initialValues.batch);
  const [totalApplications, setTotalApplications] = React.useState(
    initialValues.totalApplications
  );
  const [totalApplicationsPerStatus, setTotalApplicationsPerStatus] =
    React.useState(initialValues.totalApplicationsPerStatus);
  const [scoreHistogram, setScoreHistogram] = React.useState(
    initialValues.scoreHistogram
  );
  const [gpaHistogram, setGpaHistogram] = React.useState(
    initialValues.gpaHistogram
  );
  const [totalApplicationsPerUniversity, setTotalApplicationsPerUniversity] =
    React.useState(initialValues.totalApplicationsPerUniversity);
  const [topUniversities, setTopUniversities] = React.useState(
    initialValues.topUniversities
  );
  const [topPrograms, setTopPrograms] = React.useState(
    initialValues.topPrograms
  );
  const [familyIncome, setFamilyIncome] = React.useState(
    initialValues.familyIncome
  );
  const [schoolType, setSchoolType] = React.useState(initialValues.schoolType);
  const [students, setStudents] = React.useState(initialValues.students);
  const [applications, setApplications] = React.useState(
    initialValues.applications
  );
  const [today, setToday] = React.useState(initialValues.today);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = masterStatisticsRecord
      ? { ...initialValues, ...masterStatisticsRecord }
      : initialValues;
    setId(cleanValues.id);
    setBatch(cleanValues.batch);
    setTotalApplications(cleanValues.totalApplications);
    setTotalApplicationsPerStatus(
      typeof cleanValues.totalApplicationsPerStatus === "string" ||
        cleanValues.totalApplicationsPerStatus === null
        ? cleanValues.totalApplicationsPerStatus
        : JSON.stringify(cleanValues.totalApplicationsPerStatus)
    );
    setScoreHistogram(
      typeof cleanValues.scoreHistogram === "string" ||
        cleanValues.scoreHistogram === null
        ? cleanValues.scoreHistogram
        : JSON.stringify(cleanValues.scoreHistogram)
    );
    setGpaHistogram(
      typeof cleanValues.gpaHistogram === "string" ||
        cleanValues.gpaHistogram === null
        ? cleanValues.gpaHistogram
        : JSON.stringify(cleanValues.gpaHistogram)
    );
    setTotalApplicationsPerUniversity(
      typeof cleanValues.totalApplicationsPerUniversity === "string" ||
        cleanValues.totalApplicationsPerUniversity === null
        ? cleanValues.totalApplicationsPerUniversity
        : JSON.stringify(cleanValues.totalApplicationsPerUniversity)
    );
    setTopUniversities(
      typeof cleanValues.topUniversities === "string" ||
        cleanValues.topUniversities === null
        ? cleanValues.topUniversities
        : JSON.stringify(cleanValues.topUniversities)
    );
    setTopPrograms(
      typeof cleanValues.topPrograms === "string" ||
        cleanValues.topPrograms === null
        ? cleanValues.topPrograms
        : JSON.stringify(cleanValues.topPrograms)
    );
    setFamilyIncome(
      typeof cleanValues.familyIncome === "string" ||
        cleanValues.familyIncome === null
        ? cleanValues.familyIncome
        : JSON.stringify(cleanValues.familyIncome)
    );
    setSchoolType(
      typeof cleanValues.schoolType === "string" ||
        cleanValues.schoolType === null
        ? cleanValues.schoolType
        : JSON.stringify(cleanValues.schoolType)
    );
    setStudents(
      typeof cleanValues.students === "string" || cleanValues.students === null
        ? cleanValues.students
        : JSON.stringify(cleanValues.students)
    );
    setApplications(
      typeof cleanValues.applications === "string" ||
        cleanValues.applications === null
        ? cleanValues.applications
        : JSON.stringify(cleanValues.applications)
    );
    setToday(
      typeof cleanValues.today === "string" || cleanValues.today === null
        ? cleanValues.today
        : JSON.stringify(cleanValues.today)
    );
    setErrors({});
  };
  const [masterStatisticsRecord, setMasterStatisticsRecord] = React.useState(
    masterStatisticsModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(MasterStatistics, idProp)
        : masterStatisticsModelProp;
      setMasterStatisticsRecord(record);
    };
    queryData();
  }, [idProp, masterStatisticsModelProp]);
  React.useEffect(resetStateValues, [masterStatisticsRecord]);
  const validations = {
    id: [{ type: "Required" }],
    batch: [{ type: "Required" }],
    totalApplications: [],
    totalApplicationsPerStatus: [{ type: "JSON" }],
    scoreHistogram: [{ type: "JSON" }],
    gpaHistogram: [{ type: "JSON" }],
    totalApplicationsPerUniversity: [{ type: "JSON" }],
    topUniversities: [{ type: "JSON" }],
    topPrograms: [{ type: "JSON" }],
    familyIncome: [{ type: "JSON" }],
    schoolType: [{ type: "JSON" }],
    students: [{ type: "JSON" }],
    applications: [{ type: "JSON" }],
    today: [{ type: "JSON" }],
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
          id,
          batch,
          totalApplications,
          totalApplicationsPerStatus,
          scoreHistogram,
          gpaHistogram,
          totalApplicationsPerUniversity,
          topUniversities,
          topPrograms,
          familyIncome,
          schoolType,
          students,
          applications,
          today,
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
            MasterStatistics.copyOf(masterStatisticsRecord, (updated) => {
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
      {...getOverrideProps(overrides, "MasterStatisticsUpdateForm")}
      {...rest}
    >
      <TextField
        label="Id"
        isRequired={true}
        isReadOnly={true}
        type="number"
        step="any"
        value={id}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              id: value,
              batch,
              totalApplications,
              totalApplicationsPerStatus,
              scoreHistogram,
              gpaHistogram,
              totalApplicationsPerUniversity,
              topUniversities,
              topPrograms,
              familyIncome,
              schoolType,
              students,
              applications,
              today,
            };
            const result = onChange(modelFields);
            value = result?.id ?? value;
          }
          if (errors.id?.hasError) {
            runValidationTasks("id", value);
          }
          setId(value);
        }}
        onBlur={() => runValidationTasks("id", id)}
        errorMessage={errors.id?.errorMessage}
        hasError={errors.id?.hasError}
        {...getOverrideProps(overrides, "id")}
      ></TextField>
      <TextField
        label="Batch"
        isRequired={true}
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
              id,
              batch: value,
              totalApplications,
              totalApplicationsPerStatus,
              scoreHistogram,
              gpaHistogram,
              totalApplicationsPerUniversity,
              topUniversities,
              topPrograms,
              familyIncome,
              schoolType,
              students,
              applications,
              today,
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
        label="Total applications"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={totalApplications}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              id,
              batch,
              totalApplications: value,
              totalApplicationsPerStatus,
              scoreHistogram,
              gpaHistogram,
              totalApplicationsPerUniversity,
              topUniversities,
              topPrograms,
              familyIncome,
              schoolType,
              students,
              applications,
              today,
            };
            const result = onChange(modelFields);
            value = result?.totalApplications ?? value;
          }
          if (errors.totalApplications?.hasError) {
            runValidationTasks("totalApplications", value);
          }
          setTotalApplications(value);
        }}
        onBlur={() =>
          runValidationTasks("totalApplications", totalApplications)
        }
        errorMessage={errors.totalApplications?.errorMessage}
        hasError={errors.totalApplications?.hasError}
        {...getOverrideProps(overrides, "totalApplications")}
      ></TextField>
      <TextAreaField
        label="Total applications per status"
        isRequired={false}
        isReadOnly={false}
        value={totalApplicationsPerStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              batch,
              totalApplications,
              totalApplicationsPerStatus: value,
              scoreHistogram,
              gpaHistogram,
              totalApplicationsPerUniversity,
              topUniversities,
              topPrograms,
              familyIncome,
              schoolType,
              students,
              applications,
              today,
            };
            const result = onChange(modelFields);
            value = result?.totalApplicationsPerStatus ?? value;
          }
          if (errors.totalApplicationsPerStatus?.hasError) {
            runValidationTasks("totalApplicationsPerStatus", value);
          }
          setTotalApplicationsPerStatus(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "totalApplicationsPerStatus",
            totalApplicationsPerStatus
          )
        }
        errorMessage={errors.totalApplicationsPerStatus?.errorMessage}
        hasError={errors.totalApplicationsPerStatus?.hasError}
        {...getOverrideProps(overrides, "totalApplicationsPerStatus")}
      ></TextAreaField>
      <TextAreaField
        label="Score histogram"
        isRequired={false}
        isReadOnly={false}
        value={scoreHistogram}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              batch,
              totalApplications,
              totalApplicationsPerStatus,
              scoreHistogram: value,
              gpaHistogram,
              totalApplicationsPerUniversity,
              topUniversities,
              topPrograms,
              familyIncome,
              schoolType,
              students,
              applications,
              today,
            };
            const result = onChange(modelFields);
            value = result?.scoreHistogram ?? value;
          }
          if (errors.scoreHistogram?.hasError) {
            runValidationTasks("scoreHistogram", value);
          }
          setScoreHistogram(value);
        }}
        onBlur={() => runValidationTasks("scoreHistogram", scoreHistogram)}
        errorMessage={errors.scoreHistogram?.errorMessage}
        hasError={errors.scoreHistogram?.hasError}
        {...getOverrideProps(overrides, "scoreHistogram")}
      ></TextAreaField>
      <TextAreaField
        label="Gpa histogram"
        isRequired={false}
        isReadOnly={false}
        value={gpaHistogram}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              batch,
              totalApplications,
              totalApplicationsPerStatus,
              scoreHistogram,
              gpaHistogram: value,
              totalApplicationsPerUniversity,
              topUniversities,
              topPrograms,
              familyIncome,
              schoolType,
              students,
              applications,
              today,
            };
            const result = onChange(modelFields);
            value = result?.gpaHistogram ?? value;
          }
          if (errors.gpaHistogram?.hasError) {
            runValidationTasks("gpaHistogram", value);
          }
          setGpaHistogram(value);
        }}
        onBlur={() => runValidationTasks("gpaHistogram", gpaHistogram)}
        errorMessage={errors.gpaHistogram?.errorMessage}
        hasError={errors.gpaHistogram?.hasError}
        {...getOverrideProps(overrides, "gpaHistogram")}
      ></TextAreaField>
      <TextAreaField
        label="Total applications per university"
        isRequired={false}
        isReadOnly={false}
        value={totalApplicationsPerUniversity}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              batch,
              totalApplications,
              totalApplicationsPerStatus,
              scoreHistogram,
              gpaHistogram,
              totalApplicationsPerUniversity: value,
              topUniversities,
              topPrograms,
              familyIncome,
              schoolType,
              students,
              applications,
              today,
            };
            const result = onChange(modelFields);
            value = result?.totalApplicationsPerUniversity ?? value;
          }
          if (errors.totalApplicationsPerUniversity?.hasError) {
            runValidationTasks("totalApplicationsPerUniversity", value);
          }
          setTotalApplicationsPerUniversity(value);
        }}
        onBlur={() =>
          runValidationTasks(
            "totalApplicationsPerUniversity",
            totalApplicationsPerUniversity
          )
        }
        errorMessage={errors.totalApplicationsPerUniversity?.errorMessage}
        hasError={errors.totalApplicationsPerUniversity?.hasError}
        {...getOverrideProps(overrides, "totalApplicationsPerUniversity")}
      ></TextAreaField>
      <TextAreaField
        label="Top universities"
        isRequired={false}
        isReadOnly={false}
        value={topUniversities}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              batch,
              totalApplications,
              totalApplicationsPerStatus,
              scoreHistogram,
              gpaHistogram,
              totalApplicationsPerUniversity,
              topUniversities: value,
              topPrograms,
              familyIncome,
              schoolType,
              students,
              applications,
              today,
            };
            const result = onChange(modelFields);
            value = result?.topUniversities ?? value;
          }
          if (errors.topUniversities?.hasError) {
            runValidationTasks("topUniversities", value);
          }
          setTopUniversities(value);
        }}
        onBlur={() => runValidationTasks("topUniversities", topUniversities)}
        errorMessage={errors.topUniversities?.errorMessage}
        hasError={errors.topUniversities?.hasError}
        {...getOverrideProps(overrides, "topUniversities")}
      ></TextAreaField>
      <TextAreaField
        label="Top programs"
        isRequired={false}
        isReadOnly={false}
        value={topPrograms}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              batch,
              totalApplications,
              totalApplicationsPerStatus,
              scoreHistogram,
              gpaHistogram,
              totalApplicationsPerUniversity,
              topUniversities,
              topPrograms: value,
              familyIncome,
              schoolType,
              students,
              applications,
              today,
            };
            const result = onChange(modelFields);
            value = result?.topPrograms ?? value;
          }
          if (errors.topPrograms?.hasError) {
            runValidationTasks("topPrograms", value);
          }
          setTopPrograms(value);
        }}
        onBlur={() => runValidationTasks("topPrograms", topPrograms)}
        errorMessage={errors.topPrograms?.errorMessage}
        hasError={errors.topPrograms?.hasError}
        {...getOverrideProps(overrides, "topPrograms")}
      ></TextAreaField>
      <TextAreaField
        label="Family income"
        isRequired={false}
        isReadOnly={false}
        value={familyIncome}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              batch,
              totalApplications,
              totalApplicationsPerStatus,
              scoreHistogram,
              gpaHistogram,
              totalApplicationsPerUniversity,
              topUniversities,
              topPrograms,
              familyIncome: value,
              schoolType,
              students,
              applications,
              today,
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
      ></TextAreaField>
      <TextAreaField
        label="School type"
        isRequired={false}
        isReadOnly={false}
        value={schoolType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              batch,
              totalApplications,
              totalApplicationsPerStatus,
              scoreHistogram,
              gpaHistogram,
              totalApplicationsPerUniversity,
              topUniversities,
              topPrograms,
              familyIncome,
              schoolType: value,
              students,
              applications,
              today,
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
      ></TextAreaField>
      <TextAreaField
        label="Students"
        isRequired={false}
        isReadOnly={false}
        value={students}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              batch,
              totalApplications,
              totalApplicationsPerStatus,
              scoreHistogram,
              gpaHistogram,
              totalApplicationsPerUniversity,
              topUniversities,
              topPrograms,
              familyIncome,
              schoolType,
              students: value,
              applications,
              today,
            };
            const result = onChange(modelFields);
            value = result?.students ?? value;
          }
          if (errors.students?.hasError) {
            runValidationTasks("students", value);
          }
          setStudents(value);
        }}
        onBlur={() => runValidationTasks("students", students)}
        errorMessage={errors.students?.errorMessage}
        hasError={errors.students?.hasError}
        {...getOverrideProps(overrides, "students")}
      ></TextAreaField>
      <TextAreaField
        label="Applications"
        isRequired={false}
        isReadOnly={false}
        value={applications}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              batch,
              totalApplications,
              totalApplicationsPerStatus,
              scoreHistogram,
              gpaHistogram,
              totalApplicationsPerUniversity,
              topUniversities,
              topPrograms,
              familyIncome,
              schoolType,
              students,
              applications: value,
              today,
            };
            const result = onChange(modelFields);
            value = result?.applications ?? value;
          }
          if (errors.applications?.hasError) {
            runValidationTasks("applications", value);
          }
          setApplications(value);
        }}
        onBlur={() => runValidationTasks("applications", applications)}
        errorMessage={errors.applications?.errorMessage}
        hasError={errors.applications?.hasError}
        {...getOverrideProps(overrides, "applications")}
      ></TextAreaField>
      <TextAreaField
        label="Today"
        isRequired={false}
        isReadOnly={false}
        value={today}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              id,
              batch,
              totalApplications,
              totalApplicationsPerStatus,
              scoreHistogram,
              gpaHistogram,
              totalApplicationsPerUniversity,
              topUniversities,
              topPrograms,
              familyIncome,
              schoolType,
              students,
              applications,
              today: value,
            };
            const result = onChange(modelFields);
            value = result?.today ?? value;
          }
          if (errors.today?.hasError) {
            runValidationTasks("today", value);
          }
          setToday(value);
        }}
        onBlur={() => runValidationTasks("today", today)}
        errorMessage={errors.today?.errorMessage}
        hasError={errors.today?.hasError}
        {...getOverrideProps(overrides, "today")}
      ></TextAreaField>
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
          isDisabled={!(idProp || masterStatisticsModelProp)}
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
              !(idProp || masterStatisticsModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
