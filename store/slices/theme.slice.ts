import { createSlice, Slice } from "@reduxjs/toolkit";
import cookie from "js-cookie";
import { useDispatch, useSelector } from "react-redux";

export const themes = ["dark", "light", "blue"];

const initialState: AppTheme = {
  name: "dark",
  done: true
};

export const appSlice: Slice<AppTheme> = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, { payload }: { payload: string }) {
      let nextIndex = themes[themes.findIndex(t => t === state.name) + 1] || themes[0];
      let next = (payload && themes.find(t => t === payload)) || nextIndex;
      document.documentElement.dataset.theme = next;
      state.name = next;
      state.done = false;
      cookie.set("theme", state.name);
    },
    done(state, { payload }: { payload: boolean }) {
      state.done = payload
    }
  }
});

export const getTheme = (state: { theme: AppTheme }) => state.theme;

export default appSlice.reducer;

export type AppTheme = {
  name: string;
  done: boolean;
};

export const useTheme = () => {
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);

  const setTheme = (payload?: string) => {
    dispatch(appSlice.actions.setTheme(payload));
    setTimeout(() => {
      dispatch(appSlice.actions.done(true));
    }, 300);
  }

  const set = (name: string) => {
    setTheme(name);
  };

  const toggle = () => {
    setTheme();
  };

  return { ...theme, themes, set, toggle };
};
