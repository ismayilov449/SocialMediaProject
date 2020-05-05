import * as ACTIONTYPES from "../actions/actionTypes";
import initialState from "./initialState";

export default function postsReducer(state = initialState.posts, action) {
  switch (action.type) {
    case ACTIONTYPES.GETALL_SUCCESS:
      return action.posts;

    case ACTIONTYPES.GETALL_FAILURE:
      return {};

    default:
      return state;
  }
}
