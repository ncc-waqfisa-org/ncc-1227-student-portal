import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "../hooks/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { CognitoUser } from "@aws-amplify/auth";
import { getStudentInfo } from "../src/CustomAPI";
import { GetStudentQuery, Student } from "../src/API";

// interface for all the values & functions
interface IUseAppContext {
  cpr: string | undefined;
  student: GetStudentQuery | undefined;
  studentAsStudent: Student | undefined;
  cognitoUser: CognitoUser | undefined;
  resetContext: () => void;
  syncStudent: () => Promise<void>;
}

// the default state for all the values & functions
const defaultState: IUseAppContext = {
  cpr: undefined,
  student: undefined,
  studentAsStudent: undefined,
  cognitoUser: undefined,
  resetContext: async () => {},
  syncStudent: async () => {},
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
  const { user: cognitoUser, cpr } = useAuth();
  const queryClient = useQueryClient();

  const [student, setStudent] = useState(defaultState.student);
  const [studentAsStudent, setStudentAsStudent] = useState(
    defaultState.studentAsStudent
  );

  useEffect(() => {
    if (cpr) {
      getStudentInfo(cpr).then((info) => {
        setStudent(info);
        setStudentAsStudent(info?.getStudent as Student);
      });
    }

    return () => {};
  }, [cognitoUser, cpr]);

  function resetContext() {
    console.log("resetContext called");
  }

  async function syncStudent() {
    if (cpr) {
      getStudentInfo(cpr).then((info) => {
        setStudent(info);
        setStudentAsStudent(info?.getStudent as Student);
      });
    }
  }

  // NOTE: return all the values & functions you want to export
  return {
    cpr,
    cognitoUser,
    resetContext,
    student,
    studentAsStudent,
    syncStudent,
  };
}
