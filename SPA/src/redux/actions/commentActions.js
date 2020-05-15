import * as ACTIONTYPES from "../actions/actionTypes";
import { authHeader } from "../services/helper/authHeader";

export const commentActions = {
  //getAll,
  addComment,
  deleteComment,
};

function addComment(comment) {
  return (dispatch) => {
    dispatch(request(comment));

    addComment_success(comment).then(
      (comment) => {
        dispatch(success(comment));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(comment) {
    return { type: ACTIONTYPES.ADDCOMMENT_REQUEST, comment };
  }
  function success(comment) {
    return { type: ACTIONTYPES.ADDCOMMENT_SUCCESS, comment };
  }
  function failure(error) {
    return { type: ACTIONTYPES.ADDCOMMENT_FAILURE, error };
  }
}

function addComment_success(comment) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  };

  return fetch("http://localhost:5000/api/comment/addcomment", requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function deleteComment(commentId) {
  return (dispatch) => {
    dispatch(request(commentId));

    deleteComment_success(commentId).then(
      (commentId) => {
        dispatch(success(commentId));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(commentId) {
    return { type: ACTIONTYPES.DELETECOMMENT_REQUEST, commentId };
  }
  function success(commentId) {
    return { type: ACTIONTYPES.DELETECOMMENT_SUCCESS, commentId };
  }
  function failure(error) {
    return { type: ACTIONTYPES.DELETECOMMENT_FAILURE, error };
  }
}

function deleteComment_success(commentId) {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    "http://localhost:5000/api/comment/removecomment/" + commentId,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        //logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
