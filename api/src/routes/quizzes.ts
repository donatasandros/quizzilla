import { Hono } from "hono";

import { db } from "@/shared/db";
import * as table from "@/shared/db/schema";

const app = new Hono().get("/", async (c) => {
  const data = await db.select().from(table.quiz);

  return c.json({
    data,
  });
});

export default app;
