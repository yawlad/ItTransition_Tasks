  import axios from "axios";

  export const instance = axios.create({
    baseURL: `https://task-06-backend.onrender.com`,
  });
