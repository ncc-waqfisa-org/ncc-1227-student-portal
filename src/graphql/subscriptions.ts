/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateAttachment = /* GraphQL */ `subscription OnCreateAttachment(
  $filter: ModelSubscriptionAttachmentFilterInput
) {
  onCreateAttachment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAttachmentSubscriptionVariables,
  APITypes.OnCreateAttachmentSubscription
>;
export const onUpdateAttachment = /* GraphQL */ `subscription OnUpdateAttachment(
  $filter: ModelSubscriptionAttachmentFilterInput
) {
  onUpdateAttachment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAttachmentSubscriptionVariables,
  APITypes.OnUpdateAttachmentSubscription
>;
export const onDeleteAttachment = /* GraphQL */ `subscription OnDeleteAttachment(
  $filter: ModelSubscriptionAttachmentFilterInput
) {
  onDeleteAttachment(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAttachmentSubscriptionVariables,
  APITypes.OnDeleteAttachmentSubscription
>;
export const onCreateApplication = /* GraphQL */ `subscription OnCreateApplication(
  $filter: ModelSubscriptionApplicationFilterInput
) {
  onCreateApplication(filter: $filter) {
    id
    gpa
    verifiedGPA
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
    nationalityCategory
    familyIncome
    schoolName
    schoolType
    studentName
    programID
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
    universityID
    university {
      id
      name
      nameAr
      availability
      isDeactivated
      isExtended
      extensionDuration
      isException
      isTrashed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    studentCPR
    student {
      cpr
      cprDoc
      fullName
      batch
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
    batch
    score
    adminPoints
    processed
    isFamilyIncomeVerified
    reason
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    programApplicationId
    universityApplicationsId
    applicationAttachmentId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateApplicationSubscriptionVariables,
  APITypes.OnCreateApplicationSubscription
>;
export const onUpdateApplication = /* GraphQL */ `subscription OnUpdateApplication(
  $filter: ModelSubscriptionApplicationFilterInput
) {
  onUpdateApplication(filter: $filter) {
    id
    gpa
    verifiedGPA
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
    nationalityCategory
    familyIncome
    schoolName
    schoolType
    studentName
    programID
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
    universityID
    university {
      id
      name
      nameAr
      availability
      isDeactivated
      isExtended
      extensionDuration
      isException
      isTrashed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    studentCPR
    student {
      cpr
      cprDoc
      fullName
      batch
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
    batch
    score
    adminPoints
    processed
    isFamilyIncomeVerified
    reason
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    programApplicationId
    universityApplicationsId
    applicationAttachmentId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateApplicationSubscriptionVariables,
  APITypes.OnUpdateApplicationSubscription
>;
export const onDeleteApplication = /* GraphQL */ `subscription OnDeleteApplication(
  $filter: ModelSubscriptionApplicationFilterInput
) {
  onDeleteApplication(filter: $filter) {
    id
    gpa
    verifiedGPA
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
    nationalityCategory
    familyIncome
    schoolName
    schoolType
    studentName
    programID
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
    universityID
    university {
      id
      name
      nameAr
      availability
      isDeactivated
      isExtended
      extensionDuration
      isException
      isTrashed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    studentCPR
    student {
      cpr
      cprDoc
      fullName
      batch
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
    batch
    score
    adminPoints
    processed
    isFamilyIncomeVerified
    reason
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    programApplicationId
    universityApplicationsId
    applicationAttachmentId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteApplicationSubscriptionVariables,
  APITypes.OnDeleteApplicationSubscription
>;
export const onCreateProgramChoice = /* GraphQL */ `subscription OnCreateProgramChoice(
  $filter: ModelSubscriptionProgramChoiceFilterInput
) {
  onCreateProgramChoice(filter: $filter) {
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
      verifiedGPA
      status
      attachmentID
      dateTime
      isEmailSent
      nationalityCategory
      familyIncome
      schoolName
      schoolType
      studentName
      programID
      universityID
      studentCPR
      batch
      score
      adminPoints
      processed
      isFamilyIncomeVerified
      reason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      programApplicationId
      universityApplicationsId
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
` as GeneratedSubscription<
  APITypes.OnCreateProgramChoiceSubscriptionVariables,
  APITypes.OnCreateProgramChoiceSubscription
>;
export const onUpdateProgramChoice = /* GraphQL */ `subscription OnUpdateProgramChoice(
  $filter: ModelSubscriptionProgramChoiceFilterInput
) {
  onUpdateProgramChoice(filter: $filter) {
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
      verifiedGPA
      status
      attachmentID
      dateTime
      isEmailSent
      nationalityCategory
      familyIncome
      schoolName
      schoolType
      studentName
      programID
      universityID
      studentCPR
      batch
      score
      adminPoints
      processed
      isFamilyIncomeVerified
      reason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      programApplicationId
      universityApplicationsId
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
` as GeneratedSubscription<
  APITypes.OnUpdateProgramChoiceSubscriptionVariables,
  APITypes.OnUpdateProgramChoiceSubscription
>;
export const onDeleteProgramChoice = /* GraphQL */ `subscription OnDeleteProgramChoice(
  $filter: ModelSubscriptionProgramChoiceFilterInput
) {
  onDeleteProgramChoice(filter: $filter) {
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
      verifiedGPA
      status
      attachmentID
      dateTime
      isEmailSent
      nationalityCategory
      familyIncome
      schoolName
      schoolType
      studentName
      programID
      universityID
      studentCPR
      batch
      score
      adminPoints
      processed
      isFamilyIncomeVerified
      reason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      programApplicationId
      universityApplicationsId
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
` as GeneratedSubscription<
  APITypes.OnDeleteProgramChoiceSubscriptionVariables,
  APITypes.OnDeleteProgramChoiceSubscription
>;
export const onCreateProgram = /* GraphQL */ `subscription OnCreateProgram($filter: ModelSubscriptionProgramFilterInput) {
  onCreateProgram(filter: $filter) {
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
      extensionDuration
      isException
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
    application {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    universityProgramsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateProgramSubscriptionVariables,
  APITypes.OnCreateProgramSubscription
>;
export const onUpdateProgram = /* GraphQL */ `subscription OnUpdateProgram($filter: ModelSubscriptionProgramFilterInput) {
  onUpdateProgram(filter: $filter) {
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
      extensionDuration
      isException
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
    application {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    universityProgramsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateProgramSubscriptionVariables,
  APITypes.OnUpdateProgramSubscription
>;
export const onDeleteProgram = /* GraphQL */ `subscription OnDeleteProgram($filter: ModelSubscriptionProgramFilterInput) {
  onDeleteProgram(filter: $filter) {
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
      extensionDuration
      isException
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
    application {
      nextToken
      startedAt
      __typename
    }
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    universityProgramsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteProgramSubscriptionVariables,
  APITypes.OnDeleteProgramSubscription
>;
export const onCreateUniversity = /* GraphQL */ `subscription OnCreateUniversity(
  $filter: ModelSubscriptionUniversityFilterInput
) {
  onCreateUniversity(filter: $filter) {
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
    extensionDuration
    isException
    isTrashed
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
` as GeneratedSubscription<
  APITypes.OnCreateUniversitySubscriptionVariables,
  APITypes.OnCreateUniversitySubscription
>;
export const onUpdateUniversity = /* GraphQL */ `subscription OnUpdateUniversity(
  $filter: ModelSubscriptionUniversityFilterInput
) {
  onUpdateUniversity(filter: $filter) {
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
    extensionDuration
    isException
    isTrashed
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
` as GeneratedSubscription<
  APITypes.OnUpdateUniversitySubscriptionVariables,
  APITypes.OnUpdateUniversitySubscription
>;
export const onDeleteUniversity = /* GraphQL */ `subscription OnDeleteUniversity(
  $filter: ModelSubscriptionUniversityFilterInput
) {
  onDeleteUniversity(filter: $filter) {
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
    extensionDuration
    isException
    isTrashed
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
` as GeneratedSubscription<
  APITypes.OnDeleteUniversitySubscriptionVariables,
  APITypes.OnDeleteUniversitySubscription
>;
export const onCreateAdminLog = /* GraphQL */ `subscription OnCreateAdminLog($filter: ModelSubscriptionAdminLogFilterInput) {
  onCreateAdminLog(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAdminLogSubscriptionVariables,
  APITypes.OnCreateAdminLogSubscription
>;
export const onUpdateAdminLog = /* GraphQL */ `subscription OnUpdateAdminLog($filter: ModelSubscriptionAdminLogFilterInput) {
  onUpdateAdminLog(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAdminLogSubscriptionVariables,
  APITypes.OnUpdateAdminLogSubscription
>;
export const onDeleteAdminLog = /* GraphQL */ `subscription OnDeleteAdminLog($filter: ModelSubscriptionAdminLogFilterInput) {
  onDeleteAdminLog(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAdminLogSubscriptionVariables,
  APITypes.OnDeleteAdminLogSubscription
>;
export const onCreateStudentLog = /* GraphQL */ `subscription OnCreateStudentLog(
  $filter: ModelSubscriptionStudentLogFilterInput
) {
  onCreateStudentLog(filter: $filter) {
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
      batch
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
` as GeneratedSubscription<
  APITypes.OnCreateStudentLogSubscriptionVariables,
  APITypes.OnCreateStudentLogSubscription
>;
export const onUpdateStudentLog = /* GraphQL */ `subscription OnUpdateStudentLog(
  $filter: ModelSubscriptionStudentLogFilterInput
) {
  onUpdateStudentLog(filter: $filter) {
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
      batch
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
` as GeneratedSubscription<
  APITypes.OnUpdateStudentLogSubscriptionVariables,
  APITypes.OnUpdateStudentLogSubscription
>;
export const onDeleteStudentLog = /* GraphQL */ `subscription OnDeleteStudentLog(
  $filter: ModelSubscriptionStudentLogFilterInput
) {
  onDeleteStudentLog(filter: $filter) {
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
      batch
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
` as GeneratedSubscription<
  APITypes.OnDeleteStudentLogSubscriptionVariables,
  APITypes.OnDeleteStudentLogSubscription
>;
export const onCreateAdmin = /* GraphQL */ `subscription OnCreateAdmin($filter: ModelSubscriptionAdminFilterInput) {
  onCreateAdmin(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateAdminSubscriptionVariables,
  APITypes.OnCreateAdminSubscription
>;
export const onUpdateAdmin = /* GraphQL */ `subscription OnUpdateAdmin($filter: ModelSubscriptionAdminFilterInput) {
  onUpdateAdmin(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateAdminSubscriptionVariables,
  APITypes.OnUpdateAdminSubscription
>;
export const onDeleteAdmin = /* GraphQL */ `subscription OnDeleteAdmin($filter: ModelSubscriptionAdminFilterInput) {
  onDeleteAdmin(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteAdminSubscriptionVariables,
  APITypes.OnDeleteAdminSubscription
>;
export const onCreateParentInfo = /* GraphQL */ `subscription OnCreateParentInfo(
  $filter: ModelSubscriptionParentInfoFilterInput
) {
  onCreateParentInfo(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateParentInfoSubscriptionVariables,
  APITypes.OnCreateParentInfoSubscription
>;
export const onUpdateParentInfo = /* GraphQL */ `subscription OnUpdateParentInfo(
  $filter: ModelSubscriptionParentInfoFilterInput
) {
  onUpdateParentInfo(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateParentInfoSubscriptionVariables,
  APITypes.OnUpdateParentInfoSubscription
>;
export const onDeleteParentInfo = /* GraphQL */ `subscription OnDeleteParentInfo(
  $filter: ModelSubscriptionParentInfoFilterInput
) {
  onDeleteParentInfo(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteParentInfoSubscriptionVariables,
  APITypes.OnDeleteParentInfoSubscription
>;
export const onCreateStudent = /* GraphQL */ `subscription OnCreateStudent($filter: ModelSubscriptionStudentFilterInput) {
  onCreateStudent(filter: $filter) {
    cpr
    cprDoc
    fullName
    batch
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
` as GeneratedSubscription<
  APITypes.OnCreateStudentSubscriptionVariables,
  APITypes.OnCreateStudentSubscription
>;
export const onUpdateStudent = /* GraphQL */ `subscription OnUpdateStudent($filter: ModelSubscriptionStudentFilterInput) {
  onUpdateStudent(filter: $filter) {
    cpr
    cprDoc
    fullName
    batch
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
` as GeneratedSubscription<
  APITypes.OnUpdateStudentSubscriptionVariables,
  APITypes.OnUpdateStudentSubscription
>;
export const onDeleteStudent = /* GraphQL */ `subscription OnDeleteStudent($filter: ModelSubscriptionStudentFilterInput) {
  onDeleteStudent(filter: $filter) {
    cpr
    cprDoc
    fullName
    batch
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
` as GeneratedSubscription<
  APITypes.OnDeleteStudentSubscriptionVariables,
  APITypes.OnDeleteStudentSubscription
>;
export const onCreateBatch = /* GraphQL */ `subscription OnCreateBatch($filter: ModelSubscriptionBatchFilterInput) {
  onCreateBatch(filter: $filter) {
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
}
` as GeneratedSubscription<
  APITypes.OnCreateBatchSubscriptionVariables,
  APITypes.OnCreateBatchSubscription
>;
export const onUpdateBatch = /* GraphQL */ `subscription OnUpdateBatch($filter: ModelSubscriptionBatchFilterInput) {
  onUpdateBatch(filter: $filter) {
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
}
` as GeneratedSubscription<
  APITypes.OnUpdateBatchSubscriptionVariables,
  APITypes.OnUpdateBatchSubscription
>;
export const onDeleteBatch = /* GraphQL */ `subscription OnDeleteBatch($filter: ModelSubscriptionBatchFilterInput) {
  onDeleteBatch(filter: $filter) {
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
}
` as GeneratedSubscription<
  APITypes.OnDeleteBatchSubscriptionVariables,
  APITypes.OnDeleteBatchSubscription
>;
export const onCreateScholarship = /* GraphQL */ `subscription OnCreateScholarship(
  $filter: ModelSubscriptionScholarshipFilterInput
) {
  onCreateScholarship(filter: $filter) {
    id
    status
    applicationID
    batch
    isConfirmed
    application {
      id
      gpa
      verifiedGPA
      status
      attachmentID
      dateTime
      isEmailSent
      nationalityCategory
      familyIncome
      schoolName
      schoolType
      studentName
      programID
      universityID
      studentCPR
      batch
      score
      adminPoints
      processed
      isFamilyIncomeVerified
      reason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      programApplicationId
      universityApplicationsId
      applicationAttachmentId
      __typename
    }
    studentCPR
    unsignedContractDoc
    signedContractDoc
    studentSignature
    guardianSignature
    bankName
    IBAN
    IBANLetterDoc
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateScholarshipSubscriptionVariables,
  APITypes.OnCreateScholarshipSubscription
>;
export const onUpdateScholarship = /* GraphQL */ `subscription OnUpdateScholarship(
  $filter: ModelSubscriptionScholarshipFilterInput
) {
  onUpdateScholarship(filter: $filter) {
    id
    status
    applicationID
    batch
    isConfirmed
    application {
      id
      gpa
      verifiedGPA
      status
      attachmentID
      dateTime
      isEmailSent
      nationalityCategory
      familyIncome
      schoolName
      schoolType
      studentName
      programID
      universityID
      studentCPR
      batch
      score
      adminPoints
      processed
      isFamilyIncomeVerified
      reason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      programApplicationId
      universityApplicationsId
      applicationAttachmentId
      __typename
    }
    studentCPR
    unsignedContractDoc
    signedContractDoc
    studentSignature
    guardianSignature
    bankName
    IBAN
    IBANLetterDoc
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateScholarshipSubscriptionVariables,
  APITypes.OnUpdateScholarshipSubscription
>;
export const onDeleteScholarship = /* GraphQL */ `subscription OnDeleteScholarship(
  $filter: ModelSubscriptionScholarshipFilterInput
) {
  onDeleteScholarship(filter: $filter) {
    id
    status
    applicationID
    batch
    isConfirmed
    application {
      id
      gpa
      verifiedGPA
      status
      attachmentID
      dateTime
      isEmailSent
      nationalityCategory
      familyIncome
      schoolName
      schoolType
      studentName
      programID
      universityID
      studentCPR
      batch
      score
      adminPoints
      processed
      isFamilyIncomeVerified
      reason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      programApplicationId
      universityApplicationsId
      applicationAttachmentId
      __typename
    }
    studentCPR
    unsignedContractDoc
    signedContractDoc
    studentSignature
    guardianSignature
    bankName
    IBAN
    IBANLetterDoc
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteScholarshipSubscriptionVariables,
  APITypes.OnDeleteScholarshipSubscription
>;
export const onCreateStatistics = /* GraphQL */ `subscription OnCreateStatistics(
  $filter: ModelSubscriptionStatisticsFilterInput
) {
  onCreateStatistics(filter: $filter) {
    id
    batch
    totalApplications
    totalApplicationsPerStatus
    scoreHistogram
    gpaHistogram
    totalApplicationsPerUniversity
    topUniversities
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateStatisticsSubscriptionVariables,
  APITypes.OnCreateStatisticsSubscription
>;
export const onUpdateStatistics = /* GraphQL */ `subscription OnUpdateStatistics(
  $filter: ModelSubscriptionStatisticsFilterInput
) {
  onUpdateStatistics(filter: $filter) {
    id
    batch
    totalApplications
    totalApplicationsPerStatus
    scoreHistogram
    gpaHistogram
    totalApplicationsPerUniversity
    topUniversities
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateStatisticsSubscriptionVariables,
  APITypes.OnUpdateStatisticsSubscription
>;
export const onDeleteStatistics = /* GraphQL */ `subscription OnDeleteStatistics(
  $filter: ModelSubscriptionStatisticsFilterInput
) {
  onDeleteStatistics(filter: $filter) {
    id
    batch
    totalApplications
    totalApplicationsPerStatus
    scoreHistogram
    gpaHistogram
    totalApplicationsPerUniversity
    topUniversities
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteStatisticsSubscriptionVariables,
  APITypes.OnDeleteStatisticsSubscription
>;
