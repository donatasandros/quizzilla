import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@/features/auth/components/user-button";


export function MobileNav() {
  return (
    <nav className="flex h-16 items-center justify-between border-b border-gray-200 py-3 pr-2 pl-4 md:hidden dark:border-gray-800">
      <Link href="/overview">
        <Image
          src="https://placehold.co/139x32/png?text=Logo"
          width={139}
          height={32}
          alt="Quizzilla logo"
        />
      </Link>
      <div className="flex items-center gap-x-3">
        <UserButton />
        <SidebarTrigger />
      </div>
    </nav>
  );
}
