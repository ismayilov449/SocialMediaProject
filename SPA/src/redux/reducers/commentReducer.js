import * as ACTIONTYPES from "../actions/actionTypes";
import initialState from "./initialState";

export default function commentReducer(state = initialState.comment, action) {
  switch (action.type) {
    case ACTIONTYPES.SHAREPOST_REQUEST:
      return {
        comment: action.comment,
      };

    case ACTIONTYPES.SHAREPOST_SUCCESS:
      return {
        comment: action.comment,
      };

    case ACTIONTYPES.SHAREPOST_FAILURE:
      return {};

    default:
      return state;
  }
}
