import { config } from "dotenv";
config({
  path: "../.env",
});
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  //
  PUBLIC_WEB_URL: z.string().min(1),
  //
  API_PORT: z.string().default("3001"),
  //
  DATABASE_URL: z.string().min(1),
  //
  AUTH_SECRET: z.string().min(1),
  GITHUB_CLIENT_ID: z.string().min(1),
  GITHUB_CLIENT_SECRET: z.string().min(1),
});

export const env = envSchema.parse(process.env);
