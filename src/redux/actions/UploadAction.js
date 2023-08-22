import * as UploadApi from "../../api/UploadRequest";
import { toast } from "react-toastify";

export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";
const successNotification = (msg) =>
  toast.success("Welcome to Communex,login Successfull", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
// Assuming you have defined action types like UPLOAD_IMAGE_SUCCESS and UPLOAD_IMAGE_FAILURE.



export const uploadImage = (data) => async (dispatch) => {
  try {
    console.log("Image upload Action start ho gya hy");
    const response = await UploadApi.uploadImage(data);

    // Assuming 'response' is an object containing the response data
    console.log("Response from the server:", response);

    // Dispatch the success action with the response data
    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: response, // Replace 'response' with the appropriate data from the API response
    });
    return response;
  } catch (error) {
    console.log(error);

    // Dispatch the failure action with the error message or any additional error data
    dispatch({
      type: UPLOAD_IMAGE_FAILURE,
      payload: error.message, // You can customize the payload based on your error handling needs
    });
    throw error;
  }
};


export const uploadPost = (data, navigate) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });
  try {
    const newPost = await UploadApi.uploadPost(data);
    dispatch({ type: "UPLOAD_SUCCESS", data: newPost.data });
    navigate("../home", { replace: true });
    setTimeout(() => {
      toast.success("Post Created Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }, 1);
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};
