import {useQuery} from "@tanstack/react-query";
import {client} from "../client.ts";

export const useGetMessage = () => {
    return useQuery(
        {
            queryKey: ["message"],
            queryFn: async () => client.sayHi.query(),
        }
    );
}

export const useGetTodos = () => {
    return useQuery(
        {
            queryKey: ["todos"],
            queryFn: async () => client.todos.getAll.query(),
            staleTime: 60 * 60 * 1000,
        }
    )
}