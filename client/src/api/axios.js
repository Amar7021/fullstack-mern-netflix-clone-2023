import axios from "axios";

const API = axios.create({
    baseURL: "https://netflix-stream.vercel.app/api"
})

export default API;