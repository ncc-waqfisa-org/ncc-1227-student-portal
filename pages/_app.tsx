import "../styles/globals.css";
import "@aws-amplify/ui-react/styles.css";
import type { AppProps } from "next/app";
import { Amplify, API, Auth, Storage } from "aws-amplify";
import config from "../src/aws-exports";

import { AppProvider } from "../contexts/AppContexts";
import { AuthProvider } from "../hooks/use-auth";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { Crisp } from "crisp-sdk-web";

import NextNProgress from "nextjs-progressbar";

import React from "react";
import { bugsnagClient } from "../src/bugsnag";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App({ Component, pageProps }: AppProps) {
  Amplify.configure({ ...config, ssr: true });
  Auth.configure({ ...config, ssr: true });
  API.configure({ ...config, ssr: true });
  Storage.configure({ ...config, ssr: true });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 60 * 1000,
      },
    },
  });

  const { locale } = useRouter();

  const dir = locale === "ar" ? "rtl" : "ltr";

  const ErrorBoundary = bugsnagClient
    .getPlugin("react")
    ?.createErrorBoundary(React);

  // useEffect(() => {
  //   Crisp.configure(`${process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID}`, {
  //     locale: locale,
  //     autoload: true,
  //   });

  //   return () => {};
  // }, [locale]);

  return (
    <div dir={dir} className={locale === "ar" ? "font-IBMArabic" : "font-IBM"}>
      {ErrorBoundary ? (
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <AppProvider>
                <NextNProgress color="#BB9869" />
                <Component {...pageProps} />
              </AppProvider>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ErrorBoundary>
      ) : (
        <AuthProvider>
          <AppProvider>
            <NextNProgress color="#BB9869" />
            <Component {...pageProps} />
          </AppProvider>
        </AuthProvider>
      )}
    </div>
  );
}

export default appWithTranslation(App);
