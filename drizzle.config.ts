import { defineConfig } from "drizzle-kit";

import { env } from "@/shared/env";

export default defineConfig({
  schema: "./shared/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: env.DATABASE_URL },
  casing: "snake_case",
});
