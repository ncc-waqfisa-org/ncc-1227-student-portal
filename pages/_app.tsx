import "../styles/globals.css";
import "@aws-amplify/ui-react/styles.css";
import type { AppProps } from "next/app";
import { Amplify, API, Auth, Storage } from "aws-amplify";
import { Auth as atAuth } from "@aws-amplify/auth";
import atAPIG from "@aws-amplify/api-graphql";

import config from "../src/aws-exports";

import { AuthProvider } from "../hooks/use-auth";
import { appWithTranslation } from "next-i18next";
import { useRouter } from "next/router";
// import { useEffect } from "react";
// import { Crisp } from "crisp-sdk-web";

import NextNProgress from "nextjs-progressbar";

import React, { ReactElement, ReactNode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextPage } from "next";
import { AppProvider } from "../contexts/AppContexts";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function App({ Component, pageProps }: AppPropsWithLayout) {
  Amplify.configure({ ...config, ssr: true });
  Auth.configure({ ...config, ssr: true });
  API.configure({ ...config, ssr: true });
  Storage.configure({ ...config, ssr: true });
  atAuth.configure({ ...config, ssr: true });

  atAPIG.configure({ ...config, ssr: true });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 60 * 1000,
      },
    },
  });

  const { locale } = useRouter();

  const dir = locale === "ar" ? "rtl" : "ltr";

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <div dir={dir} className={locale === "ar" ? "font-IBMArabic" : "font-IBM"}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <AppProvider>
            <NextNProgress color="#BB9869" />
            {/* <Component {...pageProps} /> */}
            {getLayout(<Component {...pageProps} />)}
          </AppProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}

export default appWithTranslation(App);
