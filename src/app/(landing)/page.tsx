import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-violet-300 to-primary-foreground dark:from-zinc-800 dark:to-background">
      <div className="mx-auto max-w-md px-6 sm:max-w-screen-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
        <div className="lg:py-24">
          <h1 className="tracking-light mt-4 text-center text-4xl font-bold sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
            <span className="block">A better way to</span>
            <span className="block bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text pb-3 text-transparent dark:from-violet-50 dark:to-violet-500 sm:pb-5">
              track your bills
            </span>
          </h1>
        </div>
      </div>
      <div className="mx-auto mt-5 flex max-w-sm sm:mt-0 sm:max-w-none sm:justify-center">
        <div className="flex w-full flex-col space-y-4 sm:mx-auto sm:inline-grid sm:w-auto sm:grid-cols-2 sm:gap-5 sm:space-y-0">
          <Button
            size="lg"
            variant="outline"
            asChild
            className="inline-flex w-full items-center justify-center"
          >
            <Link href="/sign-in" className="w-full">
              Sign in
            </Link>
          </Button>
          <Button
            size="lg"
            asChild
            className="inline-flex w-full items-center justify-center"
          >
            <Link href="/sign-up" className="w-full">
              Get started
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
