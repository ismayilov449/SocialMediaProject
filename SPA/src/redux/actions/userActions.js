import * as ACTIONTYPES from "../actions/actionTypes";
import { userService } from "../services/userService";
import { history } from "../../redux/services/helper/history";

export const userActions = {
  login,
  logout,
  register,
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    userService.login(username, password).then(
      (user) => {
        dispatch(success(user));
        history.push("/");
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: ACTIONTYPES.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: ACTIONTYPES.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: ACTIONTYPES.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: ACTIONTYPES.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    userService.register(user).then(
      (user) => {
        dispatch(success());
        history.push("/");
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    return { type: ACTIONTYPES.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: ACTIONTYPES.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: ACTIONTYPES.REGISTER_FAILURE, error };
  }
}
