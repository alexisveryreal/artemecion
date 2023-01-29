import { Inter } from "@next/font/google";
import Head from "next/head";
import Navbar from "./Navbar";
import type { ReactNode, FC } from "react";
import { useSession } from "next-auth/react";
import Footer from "./Footer";

type LayoutProps = {
  children?: ReactNode;
};

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const Layout: FC<LayoutProps> = ({ children }) => {
  const { data: sessionData, status } = useSession();

  return (
    <main className={`${inter.variable} font-sans`}>
      <Head>
        <title>Artemecion</title>
        <meta
          name="description"
          content="save your bills like the moogles would"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        email={sessionData?.user?.email ?? undefined}
        image={sessionData?.user?.image ?? undefined}
        name={sessionData?.user?.name ?? undefined}
        status={status}
      />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
