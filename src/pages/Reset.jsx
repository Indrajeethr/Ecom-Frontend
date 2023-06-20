import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import Nav from "./Nav";
import Loader from "./Loader";
import "./styles/SignUp.css";
import { useNavigate } from "react-router-dom";
const Reset = () => {
  const [otp, setOtp] = useState("");
  const [Loading, setLoading] = useState(false);
  const [newPassword, setPassword] = useState("");
  const navigate = useNavigate("");

  const reset = async () => {
    if (otp === "" || newPassword === "") {
      toast.warning("Please Fill all the Fields", {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      setLoading(true);
      await axios
        .post(
          "https://guvi2-hackathon-backend-joshua.onrender.com/reset-password",
          {
            otp,
            newPassword,
          }
        )
        .then((res) => {
          setLoading(false);
          toast.success(`${res.data.message}`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          setOtp("");
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
        <h1 className="signUp-Heading">Reset Password</h1>
        <div className="signUp-Form">
          <input
            className="signUp-Input"
            type="text"
            placeholder="Enter One-time password"
            value={otp}
            onChange={(event) => {
              setOtp(event.target.value);
            }}
          />
          <input
            className="signUp-Input"
            type="text"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          {Loading ? (
            <Loader />
          ) : (
            <button className="signUp-Button" onClick={reset}>
              RESET PASSWORD
            </button>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Reset;
