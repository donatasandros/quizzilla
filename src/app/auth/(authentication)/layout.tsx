import Image from "next/image";
import * as React from "react";

import { LinePattern } from "@/components/decorations/line-pattern";
import { FeatureCarousel } from "@/features/auth/components/feature-carousel";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="ml-auto flex w-full px-4 pt-12 max-lg:justify-center max-lg:pb-12 lg:max-w-[720px] lg:flex-col lg:items-center lg:px-8">
        <div className="flex w-full max-w-[360px] flex-1 flex-col">
          <div className="mb-6 lg:mb-20">
            <Image
              src="https://placehold.co/139x32/png?text=Logo"
              alt="Quizzilla logo"
              width={139}
              height={32}
              className="max-lg:hidden"
            />
            <Image
              src="https://placehold.co/40x40/png?text=Logo"
              alt="Quizzilla logo"
              width={40}
              height={40}
              className="lg:hidden"
            />
          </div>
          {children}
        </div>
        <div className="w-full py-8 text-left max-lg:hidden">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © 2025 Quizzilla
          </p>
        </div>
      </div>
      <div className="relative hidden items-center justify-center overflow-hidden bg-[linear-gradient(45deg,_var(--color-brand-900)_0%,_var(--color-brand-600)_100%)] px-8 pt-12 pb-8 lg:flex dark:bg-gray-800 dark:bg-none">
        <FeatureCarousel />
        <LinePattern className="**:stroke-brand-500 absolute -bottom-[256px] -left-10 dark:**:stroke-gray-500" />
        <LinePattern className="**:stroke-brand-500 absolute top-0 right-0 dark:**:stroke-gray-500" />
      </div>
    </div>
  );
}
