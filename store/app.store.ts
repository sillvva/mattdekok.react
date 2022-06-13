import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import theme from "./slices/theme.slice";

const combinedReducer = combineReducers({
  theme
});

export const store = () =>
  configureStore({
    reducer: combinedReducer
  });

export const storeWrapper = createWrapper(store);
