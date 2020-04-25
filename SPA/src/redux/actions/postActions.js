import * as ACTIONTYPES from "./actionTypes";

export function getPostByIdSuccess(post) {
  return {
    type: ACTIONTYPES.GET_POST_BY_ID_SUCCESS,
    payload: post,
  };
}

export function getPostById(id) {
  return function (dispatch) {
    let url = "http://localhost:5000/api/post/detail/" + id;

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(getPostByIdSuccess(data));
      });
  };
}

export function sharePostSuccess(post) {
  return {
    type: ACTIONTYPES.CREATE_POST_SUCCESS,
    payload: post,
  };
}

export function savePostApi(post) {
  console.log(post);
  return fetch("http://localhost:5000/api/post/sharepost/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(post),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function savePost(post) {
  return function (dispatch) {
    return savePostApi(post)
      .then((savedPost) => {
        savedPost.id
          ? dispatch(ACTIONTYPES.UPDATE_POST_SUCCESS(savedPost))
          : dispatch(ACTIONTYPES.CREATE_POST_SUCCESS(savedPost));
      })
      .catch(handleError);
  };
}

export async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  const error = await response.text;
  throw new Error(error);
}

export function handleError(error) {
  throw new Error(error);
}
