import { relations } from "drizzle-orm";
import { pgEnum, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { v4 as uuid } from "uuid";

import { user } from "@/shared/db/schemas/auth";

export const answerTypeEnum = pgEnum("answer_type", ["single", "multiple"]);

export const quiz = pgTable("quiz", (t) => ({
  id: t
    .text()
    .primaryKey()
    .$defaultFn(() => uuid()),
  title: t.text().notNull(),
  description: t.text().notNull(),
  userId: t
    .text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: t.timestamp().notNull().defaultNow(),
  updatedAt: t.timestamp().notNull().defaultNow(),
}));

export const insertQuizSchema = createInsertSchema(quiz);

export const question = pgTable("question", (t) => ({
  id: t
    .text()
    .primaryKey()
    .$defaultFn(() => uuid()),
  quizId: t
    .text()
    .notNull()
    .references(() => quiz.id, { onDelete: "cascade" }),
  content: t.text().notNull(),
  timeLimit: t.integer().notNull(),
  answerType: answerTypeEnum().notNull(),
  mediaUrl: t.text(),
  backgroundColor: t.text().notNull(),
}));

export const insertQuestionSchema = createInsertSchema(question);

export const answer = pgTable("answer", (t) => ({
  id: t
    .text()
    .primaryKey()
    .$defaultFn(() => uuid()),
  questionId: t
    .text()
    .notNull()
    .references(() => question.id, { onDelete: "cascade" }),
  content: t.text().notNull(),
  isCorrect: t.boolean().notNull(),
}));

export const inserAnswerSchema = createInsertSchema(answer);

export const quizRelations = relations(quiz, ({ many }) => ({
  question: many(question),
}));

export const questionRelations = relations(question, ({ one, many }) => ({
  quiz: one(quiz, {
    fields: [question.quizId],
    references: [quiz.id],
  }),
  answer: many(answer),
}));

export const answerRelations = relations(answer, ({ one }) => ({
  question: one(question, {
    fields: [answer.questionId],
    references: [question.id],
  }),
}));
