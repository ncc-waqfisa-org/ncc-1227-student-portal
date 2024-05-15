import {
  useState,
  useEffect,
  useContext,
  createContext,
  PropsWithChildren,
  FC,
  useCallback,
} from "react";
import { Auth, CognitoUser } from "@aws-amplify/auth";
import config from "../src/aws-exports";
import { toast } from "react-hot-toast";
import { API, graphqlOperation } from "aws-amplify";
import { GetStudentQuery } from "../src/API";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

Auth.configure({ ...config, ssr: true });

interface IUseAuthContext {
  user: CognitoUser | undefined;
  token: string | undefined;
  cpr: string | undefined;
  isSignedIn: boolean;
  isInitializing: boolean;
  signIn: (cpr: string, password: string) => Promise<CognitoUser | undefined>;
  signOut: () => Promise<void>;
  checkIfCprExist: (cpr: string) => Promise<boolean>;
  sendForgetPassword: (email: string) => Promise<boolean>;
  verifyForgetPassword: (
    cpr: string,
    otp: string,
    newPassword: string
  ) => Promise<boolean>;
}

const defaultState: IUseAuthContext = {
  user: undefined,
  isSignedIn: false,
  isInitializing: true,
  signIn: async () => undefined,
  signOut: async () => {},
  checkIfCprExist: async () => false,
  sendForgetPassword: async () => false,
  verifyForgetPassword: async () => false,
  token: undefined,
  cpr: undefined,
};

const AuthContext = createContext<IUseAuthContext>(defaultState);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// Access auth values and functions with custom useAuth hook
export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState<CognitoUser | undefined>(defaultState.user);
  const [isSignedIn, setIsSignedIn] = useState(defaultState.isSignedIn);
  const [isInitializing, setIsInitializing] = useState(
    defaultState.isInitializing
  );

  const { push } = useRouter();
  const { t } = useTranslation("toast");

  const token =
    user?.getSignInUserSession()?.getAccessToken().getJwtToken() ?? undefined;
  const cpr =
    user?.getSignInUserSession()?.getAccessToken().payload?.username ??
    undefined;

  /**
   * It checks if a CPR number is already in use by a student
   * @param {string} cpr - string - The CPR number of the student
   * @returns A boolean value.
   */
  async function checkIfCprExist(cpr: string): Promise<boolean> {
    const query = `
    query CheckIfStudentCprExist {
      getStudent(cpr: "${cpr}") {
        cpr
      }
    }
    `;

    let res = (await API.graphql(
      graphqlOperation(query)
    )) as GraphQLResult<GetStudentQuery>;

    return res.data?.getStudent != null;
  }

  async function sendForgetPassword(email: string): Promise<boolean> {
    try {
      return await Auth.forgotPassword(email).then(() => true);
    } catch (error) {
      console.log(
        "🚀 ~ file: use-auth.tsx:89 ~ sendForgetPassword ~ error:",
        error
      );
      return false;
    }
  }

  async function verifyForgetPassword(
    cpr: string,
    otp: string,
    newPassword: string
  ): Promise<boolean> {
    try {
      return await Auth.forgotPasswordSubmit(cpr, otp, newPassword).then(
        () => true
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: use-auth.tsx:89 ~ sendForgetPassword ~ error:",
        error
      );
      return false;
    }
  }

  const checkAuthUser = useCallback(async (user: CognitoUser) => {
    let isStudent = await checkIfCprExist(user.getUsername());
    if (!isStudent) {
      Auth.signOut();
      setIsSignedIn(false);
      setUser(undefined);
    }
    return isStudent;
  }, []);

  /**
   * It checks if the user is signed in, and if so, it sets the user state to the user object returned by
   * the Auth.currentAuthenticatedUser() method
   */
  const getAuthUser = useCallback(async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();

      if (authUser) {
        await checkAuthUser(authUser).then((isStudent) => {
          if (isStudent) {
            setIsSignedIn(true);
            setUser(authUser);
          }
        });
      }
      setIsInitializing(false);
    } catch (error) {
      setIsSignedIn(false);
      setUser(undefined);
      setIsInitializing(false);
    }
  }, [checkAuthUser]);

  useEffect(() => {
    // NOTE: check for user or risk an infinite loop
    if (!user) {
      // On component mount
      // If a user cookie exists
      // reset the user to it
      getAuthUser();
    }
  }, [getAuthUser, user]);

  /**
   * It signs in a user with the given credentials.
   * @param {string} cpr - string, password: string
   * @param {string} password - string - The password of the user
   */
  const signIn = (
    cpr: string,
    password: string
  ): Promise<CognitoUser | undefined> =>
    toast.promise(
      checkIfCprExist(cpr)
        .then(async (cprExist) => {
          if (cprExist) {
            const cognitoUser = await Auth.signIn(cpr, password).catch(
              (error) => {
                // console.log("signIn error", error);

                if (error.code === "UserNotConfirmedException") {
                  push({ pathname: "/verify-email", query: { cpr: cpr } });
                }
              }
            );
            setIsSignedIn(true);
            setUser(cognitoUser);
            return cognitoUser;
          } else {
            throw new Error(t("cprDoesNotExist") ?? "cpr does not exist");
            // throw new Error("CPR does not exist");
          }
        })
        .catch((e) => {
          if (e.errors && e.errors[0]) {
            throw e.errors[0];
          } else {
            throw e;
          }
        }),
      {
        loading: t("signingIn") ?? "Signing in...",
        success: (authUser) => {
          return `${authUser?.getUsername()} ${
            t("successfullySignedIn") ?? "Successfully signed in"
          }`;
        },
        error: (error) => {
          return `${
            error ? error.message : t("errorSigningIn") ?? "Error signing in"
          }`;
        },
      }
    );

  /**
   * It signs out the user.
   */
  const signOut = (): Promise<void> =>
    toast.promise(
      Auth.signOut().then(() => {
        setIsSignedIn(false);
        setUser(undefined);
      }),
      {
        loading: t("signingOut") ?? "Signing Out...",
        success: t("signedOut") ?? "Signed out",
        error: (error) => {
          return `${error?.message}`;
        },
      }
    );

  return {
    user,
    token,
    cpr,
    isSignedIn,
    signIn,
    signOut,
    checkIfCprExist,
    sendForgetPassword,
    verifyForgetPassword,
    isInitializing,
  };
}
