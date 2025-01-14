import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../hooks/use-auth";
import { Application, Status, Batch } from "../src/API";
import { getCurrentBatch, getStudentApplications } from "../src/CustomAPI";
import { GraphQLError } from "graphql";
import dayjs from "dayjs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAppContext } from "./AppContexts";

// interface for all the values & functions
interface IUseBachelorContext {
  signUpEnabled: boolean;
  newApplicationsEnabled: boolean;
  editingApplicationsEnabled: boolean;
  batch: Batch | undefined;
  isBatchPending: boolean;

  applications: Application[];
  haveActiveApplication: boolean;
  syncStudentApplication: () => Promise<void>;
  syncStudent: () => Promise<void>;
  resetContext: () => void;
}

// the default state for all the values & functions
const defaultState: IUseBachelorContext = {
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
const BachelorContext = createContext<IUseBachelorContext>(defaultState);

// Access app values and functions with custom useAppContext hook
export const useBachelorContext = () => useContext(BachelorContext);

// The App provider to wrap the components that will use the context
export const BachelorProvider: FC<PropsWithChildren> = ({ children }) => {
  const app = useProviderBachelor();
  return (
    <BachelorContext.Provider value={app}>{children}</BachelorContext.Provider>
  );
};

//NOTE: declare vars and functions here
function useProviderBachelor() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { syncStudent, isStudentPending } = useAppContext();

  const [applications, setApplications] = useState<Application[]>(
    defaultState.applications
  );
  const [haveActiveApplication, setHaveActiveApplication] = useState(
    defaultState.haveActiveApplication
  );

  // TODO - check if user has active applications & scholarships
  // TODO - set is pending based on if batch, applications and scholarships is being fetched
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
