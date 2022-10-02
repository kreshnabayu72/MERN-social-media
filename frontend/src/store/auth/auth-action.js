import { authSlice } from "./auth-slice";
import axios from "axios";
import { utilSlice } from "../util/util-slice";

export const Login = (username, password) => {
  return async (dispatch) => {
    const signIn = async () => {
      dispatch(utilSlice.actions.sendRequest());
      const result = await axios.post(
        "https://project-sosmed-mern.herokuapp.com/api/user/login",
        {
          username,
          password,
        }
      );

      await dispatch(utilSlice.actions.finishRequest());

      await dispatch(
        authSlice.actions.setLoggedUser({ loggedUser: result.data })
      );

      return result;
    };
    try {
      await signIn();
    } catch (error) {
      const errorMessage = {
        message: error.response.data.error,
        status: error.response.status,
      };
      dispatch(utilSlice.actions.catchError({ error: errorMessage }));

      console.log(error);
    }
  };
};

export const LogoutAction = () => {
  return async (dispatch) => {
    const signOut = async () => {
      await dispatch(authSlice.actions.logout());
    };
    try {
      dispatch(utilSlice.actions.sendRequest());
      signOut();
      dispatch(utilSlice.actions.finishRequest());
    } catch (error) {
      dispatch(utilSlice.actions.catchError({ error }));
      console.log(error);
    }
  };
};
