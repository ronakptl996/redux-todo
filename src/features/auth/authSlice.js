import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginBtn: (state) => {
      state.isLoggedIn = true;
    },
    logoutBtn: (state) => {
      state.isLoggedIn = false;
    },
    setIsLoggedInState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { loginBtn, logoutBtn, setIsLoggedInState } = authSlice.actions;
export default authSlice.reducer;
