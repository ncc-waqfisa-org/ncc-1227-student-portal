/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createAttachment = /* GraphQL */ `mutation CreateAttachment(
  $input: CreateAttachmentInput!
  $condition: ModelAttachmentConditionInput
) {
  createAttachment(input: $input, condition: $condition) {
    id
    cprDoc
    signedContractDoc
    transcriptDoc
    schoolCertificate
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAttachmentMutationVariables,
  APITypes.CreateAttachmentMutation
>;
export const updateAttachment = /* GraphQL */ `mutation UpdateAttachment(
  $input: UpdateAttachmentInput!
  $condition: ModelAttachmentConditionInput
) {
  updateAttachment(input: $input, condition: $condition) {
    id
    cprDoc
    signedContractDoc
    transcriptDoc
    schoolCertificate
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAttachmentMutationVariables,
  APITypes.UpdateAttachmentMutation
>;
export const deleteAttachment = /* GraphQL */ `mutation DeleteAttachment(
  $input: DeleteAttachmentInput!
  $condition: ModelAttachmentConditionInput
) {
  deleteAttachment(input: $input, condition: $condition) {
    id
    cprDoc
    signedContractDoc
    transcriptDoc
    schoolCertificate
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAttachmentMutationVariables,
  APITypes.DeleteAttachmentMutation
>;
export const createApplication = /* GraphQL */ `mutation CreateApplication(
  $input: CreateApplicationInput!
  $condition: ModelApplicationConditionInput
) {
  createApplication(input: $input, condition: $condition) {
    id
    gpa
    status
    attachmentID
    adminLogs {
      nextToken
      startedAt
      __typename
    }
    studentLogs {
      nextToken
      startedAt
      __typename
    }
    attachment {
      id
      cprDoc
      signedContractDoc
      transcriptDoc
      schoolCertificate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    programs {
      nextToken
      startedAt
      __typename
    }
    dateTime
    isEmailSent
    schoolName
    schoolType
    studentCPR
    student {
      cpr
      cprDoc
      fullName
      email
      phone
      gender
      nationalityCategory
      nationality
      schoolName
      schoolType
      specialization
      placeOfBirth
      studentOrderAmongSiblings
      householdIncome
      familyIncome
      familyIncomeProofDoc
      familyIncomeProofDocs
      preferredLanguage
      graduationDate
      address
      parentInfoID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    batchID
    batch
    batchRelation {
      id
      batch
      createApplicationStartDate
      createApplicationEndDate
      updateApplicationEndDate
      signUpStartDate
      signUpEndDate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    score
    adminPoints
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    applicationAttachmentId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateApplicationMutationVariables,
  APITypes.CreateApplicationMutation
>;
export const updateApplication = /* GraphQL */ `mutation UpdateApplication(
  $input: UpdateApplicationInput!
  $condition: ModelApplicationConditionInput
) {
  updateApplication(input: $input, condition: $condition) {
    id
    gpa
    status
    attachmentID
    adminLogs {
      nextToken
      startedAt
      __typename
    }
    studentLogs {
      nextToken
      startedAt
      __typename
    }
    attachment {
      id
      cprDoc
      signedContractDoc
      transcriptDoc
      schoolCertificate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    programs {
      nextToken
      startedAt
      __typename
    }
    dateTime
    isEmailSent
    schoolName
    schoolType
    studentCPR
    student {
      cpr
      cprDoc
      fullName
      email
      phone
      gender
      nationalityCategory
      nationality
      schoolName
      schoolType
      specialization
      placeOfBirth
      studentOrderAmongSiblings
      householdIncome
      familyIncome
      familyIncomeProofDoc
      familyIncomeProofDocs
      preferredLanguage
      graduationDate
      address
      parentInfoID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    batchID
    batch
    batchRelation {
      id
      batch
      createApplicationStartDate
      createApplicationEndDate
      updateApplicationEndDate
      signUpStartDate
      signUpEndDate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    score
    adminPoints
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    applicationAttachmentId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateApplicationMutationVariables,
  APITypes.UpdateApplicationMutation
>;
export const deleteApplication = /* GraphQL */ `mutation DeleteApplication(
  $input: DeleteApplicationInput!
  $condition: ModelApplicationConditionInput
) {
  deleteApplication(input: $input, condition: $condition) {
    id
    gpa
    status
    attachmentID
    adminLogs {
      nextToken
      startedAt
      __typename
    }
    studentLogs {
      nextToken
      startedAt
      __typename
    }
    attachment {
      id
      cprDoc
      signedContractDoc
      transcriptDoc
      schoolCertificate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    programs {
      nextToken
      startedAt
      __typename
    }
    dateTime
    isEmailSent
    schoolName
    schoolType
    studentCPR
    student {
      cpr
      cprDoc
      fullName
      email
      phone
      gender
      nationalityCategory
      nationality
      schoolName
      schoolType
      specialization
      placeOfBirth
      studentOrderAmongSiblings
      householdIncome
      familyIncome
      familyIncomeProofDoc
      familyIncomeProofDocs
      preferredLanguage
      graduationDate
      address
      parentInfoID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    batchID
    batch
    batchRelation {
      id
      batch
      createApplicationStartDate
      createApplicationEndDate
      updateApplicationEndDate
      signUpStartDate
      signUpEndDate
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    score
    adminPoints
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    applicationAttachmentId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteApplicationMutationVariables,
  APITypes.DeleteApplicationMutation
>;
export const createProgramChoice = /* GraphQL */ `mutation CreateProgramChoice(
  $input: CreateProgramChoiceInput!
  $condition: ModelProgramChoiceConditionInput
) {
  createProgramChoice(input: $input, condition: $condition) {
    id
    programID
    applicationID
    program {
      id
      name
      minimumGPA
      requirements
      nameAr
      requirementsAr
      availability
      universityID
      isDeactivated
      isTrashed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      universityProgramsId
      __typename
    }
    application {
      id
      gpa
      status
      attachmentID
      dateTime
      isEmailSent
      schoolName
      schoolType
      studentCPR
      batchID
      batch
      score
      adminPoints
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAttachmentId
      __typename
    }
    choiceOrder
    acceptanceLetterDoc
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    applicationProgramsId
    programApplicationsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateProgramChoiceMutationVariables,
  APITypes.CreateProgramChoiceMutation
>;
export const updateProgramChoice = /* GraphQL */ `mutation UpdateProgramChoice(
  $input: UpdateProgramChoiceInput!
  $condition: ModelProgramChoiceConditionInput
) {
  updateProgramChoice(input: $input, condition: $condition) {
    id
    programID
    applicationID
    program {
      id
      name
      minimumGPA
      requirements
      nameAr
      requirementsAr
      availability
      universityID
      isDeactivated
      isTrashed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      universityProgramsId
      __typename
    }
    application {
      id
      gpa
      status
      attachmentID
      dateTime
      isEmailSent
      schoolName
      schoolType
      studentCPR
      batchID
      batch
      score
      adminPoints
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAttachmentId
      __typename
    }
    choiceOrder
    acceptanceLetterDoc
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    applicationProgramsId
    programApplicationsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateProgramChoiceMutationVariables,
  APITypes.UpdateProgramChoiceMutation
>;
export const deleteProgramChoice = /* GraphQL */ `mutation DeleteProgramChoice(
  $input: DeleteProgramChoiceInput!
  $condition: ModelProgramChoiceConditionInput
) {
  deleteProgramChoice(input: $input, condition: $condition) {
    id
    programID
    applicationID
    program {
      id
      name
      minimumGPA
      requirements
      nameAr
      requirementsAr
      availability
      universityID
      isDeactivated
      isTrashed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      universityProgramsId
      __typename
    }
    application {
      id
      gpa
      status
      attachmentID
      dateTime
      isEmailSent
      schoolName
      schoolType
      studentCPR
      batchID
      batch
      score
      adminPoints
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAttachmentId
      __typename
    }
    choiceOrder
    acceptanceLetterDoc
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    applicationProgramsId
    programApplicationsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteProgramChoiceMutationVariables,
  APITypes.DeleteProgramChoiceMutation
>;
export const createProgram = /* GraphQL */ `mutation CreateProgram(
  $input: CreateProgramInput!
  $condition: ModelProgramConditionInput
) {
  createProgram(input: $input, condition: $condition) {
    id
    name
    minimumGPA
    requirements
    nameAr
    requirementsAr
    availability
    universityID
    university {
      id
      name
      nameAr
      availability
      isDeactivated
      isExtended
      extendedTo
      isTrashed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    applications {
      nextToken
      startedAt
      __typename
    }
    isDeactivated
    isTrashed
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    universityProgramsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateProgramMutationVariables,
  APITypes.CreateProgramMutation
>;
export const updateProgram = /* GraphQL */ `mutation UpdateProgram(
  $input: UpdateProgramInput!
  $condition: ModelProgramConditionInput
) {
  updateProgram(input: $input, condition: $condition) {
    id
    name
    minimumGPA
    requirements
    nameAr
    requirementsAr
    availability
    universityID
    university {
      id
      name
      nameAr
      availability
      isDeactivated
      isExtended
      extendedTo
      isTrashed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    applications {
      nextToken
      startedAt
      __typename
    }
    isDeactivated
    isTrashed
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    universityProgramsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateProgramMutationVariables,
  APITypes.UpdateProgramMutation
>;
export const deleteProgram = /* GraphQL */ `mutation DeleteProgram(
  $input: DeleteProgramInput!
  $condition: ModelProgramConditionInput
) {
  deleteProgram(input: $input, condition: $condition) {
    id
    name
    minimumGPA
    requirements
    nameAr
    requirementsAr
    availability
    universityID
    university {
      id
      name
      nameAr
      availability
      isDeactivated
      isExtended
      extendedTo
      isTrashed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    applications {
      nextToken
      startedAt
      __typename
    }
    isDeactivated
    isTrashed
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    universityProgramsId
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteProgramMutationVariables,
  APITypes.DeleteProgramMutation
>;
export const createUniversity = /* GraphQL */ `mutation CreateUniversity(
  $input: CreateUniversityInput!
  $condition: ModelUniversityConditionInput
) {
  createUniversity(input: $input, condition: $condition) {
    id
    name
    nameAr
    Programs {
      nextToken
      startedAt
      __typename
    }
    availability
    isDeactivated
    isExtended
    extendedTo
    isTrashed
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUniversityMutationVariables,
  APITypes.CreateUniversityMutation
>;
export const updateUniversity = /* GraphQL */ `mutation UpdateUniversity(
  $input: UpdateUniversityInput!
  $condition: ModelUniversityConditionInput
) {
  updateUniversity(input: $input, condition: $condition) {
    id
    name
    nameAr
    Programs {
      nextToken
      startedAt
      __typename
    }
    availability
    isDeactivated
    isExtended
    extendedTo
    isTrashed
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUniversityMutationVariables,
  APITypes.UpdateUniversityMutation
>;
export const deleteUniversity = /* GraphQL */ `mutation DeleteUniversity(
  $input: DeleteUniversityInput!
  $condition: ModelUniversityConditionInput
) {
  deleteUniversity(input: $input, condition: $condition) {
    id
    name
    nameAr
    Programs {
      nextToken
      startedAt
      __typename
    }
    availability
    isDeactivated
    isExtended
    extendedTo
    isTrashed
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUniversityMutationVariables,
  APITypes.DeleteUniversityMutation
>;
export const createAdminLog = /* GraphQL */ `mutation CreateAdminLog(
  $input: CreateAdminLogInput!
  $condition: ModelAdminLogConditionInput
) {
  createAdminLog(input: $input, condition: $condition) {
    id
    applicationID
    adminCPR
    dateTime
    snapshot
    reason
    admin {
      cpr
      fullName
      email
      role
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    applicationAdminLogsId
    adminAdminLogsCpr
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAdminLogMutationVariables,
  APITypes.CreateAdminLogMutation
>;
export const updateAdminLog = /* GraphQL */ `mutation UpdateAdminLog(
  $input: UpdateAdminLogInput!
  $condition: ModelAdminLogConditionInput
) {
  updateAdminLog(input: $input, condition: $condition) {
    id
    applicationID
    adminCPR
    dateTime
    snapshot
    reason
    admin {
      cpr
      fullName
      email
      role
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    applicationAdminLogsId
    adminAdminLogsCpr
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAdminLogMutationVariables,
  APITypes.UpdateAdminLogMutation
>;
export const deleteAdminLog = /* GraphQL */ `mutation DeleteAdminLog(
  $input: DeleteAdminLogInput!
  $condition: ModelAdminLogConditionInput
) {
  deleteAdminLog(input: $input, condition: $condition) {
    id
    applicationID
    adminCPR
    dateTime
    snapshot
    reason
    admin {
      cpr
      fullName
      email
      role
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    applicationAdminLogsId
    adminAdminLogsCpr
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAdminLogMutationVariables,
  APITypes.DeleteAdminLogMutation
>;
export const createStudentLog = /* GraphQL */ `mutation CreateStudentLog(
  $input: CreateStudentLogInput!
  $condition: ModelStudentLogConditionInput
) {
  createStudentLog(input: $input, condition: $condition) {
    id
    applicationID
    studentCPR
    dateTime
    snapshot
    reason
    student {
      cpr
      cprDoc
      fullName
      email
      phone
      gender
      nationalityCategory
      nationality
      schoolName
      schoolType
      specialization
      placeOfBirth
      studentOrderAmongSiblings
      householdIncome
      familyIncome
      familyIncomeProofDoc
      familyIncomeProofDocs
      preferredLanguage
      graduationDate
      address
      parentInfoID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    applicationStudentLogsId
    studentStudentLogsCpr
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateStudentLogMutationVariables,
  APITypes.CreateStudentLogMutation
>;
export const updateStudentLog = /* GraphQL */ `mutation UpdateStudentLog(
  $input: UpdateStudentLogInput!
  $condition: ModelStudentLogConditionInput
) {
  updateStudentLog(input: $input, condition: $condition) {
    id
    applicationID
    studentCPR
    dateTime
    snapshot
    reason
    student {
      cpr
      cprDoc
      fullName
      email
      phone
      gender
      nationalityCategory
      nationality
      schoolName
      schoolType
      specialization
      placeOfBirth
      studentOrderAmongSiblings
      householdIncome
      familyIncome
      familyIncomeProofDoc
      familyIncomeProofDocs
      preferredLanguage
      graduationDate
      address
      parentInfoID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    applicationStudentLogsId
    studentStudentLogsCpr
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateStudentLogMutationVariables,
  APITypes.UpdateStudentLogMutation
>;
export const deleteStudentLog = /* GraphQL */ `mutation DeleteStudentLog(
  $input: DeleteStudentLogInput!
  $condition: ModelStudentLogConditionInput
) {
  deleteStudentLog(input: $input, condition: $condition) {
    id
    applicationID
    studentCPR
    dateTime
    snapshot
    reason
    student {
      cpr
      cprDoc
      fullName
      email
      phone
      gender
      nationalityCategory
      nationality
      schoolName
      schoolType
      specialization
      placeOfBirth
      studentOrderAmongSiblings
      householdIncome
      familyIncome
      familyIncomeProofDoc
      familyIncomeProofDocs
      preferredLanguage
      graduationDate
      address
      parentInfoID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    applicationStudentLogsId
    studentStudentLogsCpr
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteStudentLogMutationVariables,
  APITypes.DeleteStudentLogMutation
>;
export const createAdmin = /* GraphQL */ `mutation CreateAdmin(
  $input: CreateAdminInput!
  $condition: ModelAdminConditionInput
) {
  createAdmin(input: $input, condition: $condition) {
    cpr
    fullName
    email
    AdminLogs {
      nextToken
      startedAt
      __typename
    }
    role
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateAdminMutationVariables,
  APITypes.CreateAdminMutation
>;
export const updateAdmin = /* GraphQL */ `mutation UpdateAdmin(
  $input: UpdateAdminInput!
  $condition: ModelAdminConditionInput
) {
  updateAdmin(input: $input, condition: $condition) {
    cpr
    fullName
    email
    AdminLogs {
      nextToken
      startedAt
      __typename
    }
    role
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateAdminMutationVariables,
  APITypes.UpdateAdminMutation
>;
export const deleteAdmin = /* GraphQL */ `mutation DeleteAdmin(
  $input: DeleteAdminInput!
  $condition: ModelAdminConditionInput
) {
  deleteAdmin(input: $input, condition: $condition) {
    cpr
    fullName
    email
    AdminLogs {
      nextToken
      startedAt
      __typename
    }
    role
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteAdminMutationVariables,
  APITypes.DeleteAdminMutation
>;
export const createParentInfo = /* GraphQL */ `mutation CreateParentInfo(
  $input: CreateParentInfoInput!
  $condition: ModelParentInfoConditionInput
) {
  createParentInfo(input: $input, condition: $condition) {
    id
    guardianFullName
    relation
    guardianCPR
    primaryMobile
    secondaryMobile
    fatherFullName
    fatherCPR
    motherFullName
    motherCPR
    numberOfFamilyMembers
    address
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateParentInfoMutationVariables,
  APITypes.CreateParentInfoMutation
>;
export const updateParentInfo = /* GraphQL */ `mutation UpdateParentInfo(
  $input: UpdateParentInfoInput!
  $condition: ModelParentInfoConditionInput
) {
  updateParentInfo(input: $input, condition: $condition) {
    id
    guardianFullName
    relation
    guardianCPR
    primaryMobile
    secondaryMobile
    fatherFullName
    fatherCPR
    motherFullName
    motherCPR
    numberOfFamilyMembers
    address
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateParentInfoMutationVariables,
  APITypes.UpdateParentInfoMutation
>;
export const deleteParentInfo = /* GraphQL */ `mutation DeleteParentInfo(
  $input: DeleteParentInfoInput!
  $condition: ModelParentInfoConditionInput
) {
  deleteParentInfo(input: $input, condition: $condition) {
    id
    guardianFullName
    relation
    guardianCPR
    primaryMobile
    secondaryMobile
    fatherFullName
    fatherCPR
    motherFullName
    motherCPR
    numberOfFamilyMembers
    address
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteParentInfoMutationVariables,
  APITypes.DeleteParentInfoMutation
>;
export const createStudent = /* GraphQL */ `mutation CreateStudent(
  $input: CreateStudentInput!
  $condition: ModelStudentConditionInput
) {
  createStudent(input: $input, condition: $condition) {
    cpr
    cprDoc
    fullName
    email
    phone
    gender
    nationalityCategory
    nationality
    schoolName
    schoolType
    specialization
    placeOfBirth
    studentOrderAmongSiblings
    householdIncome
    familyIncome
    familyIncomeProofDoc
    familyIncomeProofDocs
    preferredLanguage
    graduationDate
    address
    applications {
      nextToken
      startedAt
      __typename
    }
    ParentInfo {
      id
      guardianFullName
      relation
      guardianCPR
      primaryMobile
      secondaryMobile
      fatherFullName
      fatherCPR
      motherFullName
      motherCPR
      numberOfFamilyMembers
      address
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    parentInfoID
    StudentLogs {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateStudentMutationVariables,
  APITypes.CreateStudentMutation
>;
export const updateStudent = /* GraphQL */ `mutation UpdateStudent(
  $input: UpdateStudentInput!
  $condition: ModelStudentConditionInput
) {
  updateStudent(input: $input, condition: $condition) {
    cpr
    cprDoc
    fullName
    email
    phone
    gender
    nationalityCategory
    nationality
    schoolName
    schoolType
    specialization
    placeOfBirth
    studentOrderAmongSiblings
    householdIncome
    familyIncome
    familyIncomeProofDoc
    familyIncomeProofDocs
    preferredLanguage
    graduationDate
    address
    applications {
      nextToken
      startedAt
      __typename
    }
    ParentInfo {
      id
      guardianFullName
      relation
      guardianCPR
      primaryMobile
      secondaryMobile
      fatherFullName
      fatherCPR
      motherFullName
      motherCPR
      numberOfFamilyMembers
      address
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    parentInfoID
    StudentLogs {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateStudentMutationVariables,
  APITypes.UpdateStudentMutation
>;
export const deleteStudent = /* GraphQL */ `mutation DeleteStudent(
  $input: DeleteStudentInput!
  $condition: ModelStudentConditionInput
) {
  deleteStudent(input: $input, condition: $condition) {
    cpr
    cprDoc
    fullName
    email
    phone
    gender
    nationalityCategory
    nationality
    schoolName
    schoolType
    specialization
    placeOfBirth
    studentOrderAmongSiblings
    householdIncome
    familyIncome
    familyIncomeProofDoc
    familyIncomeProofDocs
    preferredLanguage
    graduationDate
    address
    applications {
      nextToken
      startedAt
      __typename
    }
    ParentInfo {
      id
      guardianFullName
      relation
      guardianCPR
      primaryMobile
      secondaryMobile
      fatherFullName
      fatherCPR
      motherFullName
      motherCPR
      numberOfFamilyMembers
      address
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    parentInfoID
    StudentLogs {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteStudentMutationVariables,
  APITypes.DeleteStudentMutation
>;
export const createBatch = /* GraphQL */ `mutation CreateBatch(
  $input: CreateBatchInput!
  $condition: ModelBatchConditionInput
) {
  createBatch(input: $input, condition: $condition) {
    id
    batch
    createApplicationStartDate
    createApplicationEndDate
    updateApplicationEndDate
    signUpStartDate
    signUpEndDate
    applications {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateBatchMutationVariables,
  APITypes.CreateBatchMutation
>;
export const updateBatch = /* GraphQL */ `mutation UpdateBatch(
  $input: UpdateBatchInput!
  $condition: ModelBatchConditionInput
) {
  updateBatch(input: $input, condition: $condition) {
    id
    batch
    createApplicationStartDate
    createApplicationEndDate
    updateApplicationEndDate
    signUpStartDate
    signUpEndDate
    applications {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateBatchMutationVariables,
  APITypes.UpdateBatchMutation
>;
export const deleteBatch = /* GraphQL */ `mutation DeleteBatch(
  $input: DeleteBatchInput!
  $condition: ModelBatchConditionInput
) {
  deleteBatch(input: $input, condition: $condition) {
    id
    batch
    createApplicationStartDate
    createApplicationEndDate
    updateApplicationEndDate
    signUpStartDate
    signUpEndDate
    applications {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteBatchMutationVariables,
  APITypes.DeleteBatchMutation
>;
export const createScholarship = /* GraphQL */ `mutation CreateScholarship(
  $input: CreateScholarshipInput!
  $condition: ModelScholarshipConditionInput
) {
  createScholarship(input: $input, condition: $condition) {
    id
    amount
    status
    applicationID
    application {
      id
      gpa
      status
      attachmentID
      dateTime
      isEmailSent
      schoolName
      schoolType
      studentCPR
      batchID
      batch
      score
      adminPoints
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAttachmentId
      __typename
    }
    studentCPR
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateScholarshipMutationVariables,
  APITypes.CreateScholarshipMutation
>;
export const updateScholarship = /* GraphQL */ `mutation UpdateScholarship(
  $input: UpdateScholarshipInput!
  $condition: ModelScholarshipConditionInput
) {
  updateScholarship(input: $input, condition: $condition) {
    id
    amount
    status
    applicationID
    application {
      id
      gpa
      status
      attachmentID
      dateTime
      isEmailSent
      schoolName
      schoolType
      studentCPR
      batchID
      batch
      score
      adminPoints
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAttachmentId
      __typename
    }
    studentCPR
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateScholarshipMutationVariables,
  APITypes.UpdateScholarshipMutation
>;
export const deleteScholarship = /* GraphQL */ `mutation DeleteScholarship(
  $input: DeleteScholarshipInput!
  $condition: ModelScholarshipConditionInput
) {
  deleteScholarship(input: $input, condition: $condition) {
    id
    amount
    status
    applicationID
    application {
      id
      gpa
      status
      attachmentID
      dateTime
      isEmailSent
      schoolName
      schoolType
      studentCPR
      batchID
      batch
      score
      adminPoints
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAttachmentId
      __typename
    }
    studentCPR
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteScholarshipMutationVariables,
  APITypes.DeleteScholarshipMutation
>;
