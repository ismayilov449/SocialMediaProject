import * as ACTIONTYPES from "../actions/actionTypes";
import initialState from "./initialState";

export default function foundedUsersReducer(state = initialState.foundedUsers, action) {
  switch (action.type) {
    case ACTIONTYPES.FIND_REQUEST:
      return {
        users: action.user,
      };

    case ACTIONTYPES.FIND_SUCCESS:
      return {
        users: action.user,
      };

    case ACTIONTYPES.FIND_FAILURE:
      return {};

    default:
      return state;
  }
}
