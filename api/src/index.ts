import { Hono } from "hono";
import { cors } from "hono/cors";

import type { HonoVariables } from "@/api/types";

import { auth } from "@/api/lib/auth";
import authRoutes from "@/api/routes/auth";
import quizzesRoutes from "@/api/routes/quizzes";
import { env } from "@/shared/env";

const app = new Hono<{
  Variables: HonoVariables;
}>().basePath("/api");

app.use(
  "*",
  cors({
    origin: "http://localhost:3000",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  console.log(session);

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/quizzes", quizzesRoutes)
  .route("/auth/*", authRoutes);

export default {
  port: env.API_PORT,
  fetch: app.fetch,
};

export type AppType = typeof routes;
