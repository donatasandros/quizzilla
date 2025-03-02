import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { openAPI } from "better-auth/plugins";

import { db } from "@/shared/db";
import { env } from "@/shared/env";

export const auth = betterAuth({
  plugins: [openAPI()],
  baseURL: "http://localhost:3001",
  appName: "Quizzilla",
  trustedOrigins: [env.PUBLIC_WEB_URL].map((url) => new URL(url).origin),
  secret: env.AUTH_SECRET,
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
  },
});
