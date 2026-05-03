import { and, eq, sql } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";
import { db } from "../db/client.js";
import {
  cases,
  profiles,
  progress,
  type CaseSolution,
} from "../db/schema.js";
import { requireAuth, type AuthVariables } from "../lib/auth.js";
import { verifyCaseSolution } from "../lib/scoring.js";

const app = new Hono<{ Variables: AuthVariables }>();

const verifyBody = z.object({
  placements: z.record(z.string(), z.string()),
  timeTaken: z.number().int().nullable().optional(),
});

app.use("*", requireAuth);

app.post("/:caseId", async (c) => {
  const userId = c.get("userId");
  const caseId = c.req.param("caseId");

  const parsed = verifyBody.safeParse(await c.req.json().catch(() => null));
  if (!parsed.success) {
    throw new HTTPException(400, { message: "Payload inválido" });
  }

  const caseRow = await db
    .select({
      gridSize: cases.gridSize,
      difficulty: cases.difficulty,
      solution: cases.solution,
    })
    .from(cases)
    .where(eq(cases.id, caseId))
    .limit(1);

  if (!caseRow[0]) {
    return c.json({ valid: false, message: "Caso não encontrado" }, 404);
  }

  const existing = await db
    .select({ id: progress.id })
    .from(progress)
    .where(and(eq(progress.userId, userId), eq(progress.caseId, caseId)))
    .limit(1);
  const alreadyCompleted = !!existing[0];

  const result = verifyCaseSolution({
    gridSize: caseRow[0].gridSize,
    difficulty: caseRow[0].difficulty,
    solution: caseRow[0].solution as CaseSolution,
    placements: parsed.data.placements,
    timeTaken: parsed.data.timeTaken ?? null,
    alreadyCompleted,
  });

  if (!result.valid) return c.json(result);

  if (result.shouldRecord && result.score !== undefined && result.clampedTimeTaken !== undefined) {
    await db.transaction(async (tx) => {
      await tx
        .insert(progress)
        .values({
          userId,
          caseId,
          score: result.score!,
          timeTaken: result.clampedTimeTaken!,
        })
        .onConflictDoNothing({
          target: [progress.userId, progress.caseId],
        });

      await tx
        .update(profiles)
        .set({
          totalScore: sql`${profiles.totalScore} + ${result.score!}`,
          currentLevel: sql`${profiles.currentLevel} + 1`,
        })
        .where(eq(profiles.userId, userId));
    });
  }

  return c.json({
    valid: true,
    message: result.message,
    score: result.score,
    timeTaken: result.timeTaken,
    alreadyCompleted: result.alreadyCompleted,
  });
});

export default app;
