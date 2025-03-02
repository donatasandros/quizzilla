import { pgTable } from "drizzle-orm/pg-core";

export const quiz = pgTable("quiz", (t) => ({
  id: t.uuid().primaryKey().defaultRandom(),
  title: t.text().notNull(),
  createdAt: t.timestamp().notNull().defaultNow(),
}));
