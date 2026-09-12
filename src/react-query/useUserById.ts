import { useQuery } from "@tanstack/react-query";
import { postService } from "./users.service"

export function useUserById(id: number) {
    const { data, error, isLoading, isSuccess, isError, refetch } = useQuery({
        queryKey: ['users', id],
        queryFn: () => postService.getDataById(id),
        select: data => data.data,
        enabled: !!id,
    });

    refetch()

    return { data, error, isLoading, isSuccess, isError }
}