import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../components/ui/Button";
import { FaDiscord, FaGithub } from "react-icons/fa";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-violet-300 to-violet-50">
      <div className="mx-auto max-w-md px-6 sm:max-w-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
        <div className="lg:py-24">
          <h1 className="mt-4 text-center text-4xl font-bold tracking-tight text-zinc-800 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
            <span className="block">A better way to</span>
            <span className="block bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text pb-3 text-transparent sm:pb-5">
              track your bills
            </span>
          </h1>
          <p className="text-base text-zinc-800 sm:text-xl lg:text-lg xl:text-xl">
            Introducing Artemecion, an easy way to track your bills
          </p>
          <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
            <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
              <Button
                variant="default"
                type="button"
                onClick={
                  sessionData
                    ? () => void signOut()
                    : () =>
                        void signIn("discord", { callbackUrl: "/dashboard" })
                }
              >
                <FaDiscord className="-ml-1 mr-2 h-5 w-5" />
                {sessionData ? "Sign out" : "Sign in"}
              </Button>
              <Button variant="outline">
                <FaGithub className="-ml-1 mr-2 h-5 w-5" />
                <Link
                  href={"https://github.com/alexisveryreal/artemecion"}
                  target="_blank"
                  referrerPolicy="no-referrer"
                >
                  Github
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
