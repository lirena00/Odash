import { Hono } from "hono";
import { cors } from "hono/cors";

type Bindings = {
  [key in keyof CloudflareBindings]: CloudflareBindings[key];
};

const app = new Hono<{ Bindings: Bindings }>();

app.use("/*", cors());

app.get("/", async (c) => {
  const message = c.req.query("message");

  if (!message) {
    return c.json({ error: "Message query parameter is required" }, 400);
  }

  try {
    const response = await c.env.AI.run(
      "@cf/mistral/mistral-7b-instruct-v0.1",
      {
        prompt: `You are a helpful assistant for Odash. 
        Odash is a customizable new tab page that allows users to personalize their browsing experience. 
        With various widgets, users can arrange and customize their new tab page to suit their needs and preferences.
        User can also add notes, search bar, clock widget, and website links to their new tab page.
        In settings we have theme and background image options. there are 3 themes to choose from: dark, light, and solid.
        dark and light are glassmorphic themes and solid is a solid color theme. 
        We have google, bing, duckduckgo, perplexity as search engines.
        You will be provided with some questions which are: ${message} and you will answer them in reference with odash and make them
        concise and clear. `,
      }
    );
    return c.json(response);
  } catch (error) {
    return c.json({ error }, 500);
  }
});

export default app;
