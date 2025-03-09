import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { SignInForm } from "@/features/auth/components/sign-in-form";

export default function Page() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900 lg:mb-3 lg:text-4xl dark:text-gray-50">
          Log in
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Please enter your details.
        </p>
      </div>
      <div className="mb-8">
        <SignInForm />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Don&#39;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className={buttonVariants({
              variant: "link_color",
              size: "link_md",
            })}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
