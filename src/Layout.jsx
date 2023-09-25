import React from "react";
import { Outlet } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import ModalComponent from "./components/Modal";

const Layout = () => {
  return (
    <>
      <NavbarComponent />
      <ModalComponent />
      <Outlet />
    </>
  );
};

export default Layout;
