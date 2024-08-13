"use client";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface StackedLayoutProps {
  navbar: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

const StackedLayout = ({ children, navbar, sidebar }: StackedLayoutProps) => {
  return (
    <div className="relative isolate flex min-h-svh w-full flex-col">
      <Sheet>
        <header className="flex items-center px-4">
          <div className="py-2.5 lg:hidden">
            <SheetTrigger asChild>
              <Button
                variant="outline"
                aria-label="Open navigation"
                size="icon"
              >
                <HamburgerMenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
          </div>
          <div className="min-w-0 flex-1">{navbar}</div>
        </header>

        <SheetContent side="left" className="lg:hidden">
          {sidebar}
        </SheetContent>
      </Sheet>
      <main className="flex flex-1 flex-col pb-2 lg:px-2">
        <div className="grow p-6 lg:rounded-lg lg:p-10 lg:shadow-sm lg:ring-1 lg:ring-zinc-950/5 dark:lg:bg-zinc-900 dark:lg:ring-white/10">
          <div className="mx-auto max-w-6xl">{children}</div>
        </div>
      </main>
    </div>
  );
};

export { StackedLayout };
