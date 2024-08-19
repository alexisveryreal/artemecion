import React from "react";

interface SingInLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: SingInLayoutProps) => {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-b from-violet-300 to-primary-foreground">
      {children}
    </div>
  );
};

export default AuthLayout;
