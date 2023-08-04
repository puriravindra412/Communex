import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
export const searchResult = (search) => API.get(`/search/${search}`);
