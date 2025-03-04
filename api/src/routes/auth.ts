import { Hono } from "hono";

import { auth } from "@/api/lib/auth";

const app = new Hono().on(["POST", "GET"], "/*", (c) => {
  return auth.handler(c.req.raw);
});

export default app;
