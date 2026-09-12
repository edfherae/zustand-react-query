import { useEffect } from "react";
import {create} from "zustand"
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface User {
  id: number,
  username: string
}

interface UsersState {
  users: User[],
  isLoading: boolean,
  errors: string[],
  addUser: (username: string) => void,
  fetchUsers: () => void
}

// множество stores
const useCommentsStore = create((set) => ({
  
}))

// каррирование для корректной работы TS
// подключение middleware:
// immer для видимости мутабельного обновления store
// devtools для девтулзов в браузере, позволяет отслеживать экшены и состояние стора
// persist сохраняет данные в localStorage
const useUsersStore = create<UsersState>()(persist(devtools(immer((set) => ({
  users: [],
  currentUser: null,
  settings: {},
  isLoading: false,
  errors: [],
  addUser: (username: string) => set(state => {
    // Без immer:
    // users: [
    //   ...state.users,
    //   {id: Date.now(), username}
    // ]
    state.users.push({id: Date.now(), username})
  }
    ),
  fetchUsers: async () => {
    const result = await fetch("https://jsonplaceholder.typicode.com/users");
    const json = await result.json() as User[];
    set({users: json})
  }
}))), {name: "usersStore", version: 1}))


export default function Zustand() {
  //если изменилось значение -> ререндер. Если нет, то ререндера не будет
  const users = useUsersStore(state => state.users)
  const addUser = useUsersStore(state => state.addUser)
  const fetchUser = useUsersStore(state => state.fetchUsers)

  useEffect(() => {
    if(users.length === 0)
      fetchUser();
  }, [users.length])

  return <div>
    {users.map(user => <div>{`${user.id}. ${user.username}`}</div>)}
    <button onClick={() => addUser("new user")}>create</button>
  </div>
}