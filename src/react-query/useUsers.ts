import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import type { User } from "./models";
import { postService } from "./users.service"

const initialData: {data: User[]} = {
    data: [
        {
            id: 0,
            name: "test",
            username: "test"
        }
    ]
}

export function useUsers(isEnabled : boolean) {
    const { data, error, isLoading, isSuccess, isError } = useQuery({
        queryKey: ['users'],
        queryFn: postService.getData,
        select: data => data.data,
        enabled: isEnabled,
        initialData: initialData,
        staleTime: 1000
    });

    useEffect(() => {
        if(isSuccess) console.log("Successful fetch")
    }, [isSuccess, data])

    useEffect(() => {
        if(isError) console.log("Unsuccessful fetch")
    }, [isError])

    return { data, error, isLoading, isSuccess, isError }
}