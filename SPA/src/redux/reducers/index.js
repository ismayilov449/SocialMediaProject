import { combineReducers } from "redux";
import postReducer from "../reducers/postReducer";
import postsReducer from "../reducers/postsReducer";
import commentReducer from "../reducers/commentReducer";

import authenticationReducer from "../reducers/authenticationReducer";

const rootReducer = combineReducers({
  postReducer,
  postsReducer,
  authenticationReducer,
  commentReducer,
});

export default rootReducer;
