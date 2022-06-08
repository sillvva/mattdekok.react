import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import layout from "./slices/layout.slice";

const combinedReducer = combineReducers({
  layout
});

export const store = () =>
  configureStore({
    reducer: combinedReducer
  });

export const storeWrapper = createWrapper(store);
