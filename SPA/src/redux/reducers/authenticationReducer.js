import * as ACTIONTYPES from "../actions/actionTypes";
import initialState from "../reducers/initialState";

var user = initialState.user;
var currState = user ? { loggedIn: true, user } : {};

export default function authenticationReducer(state = currState, action) {
  switch (action.type) {
    case ACTIONTYPES.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };

    case ACTIONTYPES.LOGIN_SUCCESS:
      return {
        loggingIn: true,
        user: action.user,
      };

    case ACTIONTYPES.LOGIN_FAILURE:
      return {};

    case ACTIONTYPES.LOGOUT:
      return {};

    default:
      return state;
  }
}
