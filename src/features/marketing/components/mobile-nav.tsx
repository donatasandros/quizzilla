"use client";

import { MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { UserButton } from "@/features/auth/components/user-button";
import { NAV_LINKS } from "@/features/marketing/constants";
import { useUser } from "@/lib/auth/client";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const { isSignedIn } = useUser();

  const onOpenChange = React.useCallback((open: boolean) => {
    setOpen(open);
  }, []);

  return (
    <nav className="fixed z-10 w-full bg-white/80 px-4 py-3 backdrop-blur-lg md:hidden dark:bg-gray-950/80">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="https://placehold.co/139x32/png?text=Logo"
            width={139}
            height={32}
            alt="Quizzilla logo"
          />
        </Link>
        <div className="flex items-center gap-x-3">
          <UserButton />
          <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerTrigger asChild>
              <Button variant="tertiary" size="icon_md">
                <MenuIcon />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerTitle className="sr-only">Navigation menu</DrawerTitle>
              <div className="flex flex-col gap-4 p-6">
                <ul className="space-y-0.5">
                  {NAV_LINKS.map(({ id, href, label }) => (
                    <li key={id}>
                      <Link
                        href={href}
                        onClick={() => {
                          onOpenChange(false);
                        }}
                        className="block py-3 font-semibold text-gray-900 dark:text-gray-50"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
                {!isSignedIn && (
                  <ul className="space-y-3">
                    <li>
                      <Link
                        href="/auth/sign-up"
                        className={buttonVariants({
                          variant: "primary",
                          size: "lg",
                          class: "w-full",
                        })}
                      >
                        Sign up
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/auth/sign-in"
                        className={buttonVariants({
                          variant: "secondary",
                          size: "lg",
                          class: "w-full",
                        })}
                      >
                        Log in
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </nav>
  );
}
