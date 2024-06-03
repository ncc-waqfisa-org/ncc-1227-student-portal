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
  Batch,
} from "../src/API";
import { getStudent } from "../src/graphql/queries";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { getCurrentBatch, getStudentApplications } from "../src/CustomAPI";
import { Crisp } from "crisp-sdk-web";
import { GraphQLError } from "graphql";
import dayjs from "dayjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
  batch: Batch | undefined;
  isBatchPending: boolean;
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
  batch: undefined,
  isBatchPending: true,
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
  const queryClient = useQueryClient();

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

  const { data: batch, isPending: isBatchPending } = useQuery<Batch | null>({
    queryKey: ["currentBatch"],
    queryFn: () =>
      getCurrentBatch()
        .then((value) => {
          const currentBatch = value ? (value as Batch) : null;

          return currentBatch;
        })
        .catch((error) => {
          if (error.errors[0] instanceof GraphQLError) {
            const graphQLError: GraphQLError = error.errors[0];
            if (graphQLError.message === "Network Error") {
              toast.error(graphQLError.message);
              return null;
              // throw new Error(graphQLError.message);
            }
          }
          return null;
        }),
  });

  const newApplicationsEnabled = !batch
    ? false
    : dayjs().isBefore(dayjs(batch.createApplicationEndDate).endOf("day")) &&
      dayjs().isAfter(dayjs(batch.createApplicationStartDate).startOf("day"));

  const editingApplicationsEnabled = !batch
    ? false
    : dayjs().isBefore(dayjs(batch.updateApplicationEndDate).endOf("day"));

  const signUpEnabled = !batch
    ? false
    : dayjs().isBefore(dayjs(batch.signUpEndDate).endOf("day")) &&
      dayjs().isAfter(dayjs(batch.signUpStartDate).startOf("day"));

  useEffect(() => {
    let cpr = user?.getUsername();
    if (cpr) {
      getStudentInfo(cpr).then((info) => {
        setStudent(info);

        const stu: Student | undefined = info
          ? (info?.getStudent as Student)
          : undefined;
        setStudentAsStudent(info?.getStudent as Student);

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
            application.status === Status.REJECTED ||
            application.status === Status.WITHDRAWN
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
    queryClient.invalidateQueries();
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
            application.status === Status.NOT_COMPLETED ||
            application.status === Status.WITHDRAWN
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
    batch: batch ?? undefined,
    isBatchPending,
  };
}
