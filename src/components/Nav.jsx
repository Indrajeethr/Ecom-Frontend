import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, selectUser } from "../store/userSlice";
import { useSelector } from "react-redux";

import "./styles/Nav.css";
const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  return (
    <div className="nav">
      <Link to="/" className="nav-item">
        Home
      </Link>
      <div className="subnav">
        <Link to="/orders" className="nav-item">
          Orders
        </Link>
        <Link to="/contact" className="nav-item">
          Contact Us
        </Link>
        <button
          onClick={() => {
            dispatch(logout());
          }}
          className="nav-item"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Nav;
