import * as ACTIONTYPES from "../actions/actionTypes";
import initialState from "./initialState";

export default function postsReducer(state = initialState.posts, action) {
  switch (action.type) {
    case ACTIONTYPES.GET_POSTS_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
