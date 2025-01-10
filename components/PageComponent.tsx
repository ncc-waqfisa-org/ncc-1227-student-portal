import Link from "next/link";
import { useRouter } from "next/router";
import { FC, PropsWithChildren, ReactNode, useMemo } from "react";
import { Toaster } from "react-hot-toast";
import { useAuth } from "../hooks/use-auth";
import { SignInForm } from "./auth/sign-in-form";

import logo from "../public/svg/logo-white.svg";
import account from "../public/svg/account.svg";
import background from "../public/images/headerBg.jpg";
import footerBg from "../public/images/footerBg.jpg";
import Image from "next/image";
import { useBachelorContext } from "../contexts/BachelorContexts";
import { useTranslation } from "react-i18next";
import { LangSwitcher } from "./langSwitcher";
import { RegPeriod, RegPeriodDialog } from "./reg-period";
import { cn } from "../src/lib/utils";
import { useAppContext } from "../contexts/AppContexts";
import { ApplicantType } from "../src/API";

interface Props {
  title: string;
  authRequired?: boolean;
  header?: ReactNode;
  className?: string;
}

export const PageComponent: FC<PropsWithChildren<Props>> = (props) => {
  const { isSignedIn, user, signOut, isInitializing: init } = useAuth();
  const { studentAsStudent: student } = useAppContext();
  const { back, locale, push, pathname } = useRouter();
  const titleTranslation = useTranslation("pageTitles");
  const footerTranslation = useTranslation("footer");
  const isInitializing = init ?? true;

  const isHomePage = pathname === "/";

  const applicantName = useMemo(
    () =>
      student
        ? student.m_applicantType.includes(ApplicantType.MASTER)
          ? `${student.m_firstName} ${student.m_lastName}`
          : student.fullName ?? null
        : null,
    [student]
  );

  async function signUserOut() {
    await signOut().then(() => {
      location.reload();
    });
  }

  function goBack() {
    back();
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
          <div className="flex justify-center items-center w-full h-full min-h-screen bg-gray-200 animate-pulse">
            <div dir="ltr" className="btn btn-ghost hover:bg-transparent">
              {<span className="loading"></span>}
              {titleTranslation.t("loading")}
            </div>
          </div>
        ) : (
          <div className="relative bg-secondary md:m-10 rounded-b-5xl md:rounded-b-2xl md:rounded-t-2xl">
            <div
              className="object-cover relative w-full overflow-clip rounded-b-5xl md:rounded-b-2xl md:rounded-t-2xl"
              style={{
                backgroundImage: `url(${background.src})`,
                backgroundSize: "cover",
                backgroundPosition: "0% 100%",
              }}
            >
              <div className="flex relative flex-col gap-3 items-center p-11 w-full bg-secondary/20 text-secondary-content md:p-20 md:pt-10">
                <Image
                  className="w-40 md:w-52 hover:cursor-pointer"
                  src={logo}
                  alt="logo"
                  onClick={() =>
                    push(
                      student?.m_applicantType.includes(ApplicantType.MASTER)
                        ? "/?type=masters"
                        : "/?type=bachelor"
                    )
                  }
                />
                {user ? (
                  <div
                    tabIndex={0}
                    className="flex z-50 flex-col items-center p-2 rounded-lg hover:cursor-pointer dropdown dropdown-bottom md:dropdown-end md:items-end md:absolute md:right-4 md:top-4 glass"
                  >
                    <div className="flex items-center">
                      <Image className="p-2 w-10" src={account} alt="account" />

                      <div className="text-white">
                        <p>{user?.getUsername()}</p>
                        {applicantName && <p>{applicantName}</p>}
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="p-2 mt-2 w-52 shadow rtl:md:-translate-x-14 dropdown-content text-secondary menu bg-base-100 rounded-box"
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
                ) : (
                  <div
                    onClick={() => push(`/${locale}/signIn`)}
                    className="flex z-50 flex-col items-center p-2 rounded-lg hover:cursor-pointer md:items-end md:absolute md:right-4 md:top-4 glass"
                  >
                    <div className="flex items-center">
                      <Image
                        className="p-2 w-10"
                        src={account}
                        alt="account"
                      />

                      <div className="pr-2 text-white rtl:pl-2">
                        <p>{titleTranslation.t("SignIn")}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="md:dropdown-end md:items-end md:absolute md:left-4 md:top-4">
                  <LangSwitcher></LangSwitcher>
                </div>
                {!isHomePage && (
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
                )}
                <div className="mt-10 w-full md:mt-16">{props.header}</div>
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
              <div
                className={cn(
                  "z-40 p-4 pt-20 -mt-10 md:pt-20 sm:pt-20 bg-base-100 sm:p-6 md:p-11",
                  props.className
                )}
              >
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
            <div className="flex flex-col justify-center mx-auto h-full">
              <Image
                className="w-40 max-h-24 md:w-52 hover:cursor-pointer"
                src={logo}
                alt="logo"
                onClick={() => push("/")}
              />
            </div>
            <div className="flex flex-col items-center mx-auto text-base-100 md:items-start">
              <span className="opacity-100 footer-title text-primary">
                {footerTranslation.t("quickLinks")}
              </span>
              <Link
                href={
                  locale === "ar"
                    ? "https://waqfisa.bh/ar/the-fund/"
                    : "https://waqfisa.bh/the-fund/"
                }
                className="link link-hover"
              >
                {footerTranslation.t("theFund")}
              </Link>
              <Link
                href={
                  locale === "ar"
                    ? "https://waqfisa.bh/ar/about-us/"
                    : "https://waqfisa.bh/about-us/"
                }
                className="link link-hover"
              >
                {footerTranslation.t("aboutUs")}
              </Link>
              <Link
                href={
                  locale === "ar"
                    ? "https://waqfisa.bh/ar/bachelor/applications/"
                    : "https://waqfisa.bh/bachelor/applications/"
                }
                className="link link-hover"
              >
                {footerTranslation.t("application")}
              </Link>
              <Link
                href={
                  locale === "ar"
                    ? "https://waqfisa.bh/ar/media-center/"
                    : "https://waqfisa.bh/media-center/"
                }
                className="link link-hover"
              >
                {footerTranslation.t("mediaCenter")}
              </Link>
              <Link href="/contact" className="link link-hover">
                {footerTranslation.t("contact")}
              </Link>
            </div>
          </footer>
          <div
            dir="ltr"
            className="justify-center px-10 py-4 text-center text-base-100 footer"
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
