import {integer, pgTable, text, boolean, date} from "drizzle-orm/pg-core";

export const todos = pgTable(
    "todos",
    {
        id: integer().primaryKey().generatedAlwaysAsIdentity(),
        title: text().notNull(),
        isCompleted: boolean("is_completed").$default(() => false),
        createdAt: date("created_at").$default(() => (
            new Date()
        ).toString()),
        completedAt: date("completed_at")
    }
)