import axios from "axios";

const API = axios.create({
    baseURL: "https://netflix-stream.onrender.com/api"
})

export default API;