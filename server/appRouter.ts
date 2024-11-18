import {publicProcedure, router} from "./trcp.ts";
import {db} from "./database/drizzle.ts";
import {todos} from "./database/schema.ts";
import {z} from "zod";
import {eq} from "drizzle-orm";

export const appRouter = router(
    {
        sayHi: publicProcedure.query(() => {
            return {message: "Hello TRPC is Running in the backend"}
        }),
        todos: router(
            {
                getAll: publicProcedure.query(async () => {
                    const result = await db
                        .select(
                            {
                                id: todos.id,
                                title: todos.title,
                                isCompleted: todos.isCompleted,
                                createdAt: todos.createdAt,
                                completedAt: todos.completedAt,
                            }
                        ).from(todos)
                    if (!result) {
                        return undefined;
                    }
                    return result;
                }),
                markComplete: publicProcedure
                    .input(z.object({id: z.number()}))
                    .mutation(async (opts) => {
                        const id = opts.input.id;
                        const [updatedTodo] = await db
                            .update(todos)
                            .set({isCompleted: true})
                            .where(
                                eq(todos.id, id)
                            )
                            .returning(
                                {
                                    id: todos.id,
                                    title: todos.title,
                                    isCompleted: todos.isCompleted,
                                    createdAt: todos.createdAt,
                                    completedAt: todos.completedAt,
                                })

                        if (!updatedTodo) {
                            return undefined;
                        }

                        return updatedTodo;
                    }),
                deleteById: publicProcedure
                    .input(z.object({id: z.number()}))
                    .mutation(async (opts) => {
                        const id = opts.input.id;
                        const [deletedTodo] = await db
                            .delete(todos)
                            .where(eq(todos.id, id))
                            .returning(
                                {
                                    id: todos.id,
                                    title: todos.title,
                                    isCompleted: todos.isCompleted,
                                    createdAt: todos.createdAt,
                                    completedAt: todos.completedAt,
                                })

                        if (!deletedTodo) {
                            return undefined;
                        }
                        return deletedTodo;
                    })
            }
        )
    }
)

