import axios from "axios";
import { postSlice } from "./post-slice";
import { utilSlice } from "../util/util-slice";

export const fetchPost = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      dispatch(utilSlice.actions.sendRequest());
      const result = await axios.get(
        "https://project-sosmed-mern.herokuapp.com/api/post"
      );
      dispatch(utilSlice.actions.finishRequest());
      return result.data;
    };
    try {
      const postList = await fetchData();
      dispatch(postSlice.actions.setPostList({ postList }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const UploadPost = (postData) => {
  return async (dispatch) => {
    const register = async (data) => {
      const result = await axios.post(
        "https://project-sosmed-mern.herokuapp.com/api/post",
        data,
        {
          headers: { ContentType: "multipart/form-data" },
        }
      );

      return result.data;
    };

    try {
      dispatch(utilSlice.actions.sendRequest());
      const newPost = await register(postData);

      if (newPost.error) {
        dispatch(utilSlice.actions.catchError({ error: newPost.data.errors }));
      }

      window.location.href = "/";
    } catch (error) {
      const errorMessage = {
        status: error.response.status,
        message: error.response.data.error,
      };
      dispatch(utilSlice.actions.catchError({ error: errorMessage }));
    }
  };
};

export const DeletePost = (postId) => {
  return async (dispatch) => {
    const deletePost = async (postId) => {
      const result = await axios.delete(
        `https://project-sosmed-mern.herokuapp.com/api/post/${postId}`
      );

      return result.data;
    };

    try {
      dispatch(utilSlice.actions.sendRequest());
      const newPost = await deletePost(postId);

      if (newPost.error) {
        dispatch(utilSlice.actions.catchError({ error: newPost.data.errors }));
      }

      window.location.reload();
    } catch (error) {
      const errorMessage = {
        status: error.response.status,
        message: error.response.data.error,
      };
      dispatch(utilSlice.actions.catchError({ error: errorMessage }));
    }
  };
};
