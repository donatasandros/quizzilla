import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";

import { auth } from "@/api/lib/auth";
import { UserButton } from "@/web/features/auth/components/user-button";

const getAuth = createServerFn().handler(async () => {
  const request = getWebRequest();
  if (!request) {
    throw new Error("Invalid request.");
  }

  const authState = await auth.api.getSession({
    headers: request.headers,
  });

  return authState;
});

export const Route = createFileRoute("/_protected")({
  beforeLoad: async () => {
    const authState = await getAuth();

    if (!authState?.session) {
      throw redirect({ to: "/auth/login" });
    }

    return authState;
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  const { user } = Route.useRouteContext();

  return (
    <div>
      <div className="flex h-16 items-center gap-x-6 border-b px-4">
        <ul className="flex items-center space-x-6">
          <li>
            <Link
              to="/dashboard"
              activeProps={{
                className: "text-primary",
              }}
              className="hover:text-primary text-muted-foreground text-sm font-medium transition-colors"
            >
              Dasboard
            </Link>
          </li>
          <li>
            <Link
              to="/explore"
              activeProps={{
                className: "text-primary",
              }}
              className="hover:text-primary text-muted-foreground text-sm font-medium transition-colors"
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              to="/creator"
              activeProps={{
                className: "text-primary",
              }}
              className="hover:text-primary text-muted-foreground text-sm font-medium transition-colors"
            >
              Create quiz
            </Link>
          </li>
        </ul>
        <div className="ml-auto">
          <UserButton user={user} />
        </div>
      </div>
      <Outlet />
    </div>
  );
}
