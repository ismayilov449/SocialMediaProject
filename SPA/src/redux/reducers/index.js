import { combineReducers } from "redux";
import postReducer from "../reducers/postReducer";
import postsReducer from "../reducers/postsReducer";
import likeReducer from "../reducers/likeReducer";

import authenticationReducer from "../reducers/authenticationReducer";

const rootReducer = combineReducers({
  postReducer,
  postsReducer,
  authenticationReducer,
  likeReducer,
});

export default rootReducer;
