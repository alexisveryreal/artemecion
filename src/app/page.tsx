import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-violet-300 to-primary-foreground text-white">
      <div className="mx-auto max-w-md px-6 sm:max-w-screen-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
        <div className="lg:py-24">
          <h1 className="tracking-light mt-4 text-center text-4xl font-bold text-zinc-800 sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
            <span className="block">A better way to</span>
            <span className="block bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text pb-3 text-transparent sm:pb-5">
              track your bills
            </span>
          </h1>
        </div>
      </div>
    </main>
  );
}
