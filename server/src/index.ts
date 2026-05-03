import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { clerkMiddleware } from "./lib/auth.js";
import casesRoutes from "./routes/cases.js";
import progressRoutes from "./routes/progress.js";
import verifyRoutes from "./routes/verify.js";

const app = new Hono();

app.use("*", logger());

const allowedOrigins = (process.env.CORS_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

app.use(
  "*",
  cors({
    origin: (origin) => {
      if (!origin) return null;
      if (allowedOrigins.length === 0) return origin;
      return allowedOrigins.includes(origin) ? origin : null;
    },
    credentials: true,
  })
);

app.get("/health", (c) => c.json({ ok: true }));

app.use(
  "/api/*",
  clerkMiddleware({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
  })
);

app.route("/api/cases", casesRoutes);
app.route("/api/progress", progressRoutes);
app.route("/api/verify", verifyRoutes);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json({ message: err.message }, err.status);
  }
  console.error(err);
  return c.json({ message: "Erro interno" }, 500);
});

const port = parseInt(process.env.PORT ?? "8080", 10);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Server running on http://localhost:${info.port}`);
});
