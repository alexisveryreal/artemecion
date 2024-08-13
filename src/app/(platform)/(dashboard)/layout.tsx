import Image from "next/image";
import Link from "next/link";
import { SignOutButton, UserButton } from "@clerk/nextjs";

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
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StackedLayout
      navbar={
        <Navbar>
          <Logo />
          <NavbarDivider className="max-lg:hidden" />
          <NavbarSection className="max-lg:hidden">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
        <div>
          <NavigationMenu orientation="vertical">
            <NavigationMenuList className="grid grid-cols-1">
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    <div className="flex items-center gap-x-2 transition">
                      <Image
                        src="/images/icon.svg"
                        alt="Logo"
                        height={30}
                        width={30}
                      />
                      <p className={cn("pb-1 text-lg")}>Artemecion</p>
                    </div>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <Separator className="my-4" />
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      }
    >
      {children}
    </StackedLayout>
  );
};

export default DashboardLayout;
