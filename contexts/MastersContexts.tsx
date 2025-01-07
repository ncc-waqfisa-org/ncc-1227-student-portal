import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../hooks/use-auth";
import { Application, Batch, MasterBatch, Status } from "../src/API";
import {
  getCurrentBatch,
  getCurrentMasterBatch,
  getStudentApplications,
} from "../src/CustomAPI";
import { GraphQLError } from "graphql";
import dayjs from "dayjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAppContext } from "./AppContexts";

// interface for all the values & functions
interface IUseMastersContext {
  signUpEnabled: boolean;
  newApplicationsEnabled: boolean;
  editingApplicationsEnabled: boolean;
  batch: MasterBatch | undefined;
  isBatchPending: boolean;

  applications: Application[];
  haveActiveApplication: boolean;
  syncStudentApplication: () => Promise<void>;
  syncStudent: () => Promise<void>;
  resetContext: () => void;
}

// the default state for all the values & functions
const defaultState: IUseMastersContext = {
  signUpEnabled: false,
  newApplicationsEnabled: false,
  editingApplicationsEnabled: false,
  batch: undefined,
  isBatchPending: true,

  applications: [],
  haveActiveApplication: false,
  syncStudentApplication: async () => {},
  syncStudent: async () => {},
  resetContext: async () => {},
};

// creating the app contexts
const MastersContext = createContext<IUseMastersContext>(defaultState);

// Access app values and functions with custom useAppContext hook
export const useMastersContext = () => useContext(MastersContext);

// The App provider to wrap the components that will use the context
export const MastersProvider: FC<PropsWithChildren> = ({ children }) => {
  const app = useProviderMasters();
  return (
    <MastersContext.Provider value={app}>{children}</MastersContext.Provider>
  );
};

//NOTE: declare vars and functions here
function useProviderMasters() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { syncStudent } = useAppContext();

  const [applications, setApplications] = useState<Application[]>(
    defaultState.applications
  );
  const [haveActiveApplication, setHaveActiveApplication] = useState(
    defaultState.haveActiveApplication
  );

  const { data: batch, isPending: isBatchPending } =
    useQuery<MasterBatch | null>({
      queryKey: ["currentMasterBatch"],
      queryFn: () =>
        getCurrentMasterBatch()
          .then((value) => {
            const currentBatch = value ? (value as MasterBatch) : null;

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

  /**
   * Determines if the application is in development mode.
   */
  // const isDevelopment = false;
  const isDevelopment = process.env.NODE_ENV === "development";

  /**
   * Checks if new applications can be submitted based on the current environment and batch dates.
   */
  const newApplicationsEnabled = isDevelopment
    ? true
    : !batch
    ? false
    : dayjs().isBefore(dayjs(batch.createApplicationEndDate).endOf("day")) &&
      dayjs().isAfter(dayjs(batch.createApplicationStartDate).startOf("day"));

  /**
   * Checks if existing applications can be edited based on the current environment and batch dates.
   */
  const editingApplicationsEnabled = isDevelopment
    ? true
    : !batch
    ? false
    : dayjs().isBefore(dayjs(batch.updateApplicationEndDate).endOf("day"));

  /**
   * Checks if sign-ups are currently allowed based on the current environment and batch dates.
   */
  const signUpEnabled = isDevelopment
    ? true
    : !batch
    ? false
    : dayjs().isBefore(dayjs(batch.signUpEndDate).endOf("day")) &&
      dayjs().isAfter(dayjs(batch.signUpStartDate).startOf("day"));

  useEffect(() => {
    let cpr = user?.getUsername();
    if (cpr) {
      getStudentApplications(cpr).then((allStudentApplications) => {
        setApplications(allStudentApplications);

        /* Checking if the student has an active application. */
        let active = allStudentApplications.find(
          (application) =>
            (application.status === Status.REVIEW ||
              application.status === Status.APPROVED ||
              application.status === Status.ELIGIBLE ||
              application.status === Status.NOT_COMPLETED ||
              application.status === Status.REJECTED ||
              application.status === Status.WITHDRAWN) &&
            batch?.batch === application.batch
        );

        setHaveActiveApplication(active !== undefined);
      });
    }

    return () => {};
  }, [user, batch]);

  function resetContext() {
    setApplications([]);
    setHaveActiveApplication(false);
    queryClient.invalidateQueries();
  }

  async function syncStudentApplication() {
    let cpr = user?.getUsername();

    if (cpr) {
      getStudentApplications(cpr).then((allStudentApplications) => {
        setApplications(allStudentApplications);

        /* Checking if the student has an active application. */
        let active = allStudentApplications.find(
          (application) =>
            (application.status === Status.REVIEW ||
              application.status === Status.APPROVED ||
              application.status === Status.ELIGIBLE ||
              application.status === Status.NOT_COMPLETED ||
              application.status === Status.WITHDRAWN) &&
            batch?.batch === application.batch
        );
        setHaveActiveApplication(active !== undefined);
      });
    }
  }
  // NOTE: return all the values & functions you want to export
  return {
    signUpEnabled,
    newApplicationsEnabled,
    editingApplicationsEnabled,
    batch: batch ?? undefined,
    isBatchPending,
    applications,
    haveActiveApplication,
    syncStudentApplication,
    syncStudent,
    resetContext,
  };
}
