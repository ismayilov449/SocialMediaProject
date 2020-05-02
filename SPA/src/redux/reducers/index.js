import { combineReducers } from "redux";
import postReducer from "../reducers/postReducer";
import  authenticationReducer  from "../reducers/authenticationReducer";

const rootReducer = combineReducers({
  postReducer,
  authenticationReducer,
});

export default rootReducer;
