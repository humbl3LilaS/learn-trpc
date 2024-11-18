import {useQuery} from "@tanstack/react-query";
import {getSayHi} from "./api.ts";

export const useGetMessage = () => {
    return useQuery(
        {
            queryKey: ["message"],
            queryFn: getSayHi,
        }
    );
}