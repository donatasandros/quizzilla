import { Hono } from "hono";
import { cors } from "hono/cors";

import auth from "@/routes/auth";
import quizzes from "@/routes/quizzes";
import { env } from "@/shared/env";

const app = new Hono().basePath("/api").use(
  "/*",
  cors({
    origin: "*",
    credentials: true,
  })
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app.route("/quizzes", quizzes).route("/auth/*", auth);

export default {
  port: env.API_PORT,
  fetch: app.fetch,
};

export type AppType = typeof routes;
