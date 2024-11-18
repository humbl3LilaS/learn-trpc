import express from "express";
import {initTRPC} from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import {todos} from "./database/schema.ts";
import {db} from "./database/drizzle.ts";

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