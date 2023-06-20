import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/SignUp.css";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Nav from "./Nav";

const SignUp = () => {
  const navigate = useNavigate("");
  const [Loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    if (name === "" || email === "" || password === "") {
      toast.warning("Please Fill all the Fields", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      setLoading(true);
      await axios
        .post("https://guvi2-hackathon-backend-joshua.onrender.com/signup", {
          name,
          email,
          password,
        })
        .then((res) => {
          setLoading(false);
          toast.success(`${res.data.message}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setName("");
          setEmail("");
          setPassword("");
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
        <h1 className="signUp-Heading">Sign Up </h1>
        <div className="signUp-Form">
          <input
            className="signUp-Input"
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
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
              Sign Up
            </button>
          )}

          <p className="signUp-Info">
            Already Have an Account ?{" "}
            <span
              className="signUp-Login"
              onClick={() => {
                navigate("/login");
              }}
            >
              LOGIN
            </span>
          </p>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUp;
