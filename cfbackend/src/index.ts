import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
  [key in keyof CloudflareBindings]: CloudflareBindings[key];
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("/*", cors());

app.get("/", async (c) => {
  const { message } = await c.req.json();

  try {
    const response = await c.env.AI.run(
      "@cf/mistral/mistral-7b-instruct-v0.1",
      {
        prompt: `You are a helpful assistant. You will be provided by some question which are:${message} and you will answer them.`,
      }
    );
    return c.json(response);
  } catch (error) {
    return c.json({ error });
  }
});

export default app;
