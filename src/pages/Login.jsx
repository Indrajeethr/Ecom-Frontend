import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Nav from "./Nav";
import "react-toastify/dist/ReactToastify.css";
import "./styles/SignUp.css";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { login } from "../store/userSlice";

const Login = () => {
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const submit = async () => {
    if (email == "" || password == "") {
      toast.warning("Please Fill all the Fields", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      setLoading(true);
      await axios
        .post("https://guvi2-hackathon-backend-joshua.onrender.com/login", {
          email,
          password,
        })
        .then((response) => {
          setLoading(false);
          dispatch(
            login({
              email: email,
              password: password,
              loggedIn: true,
            })
          );
          navigate("/");
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.response.data.message);
        });
    }
  };
  return (
    <div>
      <Nav />
      <div className="signUp-Container">
        <h1 className="signUp-Heading">Login</h1>
        <div className="signUp-Form">
          <input
            className="signUp-Input"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            className="signUp-Input"
            type="text"
            placeholder="Enter Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {Loading ? (
            <Loader />
          ) : (
            <button className="signUp-Button" onClick={submit}>
              Login
            </button>
          )}

          <p className="signUp-Info">
            Don't Have an Account?{" "}
            <span
              className="signUp-Login"
              onClick={() => {
                navigate("/signup");
              }}
            >
              SIGN UP
            </span>
          </p>
        </div>
        <div
          className="forgot"
          onClick={() => {
            navigate("/forgot-password");
          }}
        >
          Forgot Password ?
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
