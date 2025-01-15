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
      m_firstName
      m_secondName
      m_lastName
      m_numberOfFamilyMembers
      m_graduationYear
      m_universityID
      m_oldProgram
      m_applicantType
      m_isEmployed
      m_placeOfEmployment
      m_income
      m_incomeDoc
      m_guardianCPR
      m_guardianFullName
      m_guardianCPRDoc
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
      m_firstName
      m_secondName
      m_lastName
      m_numberOfFamilyMembers
      m_graduationYear
      m_universityID
      m_oldProgram
      m_applicantType
      m_isEmployed
      m_placeOfEmployment
      m_income
      m_incomeDoc
      m_guardianCPR
      m_guardianFullName
      m_guardianCPRDoc
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
      m_firstName
      m_secondName
      m_lastName
      m_numberOfFamilyMembers
      m_graduationYear
      m_universityID
      m_oldProgram
      m_applicantType
      m_isEmployed
      m_placeOfEmployment
      m_income
      m_incomeDoc
      m_guardianCPR
      m_guardianFullName
      m_guardianCPRDoc
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
      isDeactivated
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
    masterApplicationAdminLogsId
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
      isDeactivated
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
    masterApplicationAdminLogsId
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
      isDeactivated
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
    masterApplicationAdminLogsId
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
      m_firstName
      m_secondName
      m_lastName
      m_numberOfFamilyMembers
      m_graduationYear
      m_universityID
      m_oldProgram
      m_applicantType
      m_isEmployed
      m_placeOfEmployment
      m_income
      m_incomeDoc
      m_guardianCPR
      m_guardianFullName
      m_guardianCPRDoc
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
      m_firstName
      m_secondName
      m_lastName
      m_numberOfFamilyMembers
      m_graduationYear
      m_universityID
      m_oldProgram
      m_applicantType
      m_isEmployed
      m_placeOfEmployment
      m_income
      m_incomeDoc
      m_guardianCPR
      m_guardianFullName
      m_guardianCPRDoc
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
      m_firstName
      m_secondName
      m_lastName
      m_numberOfFamilyMembers
      m_graduationYear
      m_universityID
      m_oldProgram
      m_applicantType
      m_isEmployed
      m_placeOfEmployment
      m_income
      m_incomeDoc
      m_guardianCPR
      m_guardianFullName
      m_guardianCPRDoc
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
    isDeactivated
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
    isDeactivated
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
    isDeactivated
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
    m_MasterLogs {
      nextToken
      startedAt
      __typename
    }
    m_firstName
    m_secondName
    m_lastName
    m_numberOfFamilyMembers
    m_graduationYear
    m_university {
      id
      universityName
      universityNameAr
      isDeactivated
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    m_universityID
    m_oldProgram
    m_applicantType
    m_isEmployed
    m_placeOfEmployment
    m_income
    m_incomeDoc
    m_guardianCPR
    m_guardianFullName
    m_guardianCPRDoc
    m_masterApplications {
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
    m_MasterLogs {
      nextToken
      startedAt
      __typename
    }
    m_firstName
    m_secondName
    m_lastName
    m_numberOfFamilyMembers
    m_graduationYear
    m_university {
      id
      universityName
      universityNameAr
      isDeactivated
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    m_universityID
    m_oldProgram
    m_applicantType
    m_isEmployed
    m_placeOfEmployment
    m_income
    m_incomeDoc
    m_guardianCPR
    m_guardianFullName
    m_guardianCPRDoc
    m_masterApplications {
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
    m_MasterLogs {
      nextToken
      startedAt
      __typename
    }
    m_firstName
    m_secondName
    m_lastName
    m_numberOfFamilyMembers
    m_graduationYear
    m_university {
      id
      universityName
      universityNameAr
      isDeactivated
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    m_universityID
    m_oldProgram
    m_applicantType
    m_isEmployed
    m_placeOfEmployment
    m_income
    m_incomeDoc
    m_guardianCPR
    m_guardianFullName
    m_guardianCPRDoc
    m_masterApplications {
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
    topPrograms
    familyIncome
    schoolType
    students
    applications
    today
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
    topPrograms
    familyIncome
    schoolType
    students
    applications
    today
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
    topPrograms
    familyIncome
    schoolType
    students
    applications
    today
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
export const onCreateMasterBatch = /* GraphQL */ `subscription OnCreateMasterBatch(
  $filter: ModelSubscriptionMasterBatchFilterInput
) {
  onCreateMasterBatch(filter: $filter) {
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
  APITypes.OnCreateMasterBatchSubscriptionVariables,
  APITypes.OnCreateMasterBatchSubscription
>;
export const onUpdateMasterBatch = /* GraphQL */ `subscription OnUpdateMasterBatch(
  $filter: ModelSubscriptionMasterBatchFilterInput
) {
  onUpdateMasterBatch(filter: $filter) {
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
  APITypes.OnUpdateMasterBatchSubscriptionVariables,
  APITypes.OnUpdateMasterBatchSubscription
>;
export const onDeleteMasterBatch = /* GraphQL */ `subscription OnDeleteMasterBatch(
  $filter: ModelSubscriptionMasterBatchFilterInput
) {
  onDeleteMasterBatch(filter: $filter) {
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
  APITypes.OnDeleteMasterBatchSubscriptionVariables,
  APITypes.OnDeleteMasterBatchSubscription
>;
export const onCreateMasterLog = /* GraphQL */ `subscription OnCreateMasterLog($filter: ModelSubscriptionMasterLogFilterInput) {
  onCreateMasterLog(filter: $filter) {
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
      m_firstName
      m_secondName
      m_lastName
      m_numberOfFamilyMembers
      m_graduationYear
      m_universityID
      m_oldProgram
      m_applicantType
      m_isEmployed
      m_placeOfEmployment
      m_income
      m_incomeDoc
      m_guardianCPR
      m_guardianFullName
      m_guardianCPRDoc
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
    studentM_MasterLogsCpr
    masterApplicationMasterLogsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMasterLogSubscriptionVariables,
  APITypes.OnCreateMasterLogSubscription
>;
export const onUpdateMasterLog = /* GraphQL */ `subscription OnUpdateMasterLog($filter: ModelSubscriptionMasterLogFilterInput) {
  onUpdateMasterLog(filter: $filter) {
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
      m_firstName
      m_secondName
      m_lastName
      m_numberOfFamilyMembers
      m_graduationYear
      m_universityID
      m_oldProgram
      m_applicantType
      m_isEmployed
      m_placeOfEmployment
      m_income
      m_incomeDoc
      m_guardianCPR
      m_guardianFullName
      m_guardianCPRDoc
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
    studentM_MasterLogsCpr
    masterApplicationMasterLogsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMasterLogSubscriptionVariables,
  APITypes.OnUpdateMasterLogSubscription
>;
export const onDeleteMasterLog = /* GraphQL */ `subscription OnDeleteMasterLog($filter: ModelSubscriptionMasterLogFilterInput) {
  onDeleteMasterLog(filter: $filter) {
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
      m_firstName
      m_secondName
      m_lastName
      m_numberOfFamilyMembers
      m_graduationYear
      m_universityID
      m_oldProgram
      m_applicantType
      m_isEmployed
      m_placeOfEmployment
      m_income
      m_incomeDoc
      m_guardianCPR
      m_guardianFullName
      m_guardianCPRDoc
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
    studentM_MasterLogsCpr
    masterApplicationMasterLogsId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMasterLogSubscriptionVariables,
  APITypes.OnDeleteMasterLogSubscription
>;
export const onCreateBahrainUniversities = /* GraphQL */ `subscription OnCreateBahrainUniversities(
  $filter: ModelSubscriptionBahrainUniversitiesFilterInput
) {
  onCreateBahrainUniversities(filter: $filter) {
    id
    universityName
    universityNameAr
    isDeactivated
    students {
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
  APITypes.OnCreateBahrainUniversitiesSubscriptionVariables,
  APITypes.OnCreateBahrainUniversitiesSubscription
>;
export const onUpdateBahrainUniversities = /* GraphQL */ `subscription OnUpdateBahrainUniversities(
  $filter: ModelSubscriptionBahrainUniversitiesFilterInput
) {
  onUpdateBahrainUniversities(filter: $filter) {
    id
    universityName
    universityNameAr
    isDeactivated
    students {
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
  APITypes.OnUpdateBahrainUniversitiesSubscriptionVariables,
  APITypes.OnUpdateBahrainUniversitiesSubscription
>;
export const onDeleteBahrainUniversities = /* GraphQL */ `subscription OnDeleteBahrainUniversities(
  $filter: ModelSubscriptionBahrainUniversitiesFilterInput
) {
  onDeleteBahrainUniversities(filter: $filter) {
    id
    universityName
    universityNameAr
    isDeactivated
    students {
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
  APITypes.OnDeleteBahrainUniversitiesSubscriptionVariables,
  APITypes.OnDeleteBahrainUniversitiesSubscription
>;
export const onCreateMasterApplication = /* GraphQL */ `subscription OnCreateMasterApplication(
  $filter: ModelSubscriptionMasterApplicationFilterInput
) {
  onCreateMasterApplication(filter: $filter) {
    id
    gpa
    verifiedGPA
    status
    adminLogs {
      nextToken
      startedAt
      __typename
    }
    masterLogs {
      nextToken
      startedAt
      __typename
    }
    attachment {
      id
      cprDoc
      signedContractDoc
      transcriptDoc
      universityCertificate
      toeflIELTSCertificate
      acceptanceLetterDoc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    program
    dateTime
    isEmailSent
    nationalityCategory
    universityID
    university {
      id
      universityName
      universityNameAr
      isDeactivated
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    studentCPR
    studentName
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
      m_firstName
      m_secondName
      m_lastName
      m_numberOfFamilyMembers
      m_graduationYear
      m_universityID
      m_oldProgram
      m_applicantType
      m_isEmployed
      m_placeOfEmployment
      m_income
      m_incomeDoc
      m_guardianCPR
      m_guardianFullName
      m_guardianCPRDoc
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
    isIncomeVerified
    major
    reason
    income
    incomeDoc
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    masterApplicationAttachmentId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMasterApplicationSubscriptionVariables,
  APITypes.OnCreateMasterApplicationSubscription
>;
export const onUpdateMasterApplication = /* GraphQL */ `subscription OnUpdateMasterApplication(
  $filter: ModelSubscriptionMasterApplicationFilterInput
) {
  onUpdateMasterApplication(filter: $filter) {
    id
    gpa
    verifiedGPA
    status
    adminLogs {
      nextToken
      startedAt
      __typename
    }
    masterLogs {
      nextToken
      startedAt
      __typename
    }
    attachment {
      id
      cprDoc
      signedContractDoc
      transcriptDoc
      universityCertificate
      toeflIELTSCertificate
      acceptanceLetterDoc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    program
    dateTime
    isEmailSent
    nationalityCategory
    universityID
    university {
      id
      universityName
      universityNameAr
      isDeactivated
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    studentCPR
    studentName
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
      m_firstName
      m_secondName
      m_lastName
      m_numberOfFamilyMembers
      m_graduationYear
      m_universityID
      m_oldProgram
      m_applicantType
      m_isEmployed
      m_placeOfEmployment
      m_income
      m_incomeDoc
      m_guardianCPR
      m_guardianFullName
      m_guardianCPRDoc
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
    isIncomeVerified
    major
    reason
    income
    incomeDoc
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    masterApplicationAttachmentId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMasterApplicationSubscriptionVariables,
  APITypes.OnUpdateMasterApplicationSubscription
>;
export const onDeleteMasterApplication = /* GraphQL */ `subscription OnDeleteMasterApplication(
  $filter: ModelSubscriptionMasterApplicationFilterInput
) {
  onDeleteMasterApplication(filter: $filter) {
    id
    gpa
    verifiedGPA
    status
    adminLogs {
      nextToken
      startedAt
      __typename
    }
    masterLogs {
      nextToken
      startedAt
      __typename
    }
    attachment {
      id
      cprDoc
      signedContractDoc
      transcriptDoc
      universityCertificate
      toeflIELTSCertificate
      acceptanceLetterDoc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    program
    dateTime
    isEmailSent
    nationalityCategory
    universityID
    university {
      id
      universityName
      universityNameAr
      isDeactivated
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
    studentCPR
    studentName
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
      m_firstName
      m_secondName
      m_lastName
      m_numberOfFamilyMembers
      m_graduationYear
      m_universityID
      m_oldProgram
      m_applicantType
      m_isEmployed
      m_placeOfEmployment
      m_income
      m_incomeDoc
      m_guardianCPR
      m_guardianFullName
      m_guardianCPRDoc
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
    isIncomeVerified
    major
    reason
    income
    incomeDoc
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    masterApplicationAttachmentId
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMasterApplicationSubscriptionVariables,
  APITypes.OnDeleteMasterApplicationSubscription
>;
export const onCreateMasterStatistics = /* GraphQL */ `subscription OnCreateMasterStatistics(
  $filter: ModelSubscriptionMasterStatisticsFilterInput
) {
  onCreateMasterStatistics(filter: $filter) {
    id
    batch
    totalApplications
    totalApplicationsPerStatus
    scoreHistogram
    gpaHistogram
    totalApplicationsPerUniversity
    topUniversities
    topPrograms
    familyIncome
    schoolType
    students
    applications
    today
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMasterStatisticsSubscriptionVariables,
  APITypes.OnCreateMasterStatisticsSubscription
>;
export const onUpdateMasterStatistics = /* GraphQL */ `subscription OnUpdateMasterStatistics(
  $filter: ModelSubscriptionMasterStatisticsFilterInput
) {
  onUpdateMasterStatistics(filter: $filter) {
    id
    batch
    totalApplications
    totalApplicationsPerStatus
    scoreHistogram
    gpaHistogram
    totalApplicationsPerUniversity
    topUniversities
    topPrograms
    familyIncome
    schoolType
    students
    applications
    today
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMasterStatisticsSubscriptionVariables,
  APITypes.OnUpdateMasterStatisticsSubscription
>;
export const onDeleteMasterStatistics = /* GraphQL */ `subscription OnDeleteMasterStatistics(
  $filter: ModelSubscriptionMasterStatisticsFilterInput
) {
  onDeleteMasterStatistics(filter: $filter) {
    id
    batch
    totalApplications
    totalApplicationsPerStatus
    scoreHistogram
    gpaHistogram
    totalApplicationsPerUniversity
    topUniversities
    topPrograms
    familyIncome
    schoolType
    students
    applications
    today
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMasterStatisticsSubscriptionVariables,
  APITypes.OnDeleteMasterStatisticsSubscription
>;
export const onCreateMasterAttachment = /* GraphQL */ `subscription OnCreateMasterAttachment(
  $filter: ModelSubscriptionMasterAttachmentFilterInput
) {
  onCreateMasterAttachment(filter: $filter) {
    id
    cprDoc
    signedContractDoc
    transcriptDoc
    universityCertificate
    toeflIELTSCertificate
    acceptanceLetterDoc
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateMasterAttachmentSubscriptionVariables,
  APITypes.OnCreateMasterAttachmentSubscription
>;
export const onUpdateMasterAttachment = /* GraphQL */ `subscription OnUpdateMasterAttachment(
  $filter: ModelSubscriptionMasterAttachmentFilterInput
) {
  onUpdateMasterAttachment(filter: $filter) {
    id
    cprDoc
    signedContractDoc
    transcriptDoc
    universityCertificate
    toeflIELTSCertificate
    acceptanceLetterDoc
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateMasterAttachmentSubscriptionVariables,
  APITypes.OnUpdateMasterAttachmentSubscription
>;
export const onDeleteMasterAttachment = /* GraphQL */ `subscription OnDeleteMasterAttachment(
  $filter: ModelSubscriptionMasterAttachmentFilterInput
) {
  onDeleteMasterAttachment(filter: $filter) {
    id
    cprDoc
    signedContractDoc
    transcriptDoc
    universityCertificate
    toeflIELTSCertificate
    acceptanceLetterDoc
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteMasterAttachmentSubscriptionVariables,
  APITypes.OnDeleteMasterAttachmentSubscription
>;
export const onCreateMasterAppliedUniversities = /* GraphQL */ `subscription OnCreateMasterAppliedUniversities(
  $filter: ModelSubscriptionMasterAppliedUniversitiesFilterInput
) {
  onCreateMasterAppliedUniversities(filter: $filter) {
    id
    universityName
    universityNameAr
    isDeactivated
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
  APITypes.OnCreateMasterAppliedUniversitiesSubscriptionVariables,
  APITypes.OnCreateMasterAppliedUniversitiesSubscription
>;
export const onUpdateMasterAppliedUniversities = /* GraphQL */ `subscription OnUpdateMasterAppliedUniversities(
  $filter: ModelSubscriptionMasterAppliedUniversitiesFilterInput
) {
  onUpdateMasterAppliedUniversities(filter: $filter) {
    id
    universityName
    universityNameAr
    isDeactivated
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
  APITypes.OnUpdateMasterAppliedUniversitiesSubscriptionVariables,
  APITypes.OnUpdateMasterAppliedUniversitiesSubscription
>;
export const onDeleteMasterAppliedUniversities = /* GraphQL */ `subscription OnDeleteMasterAppliedUniversities(
  $filter: ModelSubscriptionMasterAppliedUniversitiesFilterInput
) {
  onDeleteMasterAppliedUniversities(filter: $filter) {
    id
    universityName
    universityNameAr
    isDeactivated
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
  APITypes.OnDeleteMasterAppliedUniversitiesSubscriptionVariables,
  APITypes.OnDeleteMasterAppliedUniversitiesSubscription
>;
export const onCreateMasterScholarship = /* GraphQL */ `subscription OnCreateMasterScholarship(
  $filter: ModelSubscriptionMasterScholarshipFilterInput
) {
  onCreateMasterScholarship(filter: $filter) {
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
      program
      dateTime
      isEmailSent
      nationalityCategory
      universityID
      studentCPR
      studentName
      batch
      score
      adminPoints
      processed
      isIncomeVerified
      major
      reason
      income
      incomeDoc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      masterApplicationAttachmentId
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
  APITypes.OnCreateMasterScholarshipSubscriptionVariables,
  APITypes.OnCreateMasterScholarshipSubscription
>;
export const onUpdateMasterScholarship = /* GraphQL */ `subscription OnUpdateMasterScholarship(
  $filter: ModelSubscriptionMasterScholarshipFilterInput
) {
  onUpdateMasterScholarship(filter: $filter) {
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
      program
      dateTime
      isEmailSent
      nationalityCategory
      universityID
      studentCPR
      studentName
      batch
      score
      adminPoints
      processed
      isIncomeVerified
      major
      reason
      income
      incomeDoc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      masterApplicationAttachmentId
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
  APITypes.OnUpdateMasterScholarshipSubscriptionVariables,
  APITypes.OnUpdateMasterScholarshipSubscription
>;
export const onDeleteMasterScholarship = /* GraphQL */ `subscription OnDeleteMasterScholarship(
  $filter: ModelSubscriptionMasterScholarshipFilterInput
) {
  onDeleteMasterScholarship(filter: $filter) {
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
      program
      dateTime
      isEmailSent
      nationalityCategory
      universityID
      studentCPR
      studentName
      batch
      score
      adminPoints
      processed
      isIncomeVerified
      major
      reason
      income
      incomeDoc
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      masterApplicationAttachmentId
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
  APITypes.OnDeleteMasterScholarshipSubscriptionVariables,
  APITypes.OnDeleteMasterScholarshipSubscription
>;
