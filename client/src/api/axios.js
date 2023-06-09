import axios from "axios";

const API = axios.create({
  baseURL: "https://flixx-stream-server.vercel.app/api",
});

export default API;
