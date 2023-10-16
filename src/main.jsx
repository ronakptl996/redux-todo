import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Edit from "./pages/Edit";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import translationEn from "./translations/en/language.json";
import translationHi from "./translations/hi/language.json";

i18next.init({
  lng: "en",
  resources: {
    en: {
      translation: translationEn,
    },
    hi: {
      translation: translationHi,
    },
  },
});

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route
        path="posts"
        element={
          <ProtectedRoute>
            <Posts />
          </ProtectedRoute>
        }
      />
      <Route path="login" element={<Login />} />
      <Route
        path="edit/:id"
        element={
          <ProtectedRoute>
            <Edit />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <RouterProvider router={route} />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>
);
