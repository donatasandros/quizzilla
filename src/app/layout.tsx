import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import * as React from "react";

import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { ModeToggle } from "@/components/ui/mode-toggle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Quizzilla",
  description: "Quizzilla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${inter.variable} relative min-h-screen overflow-x-hidden bg-white antialiased dark:bg-gray-950`}
      >
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <div className="fixed right-2 bottom-2 z-[100]">
            <ModeToggle />
          </div>
          <NuqsAdapter>{children}</NuqsAdapter>
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
