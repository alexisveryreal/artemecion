import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Inter } from "@next/font/google";

import { api } from "../utils/api";

import "../styles/globals.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={`${inter.variable} font-sans`}>
        <Head>
          <title>Artemecion</title>
          <meta
            name="description"
            content="save your bills like the moogles would"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
