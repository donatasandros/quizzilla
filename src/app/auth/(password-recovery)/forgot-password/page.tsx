import { KeyRoundIcon } from "lucide-react";
import * as React from "react";

import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export default function Page() {
  return (
    <React.Fragment>
      <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-950">
        <KeyRoundIcon className="size-7 text-gray-700 dark:text-gray-300" />
      </div>
      <div className="mb-8 text-center">
        <h1 className="dark:text-gray-50text-gray-900 mb-2 text-2xl font-semibold md:mb-3 md:text-3xl">
          Forgot password?
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          No worries, we&#39;ll send you reset instructions.
        </p>
      </div>
      <div className="w-full">
        <ForgotPasswordForm />
      </div>
    </React.Fragment>
  );
}
