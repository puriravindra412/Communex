import { toast } from "react-toastify";
import * as UserApi from "../../api/UserRequests.js";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    console.log("Action ko receive hoa hy ye : ", data);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER", data: id });
  UserApi.followUser(id, data);
};

export const unfollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER", data: id });
  UserApi.unfollowUser(id, data);
};

export const savePostAction = (id, data) => async (dispatch) => {
  dispatch({ type: "SAVE_POST", data: data._id});
  const response=UserApi.savePost(id, data);
 return response;
};

export const UnSavePostAction = (id, data) => async (dispatch) => {
  dispatch({ type: "UNSAVE_POST", data:data._id });
  const response= UserApi.savePost(id, data);
  return response;
};

