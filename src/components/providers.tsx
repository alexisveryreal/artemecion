"use client";

import * as React from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";

interface ProviderProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProviderProps) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider afterSignOutUrl="/">{children}</ClerkProvider>
      <Toaster
        icons={{
          success: <CheckCircledIcon />,
          error: <CrossCircledIcon />,
        }}
      />
    </NextThemesProvider>
  );
};
