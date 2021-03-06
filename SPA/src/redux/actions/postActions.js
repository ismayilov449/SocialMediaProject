import * as ACTIONTYPES from "./actionTypes";
import { authHeader } from "../services/helper/authHeader";

export const postActions = {
  getAll,
  sharePost,
  editPost,
  likePost,
  dislikePost,
  deletePost,
  getSpecPosts,
};

function getAll() {
  return (dispatch) => {
    dispatch(request());

    getAll_success().then(
      (posts) => {
        dispatch(success(posts));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: ACTIONTYPES.GETALL_REQUEST };
  }
  function success(posts) {
    return { type: ACTIONTYPES.GETALL_SUCCESS, posts };
  }
  function failure(error) {
    return { type: ACTIONTYPES.GETALL_FAILURE, error };
  }
}

function getAll_success() {
  let url = "http://localhost:5000/api/post/getall";

  return fetch(url)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function getSpecPosts(username) {
  return (dispatch) => {
    dispatch(request());

    getSpecPosts_success(username).then(
      (posts) => {
        dispatch(success(posts));
        // console.log(posts);
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request() {
    return { type: ACTIONTYPES.GETSPECPOST_REQUEST };
  }
  function success(userPosts) {
    return { type: ACTIONTYPES.GETSPECPOST_SUCCESS, userPosts };
  }
  function failure(error) {
    return { type: ACTIONTYPES.GETSPECPOST_FAILURE, error };
  }
}

function getSpecPosts_success(username) {
  const requestOptions = {
    method: "GET",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    "http://localhost:5000/api/post/getuserposts/" + username,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => {
      console.log(data);
      return data;
    });
}

function sharePost(post) {
  return (dispatch) => {
    dispatch(request(post));

    sharePost_success(post).then(
      (post) => {
        dispatch(success(post));
      },
      (error) => {
        dispatch(failure(error.toString));
      }
    );
  };

  function request(post) {
    return { type: ACTIONTYPES.SHAREPOST_REQUEST, post };
  }
  function success(post) {
    return { type: ACTIONTYPES.SHAREPOST_SUCCESS, post };
  }
  function failure(error) {
    return { type: ACTIONTYPES.SHAREPOST_FAILURE, error };
  }
}

function sharePost_success(post) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(post),
  };

  return fetch("http://localhost:5000/api/post/sharepost", requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function editPost(post) {
  return (dispatch) => {
    dispatch(request(post));

    editPost_success(post).then(
      (post) => {
        dispatch(success(post));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(post) {
    return { type: ACTIONTYPES.EDITPOST_REQUEST, post };
  }
  function success(post) {
    return { type: ACTIONTYPES.EDITPOST_SUCCESS, post };
  }
  function failure(error) {
    return { type: ACTIONTYPES.EDITPOST_FAILURE, error };
  }
}

function editPost_success(post) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(post),
  };

  console.log(requestOptions);

  return fetch("http://localhost:5000/api/post/editpost", requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function likePost(postId) {
  return (dispatch) => {
    dispatch(request(postId));

    likePost_success(postId).then(
      (post) => {
        dispatch(success(post));
      },
      (error) => {
        dispatch(failure(error.toString));
      }
    );
  };

  function request() {
    return { type: ACTIONTYPES.LIKEPOST_REQUEST };
  }
  function success(post) {
    return { type: ACTIONTYPES.LIKEPOST_SUCCESS, post };
  }
  function failure(error) {
    return { type: ACTIONTYPES.LIKEPOST_FAILURE, error };
  }
}

function likePost_success(postId) {
  const requestOptions = {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch("http://localhost:5000/api/like/like/" + postId, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function dislikePost(postId) {
  return (dispatch) => {
    dispatch(request(postId));

    dislikePost_success(postId).then(
      (post) => {
        dispatch(success(post));
      },
      (error) => {
        dispatch(failure(error.toString));
      }
    );
  };

  function request(post) {
    return { type: ACTIONTYPES.DISLIKEPOST_REQUEST, post };
  }
  function success(post) {
    return { type: ACTIONTYPES.DISLIKEPOST_SUCCESS, post };
  }
  function failure(error) {
    return { type: ACTIONTYPES.DISLIKEPOST_FAILURE, error };
  }
}

function dislikePost_success(postId) {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    "http://localhost:5000/api/like/dislike/" + postId,
    requestOptions
  )
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function deletePost(postId) {
  return (dispatch) => {
    dispatch(request(postId));

    deletePost_success(postId).then(
      (post) => {
        dispatch(success(post));
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };
  function request(post) {
    return { type: ACTIONTYPES.DELETEPOST_REQUEST, post };
  }
  function success(post) {
    return { type: ACTIONTYPES.DELETEPOST_SUCCESS, post };
  }
  function failure(error) {
    return { type: ACTIONTYPES.DELETEPOST_FAILURE, error };
  }
}

function deletePost_success(postId) {
  const requestOptions = {
    method: "DELETE",
    headers: { ...authHeader(), "Content-Type": "application/json" },
  };

  return fetch(
    "http://localhost:5000/api/post/removepost/" + postId,
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
