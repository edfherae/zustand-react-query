import { useIsFetching, useIsMutating, useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserById } from "./useUserById";
import { useUsers } from "./useUsers";
import type { User } from "./models";
import axios from "axios";

export default function TanstackQuery() {
    const isAuth = true;
    const { data, error, isLoading} = useUsers(isAuth);
    // const { data, error, isLoading} = useUserById(1);

    const queryClient = useQueryClient();

    const {mutate} = useMutation({
        mutationKey: ["add user"],
        mutationFn: async (newUser: User) => axios.post("https://jsonplaceholder.typicode.com/users", newUser),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["users"]})
        }
    })

    // глобальные индикаторы 
    // const isFetching = useIsFetching()
    // const isMutating = useIsMutating()

    return <div>
        <button onClick={() => queryClient.invalidateQueries({queryKey: ["users"]})}>Invalidate</button>

        {isLoading && <p>Loading</p>}
        {!isLoading && data?.map(user => <div>{`${user.id}. ${user.username}`}</div>)}
        {!isLoading && <p>{error?.message}</p>}

        <button onClick={() => mutate({id: 666, name: "user", username: "user"})}>add user</button>
    </div>
}

