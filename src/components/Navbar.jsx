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
import { useTranslation } from "react-i18next";
import { fetchPosts } from "../features/posts/postsSlice";

function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const { t, i18n } = useTranslation("translation");

  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const toggle = () => setIsOpen(!isOpen);

  const changeLanguage = (e) => {
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("language", JSON.stringify(e.target.value));
  };

  useEffect(() => {
    let language = JSON.parse(localStorage.getItem("language")) || "";
    let isLoggedIn = JSON.parse(sessionStorage.getItem("isLoggedIn"));

    setLanguage(language);
    i18n.changeLanguage(language);
    dispatch(setIsLoggedInState(isLoggedIn));
  }, []);

  useEffect(() => {
    dispatch(fetchPosts(language));
  }, [language]);

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
                  {t("POSTS")}
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
              {t("LOGOUT")}
            </Button>
          ) : (
            <Button color="primary" onClick={() => navigate("/login")}>
              {t("LOGIN")}
            </Button>
          )}
          <select
            name="language"
            id="language"
            value={language}
            onChange={changeLanguage}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
