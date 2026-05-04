import { and, asc, desc, eq, lte, notInArray } from "drizzle-orm";
import { Hono, type Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { db } from "../db/client.js";
import { cases, progress } from "../db/schema.js";
import { requireAdmin, requireAuth, type AuthVariables } from "../lib/auth.js";

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

// --- Admin CRUD ---

const positionSchema = z.object({ row: z.number().int(), col: z.number().int() });

const caseInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  difficulty: z.number().int().min(1),
  gridSize: z.number().int().min(3).max(12),
  layoutConfig: z.record(z.string(), z.unknown()),
  suspects: z.array(z.unknown()),
  solution: z.record(z.string(), positionSchema),
  clues: z.array(z.unknown()),
});

const casePatchSchema = caseInputSchema.partial();

const toRow = (input: z.infer<typeof caseInputSchema>) => ({
  title: input.title,
  description: input.description,
  difficulty: input.difficulty,
  gridSize: input.gridSize,
  layoutConfig: input.layoutConfig,
  suspects: input.suspects,
  solution: input.solution,
  clues: input.clues,
});

const parseBody = async <T>(c: Context, schema: z.ZodSchema<T>): Promise<T> => {
  const body = await c.req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    throw new HTTPException(400, {
      message: `Payload inválido: ${parsed.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("; ")}`,
    });
  }
  return parsed.data;
};

app.post("/", requireAdmin, async (c) => {
  const data = await parseBody(c, caseInputSchema);
  const inserted = await db.insert(cases).values(toRow(data)).returning();
  return c.json(inserted[0], 201);
});

app.put("/:id", requireAdmin, async (c) => {
  const id = c.req.param("id");
  const data = await parseBody(c, casePatchSchema);
  if (Object.keys(data).length === 0) {
    throw new HTTPException(400, { message: "Nada a atualizar" });
  }
  const updated = await db
    .update(cases)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(cases.id, id))
    .returning();
  if (!updated[0]) throw new HTTPException(404, { message: "Caso não encontrado" });
  return c.json(updated[0]);
});

app.delete("/:id", requireAdmin, async (c) => {
  const id = c.req.param("id");
  const deleted = await db.delete(cases).where(eq(cases.id, id)).returning({ id: cases.id });
  if (!deleted[0]) throw new HTTPException(404, { message: "Caso não encontrado" });
  return c.json({ id: deleted[0].id }, 200);
});

export default app;
