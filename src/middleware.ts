import { betterFetch } from "@better-fetch/fetch";
import { NextRequest, NextResponse } from "next/server";

import { DEFAULT_SIGN_IN_URL } from "@/features/auth/constants";
import { authServer } from "@/lib/auth/server/instance";

export async function middleware(request: NextRequest) {
  const { data: session } = await betterFetch<typeof authServer.$Infer.Session>(
    "/api/auth/get-session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    },
  );

  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth");

  if (isAuthRoute) {
    if (session) {
      return NextResponse.redirect(new URL(DEFAULT_SIGN_IN_URL, request.url));
    }

    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/overview", "/auth/:path*"],
};
