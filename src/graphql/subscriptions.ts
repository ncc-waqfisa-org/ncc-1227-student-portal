/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAttachment = /* GraphQL */ `
  subscription OnCreateAttachment(
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
    }
  }
`;
export const onUpdateAttachment = /* GraphQL */ `
  subscription OnUpdateAttachment(
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
    }
  }
`;
export const onDeleteAttachment = /* GraphQL */ `
  subscription OnDeleteAttachment(
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
    }
  }
`;
export const onCreateApplication = /* GraphQL */ `
  subscription OnCreateApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onCreateApplication(filter: $filter) {
      id
      gpa
      status
      attachmentID
      studentCPR
      adminLogs {
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
        }
        nextToken
        startedAt
      }
      studentLogs {
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
        }
        nextToken
        startedAt
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
      }
      programs {
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
        }
        nextToken
        startedAt
      }
      student {
        cpr
        cprDoc
        fullName
        email
        phone
        gender
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
        }
        parentInfoID
        StudentLogs {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      dateTime
      isEmailSent
      schoolName
      schoolType
      batch
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAttachmentId
    }
  }
`;
export const onUpdateApplication = /* GraphQL */ `
  subscription OnUpdateApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onUpdateApplication(filter: $filter) {
      id
      gpa
      status
      attachmentID
      studentCPR
      adminLogs {
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
        }
        nextToken
        startedAt
      }
      studentLogs {
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
        }
        nextToken
        startedAt
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
      }
      programs {
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
        }
        nextToken
        startedAt
      }
      student {
        cpr
        cprDoc
        fullName
        email
        phone
        gender
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
        }
        parentInfoID
        StudentLogs {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      dateTime
      isEmailSent
      schoolName
      schoolType
      batch
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAttachmentId
    }
  }
`;
export const onDeleteApplication = /* GraphQL */ `
  subscription OnDeleteApplication(
    $filter: ModelSubscriptionApplicationFilterInput
  ) {
    onDeleteApplication(filter: $filter) {
      id
      gpa
      status
      attachmentID
      studentCPR
      adminLogs {
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
        }
        nextToken
        startedAt
      }
      studentLogs {
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
        }
        nextToken
        startedAt
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
      }
      programs {
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
        }
        nextToken
        startedAt
      }
      student {
        cpr
        cprDoc
        fullName
        email
        phone
        gender
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
        }
        parentInfoID
        StudentLogs {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      dateTime
      isEmailSent
      schoolName
      schoolType
      batch
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAttachmentId
    }
  }
`;
export const onCreateProgramChoice = /* GraphQL */ `
  subscription OnCreateProgramChoice(
    $filter: ModelSubscriptionProgramChoiceFilterInput
  ) {
    onCreateProgramChoice(filter: $filter) {
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
        university {
          id
          name
          nameAr
          availability
          isDeactivated
          isTrashed
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        applications {
          nextToken
          startedAt
        }
        isDeactivated
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        universityProgramsId
      }
      application {
        id
        gpa
        status
        attachmentID
        studentCPR
        adminLogs {
          nextToken
          startedAt
        }
        studentLogs {
          nextToken
          startedAt
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
        }
        programs {
          nextToken
          startedAt
        }
        student {
          cpr
          cprDoc
          fullName
          email
          phone
          gender
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
        }
        dateTime
        isEmailSent
        schoolName
        schoolType
        batch
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        applicationAttachmentId
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
    }
  }
`;
export const onUpdateProgramChoice = /* GraphQL */ `
  subscription OnUpdateProgramChoice(
    $filter: ModelSubscriptionProgramChoiceFilterInput
  ) {
    onUpdateProgramChoice(filter: $filter) {
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
        university {
          id
          name
          nameAr
          availability
          isDeactivated
          isTrashed
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        applications {
          nextToken
          startedAt
        }
        isDeactivated
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        universityProgramsId
      }
      application {
        id
        gpa
        status
        attachmentID
        studentCPR
        adminLogs {
          nextToken
          startedAt
        }
        studentLogs {
          nextToken
          startedAt
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
        }
        programs {
          nextToken
          startedAt
        }
        student {
          cpr
          cprDoc
          fullName
          email
          phone
          gender
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
        }
        dateTime
        isEmailSent
        schoolName
        schoolType
        batch
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        applicationAttachmentId
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
    }
  }
`;
export const onDeleteProgramChoice = /* GraphQL */ `
  subscription OnDeleteProgramChoice(
    $filter: ModelSubscriptionProgramChoiceFilterInput
  ) {
    onDeleteProgramChoice(filter: $filter) {
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
        university {
          id
          name
          nameAr
          availability
          isDeactivated
          isTrashed
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        applications {
          nextToken
          startedAt
        }
        isDeactivated
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        universityProgramsId
      }
      application {
        id
        gpa
        status
        attachmentID
        studentCPR
        adminLogs {
          nextToken
          startedAt
        }
        studentLogs {
          nextToken
          startedAt
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
        }
        programs {
          nextToken
          startedAt
        }
        student {
          cpr
          cprDoc
          fullName
          email
          phone
          gender
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
        }
        dateTime
        isEmailSent
        schoolName
        schoolType
        batch
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        applicationAttachmentId
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
    }
  }
`;
export const onCreateProgram = /* GraphQL */ `
  subscription OnCreateProgram($filter: ModelSubscriptionProgramFilterInput) {
    onCreateProgram(filter: $filter) {
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
        Programs {
          nextToken
          startedAt
        }
        availability
        isDeactivated
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      applications {
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
        }
        nextToken
        startedAt
      }
      isDeactivated
      isTrashed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      universityProgramsId
    }
  }
`;
export const onUpdateProgram = /* GraphQL */ `
  subscription OnUpdateProgram($filter: ModelSubscriptionProgramFilterInput) {
    onUpdateProgram(filter: $filter) {
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
        Programs {
          nextToken
          startedAt
        }
        availability
        isDeactivated
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      applications {
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
        }
        nextToken
        startedAt
      }
      isDeactivated
      isTrashed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      universityProgramsId
    }
  }
`;
export const onDeleteProgram = /* GraphQL */ `
  subscription OnDeleteProgram($filter: ModelSubscriptionProgramFilterInput) {
    onDeleteProgram(filter: $filter) {
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
        Programs {
          nextToken
          startedAt
        }
        availability
        isDeactivated
        isTrashed
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      applications {
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
        }
        nextToken
        startedAt
      }
      isDeactivated
      isTrashed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      universityProgramsId
    }
  }
`;
export const onCreateUniversity = /* GraphQL */ `
  subscription OnCreateUniversity(
    $filter: ModelSubscriptionUniversityFilterInput
  ) {
    onCreateUniversity(filter: $filter) {
      id
      name
      nameAr
      Programs {
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
        }
        nextToken
        startedAt
      }
      availability
      isDeactivated
      isTrashed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateUniversity = /* GraphQL */ `
  subscription OnUpdateUniversity(
    $filter: ModelSubscriptionUniversityFilterInput
  ) {
    onUpdateUniversity(filter: $filter) {
      id
      name
      nameAr
      Programs {
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
        }
        nextToken
        startedAt
      }
      availability
      isDeactivated
      isTrashed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteUniversity = /* GraphQL */ `
  subscription OnDeleteUniversity(
    $filter: ModelSubscriptionUniversityFilterInput
  ) {
    onDeleteUniversity(filter: $filter) {
      id
      name
      nameAr
      Programs {
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
        }
        nextToken
        startedAt
      }
      availability
      isDeactivated
      isTrashed
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateAdminLog = /* GraphQL */ `
  subscription OnCreateAdminLog($filter: ModelSubscriptionAdminLogFilterInput) {
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
        AdminLogs {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAdminLogsId
      adminAdminLogsCpr
    }
  }
`;
export const onUpdateAdminLog = /* GraphQL */ `
  subscription OnUpdateAdminLog($filter: ModelSubscriptionAdminLogFilterInput) {
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
        AdminLogs {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAdminLogsId
      adminAdminLogsCpr
    }
  }
`;
export const onDeleteAdminLog = /* GraphQL */ `
  subscription OnDeleteAdminLog($filter: ModelSubscriptionAdminLogFilterInput) {
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
        AdminLogs {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationAdminLogsId
      adminAdminLogsCpr
    }
  }
`;
export const onCreateStudentLog = /* GraphQL */ `
  subscription OnCreateStudentLog(
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
        email
        phone
        gender
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
        }
        parentInfoID
        StudentLogs {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationStudentLogsId
      studentStudentLogsCpr
    }
  }
`;
export const onUpdateStudentLog = /* GraphQL */ `
  subscription OnUpdateStudentLog(
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
        email
        phone
        gender
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
        }
        parentInfoID
        StudentLogs {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationStudentLogsId
      studentStudentLogsCpr
    }
  }
`;
export const onDeleteStudentLog = /* GraphQL */ `
  subscription OnDeleteStudentLog(
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
        email
        phone
        gender
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
        }
        parentInfoID
        StudentLogs {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      applicationStudentLogsId
      studentStudentLogsCpr
    }
  }
`;
export const onCreateAdmin = /* GraphQL */ `
  subscription OnCreateAdmin($filter: ModelSubscriptionAdminFilterInput) {
    onCreateAdmin(filter: $filter) {
      cpr
      fullName
      email
      AdminLogs {
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
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateAdmin = /* GraphQL */ `
  subscription OnUpdateAdmin($filter: ModelSubscriptionAdminFilterInput) {
    onUpdateAdmin(filter: $filter) {
      cpr
      fullName
      email
      AdminLogs {
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
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteAdmin = /* GraphQL */ `
  subscription OnDeleteAdmin($filter: ModelSubscriptionAdminFilterInput) {
    onDeleteAdmin(filter: $filter) {
      cpr
      fullName
      email
      AdminLogs {
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
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateParentInfo = /* GraphQL */ `
  subscription OnCreateParentInfo(
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
    }
  }
`;
export const onUpdateParentInfo = /* GraphQL */ `
  subscription OnUpdateParentInfo(
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
    }
  }
`;
export const onDeleteParentInfo = /* GraphQL */ `
  subscription OnDeleteParentInfo(
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
    }
  }
`;
export const onCreateStudent = /* GraphQL */ `
  subscription OnCreateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onCreateStudent(filter: $filter) {
      cpr
      cprDoc
      fullName
      email
      phone
      gender
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
        items {
          id
          gpa
          status
          attachmentID
          studentCPR
          dateTime
          isEmailSent
          schoolName
          schoolType
          batch
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          applicationAttachmentId
        }
        nextToken
        startedAt
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
      }
      parentInfoID
      StudentLogs {
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
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateStudent = /* GraphQL */ `
  subscription OnUpdateStudent($filter: ModelSubscriptionStudentFilterInput) {
    onUpdateStudent(filter: $filter) {
      cpr
      cprDoc
      fullName
      email
      phone
      gender
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
        items {
          id
          gpa
          status
          attachmentID
          studentCPR
          dateTime
          isEmailSent
          schoolName
          schoolType
          batch
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          applicationAttachmentId
        }
        nextToken
        startedAt
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
      }
      parentInfoID
      StudentLogs {
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
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteStudent = /* GraphQL */ `
  subscription OnDeleteStudent($filter: ModelSubscriptionStudentFilterInput) {
    onDeleteStudent(filter: $filter) {
      cpr
      cprDoc
      fullName
      email
      phone
      gender
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
        items {
          id
          gpa
          status
          attachmentID
          studentCPR
          dateTime
          isEmailSent
          schoolName
          schoolType
          batch
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
          applicationAttachmentId
        }
        nextToken
        startedAt
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
      }
      parentInfoID
      StudentLogs {
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
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
