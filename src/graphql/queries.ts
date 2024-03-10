/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const searchApplications = /* GraphQL */ `query SearchApplications(
  $filter: SearchableApplicationFilterInput
  $sort: [SearchableApplicationSortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableApplicationAggregationInput]
) {
  searchApplications(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
    items {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAttachmentId
      __typename
    }
    nextToken
    total
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
            __typename
          }
        }
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchApplicationsQueryVariables,
  APITypes.SearchApplicationsQuery
>;
export const searchUniversities = /* GraphQL */ `query SearchUniversities(
  $filter: SearchableUniversityFilterInput
  $sort: [SearchableUniversitySortInput]
  $limit: Int
  $nextToken: String
  $from: Int
  $aggregates: [SearchableUniversityAggregationInput]
) {
  searchUniversities(
    filter: $filter
    sort: $sort
    limit: $limit
    nextToken: $nextToken
    from: $from
    aggregates: $aggregates
  ) {
    items {
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
    nextToken
    total
    aggregateItems {
      name
      result {
        ... on SearchableAggregateScalarResult {
          value
        }
        ... on SearchableAggregateBucketResult {
          buckets {
            key
            doc_count
            __typename
          }
        }
      }
      __typename
    }
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SearchUniversitiesQueryVariables,
  APITypes.SearchUniversitiesQuery
>;
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
    createdAt
    updatedAt
    _version
    _deleted
    _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
export const getProgramChoice = /* GraphQL */ `query GetProgramChoice($id: ID!) {
  getProgramChoice(id: $id) {
    id
    programID
    applicationID
    program {
      id
      name
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
      extendedTo
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
      extendedTo
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncStudentsQueryVariables,
  APITypes.SyncStudentsQuery
>;
export const getBatch = /* GraphQL */ `query GetBatch($id: ID!) {
  getBatch(id: $id) {
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
` as GeneratedQuery<APITypes.GetBatchQueryVariables, APITypes.GetBatchQuery>;
export const listBatches = /* GraphQL */ `query ListBatches(
  $id: ID
  $filter: ModelBatchFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listBatches(
    id: $id
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
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
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.SyncBatchesQueryVariables,
  APITypes.SyncBatchesQuery
>;
export const applicationsByIdAndDateTime = /* GraphQL */ `query ApplicationsByIdAndDateTime(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
export const applicationsByStudentCPRAndGpa = /* GraphQL */ `query ApplicationsByStudentCPRAndGpa(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
export const applicationsByBatchID = /* GraphQL */ `query ApplicationsByBatchID(
  $batchID: ID!
  $sortDirection: ModelSortDirection
  $filter: ModelApplicationFilterInput
  $limit: Int
  $nextToken: String
) {
  applicationsByBatchID(
    batchID: $batchID
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAttachmentId
      __typename
    }
    nextToken
    startedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ApplicationsByBatchIDQueryVariables,
  APITypes.ApplicationsByBatchIDQuery
>;
export const applicationsByBatchAndStatus = /* GraphQL */ `query ApplicationsByBatchAndStatus(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
export const applicationsByScoreAndStatus = /* GraphQL */ `query ApplicationsByScoreAndStatus(
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
