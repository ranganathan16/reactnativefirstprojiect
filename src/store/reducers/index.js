import { combineReducers } from "redux";
import homeReducer from "./homeReducer";

const reducers = {
  home: homeReducer,
};

export default combineReducers(reducers);
