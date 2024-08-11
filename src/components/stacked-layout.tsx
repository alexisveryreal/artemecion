// use Sheet from shadcn for mobile
// do a normal navbar on desktop

import * as React from "react";

interface StackedLayoutProps {
  children: React.ReactNode;
}

export const StackedLayout = ({ children }: StackedLayoutProps) => {
  return (
    <div className="relative isolate flex min-h-svh w-full flex-col bg-white dark:bg-zinc-900 lg:bg-zinc-100 dark:lg:bg-zinc-950">
      {/* Sidebar on mobile w/sheet */}

      {/* Navbar */}

      {/* Content */}
      <main className="flex flex-1 flex-col pb-2 lg:px-2">
        <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
          <div className="mx-auto max-w-screen-2xl">{children}</div>
        </div>
      </main>
    </div>
  );
};
