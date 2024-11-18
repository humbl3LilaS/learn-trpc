import type {AppRouter} from "../../server/main.ts";
import {createTRPCProxyClient, httpBatchLink} from "@trpc/client";


export const client = createTRPCProxyClient<AppRouter>(
    {
        links: [httpBatchLink({url: "http://localhost:3000/trpc"})]
    }
)