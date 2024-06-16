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
        prompt: `Welcome to Odash, your customizable new tab page designed to personalize your browsing experience. With a variety of widgets, you can arrange and tailor your new tab page to fit your preferences and needs. Add notes, a search bar, clock widget, and your favorite website links effortlessly.
      In the settings, you'll find options for themes and background images. Choose from three themes: Dark and Light, featuring a glassmorphic design, and Solid, offering a solid color theme. Customize your layout using the edit button (pencil icon) located next to the settings icon. You can also export and import your personalized settings.  
      Odash supports multiple search engines including Google, Bing, DuckDuckGo, and Perplexity. Additionally, it acts as a productivity manager, providing task suggestions to help you stay organized.   
      Also help users with completeing their tasks by providing them with relevant websites to visit.
      You will answer questions related to Odash with clarity and relevance. Ask away: ${message}`,
      }
    );
    return c.json(response);
  } catch (error) {
    return c.json({ error }, 500);
  }
});

app.get("/websites", async (c) => {
  const profession = c.req.query("profession");
  if (!profession) {
    return c.json({ error: "profession query parameter is required" }, 400);
  }
  try {
    const response = await c.env.AI.run(
      "@cf/mistral/mistral-7b-instruct-v0.1",
      {
        prompt: `Suggest 5 relevant websites for ${profession} that they might use in their day-to-day life to enhance their online experience. Respond only in the following format:{"websites": [{"title":"example1", "url":"https://example1.com/"}, {"title":"example2", "url":"https://example2.com/"}, {"title":"example3", "url":"https://example3.com/"}, {"title":"example4", "url":"https://example4.com/"}, {"title":"example5", "url":"https://example5.com/"}]} Do not include any additional text or explanation.`,
      }
    );
    return c.json(response);
  } catch (error) {
    return c.json({ error }, 500);
  }
});

export default app;
