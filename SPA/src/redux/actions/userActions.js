import * as ACTIONTYPES from "../actions/actionTypes";
import { userService } from "../services/userService";
import { history } from "../../redux/services/helper/history";

export const userActions = {
  login,
  logout,
  register,
};

//with userService.js
// function login(username, password) {
//   return (dispatch) => {
//     dispatch(request({ username }));

//     userService.login(username, password).then(
//       (user) => {
//         dispatch(success(user));
//         history.replace('/');
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//       }
//     );
//   };

//   function request(user) {
//     return { type: ACTIONTYPES.LOGIN_REQUEST, user };
//   }
//   function success(user) {
//     return { type: ACTIONTYPES.LOGIN_SUCCESS, user };
//   }
//   function failure(error) {
//     return { type: ACTIONTYPES.LOGIN_FAILURE, error };
//   }
// }

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));

    login_success(username, password).then(
      (user) => {
        dispatch(success(user));
        history.replace("/");
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

function login_success(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  };

  return fetch("http://localhost:5000/api/auth/login", requestOptions)
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function logout() {
  userService.logout();
  return { type: ACTIONTYPES.LOGOUT };
}

//with userService
// function register(user) {
//   return (dispatch) => {
//     dispatch(request(user));

//     userService.register(user).then(
//       (user) => {
//         dispatch(success());
//         history.push("/");
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//       }
//     );
//   };

//   function request(user) {
//     return { type: ACTIONTYPES.REGISTER_REQUEST, user };
//   }
//   function success(user) {
//     return { type: ACTIONTYPES.REGISTER_SUCCESS, user };
//   }
//   function failure(error) {
//     return { type: ACTIONTYPES.REGISTER_FAILURE, error };
//   }
// }

function register(user) {
  return (dispatch) => {
    dispatch(request(user));

    register_success(user).then(
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

function register_success(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch("http://localhost:5000/api/auth/register", requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
