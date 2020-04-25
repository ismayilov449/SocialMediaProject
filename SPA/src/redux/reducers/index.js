import { combineReducers } from "redux";
import getPostsReducer from "./postsReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
  getPostsReducer,
  postReducer,
});

export default rootReducer;
