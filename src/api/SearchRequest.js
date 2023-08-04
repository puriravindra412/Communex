import axios from "axios";

const API = axios.create({ baseURL: "https://communexbackend.onrender.com" });
export const searchResult = (search) => API.get(`/search/${search}`);
