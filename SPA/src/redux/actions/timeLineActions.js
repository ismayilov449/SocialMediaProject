import * as ACTIONTYPES from "./actionTypes";

export function getPostsSuccess(posts) {
  return {
    type: ACTIONTYPES.GET_POSTS_SUCCESS,
    payload: posts,
  };
}

export function getPosts() {
  return function (dispatch) {
    let url = "http://localhost:5000/api/post/getposts";

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(getPostsSuccess(data));
      });
  };
}
