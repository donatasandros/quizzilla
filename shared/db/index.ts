import { drizzle } from "drizzle-orm/node-postgres";

import * as schema from "@/shared/db/schema";
import { env } from "@/shared/env";

export const db = drizzle({
  schema,
  casing: "snake_case",
  connection: {
    connectionString: env.DATABASE_URL,
  },
});
