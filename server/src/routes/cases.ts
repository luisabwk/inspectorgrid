import { and, asc, desc, eq, lte, notInArray } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { db } from "../db/client.js";
import { cases, progress } from "../db/schema.js";
import { requireAuth, type AuthVariables } from "../lib/auth.js";

const app = new Hono<{ Variables: AuthVariables }>();

const publicCaseColumns = {
  id: cases.id,
  title: cases.title,
  description: cases.description,
  difficulty: cases.difficulty,
  gridSize: cases.gridSize,
  layoutConfig: cases.layoutConfig,
  suspects: cases.suspects,
  clues: cases.clues,
  createdAt: cases.createdAt,
  updatedAt: cases.updatedAt,
};

app.use("*", requireAuth);

app.get("/", async (c) => {
  const rows = await db
    .select(publicCaseColumns)
    .from(cases)
    .orderBy(asc(cases.difficulty));
  return c.json(rows);
});

app.get("/next", async (c) => {
  const userId = c.get("userId");
  const levelParam = c.req.query("level");
  const currentLevel = levelParam ? Math.max(1, parseInt(levelParam, 10) || 1) : 1;
  const targetDifficulty = Math.ceil(currentLevel / 3);

  const completedRows = await db
    .select({ caseId: progress.caseId })
    .from(progress)
    .where(eq(progress.userId, userId));
  const completedIds = completedRows.map((r) => r.caseId);

  const baseQuery = (predicate: ReturnType<typeof eq> | ReturnType<typeof lte>) =>
    completedIds.length > 0
      ? db
          .select(publicCaseColumns)
          .from(cases)
          .where(and(predicate, notInArray(cases.id, completedIds)))
      : db.select(publicCaseColumns).from(cases).where(predicate);

  const exact = await baseQuery(eq(cases.difficulty, targetDifficulty))
    .orderBy(asc(cases.createdAt))
    .limit(1);

  if (exact[0]) return c.json(exact[0]);

  const fallback = await baseQuery(lte(cases.difficulty, targetDifficulty))
    .orderBy(desc(cases.difficulty), asc(cases.createdAt))
    .limit(1);

  if (fallback[0]) return c.json(fallback[0]);

  const replay = await db
    .select(publicCaseColumns)
    .from(cases)
    .where(eq(cases.difficulty, targetDifficulty))
    .orderBy(asc(cases.createdAt))
    .limit(1);

  if (replay[0]) return c.json(replay[0]);

  throw new HTTPException(404, { message: "Nenhum caso disponível" });
});

app.get("/:id", async (c) => {
  const id = c.req.param("id");
  const row = await db
    .select(publicCaseColumns)
    .from(cases)
    .where(eq(cases.id, id))
    .limit(1);

  if (!row[0]) throw new HTTPException(404, { message: "Caso não encontrado" });
  return c.json(row[0]);
});

export default app;
