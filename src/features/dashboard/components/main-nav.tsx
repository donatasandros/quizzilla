"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton } from "@/features/auth/components/user-button";
import { NAV_BOTTOM_LINKS, NAV_LINKS } from "@/features/dashboard/constants";

export function MainNav() {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="!w-[calc(var(--sidebar-width-icon)_+_1px)]"
    >
      <SidebarHeader className="px-4 pt-4 pb-4 md:px-3 md:pt-5">
        <Link href="/overview">
          <Image
            alt="Quizzilla logo"
            width={40}
            height={40}
            src="https://placehold.co/40x40/png?text=Logo"
            className="max-md:hidden"
          />
          <Image
            alt="Quizzilla logo"
            width={139}
            height={32}
            src="https://placehold.co/139x32/png?text=Logo"
            className="md:hidden"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent className="max-md:pb-5">
        <SidebarGroup className="px-2 md:px-3">
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_LINKS.map(({ id, icon: Icon, label, href }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton
                    tooltip={{
                      children: label,
                      hidden: false,
                      className: "max-md:hidden",
                    }}
                    isActive={pathname.includes(href)}
                    asChild
                    className="md:size-10 md:p-2.5 md:data-[active=true]:[&>svg]:text-gray-700 md:dark:data-[active=true]:[&>svg]:text-gray-300"
                  >
                    <Link href={href}>
                      <Icon />
                      <span className="md:hidden">{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {NAV_BOTTOM_LINKS.map(({ id, icon: Icon, label, href }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton
                    tooltip={{
                      children: label,
                      hidden: false,
                      className: "max-md:hidden",
                    }}
                    isActive={pathname.includes(href)}
                    asChild
                    className="md:size-10 md:p-2.5 md:data-[active=true]:[&>svg]:text-gray-700 md:dark:data-[active=true]:[&>svg]:text-gray-300"
                  >
                    <Link href={href}>
                      <Icon />
                      <span className="md:hidden">{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="items-center px-3 pt-4 pb-5 max-md:hidden">
        <UserButton align="start" />
      </SidebarFooter>
    </Sidebar>
  );
}
