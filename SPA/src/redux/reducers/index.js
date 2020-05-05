import { combineReducers } from "redux";
import postReducer from "../reducers/postReducer";
import postsReducer from "../reducers/postsReducer";

import authenticationReducer from "../reducers/authenticationReducer";

const rootReducer = combineReducers({
  postReducer,
  postsReducer,
  authenticationReducer,
});

export default rootReducer;
