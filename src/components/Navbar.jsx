import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { logoutBtn, setIsLoggedInState } from "../features/auth/authSlice";

function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    let isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));
    dispatch(setIsLoggedInState(isLoggedIn));
  }, []);

  return (
    <div>
      <Navbar color="light" light expand="md" className="px-5 shadow-sm">
        <NavbarBrand className="fs-4 fw-bold">
          <NavLink className="text-primary-emphasis" to="/">
            React
          </NavLink>
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              {isLoggedIn && (
                <NavLink
                  className={({ isActive }) =>
                    `fw-normal py-3 px-3 ${isActive ? "bg-primary-subtle" : ""}`
                  }
                  to="/posts"
                >
                  Posts
                </NavLink>
              )}
            </NavItem>
          </Nav>
          {isLoggedIn ? (
            <Button
              color="danger"
              onClick={() => {
                dispatch(logoutBtn());
                navigate("/login");
              }}
            >
              Logout
            </Button>
          ) : (
            <Button color="primary" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
