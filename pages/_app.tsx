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

function App({ Component, pageProps }: AppProps) {
  Amplify.configure({ ...config, ssr: true });
  Auth.configure({ ...config, ssr: true });
  API.configure({ ...config, ssr: true });
  Storage.configure({ ...config, ssr: true });

  const { locale } = useRouter();

  const dir = locale === "ar" ? "rtl" : "ltr";

  // useEffect(() => {
  //   Crisp.configure(`${process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID}`, {
  //     locale: locale,
  //     autoload: true,
  //   });

  //   return () => {};
  // }, [locale]);

  return (
    <div dir={dir} className={locale === "ar" ? "font-IBMArabic" : "font-IBM"}>
      <AuthProvider>
        <AppProvider>
          <NextNProgress color="#BB9869" />
          <Component {...pageProps} />
        </AppProvider>
      </AuthProvider>
    </div>
  );
}

export default appWithTranslation(App);
