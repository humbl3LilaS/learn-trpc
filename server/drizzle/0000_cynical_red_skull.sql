CREATE TABLE IF NOT EXISTS "todos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "todos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" text NOT NULL,
	"is_completed" boolean,
	"created_at" date,
	"completed_at" date
);
