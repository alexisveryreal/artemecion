"use client";

import React from "react";

import { cn } from "@/lib/utils";

const Navbar = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"nav">) => {
  return (
    <nav
      {...props}
      className={cn(className, "flex flex-1 items-center gap-4 py-2.5")}
    />
  );
};

const NavbarDivider = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={cn(className, "h-6 w-px bg-zinc-950/10 dark:bg-white/10")}
    />
  );
};

const NavbarSection = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div {...props} className={cn(className, "flex items-center gap-3")} />
  );
};

const NavbarSpacer = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      aria-hidden="true"
      {...props}
      className={cn(className, "-ml-4 flex-1")}
    />
  );
};

const NavbarLabel = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) => {
  return <span {...props} className={cn(className, "truncate")} />;
};

export { Navbar, NavbarDivider, NavbarSection, NavbarSpacer, NavbarLabel };
