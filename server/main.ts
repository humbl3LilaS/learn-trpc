import express from "express";
import {initTRPC} from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import {todos} from "./database/schema.ts";
import {db} from "./database/drizzle.ts";
import {z} from "zod";
import {eq} from "drizzle-orm";

const app = express();
const port = 3000;
app.use(cors({origin: "http://localhost:5173"}));


const createContext = ({req, res}: trpcExpress.CreateExpressContextOptions) => (
    {}
);

type Context = typeof createContext;

const t = initTRPC.context<Context>().create();


const appRouter = t.router(
    {
        sayHi: t.procedure.query(() => {
            return {message: "Hello TRPC is Running in the backend"}
        }),
        todos: t.router(
            {
                getAll: t.procedure.query(async () => {
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
                markComplete: t.procedure
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
                deleteById: t.procedure
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

export type AppRouter = typeof appRouter;

app.get("/", (req, res) => {
    res.send({message: "Hello bun"})
})

app.use("/trpc", trpcExpress.createExpressMiddleware({router: appRouter, createContext}));


app.listen(port, () => {
    console.log("Server Running on port " + port);
})