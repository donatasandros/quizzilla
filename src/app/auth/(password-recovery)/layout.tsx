import * as React from "react";

export default function PasswordRecoveryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-blue-500">{children}</div>;
}
