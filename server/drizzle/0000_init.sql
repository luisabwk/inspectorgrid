CREATE TYPE "public"."app_role" AS ENUM('admin', 'player');--> statement-breakpoint
CREATE TABLE "cases" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"difficulty" integer DEFAULT 1 NOT NULL,
	"grid_size" integer DEFAULT 6 NOT NULL,
	"layout_config" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"suspects" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"solution" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"clues" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"display_name" text NOT NULL,
	"current_level" integer DEFAULT 1 NOT NULL,
	"total_score" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "progress" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"case_id" uuid NOT NULL,
	"completed_at" timestamp with time zone DEFAULT now() NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"time_taken" integer DEFAULT 0 NOT NULL,
	CONSTRAINT "progress_user_id_case_id_key" UNIQUE("user_id","case_id")
);
--> statement-breakpoint
CREATE TABLE "user_roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"role" "app_role" DEFAULT 'player' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_roles_user_id_role_key" UNIQUE("user_id","role")
);
--> statement-breakpoint
ALTER TABLE "progress" ADD CONSTRAINT "progress_case_id_cases_id_fk" FOREIGN KEY ("case_id") REFERENCES "public"."cases"("id") ON DELETE cascade ON UPDATE no action;