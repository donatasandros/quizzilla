import { hc } from "hono/client";

import { type AppType } from "@/api/index";

export const client = hc<AppType>("http://localhost:3001", {
  fetch: (input: RequestInfo | URL, requestInit?: RequestInit) => {
    return fetch(input, {
      method: requestInit?.method ?? "GET",
      credentials: "include",
      headers: {
        ...requestInit?.headers,
        "Content-Type": "application/json",
      },
      body: requestInit?.body ?? null,
    });
  },
});
