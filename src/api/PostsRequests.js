import axios from "axios";

const API = axios.create({ baseURL: "https://communexbackend.onrender.com/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});
export const getPost = (id) => API.get(`/posts/${id}`);
export const getRecentPost = () => API.get(`/posts/`);
export const getBlogPost = () => API.get(`/posts/blog`);
export const getPostComments=(id)=>API.get(`/posts/postComments/${id}`)
export const deleteCommentPost=(id,_id)=>API.put(`/posts/${id}/deleteComment`,{_id:_id})
export const getSavedPosts=(id)=>API.get(`/posts/${id}/savedPosts`)
export const getTimelinePosts = (id) => API.get(`/posts/${id}/timeline`);
export const likePost = (id, userId) =>
  API.put(`posts/${id}/like`, { userId: userId });
export const commentPost = (id, userId, username, comment) =>
  API.put(`posts/${id}/comment`, {
    userId: userId,
    username: username,
    comment: comment,
  });
