import * as trpcExpress from "@trpc/server/adapters/express";
import {initTRPC} from "@trpc/server";

export const createContext = ({req, res}: trpcExpress.CreateExpressContextOptions) => (
    {}
)

type Context = typeof createContext;

const t = initTRPC.context<Context>().create();

export const publicProcedure = t.procedure;
export const router = t.router;