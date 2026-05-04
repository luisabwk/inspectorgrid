import { eq, sql } from "drizzle-orm";
import { Hono } from "hono";
import { db } from "../db/client.js";
import { progress } from "../db/schema.js";
import { requireAuth, type AuthVariables } from "../lib/auth.js";

const app = new Hono<{ Variables: AuthVariables }>();

app.use("*", requireAuth);

app.get("/stats", async (c) => {
  const profile = c.get("profile");
  const userId = c.get("userId");

  const rows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(progress)
    .where(eq(progress.userId, userId));

  return c.json({
    level: profile.currentLevel,
    totalScore: profile.totalScore,
    completedCases: rows[0]?.count ?? 0,
  });
});

export default app;
