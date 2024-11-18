import express from "express";
import {initTRPC} from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";

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
            return {message: "Hello"}
        })
    }
)

export type AppRouter = typeof appRouter;

app.get("/", (req, res) => {
    res.send({message: "Hello bunZ"})
})

app.use("/trpc", trpcExpress.createExpressMiddleware({router: appRouter, createContext}));


app.listen(port, () => {
    console.log("Server Running on port " + port);
})