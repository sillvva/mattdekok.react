import { createSlice } from "@reduxjs/toolkit";

const initialState: AppLayout = {
  name: "main",
  path: "",
  head: {}
};

export const appSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setLayout(state: any, { payload }: { payload: AppLayout }) {
      state.name = payload.name;
      state.path = payload.path || "";
      state.head = payload.head || {};
    }
  }
});

export const getLayout = (state: { layout: AppLayout }) => state.layout;
export const { setLayout } = appSlice.actions;

export default appSlice.reducer;

export type AppLayout = {
  name: string;
  path?: string;
  head?: PageHeadProps;
};

export type PageHeadProps = {
  menu?: boolean;
  smallTitle?: boolean;
  meta?: LayoutMeta;
  headerClasses?: string[];
  backTo?: string | boolean;
};

type LayoutMeta = {
  title?: string;
  description?: string;
  image?: string;
  articleMeta?: object;
};
