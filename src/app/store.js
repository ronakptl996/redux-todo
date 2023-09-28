import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import authReducer, { loginBtn, logoutBtn } from "../features/auth/authSlice";

const authMiddleware = (store) => (next) => (action) => {
  if (loginBtn.match(action)) {
    sessionStorage.setItem("isLoggedIn", true);
  } else if (logoutBtn.match(action)) {
    sessionStorage.setItem("isLoggedIn", false);
  }
  return next(action);
};

export const store = configureStore({
  reducer: {
    post: postsReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authMiddleware),
});
