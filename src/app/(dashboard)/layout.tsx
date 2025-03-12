import * as React from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { MainNav } from "@/features/dashboard/components/main-nav";
import { MobileNav } from "@/features/dashboard/components/mobile-nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      className="md:has-data-[variant=sidebar]:[&>div]:!w-[65px]"
      style={
        {
          "--sidebar-width-icon": "65px",
          "--sidebar-width": "310px",
        } as React.CSSProperties
      }
    >
      <MainNav />
      <SidebarInset>
        <MobileNav />
        <main className="h-full px-4 py-8 md:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
