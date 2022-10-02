import { userSlice } from "./user-slice";
import { utilSlice } from "../util/util-slice";
import axios from "axios";

export const fetchUser = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const result = await axios.get("/api/user");
      return result.data;
    };
    try {
      dispatch(utilSlice.actions.sendRequest());
      const userList = await fetchData();
      dispatch(userSlice.actions.setUserList({ userList }));
      dispatch(utilSlice.actions.finishRequest());
    } catch (error) {
      console.log(error);
      dispatch(utilSlice.actions.catchError(error));
    }
  };
};

export const Register = (userData) => {
  return async (dispatch) => {
    const register = async (data) => {
      const result = await axios.post("/api/user", data, {
        headers: { ContentType: "multipart/form-data" },
      });

      return result;
    };

    try {
      dispatch(utilSlice.actions.sendRequest());
      const newUser = await register(userData);
      if (newUser.data.errors) {
        dispatch(utilSlice.actions.catchError({ error: newUser.data.errors }));
      }

      dispatch(utilSlice.actions.finishRequest());
      window.location.href = "/login";
    } catch (error) {
      const errorMessage = {
        status: error.response.status,
        message: error.response.data.error,
      };
      dispatch(utilSlice.actions.catchError({ error: errorMessage }));
    }
  };
};
export const Edit = (id, newUserData) => {
  return async (dispatch) => {
    const register = async (data) => {
      const result = await axios.put(`/api/user/${id}`, data, {
        headers: { ContentType: "multipart/form-data" },
      });

      return result;
    };

    try {
      dispatch(utilSlice.actions.sendRequest());
      const newUser = await register(newUserData);
      console.log(newUser);
      if (newUser.data.errors) {
        dispatch(utilSlice.actions.catchError({ error: newUser.data.errors }));
      }

      dispatch(utilSlice.actions.finishRequest());
      window.location.href = `/profile/${id}`;
    } catch (error) {
      const errorMessage = {
        status: error.response.status,
        message: error.response.data.error,
      };
      dispatch(utilSlice.actions.catchError({ error: errorMessage }));
    }
  };
};

export const DeleteUser = (userId) => {
  return async (dispatch) => {
    const deleteUser = async (userId) => {
      const result = await axios.delete(`/api/user/${userId}`);

      return result.data;
    };

    try {
      dispatch(utilSlice.actions.sendRequest());
      const newUser = await deleteUser(userId);

      if (newUser.error) {
        dispatch(utilSlice.actions.catchError({ error: newUser.data.errors }));
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
