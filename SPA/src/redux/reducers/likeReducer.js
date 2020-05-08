import * as ACTIONTYPES from "../actions/actionTypes";
import initialState from "./initialState";

export default function likeReducer(state = initialState.like, action) {
  switch (action.type) {
    case ACTIONTYPES.LIKEPOST_REQUEST:
      return {};

    case ACTIONTYPES.LIKEPOST_SUCCESS:
      return {
        likes: action.likes,
      };

    case ACTIONTYPES.LIKEPOST_FAILURE:
      return {};

    default:
      return state;
  }
}
