import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "@/drizzle/schema";
import { env } from "@/env";


export const db = drizzle({
  schema,
  connection: {
    password: env.DB_PASSWORD,
    user: env.DB_USER,
    database: env.DB_NAME,
    host: env.DB_HOST,
  },
});
