import { zValidator } from "@hono/zod-validator";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

import type { HonoVariables } from "@/api/types";

import { db } from "@/shared/db";
import * as table from "@/shared/db/schema";
import {
  insertQuizSchema,
  insertQuestionSchema,
  inserAnswerSchema,
} from "@/shared/db/schemas/quiz";

const app = new Hono<{
  Variables: HonoVariables;
}>()
  .get("/", async (c) => {
    const data = await db.select().from(table.quiz);

    return c.json({
      data,
    });
  })
  .get("/:id", async (c) => {
    const { id } = c.req.param();

    const data = await db.query.quiz.findFirst({
      where: eq(table.quiz.id, id),
      with: {
        question: {
          with: {
            answer: true,
          },
        },
      },
    });

    if (!data) {
      throw new HTTPException(404, { message: "Quiz not found" });
    }

    return c.json({
      data,
    });
  })
  .post(
    "/",
    zValidator(
      "json",
      insertQuizSchema.omit({ id: true, userId: true }).extend({
        questions: z.array(
          insertQuestionSchema.omit({ id: true, quizId: true }).extend({
            answers: z.array(
              inserAnswerSchema.omit({ id: true, questionId: true })
            ),
          })
        ),
      })
    ),
    async (c) => {
      const session = c.get("session");
      const values = c.req.valid("json");

      if (!session) {
        throw new HTTPException(401, { message: "Unauthorized" });
      }

      const [{ quizId }] = await db
        .insert(table.quiz)
        .values({
          title: values.title,
          description: values.description,
          userId: session.userId,
        })
        .returning({ quizId: table.quiz.id });

      const questions = values.questions.map((question) => ({
        ...question,
        quizId,
      }));

      const returnedQuestions = await db
        .insert(table.question)
        .values(questions)
        .returning();

      const answers = returnedQuestions.flatMap((question, idx) =>
        questions[idx].answers.map((answer) => ({
          ...answer,
          questionId: question.id,
        }))
      );

      await db.insert(table.answer).values(answers).returning();

      return c.json(
        {
          data: {
            quizId,
          },
        },
        200
      );
    }
  )
  .delete(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().min(1),
      })
    ),
    async (c) => {
      const session = c.get("session");
      const { id } = c.req.param();

      if (!session) {
        throw new HTTPException(401, { message: "Unauthorized" });
      }

      const [quiz] = await db
        .select()
        .from(table.quiz)
        .where(eq(table.quiz.id, id));

      if (!quiz) {
        throw new HTTPException(404, { message: "Quiz not found" });
      }

      if (quiz.userId !== session.userId) {
        throw new HTTPException(403, { message: "Unauthorized" });
      }

      const [data] = await db
        .delete(table.quiz)
        .where(eq(table.quiz.id, id))
        .returning({ quizId: table.quiz.id });

      return c.json({
        data,
      });
    }
  );

export default app;
