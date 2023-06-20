import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./Nav";
import Loader from "./Loader";

const Forgot = () => {
  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const sendOTP = async () => {
    if (email === "") {
      toast.warning("Please Fill all the Fields", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      setLoading(true);
      await axios
        .post(
          "https://guvi2-hackathon-backend-joshua.onrender.com/forgot-password",
          {
            email,
          }
        )
        .then((res) => {
          setLoading(false);
          navigate("/reset-password");
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
        <h1 className="signUp-Heading">Forgot Password</h1>
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
          {Loading ? (
            <Loader />
          ) : (
            <button className="signUp-Button" onClick={sendOTP}>
              Send OTP
            </button>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Forgot;
