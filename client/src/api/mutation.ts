import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "../client.ts";

export const useMarkAsCompleted = () => {
    const queryClient = useQueryClient();
    return useMutation(
        {

            mutationFn: async ({id}: { id: number }) => {
                return await client.todos.markComplete.query({id})
            },
            onSuccess: async () => {
                await queryClient.invalidateQueries({queryKey: ["todos"]})
            }
        }
    )
}