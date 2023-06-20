import React from "react";
import { useState } from "react";
import emailjs from "emailjs-com";

import "./styles/Contact.css";
const Contact = () => {
  const [from_name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");

  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const queryHandler = (event) => {
    setQuery(event.target.value);
  };

  const submitHandler = () => {
    if (from_name == "" || email == "" || query == "") {
      alert("Please Fill all the fields");
    } else {
      emailjs.send(
        "service_125o7n8",
        "template_c5u0zgq",
        {
          from_name: from_name,
          to_name: "Joshua",
          from_email: email,
          to_email: "rjoshuasujith@gmail.com",
          message: query,
        },
        "b7-7fic01tSVx8u1H"
      );
      alert(` Your query has been submitted We will reach out to you soon `);
      setName("");
      setEmail("");
      setQuery("");
    }
  };
  return (
    <div className="form">
      <h1>Contact Us</h1>
      <input
        className="form-input"
        type="text"
        placeholder="Enter Name"
        value={from_name}
        onChange={nameHandler}
      />
      <input
        className="form-input"
        type="text"
        placeholder="Enter Email"
        value={email}
        onChange={emailHandler}
      />
      <textarea
        className="form-input"
        type="text"
        placeholder="Enter your query"
        rows="6"
        cols="10"
        value={query}
        onChange={queryHandler}
      />
      <button className="form-button" onClick={submitHandler}>
        Submit
      </button>
    </div>
  );
};

export default Contact;
