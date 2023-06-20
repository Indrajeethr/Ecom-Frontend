import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Nav.css";
const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className="nav">
      <button className="nav-items" onClick={() => navigate("/signup")}>
        Sign Up
      </button>
      <button
        className="nav-items"
        onClick={() => {
          navigate("/login");
        }}
      >
        LOGIN
      </button>
    </div>
  );
};

export default Nav;
