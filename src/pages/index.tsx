import { type NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import { Button } from "../components/ui/Button";
import { FaDiscord, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/20/solid";

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
          <div className="mx-auto mt-10 flex max-w-sm sm:max-w-none sm:justify-center">
            <div className="flex w-full flex-col space-y-4 sm:mx-auto sm:inline-grid sm:w-auto sm:grid-cols-2 sm:gap-5 sm:space-y-0">
              {!sessionData ? (
                <Button
                  variant="default"
                  type="button"
                  onClick={() =>
                    void signIn("discord", { callbackUrl: "/dashboard" })
                  }
                >
                  <FaDiscord
                    className="-ml-1 mr-2 h-5 w-5"
                    aria-hidden="true"
                  />
                  Sign in
                </Button>
              ) : (
                <Link
                  href="/create-bill"
                  className="inline-flex w-full items-center justify-center"
                >
                  <Button variant="default" type="button" className="w-full">
                    <PlusIcon
                      className="-ml-1 mr-2 h-5 w-5"
                      aria-hidden="true"
                    />
                    New Bill
                  </Button>
                </Link>
              )}

              <Link
                href={"https://github.com/alexisveryreal/artemecion"}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center"
              >
                <Button variant="outline" className="w-full">
                  <FaGithub className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  Github
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
