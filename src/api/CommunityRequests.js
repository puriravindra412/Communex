import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
export const getCommunity = () => API.get(`/community/getCommunity`);
export const createCommunity = (data) => API.post("/community/", data);
export const addUserToCommunity = (data) => API.put("/community/addUser", data);
export const getCommunityPost = (name) =>
  API.get(`/community/getCommunityPost/${name}`, name);
