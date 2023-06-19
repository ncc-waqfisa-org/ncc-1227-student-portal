import Link from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../hooks/use-auth";
import { SignInForm } from "./auth/sign-in-form";

import logo from "../public/svg/logo-white.svg";
import account from "../public/svg/account.svg";
import background from "../public/images/headerBg.jpg";
import footerBg from "../public/images/footerBg.jpg";
import Image from "next/image";
import { useAppContext } from "../contexts/AppContexts";
import { useTranslation } from "react-i18next";
import { LangSwitcher } from "./langSwitcher";

interface Props {
  title: string;
  authRequired?: boolean;
  header?: ReactNode;
}

export const PageComponent: FC<PropsWithChildren<Props>> = (props) => {
  const { isSignedIn, user, signOut, isInitializing: init } = useAuth();
  const { student, resetContext } = useAppContext();
  const router = useRouter();
  const titleTranslation = useTranslation("pageTitles");
  const footerTranslation = useTranslation("footer");
  const isInitializing = init ?? true;

  async function signUserOut() {
    await signOut().then(() => {
      resetContext();
    });
  }

  function goBack() {
    router.back();
  }

  return (
    <>
      <Toaster
        toastOptions={{
          className: "ltr",
        }}
      />
      <div className="flex flex-col justify-between min-h-screen">
        {isInitializing ? (
          <div className="flex items-center justify-center w-full h-full min-h-screen bg-gray-200 animate-pulse">
            <div
              dir="ltr"
              className="btn btn-ghost hover:bg-transparent loading"
            >
              {titleTranslation.t("loading")}
            </div>
          </div>
        ) : (
          <div className="relative bg-secondary md:m-10 rounded-b-5xl md:rounded-b-2xl md:rounded-t-2xl ">
            <div
              className="relative object-cover w-full rounded-b-5xl md:rounded-b-2xl overflow-clip md:rounded-t-2xl"
              style={{
                backgroundImage: `url(${background.src})`,
                backgroundSize: "cover",
                backgroundPosition: "0% 100%",
              }}
            >
              <div className="relative flex flex-col items-center w-full gap-3 bg-secondary/20 text-secondary-content p-11 md:p-20 md:pt-10">
                <Image
                  className="w-40 md:w-52 hover:cursor-pointer"
                  src={logo}
                  alt="logo"
                  onClick={() => router.push("/")}
                />
                {user && (
                  <div
                    tabIndex={0}
                    className="flex flex-col items-center p-2 rounded-lg hover:cursor-pointer dropdown dropdown-bottom md:dropdown-end md:items-end md:absolute md:right-4 md:top-4 glass"
                  >
                    <div className="flex ">
                      <Image
                        className="w-10 p-2 "
                        src={account}
                        alt="account"
                      />

                      <div className="text-white">
                        <p>{student?.getStudent?.fullName}</p>
                        <p>{user?.getUsername()}</p>
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="p-2 mt-2 shadow dropdown-content text-secondary menu bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <Link href={"/account"}>
                          {footerTranslation.t("account")}
                        </Link>
                      </li>
                      <li>
                        <div onClick={signUserOut}>
                          {footerTranslation.t("signOut")}
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
                <div className="md:dropdown-end md:items-end md:absolute md:left-4 md:top-4">
                  <LangSwitcher></LangSwitcher>
                </div>
                <button
                  dir="ltr"
                  type="button"
                  onClick={goBack}
                  className="text-white btn btn-ghost md:absolute md:left-4 md:bottom-4"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="mr-1 feather feather-chevron-left"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                  {titleTranslation.t("Back")}
                </button>
                <div className="w-full mt-10 md:mt-16">{props.header}</div>
                {!props.header && (
                  <div className="prose prose-headings:text-white">
                    <h1 className="font-semibold">
                      {titleTranslation.t(props.title)}
                    </h1>
                  </div>
                )}
              </div>
            </div>

            {
              <div className="z-40 pt-20 -mt-10 bg-base-100 p-11">
                {props.authRequired && !isSignedIn ? (
                  <div>
                    <SignInForm></SignInForm>
                  </div>
                ) : (
                  props.children
                )}
              </div>
            }
          </div>
        )}
        <div
          className="divide-y divide-primary-content"
          style={{
            backgroundImage: `url(${footerBg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "50% 75%",
          }}
        >
          <footer className="justify-center p-10 md:justify-around footer text-secondary-content">
            <div className="flex flex-col justify-center h-full mx-auto">
              <Image
                className="w-40 md:w-52 max-h-24 hover:cursor-pointer"
                src={logo}
                alt="logo"
                onClick={() => router.push("/")}
              />
            </div>
            <div className="flex flex-col items-center mx-auto text-base-100 md:items-start">
              <span className="opacity-100 footer-title text-primary">
                {footerTranslation.t("quickLinks")}
              </span>
              <a className="link link-hover">
                {footerTranslation.t("theFund")}
              </a>
              <a className="link link-hover">
                {footerTranslation.t("aboutUs")}
              </a>
              <a className="link link-hover">
                {footerTranslation.t("application")}
              </a>
              <a className="link link-hover">
                {footerTranslation.t("mediaCenter")}
              </a>
              <a
                className="link link-hover"
                onClick={() => router.push("/contact")}
              >
                {footerTranslation.t("contact")}
              </a>
            </div>
            {/* <div className="flex flex-col items-center mx-auto text-base-100 md:items-start">
              <span
                className="opacity-100 footer-title text-primary"
                onClick={() => router.push("/contact")}
              >
                {footerTranslation.t("contactUs")}
              </span>
              <a dir="ltr">1744 4444</a>
              <a>edutrust@meo.gov.bh</a> 
            </div> */}
          </footer>
          <div
            dir="ltr"
            className="justify-center px-10 py-4 text-center text-base-100 footer "
          >
            <p>
              © {new Date().getFullYear()} isa bin salman education charitable
              trust
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
