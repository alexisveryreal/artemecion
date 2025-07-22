import React from "react";

interface SingInLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: SingInLayoutProps) => {
  return (
    <div className="to-primary-foreground flex h-full items-center justify-center bg-gradient-to-b from-violet-300">
      {children}
    </div>
  );
};

export default AuthLayout;
