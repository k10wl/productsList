import { configureStore, combineReducers } from "@reduxjs/toolkit";
import lightTheme from "./lightTheme";

const reducer = combineReducers({
  lightTheme: lightTheme.reducer,
});

export default configureStore({
  reducer,
});
