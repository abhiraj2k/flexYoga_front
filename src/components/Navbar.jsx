import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.scss";
const Navbar = ({ isAuth, logoutHandler }) => {
  return (
    <div className="navbar__container">
      <div className="navbar">
        <div className="navbar__logo">
          <Link to="/">FlexMoney</Link>
        </div>
        <div className="navbar__menu">
          {!isAuth && (
            <div className="navbar__item login">
              <Link to="/login">Login</Link>
            </div>
          )}
          {!isAuth && (
            <div className="navbar__item signup">
              <Link to="/signup">Sign up</Link>
            </div>
          )}
          {isAuth && (
            <div className="navbar__item logout">
              <Link to="/" onClick={logoutHandler}>
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
