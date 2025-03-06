import * as React from "react";

import { MainNav } from "@/features/marketing/components/main-nav";
import { MobileNav } from "@/features/marketing/components/mobile-nav";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <MainNav />
      <MobileNav />
      <main className="relative overflow-hidden pt-16 md:pt-[76px]">
        {children}
      </main>
    </div>
  );
}
