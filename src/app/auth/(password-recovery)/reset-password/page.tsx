import { LockKeyholeIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { createLoader, parseAsString, SearchParams } from "nuqs/server";
import * as React from "react";

import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

const searchParams = {
  token: parseAsString,
};

const loadSearchParams = createLoader(searchParams);

interface PageProps {
  searchParams: Promise<SearchParams>;
}

export default async function Page({ searchParams }: PageProps) {
  const { token } = await loadSearchParams(searchParams);

  if (!token) {
    redirect("/auth/forgot-password");
  }

  return (
    <React.Fragment>
      <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-gray-950">
        <LockKeyholeIcon className="size-7 text-gray-700 dark:text-gray-300" />
      </div>
      <div className="mb-8 text-center">
        <h1 className="dark:text-gray-50text-gray-900 mb-2 text-2xl font-semibold md:mb-3 md:text-3xl">
          Set new password
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Must be at least 8 characters.
        </p>
      </div>
      <div className="w-full">
        <ResetPasswordForm token={token} />
      </div>
    </React.Fragment>
  );
}
