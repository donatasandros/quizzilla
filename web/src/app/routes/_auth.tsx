import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

import { auth } from "@/api/lib/auth";

const getSession = createServerFn().handler(async () => {
  const request = getWebRequest();
  if (!request) {
    throw new Error("Invalid request.");
  }

  const authState = await auth.api.getSession({
    headers: request.headers,
  });

  return authState?.session;
});

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const session = await getSession();

    if (session) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return <Outlet />;
}
