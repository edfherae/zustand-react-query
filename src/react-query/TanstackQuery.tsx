import { useQuery } from "@tanstack/react-query";

interface User {
  id: number,
  name: string,
  username: string
}

async function getData() : Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
}

export default function TanstackQuery() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['posts'],
        queryFn: getData
    });

    return <div>
        {isLoading && <p>Loading</p>}
        {!isLoading && data?.map(user => <div>{`${user.id}. ${user.username}`}</div>)}
        {!isLoading && <p>{error?.message}</p>}
    </div>
}

