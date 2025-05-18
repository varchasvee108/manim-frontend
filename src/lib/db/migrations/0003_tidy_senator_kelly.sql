ALTER TABLE "video" RENAME COLUMN "script_statue" TO "script_status";--> statement-breakpoint
ALTER TABLE "video" ALTER COLUMN "render_id" SET NOT NULL;