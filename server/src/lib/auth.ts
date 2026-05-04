import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { eq } from "drizzle-orm";
import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { db } from "../db/client.js";
import { profiles, type Profile } from "../db/schema.js";
import { clerk } from "./clerk.js";

export type AuthVariables = {
  userId: string;
  profile: Profile;
};

export const requireAdmin = createMiddleware<{ Variables: AuthVariables }>(
  async (c, next) => {
    const userId = c.get("userId");
    if (!userId) {
      throw new HTTPException(401, { message: "Não autenticado" });
    }
    const user = await clerk.users.getUser(userId);
    if (user.publicMetadata?.role !== "admin") {
      throw new HTTPException(403, { message: "Acesso restrito a admins" });
    }
    await next();
  }
);

export const requireAuth = createMiddleware<{ Variables: AuthVariables }>(
  async (c, next) => {
    const auth = getAuth(c);
    if (!auth?.userId) {
      throw new HTTPException(401, { message: "Não autenticado" });
    }

    const profile = await getOrCreateProfile(auth.userId);

    c.set("userId", auth.userId);
    c.set("profile", profile);
    await next();
  }
);

const getOrCreateProfile = async (userId: string): Promise<Profile> => {
  const existing = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, userId))
    .limit(1);

  if (existing[0]) return existing[0];

  const inserted = await db
    .insert(profiles)
    .values({ userId, displayName: "Detetive" })
    .onConflictDoNothing({ target: profiles.userId })
    .returning();

  if (inserted[0]) return inserted[0];

  const refetched = await db
    .select()
    .from(profiles)
    .where(eq(profiles.userId, userId))
    .limit(1);

  if (!refetched[0]) {
    throw new HTTPException(500, { message: "Falha ao criar perfil" });
  }
  return refetched[0];
};

export { clerkMiddleware };
