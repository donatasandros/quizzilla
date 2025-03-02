import { Hono } from "hono";

const app = new Hono().get("/", (c) => {
  return c.json({
    data: {
      message: "Hello Hono!",
    },
  });
});

export default app;
