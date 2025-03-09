import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { GridPattern } from "@/components/decorations/grid-pattern";
import { buttonVariants } from "@/components/ui/button";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col items-center px-4 pt-12 md:px-8 md:py-24">
      <GridPattern
        cellSize="48x48"
        containerSize="768x768"
        mask="radial-center"
        className="absolute -top-[260px] left-1/2 z-[-1] -translate-x-1/2"
      />
      <div className="mx-auto w-full max-w-[360px]">
        {children}
        <div className="mt-8 flex justify-center">
          <Link
            href="/auth/sign-in"
            className={buttonVariants({
              variant: "link",
              size: "link_md",
            })}
          >
            <ArrowLeftIcon />
            Back to log in
          </Link>
        </div>
      </div>
    </div>
  );
}
