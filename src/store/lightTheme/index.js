import { createSlice } from "@reduxjs/toolkit";

const lightTheme = createSlice({
  name: "lightTheme",
  initialState: true,
  reducers: {
    changeTheme: (state) => !state,
  },
});

export default lightTheme;

export const { changeTheme } = lightTheme.actions;
