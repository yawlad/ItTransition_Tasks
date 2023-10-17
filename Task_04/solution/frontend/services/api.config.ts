  import axios from "axios";

  export const instance = axios.create({
    withCredentials: true,
    baseURL: `https://task-04-backend.onrender.com/api/v1/`,
  });