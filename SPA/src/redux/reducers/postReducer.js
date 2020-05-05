import * as ACTIONTYPES from "../actions/actionTypes";
import initialState from "./initialState";

export default function postReducer(state = initialState.post, action) {
  switch (action.type) {
    case ACTIONTYPES.SHAREPOST_REQUEST:
      return {
        post: action.post,
      };

    case ACTIONTYPES.SHAREPOST_SUCCESS:
      return {
        post: action.post,
      };

    case ACTIONTYPES.SHAREPOST_FAILURE:
      return {};

    default:
      return state;
  }
}
