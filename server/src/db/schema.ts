import { sql } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export const appRole = pgEnum("app_role", ["admin", "player"]);

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: text("user_id").notNull().unique(),
  displayName: text("display_name").notNull(),
  currentLevel: integer("current_level").notNull().default(1),
  totalScore: integer("total_score").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const cases = pgTable("cases", {
  id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: integer("difficulty").notNull().default(1),
  gridSize: integer("grid_size").notNull().default(6),
  layoutConfig: jsonb("layout_config").notNull().default({}),
  suspects: jsonb("suspects").notNull().default([]),
  solution: jsonb("solution").notNull().default({}),
  clues: jsonb("clues").notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const userRoles = pgTable(
  "user_roles",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    userId: text("user_id").notNull(),
    role: appRole("role").notNull().default("player"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => ({
    userRoleUnique: unique("user_roles_user_id_role_key").on(t.userId, t.role),
  })
);

export const progress = pgTable(
  "progress",
  {
    id: uuid("id").primaryKey().default(sql`gen_random_uuid()`),
    userId: text("user_id").notNull(),
    caseId: uuid("case_id")
      .notNull()
      .references(() => cases.id, { onDelete: "cascade" }),
    completedAt: timestamp("completed_at", { withTimezone: true }).notNull().defaultNow(),
    score: integer("score").notNull().default(0),
    timeTaken: integer("time_taken").notNull().default(0),
  },
  (t) => ({
    userCaseUnique: unique("progress_user_id_case_id_key").on(t.userId, t.caseId),
  })
);

export type Profile = typeof profiles.$inferSelect;
export type NewProfile = typeof profiles.$inferInsert;
export type Case = typeof cases.$inferSelect;
export type Progress = typeof progress.$inferSelect;
export type AppRole = (typeof appRole.enumValues)[number];

export type SuspectPosition = { row: number; col: number };
export type CaseSolution = Record<string, SuspectPosition>;
