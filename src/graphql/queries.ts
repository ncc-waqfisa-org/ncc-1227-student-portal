/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getAttachment = /* GraphQL */ `query GetAttachment($id: ID!) {
  getAttachment(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetAttachmentQueryVariables,
  APITypes.GetAttachmentQuery
>;
export const listAttachments = /* GraphQL */ `query ListAttachments(
  $filter: ModelAttachmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listAttachments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAttachmentsQueryVariables,
  APITypes.ListAttachmentsQuery
>;
export const syncAttachments = /* GraphQL */ `query SyncAttachments(
  $filter: ModelAttachmentFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncAttachments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncAttachmentsQueryVariables,
  APITypes.SyncAttachmentsQuery
>;
export const getApplication = /* GraphQL */ `query GetApplication($id: ID!) {
  getApplication(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetApplicationQueryVariables,
  APITypes.GetApplicationQuery
>;
export const listApplications = /* GraphQL */ `query ListApplications(
  $filter: ModelApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  listApplications(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListApplicationsQueryVariables,
  APITypes.ListApplicationsQuery
>;
export const syncApplications = /* GraphQL */ `query SyncApplications(
  $filter: ModelApplicationFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncApplications(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncApplicationsQueryVariables,
  APITypes.SyncApplicationsQuery
>;
export const getProgramChoice =
  /* GraphQL */ `query GetProgramChoice($id: ID!) {
  getProgramChoice(id: $id) {
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
` as GeneratedQuery<
    APITypes.GetProgramChoiceQueryVariables,
    APITypes.GetProgramChoiceQuery
  >;
export const listProgramChoices = /* GraphQL */ `query ListProgramChoices(
  $filter: ModelProgramChoiceFilterInput
  $limit: Int
  $nextToken: String
) {
  listProgramChoices(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      programID
      applicationID
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProgramChoicesQueryVariables,
  APITypes.ListProgramChoicesQuery
>;
export const syncProgramChoices = /* GraphQL */ `query SyncProgramChoices(
  $filter: ModelProgramChoiceFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncProgramChoices(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      programID
      applicationID
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncProgramChoicesQueryVariables,
  APITypes.SyncProgramChoicesQuery
>;
export const getProgram = /* GraphQL */ `query GetProgram($id: ID!) {
  getProgram(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetProgramQueryVariables,
  APITypes.GetProgramQuery
>;
export const listPrograms = /* GraphQL */ `query ListPrograms(
  $filter: ModelProgramFilterInput
  $limit: Int
  $nextToken: String
) {
  listPrograms(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListProgramsQueryVariables,
  APITypes.ListProgramsQuery
>;
export const syncPrograms = /* GraphQL */ `query SyncPrograms(
  $filter: ModelProgramFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncPrograms(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncProgramsQueryVariables,
  APITypes.SyncProgramsQuery
>;
export const getUniversity = /* GraphQL */ `query GetUniversity($id: ID!) {
  getUniversity(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUniversityQueryVariables,
  APITypes.GetUniversityQuery
>;
export const listUniversities = /* GraphQL */ `query ListUniversities(
  $filter: ModelUniversityFilterInput
  $limit: Int
  $nextToken: String
) {
  listUniversities(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUniversitiesQueryVariables,
  APITypes.ListUniversitiesQuery
>;
export const syncUniversities = /* GraphQL */ `query SyncUniversities(
  $filter: ModelUniversityFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncUniversities(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncUniversitiesQueryVariables,
  APITypes.SyncUniversitiesQuery
>;
export const getAdminLog = /* GraphQL */ `query GetAdminLog($id: ID!) {
  getAdminLog(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetAdminLogQueryVariables,
  APITypes.GetAdminLogQuery
>;
export const listAdminLogs = /* GraphQL */ `query ListAdminLogs(
  $filter: ModelAdminLogFilterInput
  $limit: Int
  $nextToken: String
) {
  listAdminLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      applicationID
      adminCPR
      dateTime
      snapshot
      reason
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAdminLogsQueryVariables,
  APITypes.ListAdminLogsQuery
>;
export const syncAdminLogs = /* GraphQL */ `query SyncAdminLogs(
  $filter: ModelAdminLogFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncAdminLogs(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      applicationID
      adminCPR
      dateTime
      snapshot
      reason
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncAdminLogsQueryVariables,
  APITypes.SyncAdminLogsQuery
>;
export const getStudentLog = /* GraphQL */ `query GetStudentLog($id: ID!) {
  getStudentLog(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetStudentLogQueryVariables,
  APITypes.GetStudentLogQuery
>;
export const listStudentLogs = /* GraphQL */ `query ListStudentLogs(
  $filter: ModelStudentLogFilterInput
  $limit: Int
  $nextToken: String
) {
  listStudentLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      applicationID
      studentCPR
      dateTime
      snapshot
      reason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationStudentLogsId
      studentStudentLogsCpr
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListStudentLogsQueryVariables,
  APITypes.ListStudentLogsQuery
>;
export const syncStudentLogs = /* GraphQL */ `query SyncStudentLogs(
  $filter: ModelStudentLogFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncStudentLogs(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      applicationID
      studentCPR
      dateTime
      snapshot
      reason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationStudentLogsId
      studentStudentLogsCpr
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncStudentLogsQueryVariables,
  APITypes.SyncStudentLogsQuery
>;
export const getAdmin = /* GraphQL */ `query GetAdmin($cpr: String!) {
  getAdmin(cpr: $cpr) {
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
` as GeneratedQuery<APITypes.GetAdminQueryVariables, APITypes.GetAdminQuery>;
export const listAdmins = /* GraphQL */ `query ListAdmins(
  $cpr: String
  $filter: ModelAdminFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listAdmins(
    cpr: $cpr
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListAdminsQueryVariables,
  APITypes.ListAdminsQuery
>;
export const syncAdmins = /* GraphQL */ `query SyncAdmins(
  $filter: ModelAdminFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncAdmins(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncAdminsQueryVariables,
  APITypes.SyncAdminsQuery
>;
export const getParentInfo = /* GraphQL */ `query GetParentInfo($id: ID!) {
  getParentInfo(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetParentInfoQueryVariables,
  APITypes.GetParentInfoQuery
>;
export const listParentInfos = /* GraphQL */ `query ListParentInfos(
  $filter: ModelParentInfoFilterInput
  $limit: Int
  $nextToken: String
) {
  listParentInfos(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListParentInfosQueryVariables,
  APITypes.ListParentInfosQuery
>;
export const syncParentInfos = /* GraphQL */ `query SyncParentInfos(
  $filter: ModelParentInfoFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncParentInfos(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncParentInfosQueryVariables,
  APITypes.SyncParentInfosQuery
>;
export const getStudent = /* GraphQL */ `query GetStudent($cpr: String!) {
  getStudent(cpr: $cpr) {
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
` as GeneratedQuery<
  APITypes.GetStudentQueryVariables,
  APITypes.GetStudentQuery
>;
export const listStudents = /* GraphQL */ `query ListStudents(
  $cpr: String
  $filter: ModelStudentFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listStudents(
    cpr: $cpr
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListStudentsQueryVariables,
  APITypes.ListStudentsQuery
>;
export const syncStudents = /* GraphQL */ `query SyncStudents(
  $filter: ModelStudentFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncStudents(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncStudentsQueryVariables,
  APITypes.SyncStudentsQuery
>;
export const getBatch = /* GraphQL */ `query GetBatch($batch: Int!) {
  getBatch(batch: $batch) {
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
` as GeneratedQuery<APITypes.GetBatchQueryVariables, APITypes.GetBatchQuery>;
export const listBatches = /* GraphQL */ `query ListBatches(
  $batch: Int
  $filter: ModelBatchFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listBatches(
    batch: $batch
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListBatchesQueryVariables,
  APITypes.ListBatchesQuery
>;
export const syncBatches = /* GraphQL */ `query SyncBatches(
  $filter: ModelBatchFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncBatches(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncBatchesQueryVariables,
  APITypes.SyncBatchesQuery
>;
export const getScholarship = /* GraphQL */ `query GetScholarship($id: ID!) {
  getScholarship(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetScholarshipQueryVariables,
  APITypes.GetScholarshipQuery
>;
export const listScholarships = /* GraphQL */ `query ListScholarships(
  $filter: ModelScholarshipFilterInput
  $limit: Int
  $nextToken: String
) {
  listScholarships(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      status
      applicationID
      batch
      isConfirmed
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListScholarshipsQueryVariables,
  APITypes.ListScholarshipsQuery
>;
export const syncScholarships = /* GraphQL */ `query SyncScholarships(
  $filter: ModelScholarshipFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncScholarships(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      status
      applicationID
      batch
      isConfirmed
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncScholarshipsQueryVariables,
  APITypes.SyncScholarshipsQuery
>;
export const getStatistics = /* GraphQL */ `query GetStatistics($id: Int!) {
  getStatistics(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetStatisticsQueryVariables,
  APITypes.GetStatisticsQuery
>;
export const listStatistics = /* GraphQL */ `query ListStatistics(
  $id: Int
  $filter: ModelStatisticsFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listStatistics(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListStatisticsQueryVariables,
  APITypes.ListStatisticsQuery
>;
export const syncStatistics = /* GraphQL */ `query SyncStatistics(
  $filter: ModelStatisticsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncStatistics(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncStatisticsQueryVariables,
  APITypes.SyncStatisticsQuery
>;
export const getMasterBatch =
  /* GraphQL */ `query GetMasterBatch($batch: Int!) {
  getMasterBatch(batch: $batch) {
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
` as GeneratedQuery<
    APITypes.GetMasterBatchQueryVariables,
    APITypes.GetMasterBatchQuery
  >;
export const listMasterBatches = /* GraphQL */ `query ListMasterBatches(
  $batch: Int
  $filter: ModelMasterBatchFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listMasterBatches(
    batch: $batch
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMasterBatchesQueryVariables,
  APITypes.ListMasterBatchesQuery
>;
export const syncMasterBatches = /* GraphQL */ `query SyncMasterBatches(
  $filter: ModelMasterBatchFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncMasterBatches(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncMasterBatchesQueryVariables,
  APITypes.SyncMasterBatchesQuery
>;
export const getMasterLog = /* GraphQL */ `query GetMasterLog($id: ID!) {
  getMasterLog(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetMasterLogQueryVariables,
  APITypes.GetMasterLogQuery
>;
export const listMasterLogs = /* GraphQL */ `query ListMasterLogs(
  $filter: ModelMasterLogFilterInput
  $limit: Int
  $nextToken: String
) {
  listMasterLogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      applicationID
      studentCPR
      dateTime
      snapshot
      reason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      studentM_MasterLogsCpr
      masterApplicationMasterLogsId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMasterLogsQueryVariables,
  APITypes.ListMasterLogsQuery
>;
export const syncMasterLogs = /* GraphQL */ `query SyncMasterLogs(
  $filter: ModelMasterLogFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncMasterLogs(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      applicationID
      studentCPR
      dateTime
      snapshot
      reason
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      studentM_MasterLogsCpr
      masterApplicationMasterLogsId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncMasterLogsQueryVariables,
  APITypes.SyncMasterLogsQuery
>;
export const getBahrainUniversities =
  /* GraphQL */ `query GetBahrainUniversities($id: ID!) {
  getBahrainUniversities(id: $id) {
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
` as GeneratedQuery<
    APITypes.GetBahrainUniversitiesQueryVariables,
    APITypes.GetBahrainUniversitiesQuery
  >;
export const listBahrainUniversities =
  /* GraphQL */ `query ListBahrainUniversities(
  $id: ID
  $filter: ModelBahrainUniversitiesFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listBahrainUniversities(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ListBahrainUniversitiesQueryVariables,
    APITypes.ListBahrainUniversitiesQuery
  >;
export const syncBahrainUniversities =
  /* GraphQL */ `query SyncBahrainUniversities(
  $filter: ModelBahrainUniversitiesFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncBahrainUniversities(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.SyncBahrainUniversitiesQueryVariables,
    APITypes.SyncBahrainUniversitiesQuery
  >;
export const getMasterUniversities =
  /* GraphQL */ `query GetMasterUniversities($id: ID!) {
  getMasterUniversities(id: $id) {
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
` as GeneratedQuery<
    APITypes.GetMasterUniversitiesQueryVariables,
    APITypes.GetMasterUniversitiesQuery
  >;
export const listMasterUniversities =
  /* GraphQL */ `query ListMasterUniversities(
  $id: ID
  $filter: ModelMasterUniversitiesFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listMasterUniversities(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ListMasterUniversitiesQueryVariables,
    APITypes.ListMasterUniversitiesQuery
  >;
export const syncMasterUniversities =
  /* GraphQL */ `query SyncMasterUniversities(
  $filter: ModelMasterUniversitiesFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncMasterUniversities(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.SyncMasterUniversitiesQueryVariables,
    APITypes.SyncMasterUniversitiesQuery
  >;
export const getMasterApplication =
  /* GraphQL */ `query GetMasterApplication($id: ID!) {
  getMasterApplication(id: $id) {
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
` as GeneratedQuery<
    APITypes.GetMasterApplicationQueryVariables,
    APITypes.GetMasterApplicationQuery
  >;
export const listMasterApplications =
  /* GraphQL */ `query ListMasterApplications(
  $filter: ModelMasterApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  listMasterApplications(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ListMasterApplicationsQueryVariables,
    APITypes.ListMasterApplicationsQuery
  >;
export const syncMasterApplications =
  /* GraphQL */ `query SyncMasterApplications(
  $filter: ModelMasterApplicationFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncMasterApplications(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.SyncMasterApplicationsQueryVariables,
    APITypes.SyncMasterApplicationsQuery
  >;
export const getMasterStatistics =
  /* GraphQL */ `query GetMasterStatistics($id: Int!) {
  getMasterStatistics(id: $id) {
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
` as GeneratedQuery<
    APITypes.GetMasterStatisticsQueryVariables,
    APITypes.GetMasterStatisticsQuery
  >;
export const listMasterStatistics = /* GraphQL */ `query ListMasterStatistics(
  $id: Int
  $filter: ModelMasterStatisticsFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listMasterStatistics(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMasterStatisticsQueryVariables,
  APITypes.ListMasterStatisticsQuery
>;
export const syncMasterStatistics = /* GraphQL */ `query SyncMasterStatistics(
  $filter: ModelMasterStatisticsFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncMasterStatistics(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncMasterStatisticsQueryVariables,
  APITypes.SyncMasterStatisticsQuery
>;
export const getMasterAttachment =
  /* GraphQL */ `query GetMasterAttachment($id: ID!) {
  getMasterAttachment(id: $id) {
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
` as GeneratedQuery<
    APITypes.GetMasterAttachmentQueryVariables,
    APITypes.GetMasterAttachmentQuery
  >;
export const listMasterAttachments = /* GraphQL */ `query ListMasterAttachments(
  $filter: ModelMasterAttachmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listMasterAttachments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMasterAttachmentsQueryVariables,
  APITypes.ListMasterAttachmentsQuery
>;
export const syncMasterAttachments = /* GraphQL */ `query SyncMasterAttachments(
  $filter: ModelMasterAttachmentFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncMasterAttachments(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncMasterAttachmentsQueryVariables,
  APITypes.SyncMasterAttachmentsQuery
>;
export const getMasterScholarship =
  /* GraphQL */ `query GetMasterScholarship($id: ID!) {
  getMasterScholarship(id: $id) {
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
` as GeneratedQuery<
    APITypes.GetMasterScholarshipQueryVariables,
    APITypes.GetMasterScholarshipQuery
  >;
export const listMasterScholarships =
  /* GraphQL */ `query ListMasterScholarships(
  $filter: ModelMasterScholarshipFilterInput
  $limit: Int
  $nextToken: String
) {
  listMasterScholarships(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      status
      applicationID
      batch
      isConfirmed
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ListMasterScholarshipsQueryVariables,
    APITypes.ListMasterScholarshipsQuery
  >;
export const syncMasterScholarships =
  /* GraphQL */ `query SyncMasterScholarships(
  $filter: ModelMasterScholarshipFilterInput
  $limit: Int
  $nextToken: String
  $lastSync: AWSTimestamp
) {
  syncMasterScholarships(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    lastSync: $lastSync
  ) {
    items {
      id
      status
      applicationID
      batch
      isConfirmed
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.SyncMasterScholarshipsQueryVariables,
    APITypes.SyncMasterScholarshipsQuery
  >;
export const applicationsByIdAndDateTime =
  /* GraphQL */ `query ApplicationsByIdAndDateTime(
  $id: ID!
  $dateTime: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  applicationsByIdAndDateTime(
    id: $id
    dateTime: $dateTime
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ApplicationsByIdAndDateTimeQueryVariables,
    APITypes.ApplicationsByIdAndDateTimeQuery
  >;
export const applicationsByNationalityCategoryAndBatch =
  /* GraphQL */ `query ApplicationsByNationalityCategoryAndBatch(
  $nationalityCategory: Nationality!
  $batch: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  applicationsByNationalityCategoryAndBatch(
    nationalityCategory: $nationalityCategory
    batch: $batch
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ApplicationsByNationalityCategoryAndBatchQueryVariables,
    APITypes.ApplicationsByNationalityCategoryAndBatchQuery
  >;
export const applicationsByStudentCPRAndGpa =
  /* GraphQL */ `query ApplicationsByStudentCPRAndGpa(
  $studentCPR: String!
  $gpa: ModelFloatKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  applicationsByStudentCPRAndGpa(
    studentCPR: $studentCPR
    gpa: $gpa
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ApplicationsByStudentCPRAndGpaQueryVariables,
    APITypes.ApplicationsByStudentCPRAndGpaQuery
  >;
export const applicationsByBatchAndStatus =
  /* GraphQL */ `query ApplicationsByBatchAndStatus(
  $batch: Int!
  $status: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  applicationsByBatchAndStatus(
    batch: $batch
    status: $status
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ApplicationsByBatchAndStatusQueryVariables,
    APITypes.ApplicationsByBatchAndStatusQuery
  >;
export const applicationsByScoreAndStatus =
  /* GraphQL */ `query ApplicationsByScoreAndStatus(
  $score: Float!
  $status: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  applicationsByScoreAndStatus(
    score: $score
    status: $status
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ApplicationsByScoreAndStatusQueryVariables,
    APITypes.ApplicationsByScoreAndStatusQuery
  >;
export const applicationsByProcessedAndBatch =
  /* GraphQL */ `query ApplicationsByProcessedAndBatch(
  $processed: Int!
  $batch: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  applicationsByProcessedAndBatch(
    processed: $processed
    batch: $batch
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ApplicationsByProcessedAndBatchQueryVariables,
    APITypes.ApplicationsByProcessedAndBatchQuery
  >;
export const universitiesByIsExtendedAndName =
  /* GraphQL */ `query UniversitiesByIsExtendedAndName(
  $isExtended: Int!
  $name: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelUniversityFilterInput
  $limit: Int
  $nextToken: String
) {
  universitiesByIsExtendedAndName(
    isExtended: $isExtended
    name: $name
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.UniversitiesByIsExtendedAndNameQueryVariables,
    APITypes.UniversitiesByIsExtendedAndNameQuery
  >;
export const universitiesByIsException =
  /* GraphQL */ `query UniversitiesByIsException(
  $isException: Int!
  $sortDirection: ModelSortDirection
  $filter: ModelUniversityFilterInput
  $limit: Int
  $nextToken: String
) {
  universitiesByIsException(
    isException: $isException
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.UniversitiesByIsExceptionQueryVariables,
    APITypes.UniversitiesByIsExceptionQuery
  >;
export const studentsByNationalityCategoryAndGraduationDate =
  /* GraphQL */ `query StudentsByNationalityCategoryAndGraduationDate(
  $nationalityCategory: Nationality!
  $graduationDate: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelStudentFilterInput
  $limit: Int
  $nextToken: String
) {
  studentsByNationalityCategoryAndGraduationDate(
    nationalityCategory: $nationalityCategory
    graduationDate: $graduationDate
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.StudentsByNationalityCategoryAndGraduationDateQueryVariables,
    APITypes.StudentsByNationalityCategoryAndGraduationDateQuery
  >;
export const studentsByM_universityID =
  /* GraphQL */ `query StudentsByM_universityID(
  $m_universityID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelStudentFilterInput
  $limit: Int
  $nextToken: String
) {
  studentsByM_universityID(
    m_universityID: $m_universityID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.StudentsByM_universityIDQueryVariables,
    APITypes.StudentsByM_universityIDQuery
  >;
export const scholarshipsByApplicationID =
  /* GraphQL */ `query ScholarshipsByApplicationID(
  $applicationID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelScholarshipFilterInput
  $limit: Int
  $nextToken: String
) {
  scholarshipsByApplicationID(
    applicationID: $applicationID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      status
      applicationID
      batch
      isConfirmed
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ScholarshipsByApplicationIDQueryVariables,
    APITypes.ScholarshipsByApplicationIDQuery
  >;
export const scholarshipsByBatchAndStatus =
  /* GraphQL */ `query ScholarshipsByBatchAndStatus(
  $batch: Int!
  $status: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelScholarshipFilterInput
  $limit: Int
  $nextToken: String
) {
  scholarshipsByBatchAndStatus(
    batch: $batch
    status: $status
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      status
      applicationID
      batch
      isConfirmed
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ScholarshipsByBatchAndStatusQueryVariables,
    APITypes.ScholarshipsByBatchAndStatusQuery
  >;
export const scholarshipsByStudentCPRAndStatus =
  /* GraphQL */ `query ScholarshipsByStudentCPRAndStatus(
  $studentCPR: String!
  $status: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelScholarshipFilterInput
  $limit: Int
  $nextToken: String
) {
  scholarshipsByStudentCPRAndStatus(
    studentCPR: $studentCPR
    status: $status
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      status
      applicationID
      batch
      isConfirmed
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.ScholarshipsByStudentCPRAndStatusQueryVariables,
    APITypes.ScholarshipsByStudentCPRAndStatusQuery
  >;
export const statisticsByBatchAndTotalApplications =
  /* GraphQL */ `query StatisticsByBatchAndTotalApplications(
  $batch: Int!
  $totalApplications: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelStatisticsFilterInput
  $limit: Int
  $nextToken: String
) {
  statisticsByBatchAndTotalApplications(
    batch: $batch
    totalApplications: $totalApplications
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.StatisticsByBatchAndTotalApplicationsQueryVariables,
    APITypes.StatisticsByBatchAndTotalApplicationsQuery
  >;
export const masterApplicationsByIdAndDateTime =
  /* GraphQL */ `query MasterApplicationsByIdAndDateTime(
  $id: ID!
  $dateTime: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMasterApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  masterApplicationsByIdAndDateTime(
    id: $id
    dateTime: $dateTime
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.MasterApplicationsByIdAndDateTimeQueryVariables,
    APITypes.MasterApplicationsByIdAndDateTimeQuery
  >;
export const masterApplicationsByNationalityCategoryAndBatch =
  /* GraphQL */ `query MasterApplicationsByNationalityCategoryAndBatch(
  $nationalityCategory: Nationality!
  $batch: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMasterApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  masterApplicationsByNationalityCategoryAndBatch(
    nationalityCategory: $nationalityCategory
    batch: $batch
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.MasterApplicationsByNationalityCategoryAndBatchQueryVariables,
    APITypes.MasterApplicationsByNationalityCategoryAndBatchQuery
  >;
export const masterApplicationsByStudentCPRAndGpa =
  /* GraphQL */ `query MasterApplicationsByStudentCPRAndGpa(
  $studentCPR: String!
  $gpa: ModelFloatKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMasterApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  masterApplicationsByStudentCPRAndGpa(
    studentCPR: $studentCPR
    gpa: $gpa
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.MasterApplicationsByStudentCPRAndGpaQueryVariables,
    APITypes.MasterApplicationsByStudentCPRAndGpaQuery
  >;
export const masterApplicationsByBatchAndStatus =
  /* GraphQL */ `query MasterApplicationsByBatchAndStatus(
  $batch: Int!
  $status: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMasterApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  masterApplicationsByBatchAndStatus(
    batch: $batch
    status: $status
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.MasterApplicationsByBatchAndStatusQueryVariables,
    APITypes.MasterApplicationsByBatchAndStatusQuery
  >;
export const masterApplicationsByScoreAndStatus =
  /* GraphQL */ `query MasterApplicationsByScoreAndStatus(
  $score: Float!
  $status: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMasterApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  masterApplicationsByScoreAndStatus(
    score: $score
    status: $status
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.MasterApplicationsByScoreAndStatusQueryVariables,
    APITypes.MasterApplicationsByScoreAndStatusQuery
  >;
export const masterApplicationsByProcessedAndBatch =
  /* GraphQL */ `query MasterApplicationsByProcessedAndBatch(
  $processed: Int!
  $batch: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMasterApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  masterApplicationsByProcessedAndBatch(
    processed: $processed
    batch: $batch
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.MasterApplicationsByProcessedAndBatchQueryVariables,
    APITypes.MasterApplicationsByProcessedAndBatchQuery
  >;
export const masterStatisticsByBatchAndTotalApplications =
  /* GraphQL */ `query MasterStatisticsByBatchAndTotalApplications(
  $batch: Int!
  $totalApplications: ModelIntKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMasterStatisticsFilterInput
  $limit: Int
  $nextToken: String
) {
  masterStatisticsByBatchAndTotalApplications(
    batch: $batch
    totalApplications: $totalApplications
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.MasterStatisticsByBatchAndTotalApplicationsQueryVariables,
    APITypes.MasterStatisticsByBatchAndTotalApplicationsQuery
  >;
export const MasterScholarshipsByApplicationID =
  /* GraphQL */ `query MasterScholarshipsByApplicationID(
  $applicationID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelMasterScholarshipFilterInput
  $limit: Int
  $nextToken: String
) {
  MasterScholarshipsByApplicationID(
    applicationID: $applicationID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      status
      applicationID
      batch
      isConfirmed
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.MasterScholarshipsByApplicationIDQueryVariables,
    APITypes.MasterScholarshipsByApplicationIDQuery
  >;
export const MasterScholarshipsByBatchAndStatus =
  /* GraphQL */ `query MasterScholarshipsByBatchAndStatus(
  $batch: Int!
  $status: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMasterScholarshipFilterInput
  $limit: Int
  $nextToken: String
) {
  MasterScholarshipsByBatchAndStatus(
    batch: $batch
    status: $status
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      status
      applicationID
      batch
      isConfirmed
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.MasterScholarshipsByBatchAndStatusQueryVariables,
    APITypes.MasterScholarshipsByBatchAndStatusQuery
  >;
export const MasterScholarshipsByStudentCPRAndStatus =
  /* GraphQL */ `query MasterScholarshipsByStudentCPRAndStatus(
  $studentCPR: String!
  $status: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelMasterScholarshipFilterInput
  $limit: Int
  $nextToken: String
) {
  MasterScholarshipsByStudentCPRAndStatus(
    studentCPR: $studentCPR
    status: $status
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      status
      applicationID
      batch
      isConfirmed
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
    APITypes.MasterScholarshipsByStudentCPRAndStatusQueryVariables,
    APITypes.MasterScholarshipsByStudentCPRAndStatusQuery
  >;
