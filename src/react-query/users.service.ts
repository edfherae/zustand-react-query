import axios from "axios"
import type { User } from "./models"

class PostService {
    getData() {
      return axios.get<User[]>("https://jsonplaceholder.typicode.com/users")
    }

    getDataById(id: number) {
        return axios.get<User>(`https://jsonplaceholder.typicode.com/users?id=${id}`)
    }

}

export const postService = new PostService();