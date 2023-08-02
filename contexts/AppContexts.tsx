import { API } from "aws-amplify";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../hooks/use-auth";
import {
  GetStudentQueryVariables,
  GetStudentQuery,
  Application,
  Status,
  Student,
} from "../src/API";
import { getStudent } from "../src/graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { getStudentApplications } from "../src/CustomAPI";
import { Crisp } from "crisp-sdk-web";
import { bugsnagClient } from "../src/bugsnag";
import dayjs, { Dayjs } from "dayjs";

// interface for all the values & functions
interface IUseAppContext {
  student: GetStudentQuery | undefined;
  studentAsStudent: Student | undefined;
  applications: Application[];
  haveActiveApplication: boolean;
  syncStudentApplication: () => Promise<void>;
  syncStudent: () => Promise<void>;
  resetContext: () => void;
  signUpEnabled: boolean;
  newApplicationsEnabled: boolean;
  editingApplicationsEnabled: boolean;
}

// the default state for all the values & functions
const defaultState: IUseAppContext = {
  student: undefined,
  studentAsStudent: undefined,
  applications: [],
  haveActiveApplication: false,
  syncStudentApplication: async () => {},
  syncStudent: async () => {},
  resetContext: async () => {},
  signUpEnabled: false,
  newApplicationsEnabled: false,
  editingApplicationsEnabled: false,
};

// creating the app contexts
const AppContext = createContext<IUseAppContext>(defaultState);

// Access app values and functions with custom useAppContext hook
export const useAppContext = () => useContext(AppContext);

// The App provider to wrap the components that will use the context
export const AppProvider: FC<PropsWithChildren> = ({ children }) => {
  const app = useProviderApp();
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
};

//NOTE: declare vars and functions here
function useProviderApp() {
  const { user } = useAuth();

  const [student, setStudent] = useState(defaultState.student);
  const [studentAsStudent, setStudentAsStudent] = useState(
    defaultState.studentAsStudent
  );
  const [applications, setApplications] = useState<Application[]>(
    defaultState.applications
  );
  const [haveActiveApplication, setHaveActiveApplication] = useState(
    defaultState.haveActiveApplication
  );

  // ---- Dates Controls -----
  // TODO: change this date later
  const lastDateForEditingApplications = dayjs("2023-07-30T00:00:00");
  const lastDateForNewApplications = dayjs("2023-07-13T23:00:00");
  const lastDateForNewStudents = dayjs("2023-07-10T00:00:00");
  // ---- Access Controls -----

  // TODO: change this later
  const editingApplicationsEnabled = lastDateForEditingApplications.isAfter(
    dayjs()
  );
  const newApplicationsEnabled = lastDateForNewApplications.isAfter(dayjs());
  const signUpEnabled = lastDateForNewStudents.isAfter(dayjs());

  useEffect(() => {
    let cpr = user?.getUsername();
    if (cpr) {
      getStudentInfo(cpr).then((info) => {
        setStudent(info);

        const stu: Student | undefined = info
          ? (info?.getStudent as Student)
          : undefined;
        setStudentAsStudent(info?.getStudent as Student);
        if (stu) {
          bugsnagClient.setUser(
            stu.cpr,
            stu.email ?? undefined,
            stu.fullName ?? undefined
          );
        }
        Crisp.user.setEmail(`${stu?.email}`);

        Crisp.user.setNickname(`${stu?.fullName}`);

        Crisp.session.setData({
          cpr: stu?.cpr,
        });
      });
      getStudentApplications(cpr).then((allStudentApplications) => {
        setApplications(allStudentApplications);

        /* Checking if the student has an active application. */
        let active = allStudentApplications.find(
          (application) =>
            application.status === Status.REVIEW ||
            application.status === Status.APPROVED ||
            application.status === Status.ELIGIBLE ||
            application.status === Status.NOT_COMPLETED ||
            application.status === Status.REJECTED
        );
        setHaveActiveApplication(active !== undefined);
      });
    }

    return () => {};
  }, [user]);

  function resetContext() {
    setStudent(undefined);
    setStudentAsStudent(undefined);
    setApplications([]);
    setHaveActiveApplication(false);
  }

  async function syncStudent() {
    let cpr = user?.getUsername();

    if (cpr) {
      getStudentInfo(cpr).then((info) => {
        setStudent(info);
        setStudentAsStudent(info?.getStudent as Student);
      });
    }
  }

  async function syncStudentApplication() {
    let cpr = user?.getUsername();

    if (cpr) {
      getStudentApplications(cpr).then((allStudentApplications) => {
        setApplications(allStudentApplications);

        /* Checking if the student has an active application. */
        let active = allStudentApplications.find(
          (application) =>
            application.status === Status.REVIEW ||
            application.status === Status.APPROVED ||
            application.status === Status.ELIGIBLE ||
            application.status === Status.NOT_COMPLETED
        );
        setHaveActiveApplication(active !== undefined);
      });
    }
  }

  /**
   * It takes a CPR number as input, and returns the student's information
   * @param {string} cpr - The CPR number of the student you want to get information about.
   * @returns The student object
   */
  async function getStudentInfo(cpr: string) {
    let queryInput: GetStudentQueryVariables = {
      cpr: cpr,
    };

    let res = (await API.graphql({
      query: getStudent,
      variables: queryInput,
    })) as GraphQLResult<GetStudentQuery>;

    return res.data;
  }

  // NOTE: return all the values & functions you want to export
  return {
    student,
    studentAsStudent,
    applications,
    haveActiveApplication,
    syncStudentApplication,
    syncStudent,
    resetContext,
    signUpEnabled,
    newApplicationsEnabled,
    editingApplicationsEnabled,
  };
}
