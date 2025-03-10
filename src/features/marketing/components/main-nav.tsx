import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { NAV_LINKS } from "@/features/marketing/constants";

export function MainNav() {
  return (
    <nav className="fixed left-1/2 z-10 w-full max-w-[1280px] -translate-x-1/2 px-8 pt-3 max-md:hidden">
      <div className="flex h-16 justify-between rounded-2xl border border-gray-200 bg-white p-3 shadow-xs dark:border-gray-800 dark:bg-gray-950">
        <div className="flex items-center gap-x-8">
          <Link href="/">
            <Image
              src="https://placehold.co/139x32/png?text=Logo"
              width={139}
              height={32}
              alt="Quizzilla logo"
            />
          </Link>
          <ul className="flex items-center gap-x-5">
            {NAV_LINKS.map(({ id, label, href }) => (
              <li key={id}>
                <Link
                  href={href}
                  className="font-semibold text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-x-3">
          <Link
            href="/auth/sign-in"
            className={buttonVariants({ variant: "secondary", size: "md" })}
          >
            Log in
          </Link>
          <Link
            href="/auth/sign-up"
            className={buttonVariants({ variant: "primary", size: "md" })}
          >
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}
