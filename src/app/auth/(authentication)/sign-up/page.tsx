import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import { SignUpForm } from "@/features/auth/components/sign-up-form";

export default function SignUpPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-2xl font-semibold text-gray-900 lg:mb-3 lg:text-4xl dark:text-gray-50">
          Sign up
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Join today and enjoy endless quizzes.
        </p>
      </div>
      <div className="mb-8">
        <SignUpForm />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className={buttonVariants({
              variant: "link_color",
              size: "link_md",
            })}
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
