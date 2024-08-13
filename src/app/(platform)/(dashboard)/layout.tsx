import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { StackedLayout } from "@/components/stacked-layout";
import { Button } from "@/components/ui/button";
import {
  Navbar,
  NavbarDivider,
  NavbarSection,
  NavbarSpacer,
} from "@/components/ui/navbar";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StackedLayout
      navbar={
        <Navbar>
          <Logo />
          <NavbarDivider className="max-lg:hidden" />
          <NavbarSection className="max-lg:hidden">
            <Button size="sm" variant="outline" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            <div className="flex w-full items-center justify-between space-x-4 md:w-auto">
              <ModeToggle />
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: {
                      height: 30,
                      width: 30,
                    },
                  },
                }}
              />
            </div>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <div className="flex w-auto flex-col items-start justify-center space-y-4">
          <Link href="/">
            <div className="flex items-center gap-x-2 transition hover:opacity-75">
              <Image src="/images/icon.svg" alt="Logo" height={30} width={30} />
              <p className={cn("pb-1 text-lg")}>Artemecion</p>
            </div>
          </Link>
          <Separator className="w-full" />
          <Button size="sm" variant="outline" asChild>
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>
      }
    >
      {children}
    </StackedLayout>
  );
};

export default DashboardLayout;
