import * as ACTIONTYPES from "../actions/actionTypes";
import initialState from "./initialState";

export default function postReducer(state = initialState.post, action) {
  switch (action.type) {
    case ACTIONTYPES.GET_POST_BY_ID_SUCCESS:
      return action.payload;

    case ACTIONTYPES.UPDATE_POST_SUCCESS:
      return action.payload;

    case ACTIONTYPES.CREATE_POST_SUCCESS:
      return action.payload;

    default:
      return state;
  }
}
