CREATE TYPE "public"."script_status_enum" AS ENUM('pending', 'generated', 'failed');--> statement-breakpoint
CREATE TYPE "public"."video_status_enum" AS ENUM('pending', 'generated', 'failed');--> statement-breakpoint
CREATE TABLE "render" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "video" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"render_id" uuid,
	"script" text,
	"user_prompt" text NOT NULL,
	"video_url" text,
	"script_statue" "script_status_enum" DEFAULT 'pending' NOT NULL,
	"video_status" "video_status_enum" DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "render" ADD CONSTRAINT "render_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "video" ADD CONSTRAINT "video_render_id_render_id_fk" FOREIGN KEY ("render_id") REFERENCES "public"."render"("id") ON DELETE cascade ON UPDATE no action;