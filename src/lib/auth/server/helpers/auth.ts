import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";

import { authServer } from "@/lib/auth/server/instance";

export async function auth() {
  const headers = await getHeaders();

  const data = await authServer.api.getSession({
    headers,
  });

  return {
    sessionId: data?.session.id || null,
    userId: data?.user.id || null,
    // TODO: role: "user" | "admin"
    redirectToSignIn: () => redirect("/auth/sign-in"),
  };
}
