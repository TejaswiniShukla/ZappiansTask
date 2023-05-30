import axios from "axios";
const baseUrl = "http://localhost:3000/api";

export const apiInstance = axios.create({ baseURL: baseUrl });
