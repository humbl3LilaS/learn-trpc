import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import {appRouter} from "./appRouter.ts";
import {createContext} from "./trcp.ts";

const app = express();
const port = 3000;
app.use(cors({origin: "http://localhost:5173"}));


app.get("/", (req, res) => {
    res.send({message: "Hello bun"})
})

app.use("/trpc", trpcExpress.createExpressMiddleware({router: appRouter, createContext}));


app.listen(port, () => {
    console.log("Server Running on port " + port);
})

export type AppRouter = typeof appRouter;
