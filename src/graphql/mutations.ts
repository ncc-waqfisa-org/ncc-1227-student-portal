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
      m_isEmployeed
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
      m_isEmployeed
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
      m_isEmployeed
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
      m_isEmployeed
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
      m_isEmployeed
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
      m_isEmployeed
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
    isDeactivated
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
    isDeactivated
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
    isDeactivated
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
    m_isEmployeed
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
    m_isEmployeed
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
    m_isEmployeed
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
` as GeneratedMutation<
  APITypes.DeleteStudentMutationVariables,
  APITypes.DeleteStudentMutation
>;
export const createBatch = /* GraphQL */ `mutation CreateBatch(
  $input: CreateBatchInput!
  $condition: ModelBatchConditionInput
) {
  createBatch(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateBatchMutationVariables,
  APITypes.CreateBatchMutation
>;
export const updateBatch = /* GraphQL */ `mutation UpdateBatch(
  $input: UpdateBatchInput!
  $condition: ModelBatchConditionInput
) {
  updateBatch(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateBatchMutationVariables,
  APITypes.UpdateBatchMutation
>;
export const deleteBatch = /* GraphQL */ `mutation DeleteBatch(
  $input: DeleteBatchInput!
  $condition: ModelBatchConditionInput
) {
  deleteBatch(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteScholarshipMutationVariables,
  APITypes.DeleteScholarshipMutation
>;
export const createStatistics = /* GraphQL */ `mutation CreateStatistics(
  $input: CreateStatisticsInput!
  $condition: ModelStatisticsConditionInput
) {
  createStatistics(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateStatisticsMutationVariables,
  APITypes.CreateStatisticsMutation
>;
export const updateStatistics = /* GraphQL */ `mutation UpdateStatistics(
  $input: UpdateStatisticsInput!
  $condition: ModelStatisticsConditionInput
) {
  updateStatistics(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateStatisticsMutationVariables,
  APITypes.UpdateStatisticsMutation
>;
export const deleteStatistics = /* GraphQL */ `mutation DeleteStatistics(
  $input: DeleteStatisticsInput!
  $condition: ModelStatisticsConditionInput
) {
  deleteStatistics(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteStatisticsMutationVariables,
  APITypes.DeleteStatisticsMutation
>;
export const createMasterBatch = /* GraphQL */ `mutation CreateMasterBatch(
  $input: CreateMasterBatchInput!
  $condition: ModelMasterBatchConditionInput
) {
  createMasterBatch(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMasterBatchMutationVariables,
  APITypes.CreateMasterBatchMutation
>;
export const updateMasterBatch = /* GraphQL */ `mutation UpdateMasterBatch(
  $input: UpdateMasterBatchInput!
  $condition: ModelMasterBatchConditionInput
) {
  updateMasterBatch(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMasterBatchMutationVariables,
  APITypes.UpdateMasterBatchMutation
>;
export const deleteMasterBatch = /* GraphQL */ `mutation DeleteMasterBatch(
  $input: DeleteMasterBatchInput!
  $condition: ModelMasterBatchConditionInput
) {
  deleteMasterBatch(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMasterBatchMutationVariables,
  APITypes.DeleteMasterBatchMutation
>;
export const createMasterLog = /* GraphQL */ `mutation CreateMasterLog(
  $input: CreateMasterLogInput!
  $condition: ModelMasterLogConditionInput
) {
  createMasterLog(input: $input, condition: $condition) {
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
      m_isEmployeed
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
` as GeneratedMutation<
  APITypes.CreateMasterLogMutationVariables,
  APITypes.CreateMasterLogMutation
>;
export const updateMasterLog = /* GraphQL */ `mutation UpdateMasterLog(
  $input: UpdateMasterLogInput!
  $condition: ModelMasterLogConditionInput
) {
  updateMasterLog(input: $input, condition: $condition) {
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
      m_isEmployeed
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
` as GeneratedMutation<
  APITypes.UpdateMasterLogMutationVariables,
  APITypes.UpdateMasterLogMutation
>;
export const deleteMasterLog = /* GraphQL */ `mutation DeleteMasterLog(
  $input: DeleteMasterLogInput!
  $condition: ModelMasterLogConditionInput
) {
  deleteMasterLog(input: $input, condition: $condition) {
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
      m_isEmployeed
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
` as GeneratedMutation<
  APITypes.DeleteMasterLogMutationVariables,
  APITypes.DeleteMasterLogMutation
>;
export const createBahrainUniversities = /* GraphQL */ `mutation CreateBahrainUniversities(
  $input: CreateBahrainUniversitiesInput!
  $condition: ModelBahrainUniversitiesConditionInput
) {
  createBahrainUniversities(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateBahrainUniversitiesMutationVariables,
  APITypes.CreateBahrainUniversitiesMutation
>;
export const updateBahrainUniversities = /* GraphQL */ `mutation UpdateBahrainUniversities(
  $input: UpdateBahrainUniversitiesInput!
  $condition: ModelBahrainUniversitiesConditionInput
) {
  updateBahrainUniversities(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateBahrainUniversitiesMutationVariables,
  APITypes.UpdateBahrainUniversitiesMutation
>;
export const deleteBahrainUniversities = /* GraphQL */ `mutation DeleteBahrainUniversities(
  $input: DeleteBahrainUniversitiesInput!
  $condition: ModelBahrainUniversitiesConditionInput
) {
  deleteBahrainUniversities(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteBahrainUniversitiesMutationVariables,
  APITypes.DeleteBahrainUniversitiesMutation
>;
export const createMasterUniversities = /* GraphQL */ `mutation CreateMasterUniversities(
  $input: CreateMasterUniversitiesInput!
  $condition: ModelMasterUniversitiesConditionInput
) {
  createMasterUniversities(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMasterUniversitiesMutationVariables,
  APITypes.CreateMasterUniversitiesMutation
>;
export const updateMasterUniversities = /* GraphQL */ `mutation UpdateMasterUniversities(
  $input: UpdateMasterUniversitiesInput!
  $condition: ModelMasterUniversitiesConditionInput
) {
  updateMasterUniversities(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMasterUniversitiesMutationVariables,
  APITypes.UpdateMasterUniversitiesMutation
>;
export const deleteMasterUniversities = /* GraphQL */ `mutation DeleteMasterUniversities(
  $input: DeleteMasterUniversitiesInput!
  $condition: ModelMasterUniversitiesConditionInput
) {
  deleteMasterUniversities(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMasterUniversitiesMutationVariables,
  APITypes.DeleteMasterUniversitiesMutation
>;
export const createMasterApplication = /* GraphQL */ `mutation CreateMasterApplication(
  $input: CreateMasterApplicationInput!
  $condition: ModelMasterApplicationConditionInput
) {
  createMasterApplication(input: $input, condition: $condition) {
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
      tofelILETSCertificate
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
      m_isEmployeed
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
` as GeneratedMutation<
  APITypes.CreateMasterApplicationMutationVariables,
  APITypes.CreateMasterApplicationMutation
>;
export const updateMasterApplication = /* GraphQL */ `mutation UpdateMasterApplication(
  $input: UpdateMasterApplicationInput!
  $condition: ModelMasterApplicationConditionInput
) {
  updateMasterApplication(input: $input, condition: $condition) {
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
      tofelILETSCertificate
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
      m_isEmployeed
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
` as GeneratedMutation<
  APITypes.UpdateMasterApplicationMutationVariables,
  APITypes.UpdateMasterApplicationMutation
>;
export const deleteMasterApplication = /* GraphQL */ `mutation DeleteMasterApplication(
  $input: DeleteMasterApplicationInput!
  $condition: ModelMasterApplicationConditionInput
) {
  deleteMasterApplication(input: $input, condition: $condition) {
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
      tofelILETSCertificate
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
      m_isEmployeed
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
` as GeneratedMutation<
  APITypes.DeleteMasterApplicationMutationVariables,
  APITypes.DeleteMasterApplicationMutation
>;
export const createMasterStatistics = /* GraphQL */ `mutation CreateMasterStatistics(
  $input: CreateMasterStatisticsInput!
  $condition: ModelMasterStatisticsConditionInput
) {
  createMasterStatistics(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMasterStatisticsMutationVariables,
  APITypes.CreateMasterStatisticsMutation
>;
export const updateMasterStatistics = /* GraphQL */ `mutation UpdateMasterStatistics(
  $input: UpdateMasterStatisticsInput!
  $condition: ModelMasterStatisticsConditionInput
) {
  updateMasterStatistics(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMasterStatisticsMutationVariables,
  APITypes.UpdateMasterStatisticsMutation
>;
export const deleteMasterStatistics = /* GraphQL */ `mutation DeleteMasterStatistics(
  $input: DeleteMasterStatisticsInput!
  $condition: ModelMasterStatisticsConditionInput
) {
  deleteMasterStatistics(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMasterStatisticsMutationVariables,
  APITypes.DeleteMasterStatisticsMutation
>;
export const createMasterAttachment = /* GraphQL */ `mutation CreateMasterAttachment(
  $input: CreateMasterAttachmentInput!
  $condition: ModelMasterAttachmentConditionInput
) {
  createMasterAttachment(input: $input, condition: $condition) {
    id
    cprDoc
    signedContractDoc
    transcriptDoc
    universityCertificate
    tofelILETSCertificate
    acceptanceLetterDoc
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMasterAttachmentMutationVariables,
  APITypes.CreateMasterAttachmentMutation
>;
export const updateMasterAttachment = /* GraphQL */ `mutation UpdateMasterAttachment(
  $input: UpdateMasterAttachmentInput!
  $condition: ModelMasterAttachmentConditionInput
) {
  updateMasterAttachment(input: $input, condition: $condition) {
    id
    cprDoc
    signedContractDoc
    transcriptDoc
    universityCertificate
    tofelILETSCertificate
    acceptanceLetterDoc
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMasterAttachmentMutationVariables,
  APITypes.UpdateMasterAttachmentMutation
>;
export const deleteMasterAttachment = /* GraphQL */ `mutation DeleteMasterAttachment(
  $input: DeleteMasterAttachmentInput!
  $condition: ModelMasterAttachmentConditionInput
) {
  deleteMasterAttachment(input: $input, condition: $condition) {
    id
    cprDoc
    signedContractDoc
    transcriptDoc
    universityCertificate
    tofelILETSCertificate
    acceptanceLetterDoc
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMasterAttachmentMutationVariables,
  APITypes.DeleteMasterAttachmentMutation
>;
export const createMasterscholarship = /* GraphQL */ `mutation CreateMasterscholarship(
  $input: CreateMasterscholarshipInput!
  $condition: ModelMasterscholarshipConditionInput
) {
  createMasterscholarship(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateMasterscholarshipMutationVariables,
  APITypes.CreateMasterscholarshipMutation
>;
export const updateMasterscholarship = /* GraphQL */ `mutation UpdateMasterscholarship(
  $input: UpdateMasterscholarshipInput!
  $condition: ModelMasterscholarshipConditionInput
) {
  updateMasterscholarship(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateMasterscholarshipMutationVariables,
  APITypes.UpdateMasterscholarshipMutation
>;
export const deleteMasterscholarship = /* GraphQL */ `mutation DeleteMasterscholarship(
  $input: DeleteMasterscholarshipInput!
  $condition: ModelMasterscholarshipConditionInput
) {
  deleteMasterscholarship(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteMasterscholarshipMutationVariables,
  APITypes.DeleteMasterscholarshipMutation
>;
