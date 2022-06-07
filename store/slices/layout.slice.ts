import { createSlice } from "@reduxjs/toolkit";

const initialState: AppLayout = {
    name: 'main',
    path: '',
    head: {}
  }

export const appSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout(state: any, action: { type?: string, payload: AppLayout }) {
      state.name = action.payload.name;
      state.path = action.payload.path || "";
      state.head = action.payload.head || {};
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